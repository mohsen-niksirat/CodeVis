// CodeVis Phase 10 — Visual intensity boost (from design review):
// stronger aurora, true glass feel (borders+glow), purple accent sliders, contrast fixes.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase10-' + changed + '] ' + m); };

if (!html.includes('cvAuroraBoost')) {
  const css = `
/* Phase 10: visual intensity */
#auroraCanvas{opacity:.9!important}
.cv-gradient-blob{opacity:.5!important;filter:blur(70px)!important}
[data-theme="light"] #auroraCanvas{opacity:.5!important}
.glass{border:1px solid rgba(139,92,246,.35)!important;box-shadow:0 8px 32px rgba(0,0,0,.45),inset 0 1px 0 rgba(167,139,250,.15)!important}
.glass:hover{border-color:rgba(139,92,246,.55)}
input[type="range"]{accent-color:#8b5cf6}
select,input[type="text"]{scrollbar-width:thin}
.desc,.hero-sub{color:#adbac7!important}
.cv-toast{border-color:rgba(63,185,80,.5)}
.gallery-card{border-color:rgba(139,92,246,.28)!important}
.gallery-card:hover{border-color:rgba(139,92,246,.7)!important;box-shadow:0 12px 28px rgba(139,92,246,.4)!important}
` +
`/* cvAuroraBoost marker */`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('intensity boost CSS applied');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 10 OK: ' + changed + ' patch(es) ---');
