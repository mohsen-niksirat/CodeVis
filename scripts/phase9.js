// CodeVis Phase 9 — Hero spotlight + animated aurora canvas mesh background + entrance animations.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase9-' + changed + '] ' + m); };

// ---------- 1. CSS ----------
if (!html.includes('#auroraCanvas')) {
  const css = `
#auroraCanvas{position:fixed;inset:0;z-index:-2;width:100vw;height:100vh;opacity:.6;pointer-events:none}
[data-theme="light"] #auroraCanvas{opacity:.35}
#heroCard{width:100%;max-width:1020px;margin:0 20px 24px;box-sizing:border-box;position:relative;overflow:hidden;
  background:linear-gradient(135deg,rgba(139,92,246,.18),rgba(63,185,80,.10)) , rgba(22,27,34,.6);}
#heroCard::before{content:"";position:absolute;top:-40%;right:-10%;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.45),transparent 70%);filter:blur(20px)}
#heroCard::after{content:"";position:absolute;bottom:-50%;left:-5%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(63,185,80,.35),transparent 70%);filter:blur(20px)}
.hero-inner{position:relative;z-index:2;display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.hero-eyebrow{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#8b949e;margin-bottom:4px}
.hero-title{font-size:1.7rem;font-weight:800;margin:0 0 4px;background:linear-gradient(90deg,#a78bfa,#3fb950);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:.85rem;color:#8b949e;max-width:420px;line-height:1.5}
.hero-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.hero-stat{text-align:center;padding:8px 14px;border-radius:12px;background:rgba(139,92,246,.10);border:1px solid rgba(139,92,246,.25)}
.hero-stat .v{font-size:1.3rem;font-weight:800;color:#a78bfa}
.hero-stat .k{font-size:.68rem;color:#8b949e}
@keyframes cvFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.card,.gallery-card{animation:cvFadeUp .45s cubic-bezier(.2,.8,.3,1) both}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('Phase 9 CSS (aurora, hero, entrance animations)');
}

// ---------- 2. HTML: aurora canvas + hero card ----------
if (!html.includes('id="auroraCanvas"')) {
  html = html.replace('<div class="cv-bg-wrap" id="cvBg"',
    '<canvas id="auroraCanvas" aria-hidden="true"></canvas>\r\n<div class="cv-bg-wrap" id="cvBg"');
  log('aurora canvas added');
}
if (!html.includes('id="heroCard"')) {
  html = html.replace('<div class="card glass" id="heatmapCard">',
    `<div class="card glass" id="heroCard">\r\n    <div class="hero-inner">\r\n      <div>\r\n        <div class="hero-eyebrow" id="heroEyebrow">Concept of the day</div>\r\n        <h1 class="hero-title" id="heroTitle">CodeVis</h1>\r\n        <p class="hero-sub" id="heroSub"></p>\r\n        <div class="hero-actions" style="margin-top:12px">\r\n          <button class="primary" id="heroStart" style="padding:9px 20px;border-radius:10px;cursor:pointer;font-weight:600">▶ Start</button>\r\n          <button class="secondary" id="heroRandom" style="padding:9px 16px;border-radius:10px;cursor:pointer">🎲 Random</button>\r\n        </div>\r\n      </div>\r\n      <div style="display:flex;gap:10px;flex-wrap:wrap" id="heroStats"></div>\r\n    </div>\r\n  </div>\r\n  <div class="card glass" id="heatmapCard">`);
  log('hero card added');
}

// ---------- 3. i18n ----------
if (!html.includes('ofTheDay:')) {
  html = html.replace('heatmap:"Activity Heatmap",', 'ofTheDay:"Concept of the day",start:"Start",yourProgress:"Your progress",heatmap:"Activity Heatmap",');
  html = html.replace('heatmap:"نقشه فعالیت",', 'ofTheDay:"مفهوم امروز",start:"شروع",yourProgress:"پیشرفت شما",heatmap:"نقشه فعالیت",');
  log('i18n hero terms');
}

// ---------- 4. JS: aurora mesh + hero ----------
if (!html.includes('function initAurora')) {
  const engine = `
// ===== Phase 9: Aurora background + Hero =====
function initAurora(){
  const cv=document.getElementById("auroraCanvas");
  if(!cv)return;
  const ctx2=cv.getContext("2d");
  let pts=[],raf=null;
  function size(){cv.width=window.innerWidth;cv.height=window.innerHeight;
    const n=Math.max(24,Math.floor(cv.width*cv.height/28000));
    pts=Array.from({length:n},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+.6}));
  }
  size();window.addEventListener("resize",size);
  function draw(){
    ctx2.clearRect(0,0,cv.width,cv.height);
    for(let i=0;i<pts.length;i++){
      const p=pts[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>cv.width)p.vx*=-1;
      if(p.y<0||p.y>cv.height)p.vy*=-1;
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
        if(d<20000){
          const a=1-d/20000;
          ctx2.strokeStyle="rgba(139,92,246,"+(a*.28)+")";
          ctx2.lineWidth=a*.8;
          ctx2.beginPath();ctx2.moveTo(p.x,p.y);ctx2.lineTo(q.x,q.y);ctx2.stroke();
        }
      }
      ctx2.fillStyle="rgba(167,139,250,.7)";
      ctx2.beginPath();ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);ctx2.fill();
    }
    raf=requestAnimationFrame(draw);
  }
  let lastT=0;
  requestAnimationFrame(function loop(t){if(typeof t!=="number")return;if(!lastT||t-lastT>=16){lastT=t;draw()}requestAnimationFrame(loop)});
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){cancelAnimationFrame(raf);raf=null}
    else if(!raf)draw();
  });
}
function renderHero(){
  const dayIndex2=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/86400000)%concepts.length;
  const daily=concepts[dayIndex2];
  const ht=document.getElementById("heroTitle"),hs=document.getElementById("heroSub"),he=document.getElementById("heroEyebrow");
  if(ht)ht.textContent=daily.title[lang]||daily.title.en;
  if(hs)hs.textContent=daily.desc[lang]||daily.desc.en;
  if(he)he.textContent="⭐ "+(t("ofTheDay")||"Concept of the day");
  const hst=document.getElementById("heroStats");
  if(hst){
    const xp=computeXp(),lv=levelFor(xp);
    hst.innerHTML=
      '<div class="hero-stat"><div class="v">'+lv+'</div><div class="k">'+(t("level")||"Level")+'</div></div>'+
      '<div class="hero-stat"><div class="v">'+seenIds.size+'</div><div class="k">'+(t("conceptsSeen")||"Seen")+'</div></div>'+
      '<div class="hero-stat"><div class="v">'+getStreak()+'</div><div class="k">'+(t("streak")||"Streak")+'</div></div>'+
      '<div class="hero-stat"><div class="v">'+unlockedBadges.size+'</div><div class="k">🏆</div></div>';
  }
  const b1=document.getElementById("heroStart"),b2=document.getElementById("heroRandom");
  if(b1)b1.onclick=()=>{loadConcept(daily);window.scrollTo({top:0,behavior:"smooth"})};
  if(b2)b2.onclick=()=>{const c=concepts[Math.floor(Math.random()*concepts.length)];loadConcept(c);window.scrollTo({top:0,behavior:"smooth"})};
}
`;
  const anchor = 'document.getElementById("langBtn").onclick';
  html = html.replace(anchor, engine.replace(/\n/g, '\r\n') + '\r\n' + anchor);
  log('aurora + hero engine injected');
}

// ---------- 5. hooks ----------
if (!html.includes('initAurora();')) {
  const initAnchor = 'const dayIndex=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/86400000)%concepts.length;';
  if (html.includes(initAnchor)) {
    html = html.replace(initAnchor, 'initAurora();\r\n' + initAnchor);
  }
  log('initAurora on boot');
}
if (!html.includes('renderHero();')) {
  html = html.replace('if(typeof updateXp==="function")updateXp();',
    'if(typeof updateXp==="function")updateXp();\r\nif(typeof renderHero==="function")renderHero();');
  log('renderHero hooked into updateStats');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 9 OK: ' + changed + ' patch(es) ---');
