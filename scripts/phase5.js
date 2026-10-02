// CodeVis Phase 5 — reproducible post-build patch.
// Adds: 5 concepts' canvas renderers, Code Drill (grounded random quiz) mode,
//       i18n terms, drill_master badge + unlock rule.
// Runs after scripts/build.js so the compiled single-file index.html is final.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase5-' + changed + '] ' + m); };

// ---------- 1. renderers for the 5 new concepts ----------
if (!html.includes('id==="a_star"')) {
  const anchor = '}else if(id==="regex"){';
  if (!html.includes(anchor)) throw new Error('regex renderer anchor missing');
  const renderers = `}else if(id==="a_star"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);
const grid=[[0,1,0,0,0,0],[0,1,0,1,1,0],[0,0,0,1,0,0],[1,1,0,0,0,1],[0,0,0,1,0,0]];
const cell=70,ox=190,oy=90;
grid.forEach((row,r)=>row.forEach((v,c)=>{ctx.fillStyle=v?"#21262d":"#0d1117";ctx.fillRect(ox+c*cell,oy+r*cell,cell-4,cell-4);ctx.strokeStyle="#30363d";ctx.strokeRect(ox+c*cell,oy+r*cell,cell-4,cell-4)}));
const path=[[0,0],[0,1],[1,1],[2,1],[2,2],[3,2],[3,3],[4,3],[4,4]];
if(currentStep>=3){ctx.fillStyle="#3fb950";path.forEach(([r,c])=>ctx.fillRect(ox+c*cell+10,oy+r*cell+10,cell-24,cell-24))}
ctx.fillStyle="#f85149";ctx.font="bold 13px monospace";ctx.textAlign="center";ctx.fillText("START",ox+32,oy+38);ctx.fillText("GOAL",ox+32,oy+4*cell+38);
if(currentStep===1||currentStep===2){ctx.fillStyle="#a78bfa";ctx.font="12px monospace";ctx.fillText("open: f=g+h  |  closed: visited",ox+2*cell,oy-10);ctx.fillStyle="#8b5cf6";ctx.fillRect(ox+1*cell+10,oy+1*cell+10,cell-24,cell-24)}
if(currentStep===4){ctx.fillStyle="#3fb950";ctx.font="13px monospace";ctx.fillText("Optimal path: 8 moves, 10 nodes explored (Dijkstra: ~25)",400,540)}
ctx.fillStyle="#3fb950";ctx.font="16px 'Segoe UI',sans-serif";ctx.fillText(["Heuristic h(n) guides the search toward GOAL","Open set picks lowest f(n)=g(n)+h(n)","Expand node; push neighbors with updated g","Goal reached — g(goal) is the shortest cost","Path reconstructed via parent pointers"][currentStep],400,575);
}else if(id==="n_queens"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);
const n=5,cell2=64,qx=240,qy=90;const queens=[];
if(currentStep>=1)queens.push([0,0]);if(currentStep>=2)queens.push([1,2]);
if(currentStep===3)queens.push([2,0]);if(currentStep>=4)queens.length=Math.min(queens.length,1);
for(let r2=0;r2<n;r2++)for(let c=0;c<n;c++){ctx.fillStyle=(r2+c)%2?"#161b22":"#0d1117";ctx.fillRect(qx+c*cell2,qy+r2*cell2,cell2-3,cell2-3);ctx.strokeStyle="#30363d";ctx.strokeRect(qx+c*cell2,qy+r2*cell2,cell2-3,cell2-3)}
ctx.font="28px serif";ctx.textAlign="center";
queens.forEach(([r2,c],i)=>{ctx.fillStyle=i===queens.length-1?"#3fb950":"#a78bfa";ctx.fillText("♛",qx+c*cell2+cell2/2-2,qy+r2*cell2+cell2/2+10)});
if(currentStep===2){ctx.strokeStyle="#f85149";ctx.lineWidth=2;[[0,0],[1,2]].forEach(([r2,c])=>{ctx.beginPath();ctx.arc(qx+c*cell2+cell2/2-2,qy+r2*cell2+cell2/2,cell2/1.6,0,Math.PI*2);ctx.stroke()});ctx.fillStyle="#f85149";ctx.font="13px monospace";ctx.fillText("threat detected → prune branch",400,470)}
if(currentStep===3){ctx.fillStyle="#a78bfa";ctx.font="13px monospace";ctx.fillText("backtrack: undo & try next column",400,470)}
if(currentStep===4){ctx.fillStyle="#3fb950";ctx.font="bold 14px monospace";ctx.fillText("solved! 5 queens, no attacks ✓",400,470);[0,2,4,1,3].forEach((c,r2)=>{ctx.fillText("♛",qx+c*cell2+cell2/2-2,qy+r2*cell2+cell2/2+10)})}
ctx.fillStyle="#3fb950";ctx.font="16px 'Segoe UI',sans-serif";ctx.fillText(["Place queen in row 0","Row 1: safe column found","Row 2: conflict → prune subtree","Backtrack: undo last placement","All N queens placed — solution found"][currentStep],400,560);
}else if(id==="kadane"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);
const nums=[-2,1,-3,4,-1,2,1,-5,4];const w=70,sx=95;
nums.forEach((v,i)=>{const x=sx+i*w;const active=currentStep===0?i===0:currentStep===1?i<=1:currentStep===2?i<=3:currentStep===3?i>=3&&i<=6:i<=8;
ctx.fillStyle=active?"#8b5cf6":"#161b22";ctx.fillRect(x,220,60,60);ctx.strokeStyle="#30363d";ctx.strokeRect(x,220,60,60);ctx.fillStyle="#fff";ctx.font="bold 20px monospace";ctx.textAlign="center";ctx.fillText(v,x+30,258)});
const bests=[-2,1,1,4,4,5,6,6,6];const shown=Math.min(currentStep*2+1,9);
ctx.font="14px monospace";
nums.slice(0,shown).forEach((v,i)=>{ctx.fillStyle=bests[i]===6?"#3fb950":"#8b949e";ctx.fillText("best:"+bests[i],sx+i*w+30,320)});
if(currentStep>=3){ctx.fillStyle="rgba(63,185,80,0.18)";ctx.fillRect(sx+3*w-4,214,4*w+8,72);ctx.strokeStyle="#3fb950";ctx.strokeRect(sx+3*w-4,214,4*w+8,72);ctx.fillStyle="#3fb950";ctx.font="bold 13px monospace";ctx.fillText("max subarray = 6",sx+5.5*w,205)}
ctx.fillStyle="#3fb950";ctx.font="16px 'Segoe UI',sans-serif";ctx.fillText(["cur=best=-2","extend: cur=max(1, -2+1)=1","restart: cur=max(4, 1-3+4)","running best reaches 6 at [4,-1,2,1]","answer: 6 — single O(n) pass"][currentStep],400,420);
}else if(id==="union_find"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);
const nodes=[{x:200,y:200,l:"0"},{x:400,y:150,l:"1"},{x:400,y:300,l:"2"},{x:600,y:200,l:"3"},{x:600,y:380,l:"4"}];
const edgesByStep=[[],[[0,1]],[[0,1],[1,2]],[[0,1],[1,2],[2,3]],[[0,1],[1,2],[3,4]]];
const edges=edgesByStep[currentStep];
ctx.strokeStyle="#8b5cf6";ctx.lineWidth=3;
edges.forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(nodes[a].x,nodes[a].y);ctx.lineTo(nodes[b].x,nodes[b].y);ctx.stroke()});
if(currentStep===3){ctx.strokeStyle="#3fb950";ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(nodes[4].x,nodes[4].y);ctx.lineTo(nodes[2].x,nodes[2].y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="#3fb950";ctx.font="12px monospace";ctx.fillText("path compressed → root",560,320)}
nodes.forEach((nd,i)=>{ctx.fillStyle=i===0?"#3fb950":"#8b5cf6";ctx.beginPath();ctx.arc(nd.x,nd.y,28,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.font="bold 18px monospace";ctx.textAlign="center";ctx.fillText(nd.l,nd.x,nd.y+6)});
ctx.fillStyle="#8b949e";ctx.font="13px monospace";ctx.fillText("green = set representative (root)",400,480);
ctx.fillStyle="#3fb950";ctx.font="16px 'Segoe UI',sans-serif";ctx.fillText(["makeSet: every node is its own root","union(0,1): attach by rank","find(2): walk up to representative","path compression flattens the tree","connected(0,2)? same root → true"][currentStep],400,540);
}else if(id==="monotonic_stack"){
ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);
const nums=[2,1,2,4,3,1];const mw=90,mx=110;
const resolved=[];if(currentStep>=2){resolved.push([1,2]);resolved.push([0,4]);}
nums.forEach((v,i)=>{const x=mx+i*mw;ctx.fillStyle="#161b22";ctx.fillRect(x,180,70,70);ctx.strokeStyle="#30363d";ctx.strokeRect(x,180,70,70);
ctx.fillStyle=resolved.some(r=>r[0]===i)?"#3fb950":"#e6edf3";ctx.font="bold 20px monospace";ctx.textAlign="center";ctx.fillText(v,x+35,222);
if(resolved.some(r=>r[0]===i)){const ng=resolved.find(r=>r[0]===i)[1];ctx.fillStyle="#3fb950";ctx.font="12px monospace";ctx.fillText("→"+ng,x+35,270)}});
const st=["[0]","[0,1]","[3]","[3,4]","[3,4,5]"];const stIdx=Math.min(currentStep,4);
ctx.fillStyle="#8b5cf6";ctx.font="14px monospace";ctx.fillText("stack (indices, values ↓): "+st[stIdx],400,340);
ctx.fillStyle="#a78bfa";ctx.fillText("pop while top < current → resolve them",400,380);
ctx.fillStyle="#3fb950";ctx.font="16px 'Segoe UI',sans-serif";ctx.fillText(["push i=0 (value 2)","val 4 pops 1 and 2 → both resolve to 4","resolved so far: [0]→4, [1]→2, [2]→4","peek: top stays (no smaller elements)","remaining indices get -1 — done"][currentStep],400,450);
${anchor}`;
  html = html.replace(anchor, renderers);
  log('renderers added for a_star, n_queens, kadane, union_find, monotonic_stack');
}

