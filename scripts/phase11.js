// CodeVis Phase 11 — Final punch: stronger particle network (more nodes, visible links),
// bolder glass (higher blur+tint), aurora tint unified to indigo/violet family.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase11-' + changed + '] ' + m); };

// 1. CSS: bolder glass + recolor blob-3
if (!html.includes('cvFinalPunch')) {
  const css = `
/* cvFinalPunch */
.glass{background:rgba(22,27,34,.42)!important;backdrop-filter:blur(22px) saturate(140%)!important;-webkit-backdrop-filter:blur(22px) saturate(140%)!important;border:1px solid rgba(167,139,250,.45)!important;box-shadow:0 10px 40px rgba(0,0,0,.5),inset 0 1px 0 rgba(200,180,255,.22)!important}
[data-theme="light"] .glass{background:rgba(255,255,255,.55)!important}
.cv-blob-3{background:#4c6ef5!important}
.cv-blob-2{background:#20c997!important}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('bolder glass + unified aurora palette');
}

// 2. JS: denser particle network with clearly visible links (bump link distance, alpha, node count)
if (!html.includes('cvNetBoost')) {
  const anchor = 'document.getElementById("langBtn").onclick';
  const engine = `
// cvNetBoost — richer particle network (overrides initAurora internals via re-init)
(function(){
  const orig=initAurora;
  initAurora=function(){
    const cv=document.getElementById("auroraCanvas");
    if(!cv)return;
    const ctx2=cv.getContext("2d");
    let pts=[];
    function size(){
      cv.width=window.innerWidth;cv.height=window.innerHeight;
      const n=Math.max(60,Math.floor(cv.width*cv.height/9000));
      pts=Array.from({length:n},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45,r:Math.random()*2.2+.8}));
    }
    size();window.addEventListener("resize",size);
    function draw(){
      ctx2.clearRect(0,0,cv.width,cv.height);
      const LINK=130*130;
      for(let i=0;i<pts.length;i++){
        const p=pts[i];
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>cv.width)p.vx*=-1;
        if(p.y<0||p.y>cv.height)p.vy*=-1;
        for(let j=i+1;j<pts.length;j++){
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
          if(d<LINK){
            const a=1-d/LINK;
            ctx2.strokeStyle="rgba(139,92,246,"+(a*.55)+")";
            ctx2.lineWidth=a*1.4;
            ctx2.beginPath();ctx2.moveTo(p.x,p.y);ctx2.lineTo(q.x,q.y);ctx2.stroke();
          }
        }
        ctx2.fillStyle="rgba(196,181,253,.95)";
        ctx2.beginPath();ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);ctx2.fill();
      }
      requestAnimationFrame(function loop2(t){if(typeof t!=="number")return;draw()});
    }
    requestAnimationFrame(function(t){if(typeof t==="number")draw()});
  };
  initAurora();
})();`;
  html = html.replace(anchor, engine.replace(/\n/g, '\r\n') + '\r\n' + anchor);
  log('denser particle network (60+ nodes, visible links)');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 11 OK: ' + changed + ' patch(es) ---');
