// phase23.js — robust service-worker registration.
// Replaces the bare `navigator.serviceWorker.register("sw.js")` with a version that:
//  1. skips registration on non-http(s) origins (file:// throws an unhandled rejection),
//  2. defers registration until window load (doesn't compete with first paint),
//  3. passes an explicit relative scope (correct under the /CodeVis/ Pages subpath),
//  4. swallows registration failures (offline / private mode) via .catch().
// Idempotent: bails if the hardened block is already present.
const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(p, 'utf8');
let n = 0;

const OLD = 'if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js")}';
const NEW = 'if("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)){\r\n' +
  '  window.addEventListener("load",function(){\r\n' +
  '    navigator.serviceWorker.register("sw.js",{scope:"./"}).catch(function(){});\r\n' +
  '  });\r\n' +
  '}';

if (!html.includes('serviceWorker.register("sw.js",{scope:"./"})')) {
  if (html.includes(OLD)) {
    html = html.replace(OLD, NEW);
    n++;
    console.log('[phase23-1] SW registration hardened (protocol guard + load defer + scope + catch).');
  } else {
    console.warn('[phase23-1] bare SW registration anchor not found — skipped.');
  }
}

fs.writeFileSync(p, html, 'utf8');
console.log(`--- Phase 23 OK: ${n} patch(es) ---`);
