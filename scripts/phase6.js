// CodeVis Phase 6 — Visual Overhaul: animated gradient, glassmorphism,
// concept gallery grid, XP/Level system, confetti celebrations.
// Idempotent post-build patcher (runs after build.js + phase5.js).
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase6-' + changed + '] ' + m); };

// ---------- 1. CSS: animated gradient bg, glass, gallery, XP ring, confetti, toast ----------
if (!html.includes('.cv-gradient-blob')) {
  const css = `
.cv-bg-wrap{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.cv-gradient-blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.35;animation:cvDrift 18s ease-in-out infinite alternate}
.cv-blob-1{width:420px;height:420px;background:#8b5cf6;top:-120px;left:-100px}
.cv-blob-2{width:360px;height:360px;background:#3fb950;bottom:-120px;right:-80px;animation-delay:-6s}
.cv-blob-3{width:300px;height:300px;background:#1f6feb;top:40%;left:55%;animation-delay:-12s}
@keyframes cvDrift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,-40px) scale(1.15)}100%{transform:translate(-40px,50px) scale(.95)}}
[data-theme="light"] .cv-gradient-blob{opacity:.18}
.glass{background:rgba(22,27,34,.55)!important;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(139,92,246,.18)!important;box-shadow:0 8px 32px rgba(0,0,0,.35)}
[data-theme="light"] .glass{background:rgba(255,255,255,.65)!important;border-color:rgba(139,92,246,.25)!important}
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;width:100%;max-width:980px;margin:0 auto 40px;padding:0 20px;box-sizing:border-box}
.gallery-card{position:relative;border-radius:14px;padding:16px 12px 12px;text-align:center;cursor:pointer;transition:transform .18s,box-shadow .18s;background:rgba(22,27,34,.55);backdrop-filter:blur(14px);border:1px solid var(--border)}
.gallery-card:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 10px 24px rgba(139,92,246,.28)}
.gallery-card.seen{border-color:rgba(63,185,80,.45)}
.gallery-card .g-icon{font-size:1.9rem;display:block;margin-bottom:8px;filter:drop-shadow(0 2px 8px rgba(139,92,246,.4))}
.gallery-card .g-title{font-size:.82rem;font-weight:600;color:var(--text);display:block;line-height:1.3}
.gallery-card .g-cat{font-size:.68rem;color:#8b949e;margin-top:5px;display:block}
.gallery-card .g-seen{position:absolute;top:8px;right:8px;font-size:.75rem;color:#3fb950}
#galleryCard{width:100%;max-width:1020px;margin:0 20px 30px;box-sizing:border-box}
#xpChip{display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:20px;background:rgba(139,92,246,.14);border:1px solid rgba(139,92,246,.4);font-size:.8rem;font-weight:700;color:#a78bfa;cursor:default}
#xpChip .lv{color:#3fb950}
.xp-ring{width:26px;height:26px;border-radius:50%;background:conic-gradient(#8b5cf6 var(--p,0%),rgba(139,92,246,.18) 0);display:inline-flex;align-items:center;justify-content:center}
.xp-ring::after{content:attr(data-lv);width:20px;height:20px;border-radius:50%;background:var(--surface,#161b22);display:flex;align-items:center;justify-content:center;font-size:.6rem;color:var(--text)}
#confettiCanvas{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;display:none}
.cv-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:rgba(22,27,34,.92);backdrop-filter:blur(12px);border:1px solid rgba(139,92,246,.5);color:var(--text);padding:12px 22px;border-radius:12px;font-size:.9rem;font-weight:600;z-index:100000;opacity:0;transition:all .35s cubic-bezier(.2,.9,.3,1.2);box-shadow:0 8px 30px rgba(139,92,246,.35)}
.cv-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('Phase 6 CSS injected (gradient, glass, gallery, XP, confetti, toast)');
}

// ---------- 2. HTML: bg blobs, gallery card, XP chip, confetti canvas, toast host ----------
if (!html.includes('id="cvBg"')) {
  html = html.replace('<body>', `<div class="cv-bg-wrap" id="cvBg" aria-hidden="true"><div class="cv-gradient-blob cv-blob-1"></div><div class="cv-gradient-blob cv-blob-2"></div><div class="cv-gradient-blob cv-blob-3"></div></div>\r\n<canvas id="confettiCanvas"></canvas>\r\n<body>`);
  log('gradient background + confetti canvas added');
}
if (!html.includes('id="galleryCard"')) {
  html = html.replace('<div class="card" id="studyListCard"',
    `<div class="card" id="galleryCard">\r\n    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">\r\n      <h2 id="galleryTitle" style="font-size:1.1rem">🗺️ Concept Gallery</h2>\r\n      <div style="display:flex;gap:8px;align-items:center">\r\n        <span id="xpChip" title="Experience"><span class="xp-ring" data-lv="1" style="--p:0%"></span><span id="xpText">Lv 1 · 0 XP</span></span>\r\n        <button class="quiz-btn" id="galleryBtn" aria-label="Toggle gallery">🗺️ Gallery</button>\r\n      </div>\r\n    </div>\r\n    <div class="gallery-grid" id="galleryGrid" style="padding:14px 0 0;margin:0"></div>\r\n  </div>\r\n  <div class="card" id="studyListCard"`);
  log('gallery card + XP chip added');
}
if (!html.includes('cvToastHost')) {
  html = html.replace('</body>', '<div id="cvToastHost"></div>\r\n</body>');
  log('toast host added');
}

