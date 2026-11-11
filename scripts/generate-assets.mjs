/**
 * generate-assets.mjs
 * Generates all static image assets:
 *   public/og-image.png        (1200 × 630)
 *   public/apple-touch-icon.png (180 × 180)
 *   public/favicon.ico          (32 × 32, ICO via PNG buffer)
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// ─── Colour tokens ──────────────────────────────────────────────────────────
const INK    = '#20211e';
const PAPER  = '#f4f3ed';
const BLUE   = '#254dde';
const LIME   = '#d5f36a';
const MUTED  = '#72736b';
const VIOLET = '#5651a0';

// ─── OG IMAGE  1200 × 630 ───────────────────────────────────────────────────
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse">
      <path d="M 38 0 L 0 0 0 38" fill="none" stroke="${INK}" stroke-width="0.6" stroke-opacity="0.09"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${PAPER}"/>

  <!-- Subtle noise grid -->
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.6"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="6" height="630" fill="${BLUE}"/>

  <!-- Bottom accent bar -->
  <rect x="0" y="594" width="1200" height="6" fill="${LIME}" opacity="0.7"/>

  <!-- Abstract orbit circle (decorative) -->
  <circle cx="980" cy="315" r="260" fill="none" stroke="${INK}" stroke-width="1" stroke-opacity="0.1"/>
  <circle cx="980" cy="315" r="180" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="6 6" stroke-opacity="0.12"/>
  <circle cx="980" cy="315" r="95" fill="${VIOLET}" fill-opacity="0.08"/>

  <!-- Dot accents -->
  <circle cx="980" cy="315" r="6" fill="${BLUE}"/>
  <circle cx="1125" cy="195" r="4" fill="${LIME}"/>
  <circle cx="845" cy="438" r="3" fill="${INK}" opacity="0.3"/>

  <!-- Monogram block -->
  <rect x="68" y="68" width="118" height="118" rx="4" fill="${INK}"/>
  <text x="127" y="148" font-family="'Space Grotesk', 'DM Sans', system-ui, sans-serif"
        font-size="62" font-weight="700" letter-spacing="-5" fill="${PAPER}" text-anchor="middle">AK</text>
  <circle cx="174" cy="82" r="8" fill="${BLUE}"/>

  <!-- Status pill -->
  <rect x="68" y="216" width="148" height="26" rx="13" fill="${LIME}"/>
  <circle cx="88" cy="229" r="4" fill="#4a8c32"/>
  <text x="100" y="234" font-family="'DM Mono', 'Courier New', monospace"
        font-size="10" font-weight="500" letter-spacing="1.5" fill="${INK}">AVAILABLE</text>

  <!-- Main headline -->
  <text x="68" y="380" font-family="'Space Grotesk', 'DM Sans', system-ui, sans-serif"
        font-size="88" font-weight="600" letter-spacing="-5" fill="${INK}">I make</text>
  <text x="68" y="470" font-family="'Space Grotesk', 'DM Sans', system-ui, sans-serif"
        font-size="88" font-weight="400" letter-spacing="-5" fill="${MUTED}">software.</text>

  <!-- Role label -->
  <text x="68" y="310" font-family="'DM Mono', 'Courier New', monospace"
        font-size="13" letter-spacing="3" fill="${MUTED}">SOFTWARE DEVELOPER  /  INDIA</text>

  <!-- Divider line -->
  <line x1="68" y1="336" x2="420" y2="336" stroke="${INK}" stroke-width="1" stroke-opacity="0.18"/>

  <!-- Tagline -->
  <text x="68" y="554" font-family="'DM Mono', 'Courier New', monospace"
        font-size="12" letter-spacing="1.5" fill="${MUTED}">.NET  ·  React  ·  Node.js  ·  SQL Server  ·  MongoDB</text>

  <!-- URL watermark -->
  <text x="1132" y="554" font-family="'DM Mono', 'Courier New', monospace"
        font-size="11" letter-spacing="1" fill="${MUTED}" text-anchor="end">ajaykumarn.dev</text>

  <!-- Plus decorations -->
  <text x="490" y="90" font-family="'DM Mono', monospace" font-size="20" fill="${BLUE}" opacity="0.5">+</text>
  <text x="560" y="590" font-family="'DM Mono', monospace" font-size="16" fill="${INK}" opacity="0.2">+</text>
</svg>
`.trim();

// ─── APPLE TOUCH ICON  180 × 180 ────────────────────────────────────────────
const appleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="38" fill="${INK}"/>
  <text x="90" y="121" font-family="'Space Grotesk','DM Sans',system-ui,sans-serif"
        font-size="72" font-weight="700" letter-spacing="-6"
        fill="${PAPER}" text-anchor="middle">AK</text>
  <circle cx="143" cy="34" r="12" fill="${BLUE}"/>
  <circle cx="143" cy="34" r="6"  fill="${PAPER}"/>
</svg>
`.trim();

// ─── FAVICON  32 × 32 ───────────────────────────────────────────────────────
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="5" fill="${INK}"/>
  <text x="16" y="23" font-family="'Space Grotesk','DM Sans',system-ui,sans-serif"
        font-size="16" font-weight="700" letter-spacing="-1.5"
        fill="${PAPER}" text-anchor="middle">AK</text>
  <circle cx="27" cy="6" r="4" fill="${BLUE}"/>
</svg>
`.trim();

// ─── Render helpers ──────────────────────────────────────────────────────────
async function svgToPng(svgString, width, height, outPath) {
  const buf = Buffer.from(svgString);
  await sharp(buf)
    .resize(width, height)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
  console.log(`✓  ${outPath}`);
}

// ICO = raw PNG bytes wrapped in the ICO container format (32×32 only)
async function pngToIco(pngPath, icoPath) {
  const pngBuf = readFileSync(pngPath);
  const pngSize = pngBuf.length;

  // ICO header (6 bytes) + 1 directory entry (16 bytes) + PNG data
  const ico = Buffer.alloc(6 + 16 + pngSize);
  let offset = 0;

  // ICONDIR
  ico.writeUInt16LE(0,    offset); offset += 2; // Reserved
  ico.writeUInt16LE(1,    offset); offset += 2; // Type = 1 (icon)
  ico.writeUInt16LE(1,    offset); offset += 2; // Count = 1

  // ICONDIRENTRY
  ico.writeUInt8(32,      offset); offset += 1; // Width
  ico.writeUInt8(32,      offset); offset += 1; // Height
  ico.writeUInt8(0,       offset); offset += 1; // Color count (0 = 256+)
  ico.writeUInt8(0,       offset); offset += 1; // Reserved
  ico.writeUInt16LE(1,    offset); offset += 2; // Planes
  ico.writeUInt16LE(32,   offset); offset += 2; // Bit count
  ico.writeUInt32LE(pngSize,     offset); offset += 4; // Size of image data
  ico.writeUInt32LE(6 + 16,      offset); offset += 4; // Offset to image data

  // PNG bytes
  pngBuf.copy(ico, offset);

  writeFileSync(icoPath, ico);
  console.log(`✓  ${icoPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
const faviconPngPath = path.join(publicDir, '_favicon32.png'); // temp

await svgToPng(ogSvg,     1200, 630, path.join(publicDir, 'og-image.png'));
await svgToPng(appleSvg,  180,  180, path.join(publicDir, 'apple-touch-icon.png'));
await svgToPng(faviconSvg, 32,   32, faviconPngPath);
await pngToIco(faviconPngPath, path.join(publicDir, 'favicon.ico'));

// Remove temp file
import { unlinkSync } from 'fs';
unlinkSync(faviconPngPath);

console.log('\nAll assets generated in /public ✅');
