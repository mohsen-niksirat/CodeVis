// CodeVis Phase 16 — Speed presets (0.5x/1x/2x/4x), auto-replay loop toggle, step-back hardening.
// Idempotent.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase16-' + changed + '] ' + m); };

// 1) Preset chips + loop toggle in step-controls
if (!html.includes('id="speedPresets"')) {
  const ui = [
    '<span id="speedPresets" class="speed-presets">',
    '<button class="secondary preset" data-mult="2">0.5x</button>',
    '<button class="secondary preset active" data-mult="1">1x</button>',
    '<button class="secondary preset" data-mult="0.5">2x</button>',
    '<button class="secondary preset" data-mult="0.25">4x</button>',
    '</span>',
    '<button class="secondary" id="loopBtn" title="Auto-replay">🔁 Loop</button>'
  ].join('\r\n');
  html = html.replace('<span class="step-indicator" id="stepInfo"', ui + '\r\n<span class="step-indicator" id="stepInfo"');
  log('preset chips + loop button');
}

// 2) CSS
if (!html.includes('.speed-presets{')) {
  const css = `
.speed-presets{display:inline-flex;gap:4px}
.speed-presets .preset{padding:2px 8px;font-size:.75rem}
.speed-presets .preset.active{border-color:#8b5cf6;color:#c4b5fd;background:rgba(139,92,246,.15)}
#loopBtn.active{border-color:#3fb950;color:#3fb950;background:rgba(63,185,80,.12)}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('presets CSS');
}

// 3) Logic: multiplier applied to stepDuration; loop replays at end
if (!html.includes('speedMultiplier')) {
  const anchor = 'const sBtn = document.getElementById("soundBtn");';
  const logic = [
    'let speedMultiplier=1;let loopEnabled=false;',
    'function applySpeedMultiplier(){',
    'const slider=document.getElementById("speedSlider");',
    'const base=parseFloat(slider.value);',
    'stepDuration=Math.max(80,Math.round(base*speedMultiplier));',
    'document.getElementById("speedValue").textContent=stepDuration+"ms";',
    'if(isPlaying){togglePlay();togglePlay()}}',
    'document.querySelectorAll("#speedPresets .preset").forEach(b=>{b.onclick=()=>{',
    'document.querySelectorAll("#speedPresets .preset").forEach(x=>x.classList.remove("active"));',
    'b.classList.add("active");speedMultiplier=parseFloat(b.dataset.mult);applySpeedMultiplier()}});',
    'const loopB=document.getElementById("loopBtn");',
    'if(loopB)loopB.onclick=()=>{loopEnabled=!loopEnabled;loopB.classList.toggle("active",loopEnabled)};',
    '// hook into nextStep end-of-animation for loop replay',
    'if(typeof window.__cvNextStep!=="function"){window.__cvNextStep=nextStep;}',
    'nextStep=function(){',
    '  if(currentStep>=currentConcept.steps.length-1){',
    '    if(loopEnabled){currentStep=0;drawStep();return}',
    '  }',
    '  return window.__cvNextStep.apply(this,arguments);',
    '};'
  ].join('\r\n');
  html = html.replace(anchor, logic + '\r\n' + anchor);
  log('speed/loop logic');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 16 OK: ' + changed + ' patch(es) ---');
