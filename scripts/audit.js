// audit.js — static build-chain gate.
// Catches the class of bug that shipped dead UI: markup inserted by a phase script
// whose onclick/change handler references a global the bundle never defines.
// Exits non-zero when any inline handler calls an undefined function, so CI fails
// on drift instead of only at runtime in the browser.
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../index.html');
const html = fs.readFileSync(FILE, 'utf8');

const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
if (!blocks.length) { console.error('audit: no inline <script> block found'); process.exit(1); }
const js = blocks.sort((a, b) => b.length - a.length)[0];

// Globals the bundle actually defines at top level.
const declared = new Set();
for (const m of js.matchAll(/(?:^|[\r\n;}\s])(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g)) declared.add(m[1]);
for (const m of js.matchAll(/(?:^|[\r\n;}\s])(?:let|var|const)\s+([A-Za-z_$][\w$]*)/g)) declared.add(m[1]);

// Built-ins / method names that legitimately appear inside inline handlers.
const ALLOWED = new Set([
  'if', 'for', 'while', 'switch', 'return', 'typeof', 'new', 'catch',
  'getElementById', 'querySelector', 'querySelectorAll', 'scrollTo', 'reload', 'confirm', 'alert',
  'parseInt', 'parseFloat', 'isNaN', 'String', 'Number', 'Boolean', 'Object', 'Array', 'JSON',
  'Math', 'Date', 'Set', 'Map', 'Promise', 'localStorage', 'sessionStorage', 'navigator', 'window', 'document',
  'keys', 'values', 'entries', 'startsWith', 'endsWith', 'includes', 'indexOf', 'split', 'join', 'map', 'filter',
  'forEach', 'find', 'some', 'every', 'reduce', 'slice', 'splice', 'push', 'pop', 'shift', 'unshift', 'sort',
  'reverse', 'concat', 'fill', 'add', 'delete', 'has', 'get', 'set', 'removeItem', 'setItem', 'clear',
  'parse', 'stringify', 'toFixed', 'toString', 'padStart', 'replace', 'trim', 'toLowerCase', 'toUpperCase',
  'match', 'test', 'then', 'catch', 'writeText', 'getContext', 'classList', 'toggle', 'dispatchEvent',
  'preventDefault', 'stopPropagation', 'addEventListener', 'removeEventListener', 'focus', 'blur', 'click'
]);

const handlers = [...html.matchAll(/on(?:click|change|input|submit|keydown)="([^"]+)"/g)].map((m) => m[1]);
const broken = [];
for (const src of handlers) {
  for (const m of src.matchAll(/([A-Za-z_$][\w$]*)\s*\(/g)) {
    const name = m[1];
    if (ALLOWED.has(name) || declared.has(name)) continue;
    // A method call like `foo.bar(` is fine if `bar` is not a standalone global; skip member access.
    const before = src.slice(Math.max(0, m.index - 1), m.index);
    if (before === '.') continue;
    broken.push({ name, handler: src.slice(0, 90) });
  }
}

console.log(`audit: ${handlers.length} inline handlers, ${declared.size} bundle globals`);
if (broken.length) {
  const uniq = [...new Map(broken.map((b) => [b.name, b])).values()];
  console.error(`audit FAIL: ${uniq.length} inline handler(s) call undefined globals:`);
  uniq.forEach((b) => console.error(`  - ${b.name}()   in: ${b.handler}`));
  process.exit(1);
}
console.log('audit OK: every inline handler resolves to a defined global');
