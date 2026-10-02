// CodeVis Phase 8 — Polish pass (from visual review):
// 1. Real Zen: hide chrome (header controls, filters), canvas first, hide scrollbar
// 2. Fix Big-O button wrap (nowrap)
// 3. Dark styled scrollbar for code panel; code font-size slightly smaller, no truncation jank
// 4. Canvas first in zen: move concept card up via CSS order
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase8-' + changed + '] ' + m); };

if (!html.includes('body.zen header')) {
  const css = `
/* Phase 8 polish */
.quiz-btn,#bigOBtn,#battleBtn,#drillBtn,#quizBtn{white-space:nowrap}
.code-block{scrollbar-color:#8b5cf6 rgba(13,17,23,.6);scrollbar-width:thin}
.code-block::-webkit-scrollbar{width:8px;height:8px}
.code-block::-webkit-scrollbar-track{background:rgba(13,17,23,.6);border-radius:4px}
.code-block::-webkit-scrollbar-thumb{background:linear-gradient(#8b5cf6,#6d4ae0);border-radius:4px}
body.zen{overflow:hidden}
body.zen header{opacity:.25;pointer-events:none;transition:opacity .3s}
body.zen header:hover{opacity:1;pointer-events:auto}
body.zen .playground-bar{opacity:.35;transition:opacity .3s}
body.zen .playground-bar:hover{opacity:1}
body.zen .main{margin-top:0!important}
body.zen #conceptDesc{font-size:.85rem;opacity:.85}
body.zen .card{padding:14px 18px!important}
body::-webkit-scrollbar{width:0}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('polish CSS: nowrap buttons, styled scrollbars, true-zen chrome fade');
}

// Zen: auto-scroll to canvas
if (!html.includes('zenScrollHook')) {
  const engine = `
// Phase 8: zen focus scroll
function zenScrollHook(){
  if(!zenMode)return;
  const el=document.querySelector(".concept-card")||document.getElementById("animCanvas");
  if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
}
`;
  const anchor = 'document.getElementById("langBtn").onclick';
  html = html.replace(anchor, engine.replace(/\n/g, '\r\n') + '\r\n' + anchor);
  html = html.replace(
    'if(document.getElementById("zenExit")) document.getElementById("zenExit").onclick = toggleZen;',
    'if(document.getElementById("zenExit")) document.getElementById("zenExit").onclick = toggleZen;\r\nconst _tz=toggleZen;toggleZen=function(){_tz();zenScrollHook();};'
  );
  log('zen auto-scrolls to canvas');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 8 OK: ' + changed + ' patch(es) ---');
