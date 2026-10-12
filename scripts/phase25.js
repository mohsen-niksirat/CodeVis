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

// 2) Collapse any run of 3+ blank lines to a single blank line (preserving CRLF)
const eol = html.includes("\r\n") ? "\r\n" : "\n";
const before2 = html;
html = html.replace(/((?:\r?\n)[ \t]*){3,}/g, eol + eol);
if (html !== before2) changed = true;

// 3) Deduplicate any repeated updateXp / renderGallery hook calls left from phase6 bug
const before3 = html;
html = html.replace(/(?:if\(typeof updateXp==="function"\)updateXp\(\);\s*\r?\n\s*if\(typeof renderGallery==="function"\)renderGallery\(\);\s*\r?\n\s*)+/g,
  'if(typeof updateXp==="function")updateXp();' + eol + 'if(typeof renderGallery==="function")renderGallery();' + eol);
if (html !== before3) changed = true;

if (changed) {
  fs.writeFileSync(FILE, html);
  console.log("phase25: cleaned index.html");
} else {
  console.log("phase25: already clean");
}
