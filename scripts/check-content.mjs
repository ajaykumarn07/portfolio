/**
 * check-content.mjs
 *
 * Lists every fact in src/content.js that is still `null` (waiting for you).
 *   npm run check:content            lists them, always exits 0
 *   npm run check:content -- --strict  exits 1 if anything is missing
 *                                      (use it as a pre-deploy gate)
 */

import { profile, experience } from '../src/content.js';

const missing = [];

if (!profile.resumeUrl) missing.push('profile.resumeUrl: PDF link for the hero "Résumé" button');
if (!profile.yearsExperience) missing.push('profile.yearsExperience: adds the third hero stat');

for (const item of experience.items) {
  for (const field of ['role', 'period', 'outcome']) {
    if (!item[field]) missing.push(`experience "${item.type}" → ${field}`);
  }
}

if (missing.length === 0) {
  console.log('✓ content.js has no empty fields.');
} else {
  console.log(`${missing.length} field(s) still empty in src/content.js (not rendered in production):\n`);
  for (const line of missing) console.log(`  - ${line}`);
  console.log('\nThe empty ones show as dashed TODO boxes in `npm run dev`.');
}

if (missing.length && process.argv.includes('--strict')) process.exit(1);
