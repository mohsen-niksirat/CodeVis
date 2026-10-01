// Dynamic Variable Inspector (Step Debugger HUD)
function renderVariableInspector() {
  const container = document.getElementById("variableInspector");
  if (!container || !currentConcept) return;

  const comp = typeof complexityData !== 'undefined' ? complexityData[currentConcept.id] : null;
  let varsObj = null;

  if (comp && comp.vars && comp.vars[currentStep]) {
    varsObj = comp.vars[currentStep];
  } else if (currentConcept.steps && currentConcept.steps[currentStep]) {
    const s = currentConcept.steps[currentStep];
    varsObj = {
      step: `${currentStep + 1}/${currentConcept.steps.length}`,
      type: s.type || "state",
      ...(s.val !== undefined ? { val: s.val } : {})
    };
  }

  if (!varsObj) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  let html = `<div style="display:flex;align-items:center;gap:6px;font-size:.78rem;font-weight:700;color:var(--accent2);text-transform:uppercase;letter-spacing:0.5px">🔍 ${lang === 'fa' ? 'متغیرها' : 'Variables'}:</div>`;
  
  for (const [k, v] of Object.entries(varsObj)) {
    html += `
      <div class="var-pill" style="display:inline-flex;align-items:center;gap:4px;background:var(--surface2, #161b22);border:1px solid var(--border);border-radius:6px;padding:3px 8px;font-size:.75rem;font-family:monospace">
        <span style="color:#8b949e">${k}:</span>
        <span style="color:#58a6ff;font-weight:600">${typeof v === 'object' ? JSON.stringify(v) : v}</span>
      </div>
    `;
  }

  container.innerHTML = html;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderVariableInspector };
}