// ---------- 3. i18n ----------
if (!html.includes('gallery:')) {
  html = html.replace('drill:"Code Drill",', 'gallery:"Gallery",level:"Level",xp:"XP",levelUp:"Level Up!",drill:"Code Drill",');
  html = html.replace('drill:"آزمون برق‌آسا",', 'gallery:"گالری",level:"سطح",xp:"امتیاز",levelUp:"ارتقای سطح!",drill:"آزمون برق‌آسا",');
  log('i18n gallery/XP terms (EN/FA)');
}

// ---------- 4. JS engine (after langBtn anchor, safe from build.js region wipe) ----------
if (!html.includes('function renderGallery')) {
  const engine = `
// ===== Phase 6: Gallery, XP/Levels, Confetti, Toasts =====
const CAT_META={ds:{icon:"🌲",color:"#3fb950",en:"Data Structures",fa:"ساختمان داده"},algo:{icon:"⚡",color:"#f0883e",en:"Algorithms",fa:"الگوریتم‌ها"},pattern:{icon:"🧩",color:"#a78bfa",en:"Patterns",fa:"الگوها"},web:{icon:"🌐",color:"#58a6ff",en:"Web",fa:"وب"}};
let galleryOpen=true;

function renderGallery(){
  const grid=document.getElementById("galleryGrid");
  if(!grid)return;
  let h="";
  concepts.forEach(c=>{
    const m=CAT_META[c.category]||{icon:"📘",color:"#8b949e",en:c.category,fa:c.category};
    const isSeen=seenIds.has(c.id);
    const title=c.title[lang]||c.title.en;
    h+='<div class="gallery-card'+(isSeen?" seen":"")+'" onclick="loadConcept(\\''+c.id+'\\');window.scrollTo({top:0,behavior:\\'smooth\\'})" title="'+title+'">'+
      (isSeen?'<span class="g-seen">✓</span>':"")+
      '<span class="g-icon">'+m.icon+'</span>'+
      '<span class="g-title">'+title+'</span>'+
      '<span class="g-cat" style="color:'+m.color+'">'+(m[lang]||m.en)+' · '+t(c.level)+'</span></div>';
  });
  grid.innerHTML=h;
  const gt=document.getElementById("galleryTitle");
  if(gt)gt.textContent="🗺️ "+(t("gallery")||"Concept Gallery")+" ("+seenIds.size+"/"+concepts.length+")";
}

function toggleGallery(){
  galleryOpen=!galleryOpen;
  const card=document.getElementById("galleryCard");
  if(card)card.style.display=galleryOpen?"block":"none";
  if(typeof playTone==="function")playTone(galleryOpen?520:380,0.06);
}

function computeXp(){
  return seenIds.size*10+quizScore*5+unlockedBadges.size*25+doneDays.length*15;
}
function levelFor(xp){return Math.max(1,Math.floor(Math.sqrt(xp/50))+1)}
function xpForLevel(lv){return Math.pow(lv-1,2)*50}
let lastShownLevel=null;

function updateXp(){
  const chip=document.getElementById("xpText"),ring=document.getElementById("xpChip");
  if(!chip)return;
  const xp=computeXp(),lv=levelFor(xp);
  const cur=xpForLevel(lv),next=xpForLevel(lv+1);
  const pct=Math.min(100,Math.round(100*(xp-cur)/Math.max(1,next-cur)));
  chip.innerHTML='<span class="xp-ring" data-lv="'+lv+'" style="--p:'+pct+'%"></span><span>Lv '+lv+' · '+xp+' XP</span>';
  if(lastShownLevel!==null&&lv>lastShownLevel&&typeof cvToast==="function"){
    cvToast("🎉 "+(t("levelUp")||"Level Up!")+" — Lv "+lv);
    if(typeof burstConfetti==="function")burstConfetti();
  }
  lastShownLevel=lv;
}

// Confetti particle burst
let confettiParticles=[],confettiRAF=null;
function burstConfetti(n=120){
  const cv=document.getElementById("confettiCanvas");
  if(!cv)return;
  cv.style.display="block";
  cv.width=window.innerWidth||800;cv.height=window.innerHeight||600;
  const cx=cv.getContext("2d");
  const colors=["#8b5cf6","#3fb950","#f0883e","#58a6ff","#f85149","#d2a8ff"];
  for(let i=0;i<n;i++){
    confettiParticles.push({x:(window.innerWidth||800)/2+(Math.random()-0.5)*200,y:(window.innerHeight||600)*0.4,vx:(Math.random()-0.5)*12,vy:-Math.random()*14-4,g:0.35,s:Math.random()*7+3,c:colors[i%colors.length],r:Math.random()*Math.PI,vr:(Math.random()-0.5)*0.3,life:90});
  }
  if(!confettiRAF)confettiLoop(cv,cx);
}
function confettiLoop(cv,cx){
  cx.clearRect(0,0,cv.width,cv.height);
  confettiParticles=confettiParticles.filter(p=>p.life>0&&p.y<cv.height+20);
  confettiParticles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;p.life--;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);
    cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.life/30);
    cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6);cx.restore();
  });
  if(confettiParticles.length){confettiRAF=requestAnimationFrame(()=>confettiLoop(cv,cx))}
  else{confettiRAF=null;cv.style.display="none"}
}

function cvToast(msg,dur=2600){
  const host=document.getElementById("cvToastHost");
  if(!host)return;
  const el=document.createElement("div");
  el.className="cv-toast";el.textContent=msg;
  host.appendChild(el);
  if(el.classList&&el.classList.add)el.classList.add("show");
  setTimeout(()=>{try{el.classList.remove("show")}catch(e){}try{el.remove()}catch(e){}},dur);
}
`;
  const anchor = 'document.getElementById("langBtn").onclick';
  html = html.replace(anchor, engine.replace(/\n/g, '\r\n') + '\r\n' + anchor);
  log('gallery/XP/confetti/toast engine injected');
}

