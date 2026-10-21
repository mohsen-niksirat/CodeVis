// phase28.js — dedicated canvas renderers for the 4 newest concepts
// (bellman_ford, kruskal, segment_tree, huffman). They previously fell through
// to the generic queue strip, which showed a meaningless enqueue/dequeue bar
// for graph/tree/coding algorithms.
// Idempotent: bails when the bellman_ford branch already exists.
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(FILE, 'utf8');
let n = 0;
const log = (m) => { n++; console.log('[phase28-' + n + '] ' + m); };

if (!html.includes('id==="bellman_ford"')) {
  const anchor = 'ctx.fillText(["string to match","anchors ^ and $","character classes [a-z]","quantifiers + * ?","capture groups ()"][currentStep],400,500);\r\n}\r\n}';
  if (!html.includes(anchor)) throw new Error('phase28: regex branch anchor not found');

  const renderers = [
    '}else if(id==="bellman_ford"){',
    'ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);',
    'const nodes=[["S",70,300],["A",230,180],["B",390,300],["C",550,180]];',
    'const edges=[["S","A",4],["A","B",2],["B","C",-1]];',
    'const distByStep=[{S:0,A:Infinity,B:Infinity,C:Infinity},{S:0,A:4,B:Infinity,C:Infinity},{S:0,A:4,B:2,C:Infinity},{S:0,A:4,B:2,C:1},{S:0,A:4,B:2,C:1}];',
    'const dist=distByStep[Math.min(currentStep,4)];',
    'const relaxed=currentStep>=1&&currentStep<=3?edges[currentStep-1]:null;',
    'nodes.forEach(nd=>{const name=nd[0],nx=nd[1],ny=nd[2];',
    'const isSrc=name==="S";',
    'ctx.beginPath();ctx.arc(nx,ny,26,0,Math.PI*2);',
    'ctx.fillStyle=isSrc?"#3fb950":"#161b22";ctx.fill();',
    'ctx.strokeStyle=isSrc?"#3fb950":"#8b5cf6";ctx.lineWidth=2;ctx.stroke();',
    'ctx.fillStyle="#fff";ctx.font="bold 16px monospace";ctx.fillText(name,nx,ny+5);',
    'const dv=dist[name];',
    'ctx.fillStyle=dv===Infinity?"#484f58":"#a78bfa";ctx.font="13px monospace";',
    'ctx.fillText("d="+((dv===Infinity)?"\\u221E":dv),nx,ny+44);',
    '});',
    'edges.forEach(ed=>{const u=ed[0],v=ed[1],w=ed[2];',
    'const a=nodes.find(x=>x[0]===u),b=nodes.find(x=>x[0]===v);',
    'const active=relaxed&&(relaxed[0]===u&&relaxed[1]===v);',
    'ctx.strokeStyle=active?"#3fb950":"#30363d";ctx.lineWidth=active?3:1.5;',
    'ctx.beginPath();ctx.moveTo(a[1]+26,a[2]);ctx.lineTo(b[1]-26,b[2]);ctx.stroke();',
    'ctx.fillStyle=active?"#3fb950":"#8b949e";ctx.font="13px monospace";',
    'ctx.fillText(String(w),(a[1]+b[1])/2,(a[2]+b[2])/2-10);',
    '});',
    'ctx.fillStyle="#c9d1d9";ctx.font="15px \'Segoe UI\',sans-serif";',
    'const msgs=["init: dist[S]=0, rest = \\u221E","relax S\\u2192A: dist[A]=4","relax A\\u2192B: dist[B]=2","relax B\\u2192C: dist[C]=1","done \\u2014 no negative cycle (V\\u22121 passes)"];',
    'ctx.fillText(msgs[Math.min(currentStep,4)],400,480);',
    'if(currentStep===4){ctx.fillStyle="#3fb950";ctx.font="bold 15px monospace";ctx.fillText("final shortest paths from S",400,520)}',
    '}else if(id==="kruskal"){',
    'ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);',
    'const pos={A:[140,420],B:[400,180],C:[560,420],D:[400,420]};',
    'const accepted=[],rejected=[];',
    'if(currentStep>=1)accepted.push("B-C");',
    'if(currentStep>=2)accepted.push("A-B");',
    'if(currentStep===3)rejected.push("A-C");',
    'const realEdges=[["A","B",2],["A","C",3],["A","D",6],["B","C",1],["B","D",5],["C","D",4]];',
    'realEdges.forEach(ed=>{const u=ed[0],v=ed[1],w=ed[2];',
    'const a=pos[u],b=pos[v];',
    'const inMst=accepted.some(e=>e===u+"-"+v||e===v+"-"+u);',
    'const isReject=currentStep===3&&((u==="A"&&v==="C")||(u==="C"&&v==="A"));',
    'ctx.strokeStyle=inMst?"#3fb950":isReject?"#f85149":"#30363d";',
    'ctx.lineWidth=inMst?3:isReject?2:1.2;',
    'ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();',
    'ctx.fillStyle=inMst?"#3fb950":isReject?"#f85149":"#8b949e";',
    'ctx.font="12px monospace";ctx.fillText(String(w),(a[0]+b[0])/2+8,(a[1]+b[1])/2-6);',
    '});',
    'Object.keys(pos).forEach(name=>{const nx=pos[name][0],ny=pos[name][1];',
    'ctx.beginPath();ctx.arc(nx,ny,22,0,Math.PI*2);',
    'ctx.fillStyle="#161b22";ctx.fill();',
    'ctx.strokeStyle="#8b5cf6";ctx.lineWidth=2;ctx.stroke();',
    'ctx.fillStyle="#fff";ctx.font="bold 15px monospace";ctx.fillText(name,nx,ny+5);',
    '});',
    'ctx.fillStyle="#c9d1d9";ctx.font="15px \'Segoe UI\',sans-serif";',
    'const kmsgs=["sort edges by weight \\u2191","accept B-C (w=1) \\u2014 no cycle","accept A-B (w=2) \\u2014 no cycle","reject A-C (w=3) \\u2014 would close a cycle","MST complete \\u2014 total weight 9"];',
    'ctx.fillText(kmsgs[Math.min(currentStep,4)],400,520);',
    'ctx.fillStyle="#3fb950";ctx.font="13px monospace";',
    'ctx.fillText("MST edges: "+(accepted.join(", ")||"\\u2014"),400,555);',
    '}else if(id==="segment_tree"){',
    'ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);',
    'const leaves=[2,4,1,7];',
    'const lx=[180,330,480,630];',
    'const draw=(x,y,w,label,color)=>{ctx.fillStyle=color;roundRect(x-w/2,y-18,w,36,6);ctx.fill();ctx.fillStyle="#fff";ctx.font="bold 14px monospace";ctx.textAlign="center";ctx.fillText(label,x,y+5)};',
    'const edge=(x1,y1,x2,y2)=>{ctx.strokeStyle="#30363d";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};',
    'const y1=140,y2=250,y3=380;',
    'edge(400,y1+18,255,y2-18);edge(400,y1+18,555,y2-18);',
    'edge(255,y2+18,lx[0],y3-18);edge(255,y2+18,lx[1],y3-18);',
    'edge(555,y2+18,lx[2],y3-18);edge(555,y2+18,lx[3],y3-18);',
    'const updated=currentStep>=4;',
    'const rootV=currentStep>=4?15:14, mid1=currentStep>=4?5:6, mid2=currentStep>=4?9:8;',
    'draw(400,y1,90,"["+rootV+"]","#8b5cf6");',
    'draw(255,y2,80,"["+mid1+"]","#161b22");draw(555,y2,80,"["+mid2+"]","#161b22");',
    'leaves.forEach((v,i)=>draw(lx[i],y3,64,"["+(i===2&&updated?9:v)+"]",i===2&&updated?"#f0883e":"#161b22"));',
    'ctx.fillStyle="#8b949e";ctx.font="12px monospace";ctx.textAlign="center";',
    'leaves.forEach((v,i)=>ctx.fillText("a["+i+"]="+v,lx[i],y3+40));',
    'ctx.fillStyle="#c9d1d9";ctx.font="15px \'Segoe UI\',sans-serif";',
    'const smsgs=["build: leaves from arr [2,4,1,7]","merge up: [6]=a0+a1, [8]=a2+a3, root [14]","query [1,3): decompose \\u2192 [4]+[1] = 5","update a[2]=9 \\u2192 propagate up","re-query [1,3): 4+9 = 13"];',
    'ctx.fillText(smsgs[Math.min(currentStep,4)],400,480);',
    '}else if(id==="huffman"){',
    'ctx.fillText(currentConcept.title[lang]||currentConcept.title.en,400,40);',
    'const hy={leaf:420,n1:300,root:170};',
    'const hnode=(x,y,label,color)=>{ctx.beginPath();ctx.arc(x,y,26,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle="#8b5cf6";ctx.lineWidth=2;ctx.stroke();ctx.fillStyle="#fff";ctx.font="bold 14px monospace";ctx.fillText(label,x,y+5)};',
    'const hleaf=(x,y,label)=>{ctx.fillStyle="#161b22";roundRect(x-30,y-18,60,36,6);ctx.fill();ctx.strokeStyle="#30363d";ctx.lineWidth=1.5;ctx.strokeRect(x-30,y-18,60,36);ctx.fillStyle="#fff";ctx.font="bold 14px monospace";ctx.fillText(label,x,y+5)};',
    'const hedge=(x1,y1,x2,y2)=>{ctx.strokeStyle="#30363d";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};',
    'const merged1=currentStep>=1, merged2=currentStep>=2, coded=currentStep>=3;',
    'hedge(200,hy.leaf-18,330,hy.n1+18);hedge(460,hy.leaf-18,390,hy.n1+18);',
    'if(merged2){hedge(330,hy.n1-18,400,hy.root+18);hedge(560,hy.leaf-18,430,hy.root+18)}',
    'hleaf(200,hy.leaf,"b:2");hleaf(460,hy.leaf,"c:1");',
    'if(merged1)hnode(360,hy.n1,"3",merged2?"#8b5cf6":"#161b22");',
    'if(merged2)hnode(400,hy.root,"8","#3fb950");',
    'hleaf(560,hy.leaf,"a:5");',
    'ctx.fillStyle="#c9d1d9";ctx.font="15px \'Segoe UI\',sans-serif";',
    'const hmsgs=["freqs: a:5 b:2 c:1","merge two least: c(1)+b(2)=3","merge again: 3+a(5)=8 \\u2192 root","codes: a=0, b=10, c=11 (prefix-free)","encoded: 13 bits vs 24 raw \\u2014 33% saved"];',
    'ctx.fillText(hmsgs[Math.min(currentStep,4)],400,500);',
    'if(coded){ctx.fillStyle="#a78bfa";ctx.font="13px monospace";ctx.fillText("a \\u2192 0    b \\u2192 10    c \\u2192 11",400,540)}',
    '}'
  ].join('\r\n');

  html = html.replace(anchor, 'ctx.fillText(["string to match","anchors ^ and $","character classes [a-z]","quantifiers + * ?","capture groups ()"][currentStep],400,500);\r\n' + renderers + '\r\n}');
  log('dedicated renderers for bellman_ford, kruskal, segment_tree, huffman');
}

fs.writeFileSync(FILE, html, 'utf8');
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
new Function(blocks.sort((a, b) => b.length - a.length)[0]);
console.log('--- Phase 28 OK: ' + n + ' patch(es) ---');
