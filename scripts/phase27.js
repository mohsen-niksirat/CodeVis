// CodeVis Phase 27 — defect fixes found in the debug audit.
//
// 1) phase21's JS guard (`!html.includes('changeFontSize')`) was already true when
//    it ran, because the HTML it had just inserted contains `onclick="changeFontSize(1)"`.
//    Result: the buttons/markup shipped but `changeFontSize`, `toggleCodeCollapse`,
//    `toggleTimer`, `updateTimerDisplay`, `toggleFav` and `favorites` were never
//    defined — clicking any of them throws a ReferenceError. Same for `favorites`,
//    which `filterAndLoad` dereferences unconditionally.
// 2) drop the dead `cvPolishFix2` / `cvPolishFix3` CSS duplicated by cvPolishFix4.
// Idempotent: each patch is skipped once applied.
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(FILE, 'utf8');
let n = 0;
const log = (m) => { n++; console.log('[phase27-' + n + '] ' + m); };

// ---------- 1. code font size + collapse ----------
if (!html.includes('function changeFontSize')) {
  const block = [
    'let currentFontSize = 0.8;',
    'function changeFontSize(delta) {',
    '  currentFontSize = Math.max(0.5, Math.min(1.5, currentFontSize + delta * 0.1));',
    '  const cb = document.getElementById("codeBlock");',
    '  if (cb) cb.style.fontSize = currentFontSize.toFixed(1) + "rem";',
    '}',
    'function toggleCodeCollapse() {',
    '  const cb = document.getElementById("codeBlock");',
    '  const tb = document.getElementById("codeToggleBtn");',
    '  if (!cb || !tb) return;',
    '  const hidden = cb.style.display === "none";',
    '  cb.style.display = hidden ? "block" : "none";',
    '  tb.textContent = hidden ? "Hide" : "Show";',
    '}'
  ].join('\r\n');
  html = html.replace('// Dynamic Variable Inspector (Step Debugger HUD)', block + '\r\n\r\n// Dynamic Variable Inspector (Step Debugger HUD)');
  log('changeFontSize + toggleCodeCollapse defined');
}

// ---------- 2. favorites ----------
if (!html.includes('function toggleFav')) {
  const block = [
    'let favorites = new Set(JSON.parse(localStorage.getItem("cv_favorites") || "[]"));',
    'function toggleFav(id, e) {',
    '  if (e) e.stopPropagation();',
    '  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);',
    '  localStorage.setItem("cv_favorites", JSON.stringify([...favorites]));',
    '  filterAndLoad();',
    '  renderGallery();',
    '}',
    'function isFavorite(id) { return favorites.has(id); }'
  ].join('\r\n');
  html = html.replace('// Dynamic Variable Inspector (Step Debugger HUD)', block + '\r\n\r\n// Dynamic Variable Inspector (Step Debugger HUD)');
  log('favorites + toggleFav defined');
}

// ---------- 3. pomodoro timer ----------
if (!html.includes('function toggleTimer')) {
  const block = [
    'let timerInt = null;',
    'let timeLeft = 25 * 60;',
    'let isWorking = true;',
    'function toggleTimer() {',
    '  if (timerInt) {',
    '    clearInterval(timerInt);',
    '    timerInt = null;',
    '  } else {',
    '    if (timeLeft <= 0) timeLeft = isWorking ? 25 * 60 : 5 * 60;',
    '    timerInt = setInterval(() => {',
    '      timeLeft--;',
    '      if (timeLeft <= 0) {',
    '        clearInterval(timerInt);',
    '        timerInt = null;',
    '        isWorking = !isWorking;',
    '        timeLeft = isWorking ? 25 * 60 : 5 * 60;',
    '        if (typeof cvToast === "function") cvToast(isWorking ? "Break over, back to work!" : "Time for a break!");',
    '        if (typeof playSonification === "function" && soundEnabled) playSonification(800, 0.1, 1000);',
    '      }',
    '      updateTimerDisplay();',
    '    }, 1000);',
    '  }',
    '  updateTimerDisplay();',
    '}',
    'function updateTimerDisplay() {',
    '  const d = document.getElementById("timerDisplay");',
    '  if (!d) return;',
    '  const m = Math.floor(Math.max(0, timeLeft) / 60).toString().padStart(2, "0");',
    '  const s = (Math.max(0, timeLeft) % 60).toString().padStart(2, "0");',
    '  d.textContent = (isWorking ? "\\u{1F345} " : "\\u{2615} ") + m + ":" + s;',
    '  d.style.color = timerInt ? "var(--accent)" : "";',
    '}',
    'updateTimerDisplay();'
  ].join('\r\n');
  html = html.replace('// Dynamic Variable Inspector (Step Debugger HUD)', block + '\r\n\r\n// Dynamic Variable Inspector (Step Debugger HUD)');
  log('pomodoro toggleTimer + updateTimerDisplay defined');
}

// ---------- 4. wire the favourites filter + render fav stars ----------
if (!html.includes('favFilter").onchange')) {
  html = html.replace(
    'document.getElementById("categoryFilter").onchange=filterAndLoad;',
    'document.getElementById("favFilter").onchange=filterAndLoad;\r\ndocument.getElementById("categoryFilter").onchange=filterAndLoad;'
  );
  log('favFilter wired to filterAndLoad');
}

// ---------- 5. drop dead duplicate polish CSS (cvPolishFix2 + cvPolishFix3) ----------
const deadStart = html.indexOf('/* cvPolishFix2 */');
const deadEndMarker = '/* cvPolishFix4 */';
const deadEnd = html.indexOf(deadEndMarker);
if (deadStart !== -1 && deadEnd !== -1 && deadStart < deadEnd) {
  // Keep everything from the `}` that precedes cvPolishFix4 onward.
  const keepFrom = html.lastIndexOf('}', deadEnd) + 1;
  html = html.slice(0, deadStart) + html.slice(keepFrom);
  log('removed dead cvPolishFix2/cvPolishFix3 CSS');
}

fs.writeFileSync(FILE, html, 'utf8');

// Verify the bundle still parses.
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
new Function(blocks.sort((a, b) => b.length - a.length)[0]);
console.log('--- Phase 27 OK: ' + n + ' patch(es) ---');
