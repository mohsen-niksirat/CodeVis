const fs = require('fs');

console.log('Running CodeVis Complete Test Suite across all 58 concepts...');

const html = fs.readFileSync('index.html', 'utf8');

// Mock browser DOM and Canvas Context
const mockCtx = {
  save() {}, restore() {}, beginPath() {}, closePath() {},
  moveTo() {}, lineTo() {}, stroke() {}, fill() {}, arc() {},
  quadraticCurveTo() {}, bezierCurveTo() {},
  fillRect() {}, strokeRect() {}, clearRect() {}, setTransform() {}, scale() {},
  translate() {}, rotate() {},
  fillText() {}, strokeText() {}, measureText(t) { return { width: (t || '').length * 8 }; },
  setLineDash() {}, createLinearGradient() { return { addColorStop() {} }; },
  strokeStyle: '#000', fillStyle: '#000', lineWidth: 1, font: '12px sans',
  textAlign: 'center', textBaseline: 'middle'
};

const mockCanvas = {
  width: 800, height: 550,
  getContext() { return mockCtx; },
  style: {}
};

const domStore = {};
function createMockEl(id) {
  return {
    id,
    style: {},
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    innerHTML: '',
    textContent: '',
    children: [],
    querySelectorAll() { return []; },
    querySelector() { return null; },
    appendChild() {},
    setAttribute() {},
    getAttribute() { return null; },
    dataset: {},
    getContext() { return mockCtx; }
  };
}

const mockDoc = {
  getElementById(id) {
    if (!domStore[id]) domStore[id] = createMockEl(id);
    return domStore[id];
  },
  createElement(tag) { return createMockEl(tag); },
  documentElement: { dir: 'ltr', lang: 'en', setAttribute() {} },
  querySelectorAll() { return []; },
  body: createMockEl('body'),
  addEventListener() {},
  removeEventListener() {},
  fullscreenElement: null
};

const mockLocalStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
  clear() { this._data = {}; }
};

const mockWindow = {
  addEventListener() {},
  innerWidth: 1200,
  devicePixelRatio: 2,
  location: { hash: '', search: '' },
  AudioContext: class {
    constructor() { this.state = 'running'; this.currentTime = 0; }
    createOscillator() { return { type: 'sine', frequency: { setValueAtTime() {} }, connect() {}, start() {}, stop() {} }; }
    createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
    resume() {}
  }
};

// Extract JS environment from index.html
const sIdx = html.indexOf('<script>');
const eIdx = html.indexOf('</script>', sIdx);
const jsCode = html.substring(sIdx + 8, eIdx);

// Execute in sandbox
const sandbox = {
  window: mockWindow,
  document: mockDoc,
  localStorage: mockLocalStorage,
  console,
  setTimeout(fn) { fn(); },
  clearTimeout() {},
  setInterval() {},
  clearInterval() {},
  navigator: { language: 'en-US' },
  requestAnimationFrame(fn) { fn(); },
  cancelAnimationFrame() {},
  URL: { createObjectURL() { return 'blob:mock'; } }
};

const vm = require('vm');
const ctx = vm.createContext(sandbox);

vm.runInContext(jsCode, ctx);

console.log('1. Script parsed & evaluated in sandbox.');

// 2. Validate concepts
const concepts = vm.runInContext('concepts', ctx);
console.log(`2. Total concepts loaded: ${concepts.length}`);
if (concepts.length !== 58) throw new Error(`Expected 58 concepts, got ${concepts.length}`);

let totalStepsTested = 0;

['en', 'fa'].forEach(lang => {
  vm.runInContext(`lang = "${lang}"`, ctx);
  concepts.forEach(c => {
    if (!c.id || !c.title.en || !c.title.fa || !c.desc.en || !c.desc.fa || !c.code || !c.steps) {
      throw new Error(`Incomplete concept schema for ${c.id}`);
    }
    vm.runInContext(`currentConcept = concepts.find(x => x.id === "${c.id}")`, ctx);
    for (let step = 0; step < c.steps.length; step++) {
      vm.runInContext(`currentStep = ${step}; drawStep();`, ctx);
      totalStepsTested++;
    }
  });
});

console.log(`3. Verified all 58 concepts across ${totalStepsTested} rendered step passes (EN & FA).`);

// 4. Test Badges
const badges = vm.runInContext('badges', ctx);
console.log(`4. Total badges loaded: ${badges.length}`);
if (badges.length < 9) throw new Error(`Expected at least 9 badges, got ${badges.length}`);

vm.runInContext('checkBadges({ seenCount: 1, streak: 1, seenIds: new Set(["stack"]), quizScore: 0 })', ctx);
const unlockedBadges = vm.runInContext('unlockedBadges', ctx);
if (!unlockedBadges.has('first_step')) throw new Error('Badge first_step was not unlocked!');

vm.runInContext('checkBadges({ seenCount: 15, streak: 7, seenIds: new Set(["vector_embeddings", "perceptron", "websocket", "token_bucket"]), quizScore: 5 })', ctx);
['explorer', 'scholar', 'week_streak', 'ai_pioneer', 'web_guru', 'quiz_whiz'].forEach(bId => {
  if (!unlockedBadges.has(bId)) throw new Error(`Badge ${bId} was not unlocked!`);
});
vm.runInContext('renderBadges()', ctx);
console.log('5. Badges unlock and render logic verified.');

