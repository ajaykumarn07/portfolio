/**
 * generate-assets.mjs
 *
 * Builds the static image assets in /public:
 *   og-image.png         1200 x 630  (link previews)
 *   apple-touch-icon.png  180 x 180
 *   favicon.svg / favicon.ico
 *
 * Text is converted to vector outlines from the real font files in
 * @fontsource, so the output is identical on every machine. It never depends
 * on fonts installed on the computer that runs the script (the cause of the
 * old broken share image).
 *
 * Run with: npm run assets
 */

import sharp from 'sharp';
import opentype from 'opentype.js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { profile } from '../src/content.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const publicDir = path.join(root, 'public');

// ─── Colour tokens (keep in sync with src/style.css) ────────────────────────
const INK = '#20211e';
const PAPER = '#f4f3ed';
const BLUE = '#254dde';
const LIME = '#d5f36a';
const MUTED = '#5a5b55';
const VIOLET = '#5651a0';

// ─── Fonts ──────────────────────────────────────────────────────────────────
function loadFont(pkg, file) {
  const buf = readFileSync(path.join(root, 'node_modules/@fontsource', pkg, 'files', file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const grotesk400 = loadFont('space-grotesk', 'space-grotesk-latin-400-normal.woff');
const grotesk600 = loadFont('space-grotesk', 'space-grotesk-latin-600-normal.woff');
const grotesk700 = loadFont('space-grotesk', 'space-grotesk-latin-700-normal.woff');
const mono400 = loadFont('dm-mono', 'dm-mono-latin-400-normal.woff');
const mono500 = loadFont('dm-mono', 'dm-mono-latin-500-normal.woff');

/**
 * Lay out `text` as an SVG <path>.
 * `tracking` is extra space after every glyph in px (negative tightens).
 * `anchor` is 'start' | 'middle' | 'end' relative to x.
 */
function textPath(font, text, { x, y, size, tracking = 0, anchor = 'start', fill, opacity = 1 }) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);

  let width = 0;
  glyphs.forEach((g, i) => {
    width += g.advanceWidth * scale + tracking;
    if (i < glyphs.length - 1) width += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  width -= tracking; // no trailing space

  let cursor = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  const parts = [];
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(cursor, y, size).toPathData(2));
    cursor += g.advanceWidth * scale + tracking;
    if (i < glyphs.length - 1) cursor += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });

  return `<path d="${parts.join(' ')}" fill="${fill}"${opacity === 1 ? '' : ` fill-opacity="${opacity}"`}/>`;
}

// ─── OG image 1200 x 630 ────────────────────────────────────────────────────
const label = `${profile.role.toUpperCase()}  /  ${profile.location.toUpperCase()}`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse">
      <path d="M 38 0 L 0 0 0 38" fill="none" stroke="${INK}" stroke-width="0.6" stroke-opacity="0.08"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="0" y="0" width="8" height="630" fill="${BLUE}"/>
  <rect x="0" y="622" width="1200" height="8" fill="${LIME}"/>

  <!-- Orbit decoration, kept to the right edge so it never fights the text -->
  <circle cx="1010" cy="315" r="250" fill="none" stroke="${INK}" stroke-width="1" stroke-opacity="0.10"/>
  <circle cx="1010" cy="315" r="170" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="6 6" stroke-opacity="0.12"/>
  <circle cx="1010" cy="315" r="92" fill="${VIOLET}" fill-opacity="0.10"/>
  <circle cx="1010" cy="315" r="7" fill="${BLUE}"/>
  <circle cx="1128" cy="170" r="5" fill="${LIME}"/>
  <circle cx="880" cy="455" r="4" fill="${INK}" fill-opacity="0.3"/>

  <!-- Monogram -->
  <rect x="72" y="64" width="104" height="104" rx="4" fill="${INK}"/>
  ${textPath(grotesk700, 'AK', { x: 124, y: 132, size: 54, tracking: -3, anchor: 'middle', fill: PAPER })}
  <circle cx="166" cy="78" r="7" fill="${BLUE}"/>

  <!-- Role label and divider: separated by clear space from the headline -->
  ${textPath(mono500, label, { x: 72, y: 232, size: 15, tracking: 2.4, fill: MUTED })}
  <line x1="72" y1="254" x2="520" y2="254" stroke="${INK}" stroke-width="1" stroke-opacity="0.2"/>

  <!-- Headline (same words as the site hero) -->
  ${textPath(grotesk600, 'I build dependable', { x: 72, y: 346, size: 76, tracking: -3.6, fill: INK })}
  ${textPath(grotesk600, 'software that', { x: 72, y: 422, size: 76, tracking: -3.6, fill: INK })}
  ${textPath(grotesk400, 'removes friction.', { x: 72, y: 498, size: 76, tracking: -3.6, fill: MUTED })}

  <!-- Footer line -->
  ${textPath(mono400, '.NET  ·  React  ·  Node.js  ·  SQL Server  ·  MongoDB', { x: 72, y: 572, size: 15, tracking: 1.2, fill: MUTED })}
  ${textPath(mono400, new URL(profile.siteUrl).hostname, { x: 1128, y: 572, size: 15, tracking: 1, anchor: 'end', fill: MUTED })}
</svg>
`.trim();

// ─── Apple touch icon 180 x 180 ─────────────────────────────────────────────
const appleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${INK}"/>
  ${textPath(grotesk700, 'AK', { x: 90, y: 118, size: 76, tracking: -5, anchor: 'middle', fill: PAPER })}
  <circle cx="146" cy="34" r="12" fill="${BLUE}"/>
  <circle cx="146" cy="34" r="5" fill="${PAPER}"/>
</svg>
`.trim();

// ─── Favicon 32 x 32 (also written as favicon.svg) ──────────────────────────
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${INK}"/>
  ${textPath(grotesk700, 'AK', { x: 16, y: 22.5, size: 16, tracking: -1, anchor: 'middle', fill: PAPER })}
  <circle cx="26.5" cy="6" r="3.5" fill="${BLUE}"/>
</svg>
`.trim();

// ─── ICO container around one PNG ───────────────────────────────────────────
function pngToIco(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  return Buffer.concat([header, png]);
}

async function render(svg, width, height) {
  return sharp(Buffer.from(svg)).resize(width, height).png({ compressionLevel: 9 }).toBuffer();
}

const out = (name) => path.join(publicDir, name);

writeFileSync(out('og-image.png'), await render(ogSvg, 1200, 630));
writeFileSync(out('apple-touch-icon.png'), await render(appleSvg, 180, 180));
writeFileSync(out('favicon.svg'), faviconSvg + '\n');
writeFileSync(out('favicon.ico'), pngToIco(await render(faviconSvg, 32, 32)));

console.log('Wrote og-image.png, apple-touch-icon.png, favicon.svg, favicon.ico to public/');