// ---------- 2. i18n ----------
if (!html.includes('drill:"')) {
  html = html.replace(
    'achievements:"Achievements",close:"Close",correct:"Correct!",incorrect:"Not quite."',
    'achievements:"Achievements",close:"Close",correct:"Correct!",incorrect:"Not quite.",drill:"Code Drill",drillDesc:"Quick-fire questions from concepts you have already seen",startDrill:"Start Drill",score:"Score",drillDone:"Drill complete",again:"Play again"'
  );
  html = html.replace(
    'achievements:"نشان‌ها و دستاوردها",close:"بستن",correct:"صحیح!",incorrect:"اشتباه بود."',
    'achievements:"نشان‌ها و دستاوردها",close:"بستن",correct:"صحیح!",incorrect:"اشتباه بود.",drill:"آزمون برق‌آسا",drillDesc:"سؤال‌های سریع از مفاهیمی که دیده‌اید",startDrill:"شروع آزمون",score:"امتیاز",drillDone:"آزمون تمام شد",again:"دوباره"'
  );
  log('i18n terms added (EN/FA)');
}

// ---------- 3. header button ----------
if (!html.includes('id="drillBtn"')) {
  html = html.replace(
    '<button class="quiz-btn" id="quizBtn" aria-label="Take concept quiz">💡 Quiz</button>',
    '<button class="quiz-btn" id="drillBtn" aria-label="Code Drill mode">⚡ <span id="drillBtnLabel">Code Drill</span></button>\r\n    <button class="quiz-btn" id="quizBtn" aria-label="Take concept quiz">💡 Quiz</button>'
  );
  log('Code Drill header button added');
}

