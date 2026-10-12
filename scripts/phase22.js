// phase22.js — webfont loading: ensure Vazirmatn + Fira Code <link> exists in <head>.
// Idempotent: bails if the fonts.googleapis.com stylesheet link is already present.
const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(p, 'utf8');
let n = 0;

if (!html.includes('fonts.googleapis.com/css2?family=Vazirmatn')) {
  const tag = '<link rel="apple-touch-icon" href="icon-192.png">';
  const fonts =
    '\r\n<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '\r\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '\r\n<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;800&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">';
  if (html.includes(tag)) {
    html = html.replace(tag, tag + fonts);
    n++;
    console.log('[phase22-1] Google Fonts (Vazirmatn + Fira Code) link added.');
  } else {
    console.warn('[phase22-1] anchor (apple-touch-icon link) not found — skipped.');
  }
}

fs.writeFileSync(p, html, 'utf8');
console.log(`--- Phase 22 OK: ${n} patch(es) ---`);
