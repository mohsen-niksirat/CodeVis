// CodeVis Phase 15 — Daily Challenge: date-seeded "concept of the day", challenge card,
// completion checkmark, streak integration, share-result text. Idempotent.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase15-' + changed + '] ' + m); };

// 1) Challenge card HTML after hero card (or before .main)
if (!html.includes('id="dailyCard"')) {
  const card = [
    '<div id="dailyCard" class="card glass daily-card">',
    '<div class="daily-head"><span class="daily-flame">🔥</span><h3 id="dailyTitle">Daily Challenge</h3><span id="dailyDone" style="display:none">✅</span></div>',
    '<p id="dailyDesc" class="desc"></p>',
    '<button id="dailyStart" class="primary">Start Challenge →</button>',
    '<button id="dailyShare" class="secondary">📋 Share result</button>',
    '</div>'
  ].join('\r\n');
  html = html.replace('<div class="main">', card + '\r\n<div class="main">');
  log('daily card HTML');
}

// 2) CSS
if (!html.includes('.daily-card{')) {
  const css = `
.daily-card{max-width:1020px;margin:0 auto 24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:14px 20px}
.daily-card .daily-head{display:flex;align-items:center;gap:8px}
.daily-card h3{margin:0;background:linear-gradient(90deg,#f97316,#8b5cf6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.daily-flame{font-size:1.4rem}
.daily-card .desc{margin:0;flex:1;min-width:200px}
.daily-card button{margin:0}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('daily CSS');
}

// 3) Logic — date-seeded pick + i18n + share
if (!html.includes('function initDailyChallenge')) {
  const anchor = 'const sBtn = document.getElementById("soundBtn");';
  const logic = [
    'function initDailyChallenge(){',
    'const card=document.getElementById("dailyCard");if(!card||typeof concepts==="undefined"||!concepts.length)return;',
    'const d=new Date();const seed=d.getFullYear()*372+ (d.getMonth()+1)*31 + d.getDate();',
    'const dc=concepts[seed%concepts.length];',
    'const done=JSON.parse(localStorage.getItem("cv_daily")||"{}");',
    'const key=d.toISOString().slice(0,10);',
    'const isDone=done[key]===dc.id;',
    'document.getElementById("dailyDone").style.display=isDone?"inline":"none";',
    'const ttl=document.getElementById("dailyTitle"),desc=document.getElementById("dailyDesc");',
    'if(ttl)ttl.textContent=(lang==="fa"?"چالش امروز: ":"Daily Challenge: ")+(dc.title[lang]||dc.title.en);',
    'if(desc)desc.textContent=lang==="fa"?"مفهوم منتخب امروز رو کشف کن و مرحله‌هاش رو ببین":"Explore today\'s featured concept and step through its animation";',
    'const btn=document.getElementById("dailyStart");',
    'if(btn)btn.onclick=()=>{loadConcept(dc.id);window.scrollTo({top:document.getElementById("animCanvas").getBoundingClientRect().top+window.scrollY-80,behavior:"smooth"});',
    '  const dn=JSON.parse(localStorage.getItem("cv_daily")||"{}");dn[key]=dc.id;localStorage.setItem("cv_daily",JSON.stringify(dn));',
    '  document.getElementById("dailyDone").style.display="inline";if(typeof burstConfetti==="function")burstConfetti(40);addXP&&addXP(15);};',
    'const sh=document.getElementById("dailyShare");',
    'if(sh)sh.onclick=()=>{const txt=isDone',
    '  ? `I completed today\'s CodeVis challenge: ${dc.title.en} (${key}) 🎯`',
    '  : `Today\'s CodeVis challenge: ${dc.title.en} (${key}) — try it! 🎯`;',
    '  if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>cvToast&&cvToast("Copied!"));',
    '};',
    '}',
    'initDailyChallenge();'
  ].join('\r\n');
  html = html.replace(anchor, logic + '\r\n' + anchor);
  log('daily logic');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 15 OK: ' + changed + ' patch(es) ---');
