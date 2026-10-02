// CodeVis Phase 17 — content expansion verification.
// The 4 new concepts/complexity/quizzes/snippets were merged directly into the data files
// (appenders retired to avoid double-append corruption on rebuild).
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const cText = fs.readFileSync(path.join(ROOT, 'data/concepts.js'), 'utf8');
for (const id of ['bellman_ford', 'kruskal', 'segment_tree', 'huffman']) {
  if (!cText.includes('"' + id + '"')) throw new Error('phase17 concepts missing: ' + id);
}
if (!fs.readFileSync(path.join(ROOT, 'data/complexity.js'), 'utf8').includes('"huffman"'))
  throw new Error('phase17 complexity missing');
if (!fs.readFileSync(path.join(ROOT, 'data/quizzes.js'), 'utf8').includes('"huffman"'))
  throw new Error('phase17 quizzes missing');
if (!fs.readFileSync(path.join(ROOT, 'src/snippets.js'), 'utf8').includes('"huffman"'))
  throw new Error('phase17 snippets missing');

console.log('--- Phase 17 OK: content verified ---');
