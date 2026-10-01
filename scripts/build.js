const fs = require('fs');
const path = require('path');

console.log('--- Building CodeVis Single-File Distribution (v2.1) ---');

const concepts = require('../data/concepts.js');
const quizzes = require('../data/quizzes.js');
const badges = require('../data/badges.js');
const complexityData = require('../data/complexity.js');
const extraCode = require('../src/snippets.js');

const htmlPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update concepts array in index.html
const cIdx = html.indexOf('const concepts=');
if (cIdx === -1) throw new Error('Could not find "const concepts=" in index.html');
const arrayStart = html.indexOf('[', cIdx);
const endMarker = html.indexOf('let currentConcept=', cIdx);
if (endMarker === -1) throw new Error('Could not find "let currentConcept=" in index.html');
const arrayEnd = html.lastIndexOf('];', endMarker) + 1;

html = html.substring(0, arrayStart) + JSON.stringify(concepts) + html.substring(arrayEnd);
console.log(`[1/10] Updated concepts array with ${concepts.length} concepts.`);

// 2. Add / Update CSS styles
const stylesToInject = `
.quiz-btn{background:var(--surface);border:1px solid var(--border);color:var(--accent2);padding:6px 14px;border-radius:20px;font-size:.85rem;cursor:pointer;font-weight:600;transition:opacity .2s}
.quiz-btn:hover{opacity:.75}
.complexity-pill{cursor:pointer;transition:transform .15s,opacity .15s}
.complexity-pill:hover{transform:scale(1.05);opacity:.85}
.var-pill{display:inline-flex;align-items:center;gap:4px;background:var(--surface2,#161b22);border:1px solid var(--border);border-radius:6px;padding:3px 8px;font-size:.75rem;font-family:monospace}
#variableInspector{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;margin-bottom:12px;min-height:36px}
.badges-shelf{width:100%;max-width:900px;padding:0 20px 24px}
.badges-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(115px,1fr));gap:10px}
.badge-item{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 8px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;transition:all .2s;cursor:default}
.badge-item.unlocked{border-color:var(--accent);box-shadow:0 0 10px rgba(139,92,246,0.25)}
.badge-item.locked{opacity:0.35;filter:grayscale(1)}
.badge-icon{font-size:1.5rem}
.badge-name{font-size:.75rem;font-weight:600;color:var(--text)}
.modal-backdrop{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);display:none;justify-content:center;align-items:center;z-index:9999;padding:20px}
.modal-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;max-width:540px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.5)}
body.embed-mode header,
body.embed-mode .calendar-container,
body.embed-mode .badges-shelf,
body.embed-mode #studyListCard,
body.embed-mode .stats-card,
body.embed-mode footer{display:none!important}
body.embed-mode{padding:0!important;background:transparent!important}
body.embed-mode .container{max-width:100%!important;padding:4px!important}
`;

if (!html.includes('.complexity-pill')) {
  html = html.replace('</style>', stylesToInject.replace(/\n/g, '\r\n') + '</style>');
  console.log('[2/10] Stylesheet injected (Big-O, Battle, Variable Inspector, Embed mode).');
}

// 3. Inject HTML UI elements
// Header buttons
if (!html.includes('id="bigOBtn"')) {
  const newBtns = '<button class="quiz-btn" id="bigOBtn" aria-label="Big-O Complexity Cheat Sheet">📊 Big-O</button>\r\n    <button class="quiz-btn" id="battleBtn" aria-label="Algorithm Race Arena">⚔️ Race</button>\r\n    <button class="quiz-btn" id="quizBtn" aria-label="Take concept quiz">💡 Quiz</button>';
  html = html.replace('<button class="quiz-btn" id="quizBtn" aria-label="Take concept quiz">💡 Quiz</button>', newBtns);
  console.log('[3a/10] Big-O and Race Arena buttons added to header.');
}

// Complexity badges container next to level
if (!html.includes('id="conceptComplexity"')) {
  html = html.replace(
    '<span class="level" id="conceptLevel"></span>',
    '<span class="level" id="conceptLevel"></span>\r\n<span id="conceptComplexity" style="margin-inline-start:8px;cursor:pointer;display:inline-flex;gap:6px;vertical-align:middle"></span>'
  );
  console.log('[3b/10] Concept complexity badge container added.');
}

