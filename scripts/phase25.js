// Phase 25: cleanup — remove literal "\r\n" text left in CSS by an old fix
// script, and collapse the 60+ blank-line run produced by the build splice.
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(FILE, "utf8");
let changed = false;

// 1) Literal backslash-r-backslash-n sequence inside a CSS block (dead token)
const before1 = html;
html = html.replace(/}\s*\\r\\n/g, "}");
if (html !== before1) changed = true;

// 2) Collapse any run of 3+ blank lines to a single blank line
const before2 = html;
html = html.replace(/(\r?\n[ \t]*){3,}/g, "\n\n");
if (html !== before2) changed = true;

if (changed) {
  fs.writeFileSync(FILE, html);
  console.log("phase25: cleaned index.html");
} else {
  console.log("phase25: already clean");
}
