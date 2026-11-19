# Ajay Kumar N — Developer Portfolio

A responsive React + Vite portfolio: selected projects, confidential professional case studies, toolkit and contact links. Light and dark themes, built for keyboard and screen-reader use (automated axe-core audit: 0 violations), no runtime dependencies beyond React.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. Empty content fields show as dashed TODO boxes. |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | ESLint, including React hooks rules. |
| `npm run assets` | Regenerate the share image, favicon and touch icon in `public/`. |
| `npm run check:content` | List fields in `src/content.js` that are still empty. Add `-- --strict` to fail when any are. |

## Editing content

All copy lives in **`src/content.js`**. `src/App.jsx` only decides how it is drawn.

Fields set to `null` are facts only you can supply (résumé link, job role and dates, a measurable outcome per case study, years of experience). In production an empty field is not rendered at all, so no placeholder text can ship by accident. Fill them in, then run `npm run check:content` to confirm nothing is missing.

To add a résumé: put the PDF in `public/` (for example `public/Ajay-Kumar-N-Resume.pdf`) and set `profile.resumeUrl` to `'/Ajay-Kumar-N-Resume.pdf'`.

## Share image and icons

`npm run assets` rebuilds `og-image.png`, `apple-touch-icon.png`, `favicon.svg` and `favicon.ico`. Text is converted to vector outlines from the `@fontsource` font files, so output is identical on every machine. Change the headline or colours in `scripts/generate-assets.mjs`.

## Project structure

```text
├── index.html              meta tags, structured data, no-JS fallback
├── public/                 icons, share image, robots.txt, sitemap.xml
├── scripts/
│   ├── generate-assets.mjs
│   └── check-content.mjs
├── src/
│   ├── content.js          all copy and facts
│   ├── App.jsx             layout and components
│   ├── main.jsx
│   └── style.css           design tokens at the top
└── .github/workflows/ci.yml   lint + build on every push
```

## Accessibility

- Skip-to-content link, visible focus rings, `prefers-reduced-motion` support.
- Text colours meet WCAG AA contrast in both themes; informative text is at least 11px.
- Decorative illustrations are hidden from screen readers.

## Domain

`index.html`, `public/robots.txt`, `public/sitemap.xml` and `src/content.js` (`profile.siteUrl`) assume the site lives at `https://ajaykumarn-portfolio.vercel.app/`.

## Deploy

`dist/` is static and deploys to Vercel, Netlify, GitHub Pages or Azure Static Web Apps.
