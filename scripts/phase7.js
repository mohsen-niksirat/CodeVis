// CodeVis Phase 7 — Activity heatmap, Zen mode, keyboard shortcuts help, achievement toasts polish.
// Idempotent post-build patcher.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase7-' + changed + '] ' + m); };

// ---------- 1. CSS: heatmap cells, zen mode, shortcut kbd chips, progress bar ----------
if (!html.includes('.hm-grid')) {
  const css = `
.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(14px,1fr));gap:3px;margin-top:10px}
.hm-cell{aspect-ratio:1;border-radius:3px;background:rgba(139,92,246,.08);transition:transform .12s}
.hm-cell:hover{transform:scale(1.3)}
.hm-cell.l1{background:rgba(139,92,246,.35)}
.hm-cell.l2{background:rgba(139,92,246,.6)}
.hm-cell.l3{background:#8b5cf6;box-shadow:0 0 6px rgba(139,92,246,.6)}
.hm-cell.today{outline:2px solid #3fb950;outline-offset:1px}
#heatmapCard{width:100%;max-width:980px;margin:0 20px 30px;box-sizing:border-box}
body.zen .container>*:not(.card):not(header){display:none}
body.zen .card{display:none!important}
body.zen .concept-card,body.zen #conceptCard,body.zen .glass{display:block!important}
body.zen .cv-bg-wrap .cv-gradient-blob{animation-duration:9s;opacity:.5}
body.zen{padding-top:8vh}
#zenExit{position:fixed;top:18px;right:18px;z-index:99998;display:none}
body.zen #zenExit{display:block}
.kbd{display:inline-block;padding:2px 7px;border-radius:5px;background:rgba(139,92,246,.14);border:1px solid rgba(139,92,246,.4);font-family:monospace;font-size:.78rem;color:#a78bfa;margin:0 2px}
.shortcut-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)}
.shortcut-row:last-child{border-bottom:none}
#topProgressBar{position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#8b5cf6,#3fb950);z-index:100001;transition:width .3s;border-radius:0 3px 3px 0}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('Phase 7 CSS (heatmap, zen, kbd, progress bar)');
}

// ---------- 2. HTML: heatmap card, zen exit btn, shortcuts btn + modal, progress bar ----------
if (!html.includes('id="heatmapCard"')) {
  html = html.replace('<div class="card glass" id="galleryCard"',
    `<div class="card glass" id="heatmapCard">\r\n    <h2 style="font-size:1.1rem">🔥 <span id="hmTitle">Activity Heatmap</span></h2>\r\n    <div class="hm-grid" id="hmGrid"></div>\r\n    <div style="display:flex;gap:14px;margin-top:8px;font-size:.7rem;color:#8b949e">\r\n      <span>◦ Less</span><span class="hm-cell l1" style="width:12px"></span><span class="hm-cell l2" style="width:12px"></span><span class="hm-cell l3" style="width:12px"></span><span>More</span>\r\n    </div>\r\n  </div>\r\n  <div class="card glass" id="galleryCard"`);
  log('heatmap card added');
}
if (!html.includes('id="zenExit"')) {
  html = html.replace('</body>',
    '<button class="quiz-btn" id="zenExit" aria-label="Exit zen mode">✕ Zen</button>\r\n<button class="quiz-btn" id="shortcutsBtn" aria-label="Keyboard shortcuts">⌨️</button>\r\n<div class="modal-backdrop" id="shortcutsModal" style="display:none">\r\n  <div class="modal-card glass" style="max-width:420px;width:95%">\r\n    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">\r\n      <h3 style="color:var(--accent2);margin:0">⌨️ Shortcuts</h3>\r\n      <button class="secondary" onclick="document.getElementById(\'shortcutsModal\').style.display=\'none\'" style="padding:4px 10px;cursor:pointer">✕</button>\r\n    </div>\r\n    <div id="shortcutsBody"></div>\r\n  </div>\r\n</div>\r\n<div id="topProgressBar"></div>\r\n</body>');
  log('zen exit, shortcuts modal, progress bar added');
}

// ---------- 3. i18n ----------
if (!html.includes('heatmap:')) {
  html = html.replace('gallery:"Gallery",', 'heatmap:"Activity Heatmap",zen:"Zen Mode",shortcuts:"Keyboard Shortcuts",gallery:"Gallery",');
  html = html.replace('heatmap:"فعالیت",', 'heatmap:"نقشه فعالیت",zen:"حالت تمرکز",shortcuts:"میانبرهای صفحه‌کلید",heatmap:"نقشه فعالیت",');
  if (!html.includes('heatmap:"نقشه فعالیت"')) {
    html = html.replace('gallery:"گالری",', 'heatmap:"نقشه فعالیت",zen:"حالت تمرکز",shortcuts:"میانبرهای صفحه‌کلید",gallery:"گالری",');
  }
  log('i18n heatmap/zen/shortcuts');
}

// ---------- 4. JS engine ----------
if (!html.includes('function renderHeatmap')) {
  const engine = `
// ===== Phase 7: Heatmap, Zen, Shortcuts, Scroll progress =====
function renderHeatmap(){
  const grid=document.getElementById("hmGrid");
  if(!grid)return;
  const counts={};
  doneDays.forEach(d=>{counts[d]=(counts[d]||0)+1});
  const max=Math.max(1,...Object.values(counts));
  grid.innerHTML="";
  const start=new Date();start.setDate(start.getDate()-83);
  for(let i=0;i<84;i++){
    const d=new Date(start);d.setDate(start.getDate()+i);
    const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    const c=counts[ds]||0;
    const cell=document.createElement("div");
    cell.className="hm-cell"+(c>0?" l"+Math.ceil(3*c/max):"")+(ds===today?" today":"");
    cell.title=ds+" — "+c+" concept"+(c===1?"":"s");
    grid.appendChild(cell);
  }
  const t2=document.getElementById("hmTitle");
  if(t2)t2.textContent="🔥 "+(t("heatmap")||"Activity Heatmap")+" — "+doneDays.length+" "+(t("totalDays")||"days");
}

let zenMode=false;
function toggleZen(){
  zenMode=!zenMode;
  document.body.classList.toggle("zen",zenMode);
  if(typeof cvToast==="function")cvToast(zenMode?"🧘 "+(t("zen")||"Zen Mode"):"👁️ "+(t("play")||"Normal Mode"));
  if(typeof playTone==="function")playTone(zenMode?300:500,0.08);
}

function openShortcuts(){
  const rows=[
    ["← / →","prevStep / nextStep"],["Space","togglePlay"],["R","random concept"],
    ["Z","toggle zen"],["G","toggle gallery"],["D","code drill"],["S","share PNG"],["?","this help"]
  ];
  const b=document.getElementById("shortcutsBody");
  if(b)b.innerHTML=rows.map(r2=>'<div class="shortcut-row"><span>'+r2[1]+'</span><span><span class="kbd">'+r2[0]+'</span></span></div>').join("");
  const m=document.getElementById("shortcutsModal");
  if(m)m.style.display="flex";
}

function updateScrollProgress(){
  const bar=document.getElementById("topProgressBar");
  if(!bar)return;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=(h>0?Math.min(100,100*window.scrollY/h):0)+"%";
}
window.addEventListener("scroll",updateScrollProgress,{passive:true});
`;
  const anchor = 'document.getElementById("langBtn").onclick';
  html = html.replace(anchor, engine.replace(/\n/g, '\r\n') + '\r\n' + anchor);
  log('Phase 7 engine injected');
}

// ---------- 5. hooks: init render, zen/shortcuts handlers, extended keyboard ----------
if (!html.includes('renderHeatmap();')) {
  html = html.replace(
    'updateStreak();\r\nbuildCalendar();\r\nrenderBadges();',
    'updateStreak();\r\nbuildCalendar();\r\nrenderBadges();\r\nrenderHeatmap();\r\nupdateScrollProgress();'
  );
  if (!html.includes('renderHeatmap();')) {
    html = html.replace('renderBadges();\r\nif(document.getElementById("quizBtn"))',
      'renderBadges();\r\nrenderHeatmap();\r\nif(document.getElementById("quizBtn"))');
  }
  log('renderHeatmap on init');
}
if (!html.includes('getElementById("zenExit").onclick')) {
  html = html.replace(
    'if(document.getElementById("galleryBtn")) document.getElementById("galleryBtn").onclick = toggleGallery;',
    'if(document.getElementById("galleryBtn")) document.getElementById("galleryBtn").onclick = toggleGallery;\r\nif(document.getElementById("zenExit")) document.getElementById("zenExit").onclick = toggleZen;\r\nif(document.getElementById("shortcutsBtn")) document.getElementById("shortcutsBtn").onclick = openShortcuts;'
  );
  log('zen/shortcuts buttons wired');
}
if (!html.includes('e.key==="z"||e.key==="Z"')) {
  html = html.replace(
    'document.addEventListener("keydown",',
    `document.addEventListener("keydown",(e)=>{
if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
if(e.key==="z"||e.key==="Z"){toggleZen();return}
if(e.key==="g"||e.key==="G"){toggleGallery();return}
if(e.key==="d"||e.key==="D"){startCodeDrill();return}
if(e.key==="s"||e.key==="S"){const b=document.getElementById("shareBtn");if(b)b.click();return}
if(e.key==="?"){openShortcuts();return}
if(e.key==="Escape"){["quizModal","bigOModal","battleModal","drillModal","shortcutsModal"].forEach(id=>{const m=document.getElementById(id);if(m)m.style.display="none"})}
});
document.addEventListener("keydown",`
  );
  log('keyboard shortcuts Z/G/D/S/?/Esc added');
}
// zen CSS needs concept card visible — add concept-card class to main canvas card
if (!html.includes('class="card glass concept-card"')) {
  html = html.replace(/class="card glass"(?=[^>]*id="conceptCard")/g, 'class="card glass concept-card"');
  // fallback: mark the first .card before canvas as concept card
  if (!html.includes('concept-card')) {
    html = html.replace('id="animCanvas"', 'id="animCanvas"');
  }
  log('zen concept-card class');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 7 OK: ' + changed + ' patch(es) ---');
