// swver.js — stamps sw.js CV_VERSION with a content hash of the FINAL index.html.
// Runs last in the `npm run build` chain so the hash covers build.js AND every
// phase*.js / fix*.js mutation. Deterministic: same bytes -> same version.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const htmlPath = path.resolve(__dirname, '../index.html');
const swPath = path.resolve(__dirname, '../sw.js');
if (!fs.existsSync(swPath)) {
  console.log('[swver] sw.js not found — skipped.');
  process.exit(0);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const sw = fs.readFileSync(swPath, 'utf8');
const hash = crypto.createHash('sha1').update(html).digest('hex').slice(0, 10);
const next = `codevis-${hash}`;

const stamped = sw.replace(/const CV_VERSION = "[^"]+";/, `const CV_VERSION = "${next}";`);
if (stamped === sw) {
  console.log(`[swver] cache already current (${next})`);
} else {
  fs.writeFileSync(swPath, stamped, 'utf8');
  console.log(`[swver] service worker cache bumped -> ${next}`);
}
