// Big-O Complexity Graph Visualizer & Cheat Sheet Modal
function openBigOModal() {
  const modal = document.getElementById("bigOModal");
  if (!modal) return;
  modal.style.display = "flex";
  drawBigOGraph();
  updateBigOInfo();
}

function closeBigOModal() {
  const modal = document.getElementById("bigOModal");
  if (modal) modal.style.display = "none";
}

function updateBigOInfo() {
  const infoEl = document.getElementById("bigOConceptInfo");
  if (!infoEl || !currentConcept) return;

  const comp = (typeof complexityData !== 'undefined' && complexityData[currentConcept.id]) || {
    time: "O(1)", space: "O(1)", curve: "O_1"
  };

  const title = currentConcept.title[lang] || currentConcept.title.en;
  const isFa = lang === "fa";

  infoEl.innerHTML = `
    <div style="background:var(--surface2, #161b22);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <span style="font-weight:700;font-size:1.05rem;color:var(--text)">${title}</span>
        <div style="display:flex;gap:8px">
          <span class="complexity-badge time" style="background:rgba(63,185,80,0.15);border:1px solid #3fb950;color:#3fb950;padding:4px 10px;border-radius:12px;font-size:.8rem;font-weight:600">
            ⏱️ ${isFa ? 'زمان' : 'Time'}: ${comp.time}
          </span>
          <span class="complexity-badge space" style="background:rgba(139,92,246,0.15);border:1px solid #8b5cf6;color:#a78bfa;padding:4px 10px;border-radius:12px;font-size:.8rem;font-weight:600">
            💾 ${isFa ? 'حافظه' : 'Space'}: ${comp.space}
          </span>
        </div>
      </div>
    </div>
  `;
}

function drawBigOGraph() {
  const canvas = document.getElementById("bigOCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Background
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, w, h);

  // Coordinates
  const padL = 50, padB = 40, padR = 20, padT = 30;
  const graphW = w - padL - padR;
  const graphH = h - padT - padB;

  // Grid lines
  ctx.strokeStyle = "#21262d";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (graphH / 4) * i;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = "#484f58";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, h - padB);
  ctx.lineTo(w - padR, h - padB);
  ctx.stroke();

  // Axis Labels
  ctx.fillStyle = "#8b949e";
  ctx.font = "11px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(lang === "fa" ? "اندازه ورودی (n) →" : "Input Size (n) →", padL + graphW / 2, h - 12);
  ctx.save();
  ctx.translate(16, padT + graphH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(lang === "fa" ? "عملیات / زمان →" : "Operations / Time →", 0, 0);
  ctx.restore();

  // Curves definitions
  const curves = [
    { name: "O(1)", color: "#3fb950", label: "Excellent", fn: (n) => 12 },
    { name: "O(log n)", color: "#2ea043", label: "Good", fn: (n) => Math.log2(n + 1) * 22 + 10 },
    { name: "O(n)", color: "#d29922", label: "Fair", fn: (n) => n * 2.2 + 8 },
    { name: "O(n log n)", color: "#db6d28", label: "Bad", fn: (n) => (n * Math.log2(n + 1)) * 0.45 + 10 },
    { name: "O(n²)", color: "#f85149", label: "Horrible", fn: (n) => Math.pow(n, 2) * 0.05 + 10 },
    { name: "O(2ⁿ)", color: "#da3633", label: "Terrible", fn: (n) => Math.pow(2, n * 0.14) * 8 }
  ];

  const currentCurveId = (typeof complexityData !== 'undefined' && currentConcept && complexityData[currentConcept.id]) 
    ? complexityData[currentConcept.id].curve 
    : "O_1";

  // Plot curves
  curves.forEach((c) => {
    ctx.strokeStyle = c.color;
    ctx.lineWidth = (c.name.toLowerCase().replace(/[^a-z0-9]/g, '_') === currentCurveId.toLowerCase()) ? 4 : 2;
    ctx.beginPath();
    let started = false;

    for (let x = 0; x <= graphW; x += 4) {
      const n = (x / graphW) * 70;
      const op = c.fn(n);
      const y = (h - padB) - (op / 160) * graphH;
      if (y < padT) break;
      if (!started) { ctx.moveTo(padL + x, y); started = true; }
      else ctx.lineTo(padL + x, y);
    }
    ctx.stroke();
  });

  // Curve legend on top
  let legX = padL + 10;
  curves.forEach((c) => {
    ctx.fillStyle = c.color;
    ctx.beginPath(); ctx.arc(legX, padT - 14, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#c9d1d9";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(c.name, legX + 8, padT - 11);
    legX += ctx.measureText(c.name).width + 24;
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { openBigOModal, closeBigOModal, drawBigOGraph };
}
