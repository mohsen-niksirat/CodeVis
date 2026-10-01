// Algorithm Battle Arena (Race & Comparison Mode)
let battleActive = false;
let battleInterval = null;
let battleMatchup = "sort"; // "sort" | "search"

const battleState = {
  array: [45, 12, 85, 32, 89, 21, 67, 9, 54, 76],
  algoA: { id: "quicksort", name: "QuickSort", complexity: "O(n log n)", steps: [], stepIdx: 0, comparisons: 0, swaps: 0, done: false, currentArr: [] },
  algoB: { id: "bubbleSort", name: "BubbleSort", complexity: "O(n²)", steps: [], stepIdx: 0, comparisons: 0, swaps: 0, done: false, currentArr: [] },
  winner: null
};

function openBattleModal() {
  const modal = document.getElementById("battleModal");
  if (!modal) return;
  modal.style.display = "flex";
  setupBattleMatchup("sort");
}

function closeBattleModal() {
  stopBattle();
  const modal = document.getElementById("battleModal");
  if (modal) modal.style.display = "none";
}

function setupBattleMatchup(type = "sort") {
  stopBattle();
  battleMatchup = type;
  battleState.winner = null;

  const resultEl = document.getElementById("battleResultBanner");
  if (resultEl) { resultEl.style.display = "none"; resultEl.innerHTML = ""; }

  if (type === "sort") {
    // Generate random 10 elements
    const raw = [55, 18, 92, 36, 73, 22, 64, 9, 41, 83];
    battleState.array = [...raw];
    battleState.algoA = { id: "quicksort", name: "QuickSort", complexity: "O(n log n)", steps: buildQuickSortSteps([...raw]), stepIdx: 0, comparisons: 0, swaps: 0, done: false, currentArr: [...raw] };
    battleState.algoB = { id: "bubbleSort", name: "BubbleSort", complexity: "O(n²)", steps: buildBubbleSortSteps([...raw]), stepIdx: 0, comparisons: 0, swaps: 0, done: false, currentArr: [...raw] };
  } else if (type === "search") {
    const raw = [12, 19, 27, 34, 45, 56, 68, 77, 85, 94];
    const target = 77;
    battleState.array = [...raw];
    battleState.algoA = { id: "binarysearch", name: "Binary Search", complexity: "O(log n)", steps: buildBinarySearchSteps([...raw], target), stepIdx: 0, comparisons: 0, swaps: 0, done: false, currentArr: [...raw] };
    battleState.algoB = { id: "linearSearch", name: "Linear Search", complexity: "O(n)", steps: buildLinearSearchSteps([...raw], target), stepIdx: 0, comparisons: 0, swaps: 0, done: false, currentArr: [...raw] };
  }

  updateBattleDOM();
  renderBattleCanvases();
}

function buildBubbleSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: "cmp", i: j, j: j + 1, arr: [...a] });
      if (a[j] > a[j + 1]) {
        const tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp;
        steps.push({ type: "swap", i: j, j: j + 1, arr: [...a] });
      }
    }
  }
  steps.push({ type: "done", arr: [...a] });
  return steps;
}

function buildQuickSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  function qs(l, r) {
    if (l >= r) return;
    const pivot = a[r];
    steps.push({ type: "pivot", p: r, arr: [...a] });
    let i = l - 1;
    for (let j = l; j < r; j++) {
      steps.push({ type: "cmp", i: j, j: r, arr: [...a] });
      if (a[j] < pivot) {
        i++;
        const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        steps.push({ type: "swap", i, j, arr: [...a] });
      }
    }
    const tmp = a[i + 1]; a[i + 1] = a[r]; a[r] = tmp;
    steps.push({ type: "swap", i: i + 1, j: r, arr: [...a] });
    const pi = i + 1;
    qs(l, pi - 1);
    qs(pi + 1, r);
  }
  qs(0, a.length - 1);
  steps.push({ type: "done", arr: [...a] });
  return steps;
}

function buildLinearSearchSteps(arr, target) {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: "cmp", i, target, arr: [...arr] });
    if (arr[i] === target) {
      steps.push({ type: "found", i, arr: [...arr] });
      break;
    }
  }
  steps.push({ type: "done", arr: [...arr] });
  return steps;
}

function buildBinarySearchSteps(arr, target) {
  const steps = [];
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    steps.push({ type: "cmp", i: mid, l, r, target, arr: [...arr] });
    if (arr[mid] === target) {
      steps.push({ type: "found", i: mid, arr: [...arr] });
      break;
    } else if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  steps.push({ type: "done", arr: [...arr] });
  return steps;
}

