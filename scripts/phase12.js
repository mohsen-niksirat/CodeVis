// CodeVis Phase 12 — Final polish: bolder glass, streak encouragement, code wrap fix.
const fs = require('fs');

const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = (m) => { changed++; console.log('[phase12-' + changed + '] ' + m); };

if (!html.includes('cvPolishFinal')) {
  const css = `
/* cvPolishFinal */
.glass{background:rgba(18,22,30,.30)!important;backdrop-filter:blur(30px) saturate(160%)!important;-webkit-backdrop-filter:blur(30px) saturate(160%)!important;border:1px solid rgba(180,155,255,.50)!important;box-shadow:0 12px 48px rgba(0,0,0,.55),inset 0 1.5px 0 rgba(220,200,255,.30)!important}
.card pre,.card code{white-space:pre-wrap;word-break:break-word}
#streakPill,#streakBadge,.streak{font-weight:700}
[data-theme="light"] .glass{background:rgba(255,255,255,.45)!important}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  log('bold glass + code wrap');
}


if (!html.includes('cvPolishFix4')) {
  const css2 = "\r\n/* cvPolishFix4 */\r\npre, code, .code-area, .codeblock, .code-block {white-space:pre-wrap!important;word-break:break-word!important;overflow-x:hidden!important}\r\n.glass{border:1px solid rgba(190,160,255,.65)!important;box-shadow:0 0 0 1px rgba(139,92,246,.25),0 12px 48px rgba(0,0,0,.55),inset 0 1.5px 0 rgba(220,200,255,.35),0 0 24px rgba(139,92,246,.15)!important}\r\n";
  html = html.replace('</style>', css2 + '</style>');
  log('glow + code wrap v2');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Phase 12 OK: ' + changed + ' patch(es) ---');