// Variable Inspector container above animCanvas
if (!html.includes('id="variableInspector"')) {
  html = html.replace(
    '<canvas id="animCanvas"',
    '<div id="variableInspector" style="display:none"></div>\r\n<canvas id="animCanvas"'
  );
  console.log('[3c/10] Variable Inspector HUD container added.');
}

// Big-O Modal and Battle Arena Modal
if (!html.includes('id="bigOModal"')) {
  const bigOModalHtml = `
<div class="modal-backdrop" id="bigOModal" style="display:none">
  <div class="modal-card" style="max-width:640px;width:95%">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h3 style="font-size:1.1rem;color:var(--accent2);margin:0">📊 <span id="bigOModalTitle">Big-O Complexity Guide</span></h3>
      <button class="secondary" onclick="closeBigOModal()" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>
    </div>
    <div id="bigOConceptInfo"></div>
    <canvas id="bigOCanvas" width="600" height="260" style="width:100%;height:auto;border-radius:8px;border:1px solid var(--border);display:block"></canvas>
    <div style="margin-top:14px;display:flex;justify-content:flex-end">
      <button class="secondary" onclick="closeBigOModal()">Close</button>
    </div>
  </div>
</div>
`;
  html = html.replace('<canvas id="shareCanvas"', bigOModalHtml.replace(/\n/g, '\r\n') + '<canvas id="shareCanvas"');
  console.log('[3d/10] Big-O Cheat Sheet modal added.');
}

if (!html.includes('id="battleModal"')) {
  const battleModalHtml = `
<div class="modal-backdrop" id="battleModal" style="display:none">
  <div class="modal-card" style="max-width:750px;width:95%">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h3 style="font-size:1.1rem;color:var(--accent2);margin:0">⚔️ <span id="battleModalTitle">Algorithm Showdown Arena</span></h3>
      <button class="secondary" onclick="closeBattleModal()" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
      <button class="secondary" id="matchupSortBtn" onclick="setupBattleMatchup('sort')" style="padding:6px 14px;border-radius:8px;cursor:pointer">🔀 QuickSort vs BubbleSort</button>
      <button class="secondary" id="matchupSearchBtn" onclick="setupBattleMatchup('search')" style="padding:6px 14px;border-radius:8px;cursor:pointer">🔍 Binary vs Linear Search</button>
    </div>
    <div id="battleResultBanner" style="display:none;margin-bottom:12px"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div style="background:var(--surface2,#161b22);border:1px solid var(--border);border-radius:10px;padding:10px">
        <div id="battleTitleA" style="font-weight:700;margin-bottom:6px">Algorithm A</div>
        <canvas id="battleCanvasA" width="340" height="150" style="width:100%;height:auto;background:#0d1117;border-radius:6px;display:block"></canvas>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:.8rem;color:#8b949e">
          <span>Steps: <strong id="battleStepsA" style="color:var(--text)">0</strong></span>
          <span>Cmps: <strong id="battleCmpA" style="color:var(--text)">0</strong></span>
        </div>
      </div>
      <div style="background:var(--surface2,#161b22);border:1px solid var(--border);border-radius:10px;padding:10px">
        <div id="battleTitleB" style="font-weight:700;margin-bottom:6px">Algorithm B</div>
        <canvas id="battleCanvasB" width="340" height="150" style="width:100%;height:auto;background:#0d1117;border-radius:6px;display:block"></canvas>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:.8rem;color:#8b949e">
          <span>Steps: <strong id="battleStepsB" style="color:var(--text)">0</strong></span>
          <span>Cmps: <strong id="battleCmpB" style="color:var(--text)">0</strong></span>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <button class="primary" id="battleStartBtn" onclick="startBattle()" style="padding:8px 20px;border-radius:8px;font-weight:600;cursor:pointer">▶️ Start Race</button>
      <button class="secondary" onclick="closeBattleModal()">Close</button>
    </div>
  </div>
</div>
`;
  html = html.replace('<canvas id="shareCanvas"', battleModalHtml.replace(/\n/g, '\r\n') + '<canvas id="shareCanvas"');
  console.log('[3e/10] Algorithm Battle Arena modal added.');
}

