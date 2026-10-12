// Smart Quiz Generator — builds a real MCQ from a concept's own complexityData
// for the 43 concepts that have no hand-written quiz entry.
// Called from openConceptQuiz() fallback; returns a quizzes-compatible qData object
// or null when no usable metadata exists.
function generateSmartQuiz(concept, lang) {
  const c = (typeof complexityData !== 'undefined' && concept) ? complexityData[concept.id] : null;
  if (!c || !c.time) return null;
  const isFa = lang === 'fa';
  const title = (concept.title && (concept.title[lang] || concept.title.en)) || 'this concept';

  // Pool of plausible-but-wrong Big-O values, kept small & readable.
  const wrongTimes = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)']
    .filter(v => v !== c.time);
  const wrongSpaces = ['O(1)', 'O(log n)', 'O(n)', 'O(n²)']
    .filter(v => v !== c.space);

  // Deterministic pick so the question is stable per concept.
  const pick = (arr, seed) => arr[seed % arr.length];
  const seed = (concept.id || '').split('').reduce((a, ch) => a + ch.charCodeAt(0), 0);

  // Two real distractors + the correct answer (shuffled so ans index varies).
  const correct = c.time;
  const optsPool = [pick(wrongTimes, seed), pick(wrongTimes, seed + 1)];
  const opts = [correct, ...optsPool].sort(() => ((seed % 3) === 0 ? 0 : 1) * ((seed % 2) ? -1 : 1));

  return {
    q: {
      en: `What is the time complexity of ${title}?`,
      fa: `پیچیدگی زمانی ${title} چیست؟`
    },
    opts: {
      en: opts,
      fa: opts // Big-O notation is language-agnostic
    },
    ans: opts.indexOf(correct),
    exp: {
      en: `${title} runs in ${c.time} time and uses ${c.space} extra space.`,
      fa: `${title} در زمان ${c.time} و با حافظهٔ کمکی ${c.space} اجرا می‌شود.`
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateSmartQuiz };
}
