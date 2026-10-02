// CodeVis Phase 14 — Live operation metrics overlay + custom array input for sorting concepts.
// Idempotent, chained after phase13 (runs inside build chain via scripts/phase14.js).
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase14-' + changed + '] ' + m); };

// 1) Metrics HUD over canvas + custom-array bar (HTML), before .step-controls
if (!html.includes('id="metricsHud"')) {
  const hud = [
    '<div id="metricsHud" class="metrics-hud" style="display:none">',
    '<span id="mCmp">Cmp: 0</span><span id="mSwap">Swap: 0</span><span id="mAcc">Acc: 0</span>',
    '</div>',
    '<div id="customArrayBar" style="display:none;gap:8px;margin:8px 0;flex-wrap:wrap;align-items:center">',
    '<input type="text" id="customArrayInput" placeholder="e.g. 5,3,8,1,9" style="flex:1;min-width:160px" aria-label="Custom array">',
    '<button class="secondary" id="applyArrayBtn">Apply</button>',
    '<button class="secondary" id="randArrayBtn">🎲 Random</button>',
    '<select id="arrayPattern" aria-label="Array pattern">',
    '<option value="random">Random</option><option value="mountain">Mountain</option>',
    '<option value="wave">Wave</option><option value="nearly">Nearly Sorted</option>',
    '<option value="reverse">Reverse</option>',
    '</select>',
    '</div>'
  ].join('\r\n');
  html = html.replace('<div class="step-controls">', hud + '\r\n<div class="step-controls">');
  log('metrics HUD + custom array bar HTML');
}

// 2) CSS for HUD
if (!html.includes('.metrics-hud{')) {
  const css = `
.metrics-hud{display:flex;gap:14px;justify-content:center;font-family:'Fira Code',monospace;font-size:.8rem;color:#c4b5fd;background:rgba(13,17,23,.6);border:1px solid rgba(139,92,246,.3);border-radius:8px;padding:6px 12px;margin:8px auto;width:fit-content}
.metrics-hud span{white-space:nowrap}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('HUD CSS');
}

// 3) Logic: compute metrics per step from step.type; show bar for sort concepts; wire custom array.
if (!html.includes('function updateMetrics')) {
  const anchor = 'function drawStep(){';
  const logic = [
    'const SORT_IDS=["bubbleSort","quicksort","mergesort","insertionsort","selectionsort","heapSort","kadane","quicksortAvg"];',
    'function computeMetrics(concept,upto){let cmp=0,swp=0,acc=0;for(let i=0;i<=upto&&i<concept.steps.length;i++){const s=concept.steps[i];',
    'if(s.type==="compare"||s.type==="cmp")cmp++;',
    'if(s.type==="swap"){swp++;acc+=2}',
    'if(s.type==="shift"||s.type==="access"||s.type==="visit"||s.type==="pick")acc++;',
    '}return{cmp,swp,acc}}',
    'function updateMetrics(){',
    'const hud=document.getElementById("metricsHud");if(!hud||!currentConcept)return;',
    'if(!SORT_IDS.includes(currentConcept.id)){hud.style.display="none";const bar=document.getElementById("customArrayBar");if(bar)bar.style.display="none";return}',
    'const m=computeMetrics(currentConcept,currentStep);',
    'document.getElementById("mCmp").textContent="Cmp: "+m.cmp;',
    'document.getElementById("mSwap").textContent="Swap: "+m.swp;',
    'document.getElementById("mAcc").textContent="Acc: "+m.acc;',
    'hud.style.display="flex";',
    'const bar=document.getElementById("customArrayBar");',
    'if(bar){const needsArray=["bubbleSort","quicksort","insertionsort","selectionsort","heapSort"].includes(currentConcept.id);bar.style.display=needsArray?"flex":"none"}',
    '}',
    'function parseCustomArray(txt){const v=txt.split(",").map(x=>parseFloat(x.trim())).filter(n=>isFinite(n)).slice(0,24);return v.length>=2?v:null}',
    'function makeArray(pattern,n){n=n||12;const base=Array.from({length:n},()=>Math.floor(Math.random()*90)+5);',
    'if(pattern==="mountain")return base.map((_,i)=>Math.round(50+45*Math.sin(Math.PI*i/(n-1)))+Math.floor(Math.random()*4));',
    'if(pattern==="wave")return base.map((_,i)=>Math.round(50+40*Math.sin(i*1.2)));',
    'if(pattern==="nearly"){const a=base.slice().sort((x,y)=>x-y);const i=Math.floor(Math.random()*(n-1));[a[i],a[i+1]]=[a[i+1],a[i]];return a}',
    'if(pattern==="reverse")return base.slice().sort((x,y)=>y-x);',
    'return base}',
    'function applyCustomArray(){const inp=document.getElementById("customArrayInput");if(!inp)return;const v=parseCustomArray(inp.value);if(!v){cvToast&&cvToast("Enter 2+ comma-separated numbers");return}',
    'customState=Object.assign({},customState,{array:v,values:v});if(typeof burstConfetti==="function")burstConfetti(0);currentStep=0;drawStep()}',
    'function applyPatternArray(){const sel=document.getElementById("arrayPattern");const v=makeArray(sel.value,12);const inp=document.getElementById("customArrayInput");if(inp)inp.value=v.join(",");customState=Object.assign({},customState,{array:v,values:v});currentStep=0;drawStep()}'
  ].join('\r\n');
  html = html.replace(anchor, logic + '\r\n' + anchor);
  // hook updateMetrics into drawStep prelude
  html = html.replace(
    'if(typeof playSonification==="function"&&soundEnabled&&typeof currentStep!=="undefined")playSonification(stepToneFreq(),0,100);',
    'if(typeof playSonification==="function"&&soundEnabled&&typeof currentStep!=="undefined")playSonification(stepToneFreq(),0,100);\nif(typeof updateMetrics==="function")updateMetrics();'
  );
  log('metrics logic + drawStep hook');
}

// 4) Wire buttons once
if (!html.includes('applyArrayBtn").onclick')) {
  const anchor2 = 'const sBtn = document.getElementById("soundBtn");';
  const wiring = [
    'const abBtn=document.getElementById("applyArrayBtn");if(abBtn)abBtn.onclick=applyCustomArray;',
    'const raBtn=document.getElementById("randArrayBtn");if(raBtn)raBtn.onclick=applyPatternArray;',
    'const apSel=document.getElementById("arrayPattern");if(apSel)apSel.onchange=applyPatternArray;'
  ].join('\r\n');
  html = html.replace(anchor2, wiring + '\r\n' + anchor2);
  log('button wiring');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 14 OK: ' + changed + ' patch(es) ---');
