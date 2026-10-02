
// ⚡ Code Drill — rapid-fire quiz across already-seen concepts
let drillState = null;

function startCodeDrill() {
  const pool = [...seenIds].filter(id => quizzes[id]);
  const candidates = pool.length >= 3 ? pool : Object.keys(quizzes);
  const picked = [];
  const poolCopy = [...candidates];
  for (let i = 0; i < Math.min(5, poolCopy.length); i++) {
    picked.push(poolCopy.splice(Math.floor(Math.random() * poolCopy.length), 1)[0]);
  }
  drillState = { queue: picked, idx: 0, score: 0, total: picked.length };
  renderDrill();
  const modal = document.getElementById("drillModal");
  if (modal) modal.style.display = "flex";
}

function closeDrillModal() {
  const modal = document.getElementById("drillModal");
  if (modal) modal.style.display = "none";
}

function renderDrill() {
  const box = document.getElementById("drillCardBody");
  if (!box || !drillState) return;
  if (drillState.idx >= drillState.total) {
    const perfect = drillState.score === drillState.total;
    if (perfect && typeof checkBadges === 'function') {
      checkBadges({ seenCount: seenIds ? seenIds.size : 0, streak: typeof getStreak === 'function' ? getStreak() : 0, seenIds, quizScore: quizScore + drillState.score, drillPerfect: true });
    }
    box.innerHTML = '<h3 style="font-size:1.1rem;margin-bottom:10px;color:var(--accent2)">⚡ ' + (t("drillDone") || "Drill complete") + '</h3>' +
      '<p style="font-size:2.4rem;font-weight:800;margin:18px 0;color:' + (perfect ? '#3fb950' : 'var(--accent2)') + '">' + drillState.score + ' / ' + drillState.total + '</p>' +
      '<div style="display:flex;justify-content:flex-end;gap:8px">' +
      '<button class="secondary" onclick="startCodeDrill()">🔄 ' + (t("again") || "Play again") + '</button>' +
      '<button class="secondary" onclick="closeDrillModal()">' + (t("close") || "Close") + '</button></div>';
    if (typeof playChord === 'function') playChord(perfect ? [523.25, 659.25, 783.99] : [440, 554.37]);
    return;
  }
  const cid = drillState.queue[drillState.idx];
  const q = quizzes[cid];
  const concept = concepts.find(c => c.id === cid);
  const qText = q.q[lang] || q.q.en;
  const opts = q.opts[lang] || q.opts.en;
  const exp = q.exp[lang] || q.exp.en;
  const title = concept ? (concept.title[lang] || concept.title.en) : cid;
  let optHtml = opts.map((o, i) => '<button class="secondary drill-opt" data-i="' + i + '" style="text-align:start;padding:10px 14px;border-radius:8px">' + (i + 1) + '. ' + o + '</button>').join("");
  box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
    '<h3 style="font-size:1.05rem;color:var(--accent2);margin:0">⚡ ' + (t("drill") || "Code Drill") + ' — ' + (drillState.idx + 1) + '/' + drillState.total + '</h3>' +
    '<button class="secondary" onclick="closeDrillModal()" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button></div>' +
    '<div style="font-size:.75rem;color:#8b949e;margin-bottom:8px">' + title + '</div>' +
    '<p style="font-size:.95rem;margin-bottom:14px;line-height:1.5">' + qText + '</p>' +
    '<div style="display:flex;flex-direction:column;gap:8px" id="drillOpts">' + optHtml + '</div>' +
    '<div id="drillFb" style="margin-top:12px;display:none;padding:10px;border-radius:8px;font-size:.9rem"></div>' +
    '<div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center">' +
    '<span style="font-size:.8rem;color:#8b949e">' + (t("score") || "Score") + ': <strong>' + drillState.score + '</strong></span>' +
    '<button class="primary" id="drillNext" style="display:none;padding:8px 18px;border-radius:8px;cursor:pointer">' + (t("next") || "Next") + ' →</button></div>';
  box.querySelectorAll(".drill-opt").forEach(btn => {
    btn.onclick = () => {
      const sel = parseInt(btn.dataset.i);
      const ok = sel === q.ans;
      const fb = document.getElementById("drillFb");
      box.querySelectorAll(".drill-opt").forEach(b => b.disabled = true);
      if (ok) {
        drillState.score++;
        btn.style.borderColor = "var(--green)"; btn.style.background = "rgba(63,185,80,0.15)";
        fb.style.display = "block"; fb.style.background = "rgba(63,185,80,0.15)"; fb.style.color = "var(--green)";
        fb.innerHTML = "<strong>✓</strong> " + exp;
        if (typeof playTone === 'function') { playTone(600, 0.08); setTimeout(() => playTone(800, 0.1), 80); }
      } else {
        btn.style.borderColor = "var(--red)"; btn.style.background = "rgba(248,81,73,0.15)";
        box.querySelectorAll(".drill-opt")[q.ans].style.borderColor = "var(--green)";
        fb.style.display = "block"; fb.style.background = "rgba(248,81,73,0.15)"; fb.style.color = "var(--red)";
        fb.innerHTML = "<strong>✗</strong> " + exp;
        if (typeof playTone === 'function') playTone(220, 0.15, "sawtooth");
      }
      const nx = document.getElementById("drillNext");
      if (nx) { nx.style.display = "inline-block"; nx.onclick = () => { drillState.idx++; renderDrill(); }; }
    };
  });
}
