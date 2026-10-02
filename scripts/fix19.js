// CodeVis Hotfix 19 — user-reported bugs:
// 1) Confetti spam: nextStep used modulo wrap → autoplay loops forever, re-triggering
//    markDone/confetti every cycle. Fix: stop at last step unless loopEnabled.
// 2) markDone dedupe: only celebrate once per concept per day.
// 3) Fullscreen: make the concept card the fullscreen target (with its controls),
//    allow scrolling inside it, and keep play controls visible.
const fs = require('fs');
const FILE = 'index.html';
let html = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const log = m => { changed++; console.log('[fix19-' + changed + '] ' + m); };

// --- 1) Fix nextStep: no wrap; stop at end unless loop; markDone once
if (html.includes('currentStep=(currentStep+1)%currentConcept.steps.length')) {
  html = html.replace(
    'function nextStep(){if(!currentConcept)return;currentStep=(currentStep+1)%currentConcept.steps.length;animProgress=0;cancelAnimationFrame(animRAF);playTone(320+(currentStep+1)*80,0.06);animateTransition();syncCodeLine();updateTimelineSlider();if(currentStep===currentConcept.steps.length-1)markDone()}',
    'function nextStep(){if(!currentConcept)return;if(currentStep>=currentConcept.steps.length-1){if(loopEnabled){currentStep=0;drawStep();syncCodeLine();updateTimelineSlider();return}if(isPlaying)togglePlay();markDone();return}currentStep++;animProgress=0;cancelAnimationFrame(animRAF);playTone(320+(currentStep+1)*80,0.06);animateTransition();syncCodeLine();updateTimelineSlider()}'
  );
  log('nextStep: stop at last step (no modulo wrap)');
}

// --- 2) markDone: celebrate once per concept per session
if (!html.includes('cvCelebrated')) {
  html = html.replace(
    'function markDone(){',
    'function markDone(){if(window.cvCelebrated&&window.cvCelebrated.has(currentConcept.id))return;(window.cvCelebrated=window.cvCelebrated||new Set()).add(currentConcept.id);'
  );
  log('markDone: once-per-concept celebration');
}

// --- 3) Fullscreen: target the concept card, scrollable, controls visible
if (!html.includes('body.fs-active')) {
  const css = `
/* fs-active: fullscreen playground */
body.fs-active{overflow:hidden}
body.fs-active .card.glass{position:fixed!important;inset:0;z-index:99990;border-radius:0;overflow-y:auto!important;-webkit-overflow-scrolling:touch;padding:16px;max-height:100vh}
body.fs-active .step-controls{position:sticky;bottom:0;background:rgba(13,17,23,.92);backdrop-filter:blur(8px);padding:8px 4px;border-radius:8px;z-index:2}
body.fs-active #animCanvas{max-width:100%;height:auto;max-height:62vh}
[data-theme="light"] body.fs-active .step-controls{background:rgba(240,242,246,.92)}
`;
  html = html.replace('</style>', css.replace(/\n/g, '\r\n') + '</style>');
  html = html.replace(
    'document.body.classList.toggle("fullscreen",isFullscreen)};',
    'document.body.classList.toggle("fullscreen",isFullscreen);document.body.classList.toggle("fs-active",isFullscreen)};'
  );
  log('fullscreen: card fills screen, scrollable, sticky controls');
}

fs.writeFileSync(FILE, html, 'utf8');
const s = html.indexOf('<script>');
const e = html.indexOf('</script>', s);
new Function(html.substring(s + 8, e));
console.log('--- Fix19 OK: ' + changed + ' patch(es) ---');
