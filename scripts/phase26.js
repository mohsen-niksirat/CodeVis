// Phase 26: quiz accuracy tracking.
// Adds cv_quiz_attempts counter alongside cv_quiz_score so the share card and
// quiz feedback can show real accuracy (score/attempts) instead of raw points.
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(FILE, "utf8");
let patches = 0;
function rep(oldS, newS) {
  if (html.includes(newS)) return; // already applied
  if (!html.includes(oldS)) { console.log("phase26 MISS:", oldS.slice(0, 70)); return; }
  html = html.replace(oldS, newS); patches++;
}

// 1) Track attempts next to score
rep(
  'let quizScore = parseInt((typeof localStorage !== \'undefined\' ? localStorage.getItem("cv_quiz_score") : null) || "0");',
  'let quizScore = parseInt((typeof localStorage !== \'undefined\' ? localStorage.getItem("cv_quiz_score") : null) || "0");\nlet quizAttempts = parseInt((typeof localStorage !== \'undefined\' ? localStorage.getItem("cv_quiz_attempts") : null) || "0");'
);

// 2) Increment attempts on every answer (before the isCorrect branch) and persist
rep(
  '      const isCorrect = selected === qData.ans;',
  '      const isCorrect = selected === qData.ans;\n      quizAttempts++;\n      if (typeof localStorage !== \'undefined\') {\n        localStorage.setItem("cv_quiz_attempts", quizAttempts.toString());\n      }'
);

// 3) Show running accuracy inside the feedback line (correct & incorrect paths)
rep(
  "        feedback.innerHTML = `<strong>✓ ${t(\"correct\") || \"Correct!\"}</strong> ${explanation}`;",
  "        feedback.innerHTML = `<strong>✓ ${t(\"correct\") || \"Correct!\"}</strong> ${explanation} <span style=\"opacity:.75;font-size:.85rem\">· ${quizScore}/${quizAttempts}</span>`;"
);
rep(
  "        feedback.innerHTML = `<strong>✗ ${t(\"incorrect\") || \"Not quite.\"}</strong> ${explanation}`;",
  "        feedback.innerHTML = `<strong>✗ ${t(\"incorrect\") || \"Not quite.\"}</strong> ${explanation} <span style=\"opacity:.75;font-size:.85rem\">· ${quizScore}/${quizAttempts}</span>`;"
);

// 4) Share card: replace raw points with accuracy percentage when attempts exist
rep(
  'const streakBadgeText = "🔥 " + (typeof getStreak===\'function\'?getStreak():0) + "d streak  |  🏆 " + (typeof unlockedBadges!==\'undefined\'?unlockedBadges.size:0) + " badges  |  💡 " + (typeof quizScore!==\'undefined\'?quizScore:0) + " pts";',
  'const _qa=(typeof quizAttempts!==\'undefined\'?quizAttempts:0);\nconst _acc=_qa>0?Math.round(((typeof quizScore!==\'undefined\'?quizScore:0)/_qa)*100):0;\nconst streakBadgeText = "🔥 " + (typeof getStreak===\'function\'?getStreak():0) + "d streak  |  🏆 " + (typeof unlockedBadges!==\'undefined\'?unlockedBadges.size:0) + " badges  |  🎯 " + _acc + "%";'
);

if (patches > 0) {
  fs.writeFileSync(FILE, html);
}
console.log("phase26:", patches, "patch(es) applied");