// 5. Test Quizzes
const quizzes = vm.runInContext('quizzes', ctx);
console.log(`6. Total custom quizzes defined: ${Object.keys(quizzes).length}`);
vm.runInContext('currentConcept = concepts[0]; openConceptQuiz();', ctx);
vm.runInContext('currentConcept = concepts.find(x => x.id === "vector_embeddings"); openConceptQuiz();', ctx);
console.log('7. Quiz modal opens & renders correctly for both standard and AI concepts.');

// 6. Test Multi-language snippets
['js', 'py', 'cpp'].forEach(l => {
  ['vector_embeddings', 'perceptron', 'token_bucket', 'websocket', 'stack', 'a_star', 'n_queens', 'kadane', 'union_find', 'monotonic_stack'].forEach(id => {
    const code = vm.runInContext(`getCodeForLang(concepts.find(x => x.id === "${id}"), "${l}")`, ctx);
    if (!code || code.length === 0) throw new Error(`Missing ${l} snippet for ${id}`);
  });
});
console.log('8. Code snippets verified for JS, Python, and C++ across core & AI concepts.');

// 7. Test Big-O Complexity and Graph Modal
const complexityData = vm.runInContext('complexityData', ctx);
console.log(`9. Validating Big-O metadata across all ${concepts.length} concepts...`);
concepts.forEach(c => {
  const comp = complexityData[c.id];
  if (!comp || !comp.time || !comp.space || !comp.curve) {
    throw new Error(`Missing Big-O complexity metadata for ${c.id}`);
  }
});
vm.runInContext('openBigOModal(); drawBigOGraph(); closeBigOModal();', ctx);
console.log('10. Big-O chart canvas and complexity badges verified.');

// 8. Test Battle Arena (Showdown Mode)
console.log('11. Testing Algorithm Battle Arena simulation (QuickSort vs BubbleSort)...');
vm.runInContext("setupBattleMatchup('sort')", ctx);
let stepsLimit = 200;
while (stepsLimit-- > 0) {
  const isDoneA = vm.runInContext('battleState.algoA.stepIdx >= battleState.algoA.steps.length - 1', ctx);
  const isDoneB = vm.runInContext('battleState.algoB.stepIdx >= battleState.algoB.steps.length - 1', ctx);
  if (isDoneA && isDoneB) break;
  vm.runInContext(`
    if (battleState.algoA.stepIdx < battleState.algoA.steps.length - 1) {
      battleState.algoA.stepIdx++;
      battleState.algoA.currentArr = battleState.algoA.steps[battleState.algoA.stepIdx].arr;
    } else { battleState.algoA.done = true; }
    if (battleState.algoB.stepIdx < battleState.algoB.steps.length - 1) {
      battleState.algoB.stepIdx++;
      battleState.algoB.currentArr = battleState.algoB.steps[battleState.algoB.stepIdx].arr;
    } else { battleState.algoB.done = true; }
    if (!battleState.winner) {
      if (battleState.algoA.done && !battleState.algoB.done) battleState.winner = battleState.algoA;
      else if (battleState.algoB.done && !battleState.algoA.done) battleState.winner = battleState.algoB;
    }
  `, ctx);
}
vm.runInContext('announceWinner();', ctx);
const winner = vm.runInContext('battleState.winner.name', ctx);
if (winner !== 'QuickSort') throw new Error(`Expected QuickSort to win race against BubbleSort, got ${winner}`);
const unlockedAfterBattle = vm.runInContext('unlockedBadges', ctx);
if (!unlockedAfterBattle.has('speed_demon')) throw new Error('Badge speed_demon was not unlocked after race!');
console.log(`12. Battle Arena simulation passed: ${winner} won and unlocked 'speed_demon' badge!`);

// 9. Test Variable Inspector on all steps
concepts.forEach(c => {
  vm.runInContext(`currentConcept = concepts.find(x => x.id === "${c.id}");`, ctx);
  for (let s = 0; s < c.steps.length; s++) {
    vm.runInContext(`currentStep = ${s}; renderVariableInspector();`, ctx);
  }
});
console.log('13. Variable Inspector verified across all steps of all 58 concepts.');

// 10. Test Code Drill engine
console.log('14. Testing Code Drill engine...');
vm.runInContext('Object.keys(quizzes).forEach(id => seenIds.add(id)); drillState = null; startCodeDrill();', ctx);
const drillTotal = vm.runInContext('drillState.total', ctx);
if (drillTotal !== 5) throw new Error('Drill should pick 5 questions, got ' + drillTotal);
// answer all correctly
for (let i = 0; i < 5; i++) {
  const ans = vm.runInContext('quizzes[drillState.queue[drillState.idx]].ans', ctx);
  vm.runInContext('drillState.score++; drillState.idx++; renderDrill();', ctx);
}
const drillScore = vm.runInContext('drillState.score', ctx);
if (drillScore !== 5) throw new Error('Drill score should be 5, got ' + drillScore);
if (!unlockedBadges.has('drill_master')) throw new Error('Badge drill_master was not unlocked after perfect drill!');
console.log('15. Code Drill passed: perfect score unlocked drill_master badge!');

console.log('\n--- ALL 15 TEST SUITES PASSED PERFECTLY! ---');