// 4. Update i18n vocabulary
if (!html.includes('bigO:')) {
  html = html.replace(
    'conceptQuiz:"Concept Quiz",',
    'bigO:"Big-O",battle:"Race",battleTitle:"Algorithm Showdown Arena",bigOTitle:"Big-O Complexity Guide",variables:"Variables",conceptQuiz:"Concept Quiz",'
  );
  html = html.replace(
    'conceptQuiz:"آزمون درک مطلب",',
    'bigO:"راهنمای Big-O",battle:"مسابقه",battleTitle:"میدان رقابت الگوریتم‌ها",bigOTitle:"راهنمای پیچیدگی زمانی و حافظه",variables:"متغیرها",conceptQuiz:"آزمون درک مطلب",'
  );
  console.log('[4/10] i18n terms expanded with Big-O & Battle translations.');
}

// 5. Inject Quizzes, Badges, Complexity, and Logic before function applyLang()
const dataStartIdx = html.indexOf('const quizzes =');
const applyLangIdx = html.indexOf('function applyLang(){');
if (dataStartIdx === -1 || applyLangIdx === -1) {
  throw new Error('Data block insertion position not found in index.html');
}

const bigOSrc = fs.readFileSync(path.resolve(__dirname, '../src/bigO.js'), 'utf8')
  .replace(/if\s*\(typeof module[^}]+}\s*}/g, '');
const battleSrc = fs.readFileSync(path.resolve(__dirname, '../src/battle.js'), 'utf8')
  .replace(/if\s*\(typeof module[^}]+}\s*}/g, '');
const varsSrc = fs.readFileSync(path.resolve(__dirname, '../src/vars.js'), 'utf8')
  .replace(/if\s*\(typeof module[^}]+}\s*}/g, '');
const badgesSrc = fs.readFileSync(path.resolve(__dirname, '../src/badges.js'), 'utf8')
  .replace(/if\s*\(typeof module[^}]+}\s*}/g, '');
const quizSrc = fs.readFileSync(path.resolve(__dirname, '../src/quiz.js'), 'utf8')
  .replace(/if\s*\(typeof module[^}]+}\s*}/g, '');

const fullDataBlock = `
const quizzes = ${JSON.stringify(quizzes)};
const badges = ${JSON.stringify(badges)};
const complexityData = ${JSON.stringify(complexityData)};

${badgesSrc}
${quizSrc}
${varsSrc}
${bigOSrc}
${battleSrc}

function renderComplexityBadge(c) {
  const el = document.getElementById("conceptComplexity");
  if (!el || !c) return;
  const comp = typeof complexityData !== 'undefined' ? complexityData[c.id] : null;
  if (!comp) { el.innerHTML = ""; return; }
  const isFa = lang === "fa";
  el.innerHTML = \`
    <span class="complexity-pill time" title="\${isFa ? 'پیچیدگی زمانی (کلیک برای نمودار Big-O)' : 'Time Complexity (Click for Big-O chart)'}" onclick="openBigOModal()" style="background:rgba(63,185,80,0.15);border:1px solid #3fb950;color:#3fb950;padding:2px 8px;border-radius:12px;font-size:.75rem;font-weight:600;display:inline-flex;align-items:center;gap:3px">
      ⏱️ \${comp.time}
    </span>
    <span class="complexity-pill space" title="\${isFa ? 'پیچیدگی حافظه (کلیک برای نمودار Big-O)' : 'Space Complexity (Click for Big-O chart)'}" onclick="openBigOModal()" style="background:rgba(139,92,246,0.15);border:1px solid #8b5cf6;color:#a78bfa;padding:2px 8px;border-radius:12px;font-size:.75rem;font-weight:600;display:inline-flex;align-items:center;gap:3px">
      💾 \${comp.space}
    </span>
  \`;
}
`;

html = html.substring(0, dataStartIdx) + fullDataBlock.replace(/\n/g, '\r\n') + '\r\n' + html.substring(applyLangIdx);
console.log('[5/10] Quizzes, Badges, Complexity, Big-O, Battle, and Vars logic safely injected.');

// 6. Update Audio with playSonification
const audioSrc = fs.readFileSync(path.resolve(__dirname, '../src/audio.js'), 'utf8')
  .replace(/if\s*\(typeof module[^}]+}\s*}/g, '');