// ---------- 5. hooks: updateStats, markDone, badge fanfare, gallery btn, applyLang ----------
if (!html.includes('updateXp();renderGallery();')) {
  html = html.replace(
    'document.getElementById("statConceptsLbl").textContent=t("conceptsSeen")}',
    'document.getElementById("statConceptsLbl").textContent=t("conceptsSeen")}\r\nif(typeof updateXp==="function")updateXp();\r\nif(typeof renderGallery==="function")renderGallery();'
  );
  log('updateStats now refreshes XP + gallery');
}
if (!html.includes('burstConfetti();updateStreak();buildCalendar()')) {
  html = html.replace(
    'localStorage.setItem("cv_lastConcept",currentConcept?currentConcept.id:"");updateStreak();buildCalendar()',
    'localStorage.setItem("cv_lastConcept",currentConcept?currentConcept.id:"");if(typeof burstConfetti==="function")burstConfetti(90);updateStreak();buildCalendar()'
  );
  log('confetti on daily completion');
}
if (!html.includes('cvToastBadgeHook')) {
  html = html.replace(
    "playChord([587.33, 739.99, 880]); // Celebration fanfare",
    'playChord([587.33, 739.99, 880]); // Celebration fanfare\r\n    if(typeof burstConfetti==="function")burstConfetti();\r\n    newlyUnlocked.forEach(b=>{if(typeof cvToast==="function")cvToast(b.icon+" "+(b.title[lang]||b.title.en))}); // cvToastBadgeHook'
  );
  log('confetti + toast on badge unlock');
}
if (!html.includes('getElementById("galleryBtn").onclick')) {
  html = html.replace(
    'if(document.getElementById("drillBtn")) document.getElementById("drillBtn").onclick = startCodeDrill;',
    'if(document.getElementById("drillBtn")) document.getElementById("drillBtn").onclick = startCodeDrill;\r\nif(document.getElementById("galleryBtn")) document.getElementById("galleryBtn").onclick = toggleGallery;'
  );
  html = html.replace(
    'const dr = document.getElementById("drillBtn");',
    'const gb2 = document.getElementById("galleryBtn"); if(gb2) gb2.textContent = "🗺️ " + (t("gallery") || "Gallery");\r\nconst dr = document.getElementById("drillBtn");'
  );
  log('gallery button wired + localized');
}

// glassmorphism on main cards
if (!html.includes('id="studyListCard" class')) {
  html = html.replace(/class="card"/g, 'class="card glass"');
  log('glassmorphism applied to cards');
}

fs.writeFileSync(FILE, html, 'utf8');

// syntax gate
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 6 OK: ' + changed + ' patch(es) ---');
