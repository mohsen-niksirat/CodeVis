// Active Learning Concept Quiz Controller
let quizScore = parseInt((typeof localStorage !== 'undefined' ? localStorage.getItem("cv_quiz_score") : null) || "0");

function openConceptQuiz() {
  if (typeof quizzes === 'undefined' || !currentConcept) return;
  const qData = quizzes[currentConcept.id];
  const modal = document.getElementById("quizModal");
  if (!modal) return;
  
  if (!qData) {
    // Generate a default question if specific quiz not defined
    renderQuizUI({
      q: { en: `What is the core purpose of ${currentConcept.title.en}?`, fa: `هدف اصلی مفهوم ${currentConcept.title.fa || currentConcept.title.en} چیست؟` },
      opts: {
        en: [currentConcept.desc.en, "A sorting algorithm for hardware buses", "An operating system process scheduler"],
        fa: [currentConcept.desc.fa || currentConcept.desc.en, "یک الگوریتم مرتب‌سازی برای باس‌های سخت‌افزار", "یک زمان‌بند فرآیند سیستم‌عامل"]
      },
      ans: 0,
      exp: { en: "That is the foundational definition of this concept.", fa: "این تعریف اصلی و پایه‌ای این مفهوم است." }
    });
    modal.style.display = "flex";
    return;
  }
  
  renderQuizUI(qData);
  modal.style.display = "flex";
}

function renderQuizUI(qData) {
  const container = document.getElementById("quizCardBody");
  if (!container) return;
  
  const questionText = qData.q[lang] || qData.q.en;
  const options = qData.opts[lang] || qData.opts.en;
  const explanation = qData.exp[lang] || qData.exp.en;
  
  let html = `
    <h3 style="font-size:1.1rem;margin-bottom:12px;color:var(--accent2)">💡 ${t("conceptQuiz") || "Concept Quiz"}</h3>
    <p style="font-size:.95rem;margin-bottom:16px;line-height:1.5">${questionText}</p>
    <div style="display:flex;flex-direction:column;gap:8px" id="quizOptions">
  `;
  
  options.forEach((opt, idx) => {
    html += `
      <button class="secondary quiz-option-btn" data-idx="${idx}" style="text-align:start;padding:10px 14px;border-radius:8px">
        ${idx + 1}. ${opt}
      </button>
    `;
  });
  
  html += `
    </div>
    <div id="quizFeedback" style="margin-top:14px;display:none;padding:10px;border-radius:8px;font-size:.9rem"></div>
    <div style="margin-top:16px;display:flex;justify-content:flex-end">
      <button class="secondary" onclick="document.getElementById('quizModal').style.display='none'">${t("close") || "Close"}</button>
    </div>
  `;
  
  container.innerHTML = html;
  
  const optBtns = container.querySelectorAll(".quiz-option-btn");
  optBtns.forEach(btn => {
    btn.onclick = () => {
      const selected = parseInt(btn.dataset.idx);
      const isCorrect = selected === qData.ans;
      const feedback = document.getElementById("quizFeedback");
      optBtns.forEach(b => b.disabled = true);
      
      if (isCorrect) {
        btn.style.borderColor = "var(--green)";
        btn.style.background = "rgba(63, 185, 80, 0.15)";
        feedback.style.display = "block";
        feedback.style.background = "rgba(63, 185, 80, 0.15)";
        feedback.style.color = "var(--green)";
        feedback.innerHTML = `<strong>✓ ${t("correct") || "Correct!"}</strong> ${explanation}`;
        quizScore++;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem("cv_quiz_score", quizScore.toString());
        }
        if (typeof playTone === 'function') {
          playTone(600, 0.08);
          setTimeout(() => playTone(800, 0.12), 80);
        }
        if (typeof checkBadges === 'function') {
          checkBadges({ seenCount: seenIds ? seenIds.size : 0, streak: typeof getStreak === 'function' ? getStreak() : 0, seenIds, quizScore });
        }
      } else {
        btn.style.borderColor = "var(--red)";
        btn.style.background = "rgba(248, 81, 73, 0.15)";
        optBtns[qData.ans].style.borderColor = "var(--green)";
        feedback.style.display = "block";
        feedback.style.background = "rgba(248, 81, 73, 0.15)";
        feedback.style.color = "var(--red)";
        feedback.innerHTML = `<strong>✗ ${t("incorrect") || "Not quite."}</strong> ${explanation}`;
        if (typeof playTone === 'function') {
          playTone(220, 0.15, "sawtooth");
        }
      }
    };
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { openConceptQuiz };
}