const toneStart = html.indexOf('let soundEnabled = localStorage.getItem("cv_sound")');
const toneEnd = html.indexOf('const sBtn = document.getElementById("soundBtn");');
if (toneStart !== -1 && toneEnd !== -1) {
  html = html.substring(0, toneStart) + audioSrc.replace(/\n/g, '\r\n') + '\r\n' + html.substring(toneEnd);
  console.log('[6/10] Web Audio synthesizer updated with harmonic sonification.');
}

// 7. Update extraCode snippets
const ecIdx = html.indexOf('const extraCode = {');
if (ecIdx !== -1) {
  const funcIdx = html.indexOf('function getCodeForLang', ecIdx);
  const newEc = `const extraCode = ${JSON.stringify(extraCode, null, 2)};\r\n\r\n`;
  html = html.substring(0, ecIdx) + newEc + html.substring(funcIdx);
  console.log('[7/10] Multi-language code snippets updated.');
}

// 8. Hook loadConcept and drawStep with Variable Inspector & Sonification
if (!html.includes('renderComplexityBadge(c);')) {
  html = html.replace(
    'document.getElementById("conceptLevel").textContent=t(c.level);',
    'document.getElementById("conceptLevel").textContent=t(c.level);\r\nrenderComplexityBadge(c);\r\nrenderVariableInspector();'
  );
}

if (!html.includes('renderVariableInspector();if(typeof playSonification')) {
  html = html.replace(
    'ctx.clearRect(0,0,800,600);',
    'ctx.clearRect(0,0,800,600);\r\nrenderVariableInspector();\r\nif(typeof playSonification==="function"&&soundEnabled&&typeof currentStep!=="undefined")playSonification((currentStep+1)*18,0,100);'
  );
  console.log('[8/10] Variable Inspector & sonification hooked into animation steps.');
}

// 9. Update applyLang to update buttons and badges
if (!html.includes('const bo = document.getElementById("bigOBtn");')) {
  html = html.replace(
    'const qb = document.getElementById("quizBtn"); if(qb) qb.textContent="💡 " + (t("conceptQuiz") || "Quiz");',
    `const qb = document.getElementById("quizBtn"); if(qb) qb.textContent="💡 " + (t("conceptQuiz") || "Quiz");
const bo = document.getElementById("bigOBtn"); if(bo) bo.textContent="📊 " + (t("bigO") || "Big-O");
const bt = document.getElementById("battleBtn"); if(bt) bt.textContent="⚔️ " + (t("battle") || "Race");
if(document.getElementById("bigOModalTitle")) document.getElementById("bigOModalTitle").textContent = t("bigOTitle") || "Big-O Complexity Guide";
if(document.getElementById("battleModalTitle")) document.getElementById("battleModalTitle").textContent = t("battleTitle") || "Algorithm Showdown Arena";
renderComplexityBadge(currentConcept);
renderVariableInspector();`.replace(/\n/g, '\r\n')
  );
}

// 10. Hook initialization listeners and embed mode check
if (!html.includes('document.getElementById("bigOBtn").onclick = openBigOModal')) {
  html = html.replace(
    'if(document.getElementById("quizBtn")) document.getElementById("quizBtn").onclick = openConceptQuiz;',
    `if(document.getElementById("quizBtn")) document.getElementById("quizBtn").onclick = openConceptQuiz;
if(document.getElementById("bigOBtn")) document.getElementById("bigOBtn").onclick = openBigOModal;
if(document.getElementById("battleBtn")) document.getElementById("battleBtn").onclick = openBattleModal;
if(((window.location.search||"").includes("embed=true")) || ((window.location.hash||"").includes("embed=true"))) document.body.classList.add("embed-mode");`.replace(/\n/g, '\r\n')
  );
  console.log('[10/10] Event listeners and embed mode detection hooked.');
}

// Write back built index.html
fs.writeFileSync(htmlPath, html, 'utf8');

// Verify compilation & syntax
const scriptOpen = html.indexOf('<script>');
const scriptClose = html.indexOf('</script>', scriptOpen);
if (scriptOpen === -1 || scriptClose === -1) {
  throw new Error('Verification failed: <script> block missing');
}
const jsContent = html.substring(scriptOpen + 8, scriptClose);
new Function(jsContent);
console.log('\n--- SUCCESS: index.html compiled and verified with zero syntax errors! ---');