function startBattle() {
  if (battleActive) return;
  battleActive = true;
  const btn = document.getElementById("battleStartBtn");
  if (btn) btn.textContent = "⏸️ " + (lang === "fa" ? "توقف" : "Pause");

  battleInterval = setInterval(() => {
    let bothDone = true;

    // Advance Algo A
    if (battleState.algoA.stepIdx < battleState.algoA.steps.length - 1) {
      battleState.algoA.stepIdx++;
      const s = battleState.algoA.steps[battleState.algoA.stepIdx];
      battleState.algoA.currentArr = s.arr;
      if (s.type === "cmp") battleState.algoA.comparisons++;
      if (s.type === "swap") battleState.algoA.swaps++;
      bothDone = false;
      if (typeof playSonification === "function" && s.i !== undefined) {
        playSonification(battleState.algoA.currentArr[s.i] || 40);
      }
    } else {
      battleState.algoA.done = true;
    }

    // Advance Algo B
    if (battleState.algoB.stepIdx < battleState.algoB.steps.length - 1) {
      battleState.algoB.stepIdx++;
      const s = battleState.algoB.steps[battleState.algoB.stepIdx];
      battleState.algoB.currentArr = s.arr;
      if (s.type === "cmp") battleState.algoB.comparisons++;
      if (s.type === "swap") battleState.algoB.swaps++;
      bothDone = false;
    } else {
      battleState.algoB.done = true;
    }

    // Check winner
    if (!battleState.winner) {
      if (battleState.algoA.done && !battleState.algoB.done) {
        battleState.winner = battleState.algoA;
      } else if (battleState.algoB.done && !battleState.algoA.done) {
        battleState.winner = battleState.algoB;
      }
    }

    updateBattleDOM();
    renderBattleCanvases();

    if (bothDone) {
      stopBattle();
      announceWinner();
    }
  }, 120);
}

function stopBattle() {
  battleActive = false;
  if (battleInterval) { clearInterval(battleInterval); battleInterval = null; }
  const btn = document.getElementById("battleStartBtn");
  if (btn) btn.textContent = "▶️ " + (lang === "fa" ? "شروع مسابقه" : "Start Race");
}

function announceWinner() {
  const winner = battleState.winner || battleState.algoA;
  const loser = winner === battleState.algoA ? battleState.algoB : battleState.algoA;
  const speedup = Math.max(1.1, (loser.stepIdx / Math.max(1, winner.stepIdx))).toFixed(1);

  if (typeof playChord === 'function') {
    playChord([587.33, 739.99, 880]); // Fanfare
  }

  const resultEl = document.getElementById("battleResultBanner");
  if (resultEl) {
    resultEl.style.display = "block";
    resultEl.innerHTML = `
      <div style="background:rgba(63,185,80,0.15);border:1px solid #3fb950;color:#3fb950;border-radius:10px;padding:12px 16px;text-align:center">
        <strong style="font-size:1.1rem">🏆 ${winner.name} ${lang === "fa" ? "پیروز شد!" : "Wins the Showdown!"}</strong>
        <p style="margin:4px 0 0;font-size:.9rem;color:var(--text)">
          ${lang === "fa" 
            ? `${winner.name} در ${winner.stepIdx} عملیات به پایان رسید (${speedup} برابر سریع‌تر از ${loser.name} با ${loser.stepIdx} گام)`
            : `${winner.name} completed in ${winner.stepIdx} operations (${speedup}x faster than ${loser.name}'s ${loser.stepIdx} steps)!`
          }
        </p>
      </div>
    `;
  }

  // Unlock Speed Demon badge
  if (typeof unlockedBadges !== 'undefined' && typeof checkBadges === 'function') {
    unlockedBadges.add("speed_demon");
    if (typeof localStorage !== 'undefined') localStorage.setItem("cv_unlocked_badges", JSON.stringify([...unlockedBadges]));
    if (typeof renderBadges === 'function') renderBadges();
  }
}

function updateBattleDOM() {
  const aSteps = document.getElementById("battleStepsA");
  const aCmp = document.getElementById("battleCmpA");
  const bSteps = document.getElementById("battleStepsB");
  const bCmp = document.getElementById("battleCmpB");
  const titleA = document.getElementById("battleTitleA");
  const titleB = document.getElementById("battleTitleB");

  if (titleA) titleA.innerHTML = `${battleState.algoA.name} <span style="font-size:.8rem;color:#3fb950">(${battleState.algoA.complexity})</span>`;
  if (titleB) titleB.innerHTML = `${battleState.algoB.name} <span style="font-size:.8rem;color:#f85149">(${battleState.algoB.complexity})</span>`;

  if (aSteps) aSteps.textContent = battleState.algoA.stepIdx;
  if (aCmp) aCmp.textContent = battleState.algoA.comparisons;
  if (bSteps) bSteps.textContent = battleState.algoB.stepIdx;
  if (bCmp) bCmp.textContent = battleState.algoB.comparisons;
}

function renderBattleCanvases() {
  drawBattleArray("battleCanvasA", battleState.algoA);
  drawBattleArray("battleCanvasB", battleState.algoB);
}

function drawBattleArray(canvasId, state) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const arr = state.currentArr;
  const n = arr.length;
  const barW = (w - 40) / n;
  const maxVal = 100;
  const currStep = state.steps[state.stepIdx] || {};

  arr.forEach((val, idx) => {
    const barH = (val / maxVal) * (h - 50);
    const x = 20 + idx * barW;
    const y = h - 25 - barH;

    let color = "#8b5cf6";
    if (state.done) {
      color = "#3fb950";
    } else if (currStep.type === "swap" && (idx === currStep.i || idx === currStep.j)) {
      color = "#f85149";
    } else if (currStep.type === "cmp" && (idx === currStep.i || idx === currStep.j)) {
      color = "#e3b341";
    } else if (currStep.type === "found" && idx === currStep.i) {
      color = "#3fb950";
    }

    ctx.fillStyle = color;
    ctx.fillRect(x + 2, y, barW - 4, barH);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText(val, x + barW / 2, h - 10);
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    openBattleModal, closeBattleModal, setupBattleMatchup, startBattle, stopBattle,
    buildBubbleSortSteps, buildQuickSortSteps, buildBinarySearchSteps, buildLinearSearchSteps, battleState
  };
}