// ---------- 4. drill modal ----------
if (!html.includes('id="drillModal"')) {
  html = html.replace('<canvas id="shareCanvas"',
    '<div class="modal-backdrop" id="drillModal" style="display:none">\r\n  <div class="modal-card" id="drillCardBody" style="max-width:560px;width:95%"></div>\r\n</div>\r\n<canvas id="shareCanvas"');
  log('Code Drill modal added');
}

// ---------- 5. drill engine (placed after applyLang so build.js cannot wipe it) ----------
if (!html.includes('function startCodeDrill')) {
  const drill = fs.readFileSync(__dirname + '/drill_engine.js', 'utf8');
  const anchor = 'document.getElementById("langBtn").onclick';
  if (!html.includes(anchor)) throw new Error('langBtn anchor missing');
  html = html.replace(anchor, drill.replace(/\n/g, '\r\n') + '\r\n' + anchor);
  log('Code Drill engine injected');
}

// ---------- 6. badge + unlock rule (badges array lives in build.js-managed region) ----------
if (!html.includes('drill_master')) {
  const m = html.indexOf('const badges = [');
  if (m === -1) throw new Error('badges array missing');
  const start = html.indexOf('[', m);
  const end = html.indexOf('];', m);
  const arr = JSON.parse(html.substring(start, end + 1));
  arr.push({
    id: "drill_master", icon: "⚡",
    title: { en: "Drill Master", fa: "استاد آزمون برق‌آسا" },
    desc: { en: "Achieved a perfect score in a 5-question Code Drill", fa: "در آزمون برق‌آسای ۵ سؤالی نمره کامل گرفتید" }
  });
  html = html.substring(0, start) + JSON.stringify(arr) + html.substring(end + 1);
  html = html.replace('else if (b.id === "speed_demon" && stats.battleDone) unlocked = true;',
    'else if (b.id === "speed_demon" && stats.battleDone) unlocked = true;\r\n    else if (b.id === "drill_master" && stats.drillPerfect) unlocked = true;');
  log('drill_master badge + unlock rule added');
}

// ---------- 7. wire button + applyLang label ----------
if (!html.includes('getElementById("drillBtn").onclick')) {
  html = html.replace(
    'if(document.getElementById("quizBtn")) document.getElementById("quizBtn").onclick = openConceptQuiz;',
    'if(document.getElementById("quizBtn")) document.getElementById("quizBtn").onclick = openConceptQuiz;\r\nif(document.getElementById("drillBtn")) document.getElementById("drillBtn").onclick = startCodeDrill;'
  );
  html = html.replace(
    'const bt = document.getElementById("battleBtn"); if(bt) bt.textContent="⚔️ " + (t("battle") || "Race");',
    'const bt = document.getElementById("battleBtn"); if(bt) bt.textContent="⚔️ " + (t("battle") || "Race");\r\nconst dr = document.getElementById("drillBtn"); if(dr && document.getElementById("drillBtnLabel")) document.getElementById("drillBtnLabel").textContent = t("drill") || "Code Drill";'
  );
  log('button events + applyLang label wired');
}

fs.writeFileSync(FILE, html, 'utf8');

// syntax gate
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 5 OK: ' + changed + ' patch(es), index.html syntax verified ---');
