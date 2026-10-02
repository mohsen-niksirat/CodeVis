// CodeVis Hotfix 20 — confetti: robust single rAF loop with guaranteed cleanup.
// Replaces the legacy burst/loop pair if the old markers are still present.
const fs = require('fs');
const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;

if (html.includes('confettiLoop(cv,cx)')) {
  const i = html.indexOf('function burstConfetti(n=120){');
  const endMarker = 'confettiRAF=null;cv.style.display="none"}';
  const j = html.indexOf(endMarker, i);
  if (i !== -1 && j !== -1) {
    const NEW = [
      'function burstConfetti(n=120){',
      '  const cv=document.getElementById("confettiCanvas");',
      '  if(!cv)return;',
      '  cv.style.display="block";',
      '  cv.width=window.innerWidth||800;cv.height=window.innerHeight||600;',
      '  const colors=["#8b5cf6","#3fb950","#f0883e","#58a6ff","#f85149","#d2a8ff"];',
      '  for(let i=0;i<n;i++){',
      '    confettiParticles.push({x:(window.innerWidth||800)/2+(Math.random()-0.5)*200,y:(window.innerHeight||600)*0.4,vx:(Math.random()-0.5)*12,vy:-Math.random()*14-4,g:0.35,s:Math.random()*7+3,c:colors[i%colors.length],r:Math.random()*Math.PI,vr:(Math.random()-0.5)*0.3,life:90});',
      '  }',
      '  if(!confettiRAF)confettiRAF=setTimeout(()=>confettiLoop(cv),16);',
      '}',
      'function confettiLoop(cv){',
      '  const cx=cv.getContext("2d");',
      '  cx.clearRect(0,0,cv.width,cv.height);',
      '  confettiParticles=confettiParticles.filter(p=>p.life>0&&p.y<cv.height+20);',
      '  confettiParticles.forEach(p=>{',
      '    p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;p.life--;',
      '    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);',
      '    cx.fillStyle=p.c;cx.globalAlpha=Math.max(0,Math.min(1,p.life/30));',
      '    cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6);cx.restore();',
      '  });',
      '  if(confettiParticles.length){',
      '    confettiRAF=setTimeout(()=>confettiLoop(cv),16);',
      '  }else{',
      '    confettiRAF=null;cx.clearRect(0,0,cv.width,cv.height);cv.style.display="none";',
      '  }',
      '}'
    ].join('\r\n');
    html = html.slice(0, i) + NEW + html.slice(j + endMarker.length);
    changed++;
    console.log('[fix20-1] confetti engine replaced');
  }
}

if (changed) {
  fs.writeFileSync(FILE, html, 'utf8');
}
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Fix20 OK: ' + changed + ' patch(es) ---');
