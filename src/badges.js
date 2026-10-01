// Badges & Achievements Manager
let unlockedBadges = new Set(JSON.parse((typeof localStorage !== 'undefined' ? localStorage.getItem("cv_unlocked_badges") : null) || "[]"));

function checkBadges(stats) {
  if (typeof badges === 'undefined') return;
  const newlyUnlocked = [];
  
  badges.forEach(b => {
    if (unlockedBadges.has(b.id)) return;
    let unlocked = false;
    
    if (b.id === "first_step" && stats.seenCount >= 1) unlocked = true;
    else if (b.id === "explorer" && stats.seenCount >= 5) unlocked = true;
    else if (b.id === "scholar" && stats.seenCount >= 15) unlocked = true;
    else if (b.id === "week_streak" && stats.streak >= 7) unlocked = true;
    else if (b.id === "ai_pioneer" && stats.seenIds && stats.seenIds.has("vector_embeddings") && stats.seenIds.has("perceptron")) unlocked = true;
    else if (b.id === "web_guru" && stats.seenIds && stats.seenIds.has("websocket") && stats.seenIds.has("token_bucket")) unlocked = true;
    else if (b.id === "quiz_whiz" && stats.quizScore >= 3) unlocked = true;

    if (unlocked) {
      unlockedBadges.add(b.id);
      newlyUnlocked.push(b);
    }
  });

  if (newlyUnlocked.length > 0) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("cv_unlocked_badges", JSON.stringify([...unlockedBadges]));
    }
    if (typeof playChord === 'function') {
      playChord([587.33, 739.99, 880]); // Celebration fanfare
    }
    renderBadges();
  }
}

function renderBadges() {
  const container = document.getElementById("badgesList");
  if (!container || typeof badges === 'undefined') return;
  
  let html = "";
  badges.forEach(b => {
    const isUnlocked = unlockedBadges.has(b.id);
    const title = (b.title[lang] || b.title.en);
    const desc = (b.desc[lang] || b.desc.en);
    html += `
      <div class="badge-item \${isUnlocked ? 'unlocked' : 'locked'}" title="\${title}: \${desc}">
        <span class="badge-icon">\${b.icon}</span>
        <span class="badge-name">\${title}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { checkBadges, renderBadges };
}
