const fs = require('fs');
const path = require('path');

console.log('--- Building CodeVis Single-File Distribution ---');

const concepts = require('../data/concepts.js');
const quizzes = require('../data/quizzes.js');
const badges = require('../data/badges.js');
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
console.log(`[1/9] Updated concepts array with ${concepts.length} concepts.`);

// 2. Add Badges CSS and Quiz CSS if not present
if (!html.includes('.badges-shelf')) {
  const css = `
.quiz-btn{background:var(--surface);border:1px solid var(--border);color:var(--accent2);padding:6px 14px;border-radius:20px;font-size:.85rem;cursor:pointer;font-weight:600;transition:opacity .2s}
.quiz-btn:hover{opacity:.75}
.badges-shelf{width:100%;max-width:900px;padding:0 20px 24px}
.badges-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(115px,1fr));gap:10px}
.badge-item{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 8px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;transition:all .2s;cursor:default}
.badge-item.unlocked{border-color:var(--accent);box-shadow:0 0 10px rgba(139,92,246,0.25)}
.badge-item.locked{opacity:0.35;filter:grayscale(1)}
.badge-icon{font-size:1.5rem}
.badge-name{font-size:.75rem;font-weight:600;color:var(--text)}
.modal-backdrop{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);display:none;justify-content:center;align-items:center;z-index:9999;padding:20px}
.modal-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;max-width:480px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.5)}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  console.log('[2/9] Badges & Quiz stylesheet injected.');
}

// 3. Inject HTML UI elements
if (!html.includes('id="quizBtn"')) {
  html = html.replace(
    '<button class="sound-btn" id="soundBtn"',
    '<button class="quiz-btn" id="quizBtn" aria-label="Take concept quiz">💡 Quiz</button>\r\n    <button class="sound-btn" id="soundBtn"'
  );
  console.log('[3a/9] Quiz button added to header.');
}

if (!html.includes('id="badgesShelf"')) {
  const shelfHtml = `\r\n  <div class="badges-shelf" id="badgesShelf">\r\n    <h3 style="font-size:1rem;color:var(--accent2);margin-bottom:12px">🏆 <span id="badgesTitle">Achievements</span></h3>\r\n    <div class="badges-grid" id="badgesList"></div>\r\n  </div>\r\n`;
  html = html.replace('<div class="card" id="studyListCard"', shelfHtml + '  <div class="card" id="studyListCard"');
  console.log('[3b/9] Badges shelf added above study list card.');
}

if (!html.includes('id="quizModal"')) {
  const modalHtml = `\r\n<div class="modal-backdrop" id="quizModal">\r\n  <div class="modal-card" id="quizCardBody"></div>\r\n</div>\r\n`;
  html = html.replace('<canvas id="shareCanvas"', modalHtml + '<canvas id="shareCanvas"');
  console.log('[3c/9] Quiz modal container added.');
}

// 4. Update i18n terms
if (!html.includes('conceptQuiz:')) {
  html = html.replace(
    'searchTarget:"Search"',
    'searchTarget:"Search",conceptQuiz:"Concept Quiz",achievements:"Achievements",close:"Close",correct:"Correct!",incorrect:"Not quite."'
  );
  html = html.replace(
    'searchTarget:"جستجو"',
    'searchTarget:"جستجو",conceptQuiz:"آزمون درک مطلب",achievements:"نشان‌ها و دستاوردها",close:"بستن",correct:"صحیح!",incorrect:"اشتباه بود."'
  );
  console.log('[4/9] i18n vocabulary expanded.');
}

// 5. Inject Quizzes, Badges, and State right before function applyLang()
if (!html.includes('function openConceptQuiz')) {
  const quizAndBadgeLogic = `
const quizzes = ${JSON.stringify(quizzes)};
const badges = ${JSON.stringify(badges)};

let unlockedBadges = new Set(JSON.parse((typeof localStorage !== 'undefined' ? localStorage.getItem("cv_unlocked_badges") : null) || "[]"));
let quizScore = parseInt((typeof localStorage !== 'undefined' ? localStorage.getItem("cv_quiz_score") : null) || "0");

function checkBadges(stats) {
  if (typeof badges === 'undefined') return;
  let newlyUnlocked = false;
  badges.forEach(b => {
    if (unlockedBadges.has(b.id)) return;
    let unlocked = false;
    if (b.id === "first_step" && stats.seenCount >= 1) unlocked = true;
    else if (b.id === "explorer" && stats.seenCount >= 5) unlocked = true;
    else if (b.id === "scholar" && stats.seenCount >= 15) unlocked = true;
    else if (b.id === "week_streak" && stats.streak >= 7) unlocked = true;
    else if (b.id === "ai_pioneer" && stats.seenIds && stats.seenIds.has("vector_embeddings") && stats.seenIds.has("perceptron")) unlocked = true;
    else if (b.id === "web_guru" && stats.seenIds && stats.seenIds.has("websocket") && stats.seenIds.has("token_bucket")) unlocked = true;
    else if (b.id === "quiz_whiz" && stats.quizScore >= 3) unlocked = true;
    if (unlocked) {
      unlockedBadges.add(b.id);
      newlyUnlocked = true;
    }
  });
  if (newlyUnlocked) {
    if (typeof localStorage !== 'undefined') localStorage.setItem("cv_unlocked_badges", JSON.stringify([...unlockedBadges]));
    if (typeof playChord === 'function') playChord([587.33, 739.99, 880]);
    renderBadges();
  }
}

function renderBadges() {
  const container = document.getElementById("badgesList");
  if (!container || typeof badges === 'undefined') return;
  const titleEl = document.getElementById("badgesTitle");
  if (titleEl) titleEl.textContent = t("achievements") || "Achievements";
  let html = "";
  badges.forEach(b => {
    const isUnlocked = unlockedBadges.has(b.id);
    const title = (b.title[lang] || b.title.en);
    const desc = (b.desc[lang] || b.desc.en);
    html += \`<div class="badge-item \${isUnlocked ? 'unlocked' : 'locked'}" title="\${title}: \${desc}">
      <span class="badge-icon">\${b.icon}</span>
      <span class="badge-name">\${title}</span>
    </div>\`;
  });
  container.innerHTML = html;
}

function openConceptQuiz() {
  if (typeof quizzes === 'undefined' || !currentConcept) return;
  const qData = quizzes[currentConcept.id] || {
    q: { en: \`What is the primary purpose of \${currentConcept.title.en}?\`, fa: \`هدف اصلی مفهوم \${currentConcept.title[lang] || currentConcept.title.en} چیست؟\` },
    opts: {
      en: [currentConcept.desc.en, "A low-level hardware interrupt handler", "A legacy protocol discontinued in modern runtimes"],
      fa: [currentConcept.desc[lang] || currentConcept.desc.en, "یک مدیریت‌کننده وقفه سخت‌افزاری", "یک پروتکل قدیمی که دیگر استفاده نمی‌شود"]
    },
    ans: 0,
    exp: { en: "That is the foundational definition of this concept.", fa: "این تعریف اصلی و پایه‌ای این مفهوم است." }
  };
  renderQuizUI(qData);
  const modal = document.getElementById("quizModal");
  if (modal) modal.style.display = "flex";
}

function renderQuizUI(qData) {
  const container = document.getElementById("quizCardBody");
  if (!container) return;
  const questionText = qData.q[lang] || qData.q.en;
  const options = qData.opts[lang] || qData.opts.en;
  const explanation = qData.exp[lang] || qData.exp.en;
  let html = \`
    <h3 style="font-size:1.1rem;margin-bottom:12px;color:var(--accent2)">💡 \${t("conceptQuiz") || "Concept Quiz"}</h3>
    <p style="font-size:.95rem;margin-bottom:16px;line-height:1.5">\${questionText}</p>
    <div style="display:flex;flex-direction:column;gap:8px" id="quizOptions">
  \`;
  options.forEach((opt, idx) => {
    html += \`<button class="secondary quiz-option-btn" data-idx="\${idx}" style="text-align:start;padding:10px 14px;border-radius:8px">
      \${idx + 1}. \${opt}
    </button>\`;
  });
  html += \`</div>
    <div id="quizFeedback" style="margin-top:14px;display:none;padding:10px;border-radius:8px;font-size:.9rem"></div>
    <div style="margin-top:16px;display:flex;justify-content:flex-end">
      <button class="secondary" onclick="document.getElementById('quizModal').style.display='none'">\${t("close") || "Close"}</button>
    </div>\`;
  container.innerHTML = html;

  const optBtns = container.querySelectorAll(".quiz-option-btn");
  optBtns.forEach(btn => {
    btn.onclick = () => {
      const selected = parseInt(btn.dataset.idx);
      const isCorrect = selected === qData.ans;
      const feedback = document.getElementById("quizFeedback");
      optBtns.forEach(b => b.disabled = true);
      if (isCorrect) {
        btn.style.borderColor = "var(--green)";
        btn.style.background = "rgba(63, 185, 80, 0.15)";
        feedback.style.display = "block";
        feedback.style.background = "rgba(63, 185, 80, 0.15)";
        feedback.style.color = "var(--green)";
        feedback.innerHTML = "<strong>✓ " + (t("correct") || "Correct!") + "</strong> " + explanation;
        quizScore++;
        if (typeof localStorage !== 'undefined') localStorage.setItem("cv_quiz_score", quizScore.toString());
        playTone(600, 0.08);
        setTimeout(() => playTone(800, 0.12), 80);
        checkBadges({ seenCount: seenIds ? seenIds.size : 0, streak: getStreak(), seenIds, quizScore });
      } else {
        btn.style.borderColor = "var(--red)";
        btn.style.background = "rgba(248, 81, 73, 0.15)";
        optBtns[qData.ans].style.borderColor = "var(--green)";
        feedback.style.display = "block";
        feedback.style.background = "rgba(248, 81, 73, 0.15)";
        feedback.style.color = "var(--red)";
        feedback.innerHTML = "<strong>✗ " + (t("incorrect") || "Not quite.") + "</strong> " + explanation;
        playTone(220, 0.15, "sawtooth");
      }
    };
  });
}
`;
  const alIdx = html.indexOf('function applyLang(){');
  if (alIdx === -1) throw new Error('Could not find function applyLang in index.html');
  html = html.substring(0, alIdx) + quizAndBadgeLogic.replace(/\n/g, '\r\n') + '\r\n' + html.substring(alIdx);
  console.log('[5/9] Quizzes, Badges, and active learning controllers safely injected before applyLang.');
}

// 6. Inject playChord into audio module
if (!html.includes('function playChord')) {
  const pcCode = `
function playChord(notes = [523.25, 659.25, 783.99]) {
  notes.forEach((freq, idx) => {
    setTimeout(() => playTone(freq, 0.15, "triangle"), idx * 100);
  });
}
`;
  const sBtnIdx = html.indexOf('const sBtn = document.getElementById("soundBtn");');
  html = html.substring(0, sBtnIdx) + pcCode.replace(/\n/g, '\r\n') + '\r\n' + html.substring(sBtnIdx);
  console.log('[6/9] Synthesizer playChord chord celebration function injected.');
}

// 7. Update extraCode snippets
const ecIdx = html.indexOf('const extraCode = {');
if (ecIdx !== -1) {
  const funcIdx = html.indexOf('function getCodeForLang', ecIdx);
  const newEc = `const extraCode = ${JSON.stringify(extraCode, null, 2)};\r\n\r\n`;
  html = html.substring(0, ecIdx) + newEc + html.substring(funcIdx);
  console.log('[7/9] Multi-language code snippets updated.');
}

// 8. Inject renderers for vector_embeddings, perceptron, and token_bucket
if (!html.includes('id==="vector_embeddings"')) {
  const newRenderers = `}else if(id==="vector_embeddings"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);
ctx.strokeStyle="#30363d";ctx.lineWidth=2;
ctx.beginPath();ctx.moveTo(200,380);ctx.lineTo(650,380);ctx.stroke();
ctx.beginPath();ctx.moveTo(200,380);ctx.lineTo(200,120);ctx.stroke();
ctx.fillStyle="#8b949e";ctx.font="12px sans-serif";ctx.fillText("Dimension 1 (Context)",600,400);ctx.fillText("Dimension 2 (Syntax)",170,110);

var words=[{t:"king",x:500,y:200,c:"#8b5cf6"},{t:"queen",x:480,y:180,c:"#a78bfa"},{t:"apple",x:260,y:150,c:"#3fb950"}];
if(currentStep>=1){
  words.forEach(function(w){
    ctx.strokeStyle=w.c;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(200,380);ctx.lineTo(w.x,w.y);ctx.stroke();
    ctx.fillStyle=w.c;ctx.beginPath();ctx.arc(w.x,w.y,6,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="bold 13px monospace";ctx.fillText(w.t,w.x+15,w.y);
  });
}
if(currentStep>=2){
  ctx.strokeStyle="#f85149";ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(200,380);ctx.lineTo(490,190);ctx.stroke();
  ctx.fillStyle="#f85149";ctx.beginPath();ctx.arc(490,190,7,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#f85149";ctx.font="bold 14px monospace";ctx.fillText("query: 'monarch'",520,230);
}
if(currentStep>=3){
  ctx.strokeStyle="#f85149";ctx.lineWidth=2;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.arc(200,380,80,-0.6,-0.5);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#f85149";ctx.font="12px sans-serif";ctx.fillText("θ ≈ 4° (High Cosine Sim)",310,340);
}
if(currentStep>=4){
  ctx.fillStyle="rgba(139,92,246,0.2)";ctx.beginPath();ctx.arc(490,190,50,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#3fb950";ctx.font="bold 15px sans-serif";ctx.fillText("Top Match: 'king' & 'queen' (cos θ = 0.98)",400,440);
}
ctx.font="16px 'Segoe UI',sans-serif";ctx.fillStyle="#3fb950";
const veTexts = lang==="fa" ? [
  "دستگاه مختصات نمایانگر فضای برداری معنایی است",
  "مدل تعبیه کلمات، واژگان را به بردارهای متراکم تبدیل می‌کند",
  "بردار پرس‌وجوی کاربر وارد فضای برداری می‌شود",
  "محاسبه شباهت کسینوسی: ضرب داخلی بر ضرب نرم‌ها",
  "نزدیک‌ترین همسایه‌ها (بالاترین شباهت کسینوسی) بازیابی شدند!"
] : [
  "Coordinate grid represents semantic vector latent space",
  "Trained embedding model projects vocabulary into dense vectors",
  "User query vector 'monarch' enters vector space",
  "Compute Cosine Similarity: dot product / (normA * normB)",
  "Nearest neighbors (highest cosine angle) retrieved!"
];
ctx.fillText(veTexts[currentStep]||"",400,520);
}else if(id==="perceptron"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);

ctx.fillStyle="#8b5cf6";ctx.beginPath();ctx.arc(180,200,24,0,Math.PI*2);ctx.arc(180,340,24,0,Math.PI*2);ctx.fill();
ctx.fillStyle="#fff";ctx.font="bold 14px monospace";ctx.fillText("x1=1",180,205);ctx.fillText("x2=0.5",180,345);

ctx.strokeStyle="#3fb950";ctx.lineWidth=currentStep>=1?3:1;
ctx.beginPath();ctx.moveTo(204,200);ctx.lineTo(370,270);ctx.stroke();
ctx.strokeStyle="#f85149";
ctx.beginPath();ctx.moveTo(204,340);ctx.lineTo(370,270);ctx.stroke();
if(currentStep>=1){
  ctx.fillStyle="#3fb950";ctx.font="12px monospace";ctx.fillText("w1 = +0.8",280,225);
  ctx.fillStyle="#f85149";ctx.fillText("w2 = -0.4",280,325);
}

ctx.fillStyle="#161b22";ctx.strokeStyle="#8b5cf6";ctx.lineWidth=3;
ctx.beginPath();ctx.arc(400,270,35,0,Math.PI*2);ctx.fill();ctx.stroke();
ctx.fillStyle="#fff";ctx.font="bold 20px serif";ctx.fillText("Σ",400,277);
if(currentStep>=2){
  ctx.fillStyle="#a78bfa";ctx.font="12px monospace";ctx.fillText("bias = +0.2",400,195);
  ctx.strokeStyle="#a78bfa";ctx.beginPath();ctx.moveTo(400,205);ctx.lineTo(400,235);ctx.stroke();
  ctx.fillStyle="#3fb950";ctx.font="bold 13px monospace";ctx.fillText("z = 0.8",400,325);
}

if(currentStep>=3){
  ctx.fillStyle="#161b22";ctx.strokeStyle="#3fb950";ctx.lineWidth=2;
  ctx.strokeRect(480,240,60,60);
  ctx.beginPath();ctx.moveTo(485,290);ctx.lineTo(510,290);ctx.lineTo(510,250);ctx.lineTo(535,250);ctx.stroke();
  ctx.fillStyle="#fff";ctx.font="11px monospace";ctx.fillText("step()",510,315);
}

if(currentStep>=4){
  ctx.strokeStyle="#3fb950";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(540,270);ctx.lineTo(620,270);ctx.stroke();
  ctx.fillStyle="#3fb950";ctx.beginPath();ctx.arc(640,270,26,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#fff";ctx.font="bold 16px monospace";ctx.fillText("y = 1",640,275);
}
ctx.font="16px 'Segoe UI',sans-serif";ctx.fillStyle="#3fb950";
const pTexts = lang==="fa" ? [
  "سیگنال‌های ورودی ویژگی‌ها وارد نورون می‌شوند",
  "وزن‌های سیناپسی سیگنال‌های ورودی را مقیاس‌بندی می‌کنند",
  "گره جمع مقادیر ورودی ضربدر وزن‌ها بعلاوه بایاس را محاسبه می‌کند",
  "تابع فعال‌ساز آستانه‌ای مرز تصمیم‌گیری را اعمال می‌کند",
  "نورون شلیک کرد! خروجی رده‌بندی دوتایی ۱ تعیین شد"
] : [
  "Input feature signals [x1, x2] enter the neuron",
  "Synaptic weights scale input signals by strength & sign",
  "Summation node accumulates (x1*w1) + (x2*w2) + bias",
  "Activation step function applies non-linear decision boundary",
  "Neuron fires! Binary classification decision y = 1"
];
ctx.fillText(pTexts[currentStep]||"",400,480);
}else if(id==="token_bucket"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);

ctx.strokeStyle="#8b5cf6";ctx.lineWidth=3;
ctx.beginPath();ctx.moveTo(330,170);ctx.lineTo(330,370);ctx.lineTo(470,370);ctx.lineTo(470,170);ctx.stroke();
ctx.fillStyle="#161b22";ctx.fillRect(331,170,138,199);
ctx.fillStyle="#8b5cf6";ctx.font="13px sans-serif";ctx.fillText("Bucket (Capacity: 4)",400,155);

ctx.fillStyle="#3fb950";ctx.font="12px sans-serif";ctx.fillText("Refill Rate: +1 token/sec",400,95);
ctx.strokeStyle="#3fb950";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(400,105);ctx.lineTo(400,140);ctx.stroke();

var tokensCount=currentStep===0?2:currentStep===1?4:currentStep===2?3:currentStep===3?2:0;
for(var ti=0;ti<tokensCount;ti++){
  ctx.fillStyle="#3fb950";ctx.beginPath();ctx.arc(400,345-ti*32,13,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#fff";ctx.font="bold 10px monospace";ctx.fillText("🪙",400,349-ti*32);
}

if(currentStep>=2){
  ctx.strokeStyle=currentStep===4?"#f85149":"#3fb950";ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(150,270);ctx.lineTo(320,270);ctx.stroke();
  ctx.fillStyle=currentStep===4?"#f85149":"#3fb950";
  ctx.font="bold 13px monospace";ctx.fillText(currentStep===4?"Burst Req (No token!)":"GET /api/data",230,255);
}

if(currentStep===3){
  ctx.fillStyle="#3fb950";ctx.fillRect(520,245,150,50);
  ctx.fillStyle="#fff";ctx.font="bold 14px monospace";ctx.fillText("HTTP 200 OK",595,275);
}
if(currentStep>=4){
  ctx.fillStyle="#f85149";ctx.fillRect(520,245,160,50);
  ctx.fillStyle="#fff";ctx.font="bold 14px monospace";ctx.fillText("HTTP 429 Too Many",600,275);
}
ctx.font="16px 'Segoe UI',sans-serif";ctx.fillStyle="#3fb950";
const tbTexts = lang==="fa" ? [
  "سطل با ظرفیت مشخص ذخیره توکن‌ها مقداردهی اولیه شد",
  "مولد شارژ با نرخ ثابت توکن‌ها را به سطل اضافه می‌کند",
  "درخواست کلاینت دریافت شده و وجود توکن در سطل بررسی می‌شود",
  "یک توکن مصرف شد: درخواست ارسال شد (کد ۲۰۰ موفق)",
  "سطل خالی است! درخواست اضافی با خطای ۴۲۹ رد شد"
] : [
  "Bucket initialized with token storage capacity",
  "Refill generator continuously drips tokens at a steady rate",
  "Client API request arrives and checks bucket for tokens",
  "Token consumed from bucket: request forwarded (200 OK)",
  "Bucket empty! Excess burst request dropped with HTTP 429"
];
ctx.fillText(tbTexts[currentStep]||"",400,460);
`;

  const wsDrawIdx = html.indexOf('}else if(id==="websocket"){');
  if (wsDrawIdx === -1) throw new Error('Could not find websocket renderer in drawStep');
  html = html.substring(0, wsDrawIdx) + newRenderers.replace(/\n/g, '\r\n') + html.substring(wsDrawIdx);
  console.log('[8/9] Renderers for vector_embeddings, perceptron, and token_bucket injected.');
}

// 9. Hook event handlers and stats integration
if (!html.includes('checkBadges({seenCount:seenIds.size')) {
  html = html.replace(
    'document.getElementById("statConceptsLbl").textContent=t("conceptsSeen");',
    'document.getElementById("statConceptsLbl").textContent=t("conceptsSeen");\r\ncheckBadges({seenCount:seenIds.size,streak:getStreak(),seenIds,quizScore});\r\nrenderBadges();'
  );
}

if (!html.includes('document.getElementById("quizBtn").onclick = openConceptQuiz')) {
  html = html.replace(
    'buildCalendar();\r\n\r\nwindow.addEventListener',
    'buildCalendar();\r\nrenderBadges();\r\nif(document.getElementById("quizBtn")) document.getElementById("quizBtn").onclick = openConceptQuiz;\r\n\r\nwindow.addEventListener'
  );
}

// Update applyLang to refresh Quiz button and Badges shelf
if (!html.includes('renderBadges();\r\nconst qb = document.getElementById("quizBtn");')) {
  html = html.replace(
    'document.getElementById("shareBtn").textContent=t("share");',
    'document.getElementById("shareBtn").textContent=t("share");\r\nrenderBadges();\r\nconst qb = document.getElementById("quizBtn"); if(qb) qb.textContent="💡 " + (t("conceptQuiz") || "Quiz");'
  );
}

// Enhanced Social Share Card
if (!html.includes('streakBadgeText')) {
  const oldShareLogic = 'const codeLines=(currentConcept?currentConcept.code:"").split("\\n");\r\ncodeLines.forEach((l,i)=>sx.fillText(l,790,230+i*20));';
  const enhancedShareLogic = `const codeLines=(currentConcept?currentConcept.code:"").split("\\n");
codeLines.forEach((l,i)=>sx.fillText(l,790,230+i*20));

// Social Share Gamification Pill Badge
const streakBadgeText = "🔥 " + (typeof getStreak==='function'?getStreak():0) + "d streak  |  🏆 " + (typeof unlockedBadges!=='undefined'?unlockedBadges.size:0) + " badges  |  💡 " + (typeof quizScore!=='undefined'?quizScore:0) + " pts";
sx.fillStyle = "rgba(139, 92, 246, 0.25)";
sx.beginPath();
if (sx.roundRect) sx.roundRect(850, 24, 310, 36, 18); else sx.rect(850, 24, 310, 36);
sx.fill();
sx.strokeStyle = "#8b5cf6"; sx.lineWidth = 1.5; sx.stroke();
sx.fillStyle = "#a78bfa"; sx.font = "bold 13px 'Segoe UI', sans-serif"; sx.textAlign = "center";
sx.fillText(streakBadgeText, 1005, 47);`;

  html = html.replace(oldShareLogic, enhancedShareLogic.replace(/\n/g, '\r\n'));
  console.log('[9/9] Social share card enhanced with gamification banner.');
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
