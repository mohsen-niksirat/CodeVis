// Smart Quiz Generator — builds real MCQs from a concept's own complexityData
// for the 43+ concepts that have no hand-written quiz entry.
// Called from openConceptQuiz() fallback; returns a quizzes-compatible qData
// object or null when no usable metadata exists.
//
// Two variants exist per concept (time + space). We rotate via a localStorage
// counter so repeat opens of the same concept surface a fresh question.

const _seedOf = (concept) =>
  (concept.id || '').split('').reduce((a, ch) => a + ch.charCodeAt(0), 0);

// Pick `n` distractors from `pool` deterministically by rotating on `seed`.
const _distract = (pool, correct, seed, n = 2) => {
  const wrong = pool.filter(v => v !== correct);
  const rot = seed % wrong.length;
  const rotated = [...wrong.slice(rot), ...wrong.slice(0, rot)];
  return rotated.slice(0, n);
};

// Deterministically reorder opts so the correct-answer index varies per concept.
const _place = (correct, distractors, seed) => {
  const opts = [correct, ...distractors];
  const rot = seed % opts.length;
  return [...opts.slice(rot), ...opts.slice(0, rot)];
};

const _rotKey = (concept) => `cv_sq_rot_${concept.id}`;
const _nextVariant = (concept, count) => {
  try {
    const seen = parseInt(localStorage.getItem(_rotKey(concept)) || '0', 10);
    const next = (seen + 1) % count;
    localStorage.setItem(_rotKey(concept), String(next));
    return next;
  } catch (_) {
    return _seedOf(concept) % count; // sandbox / private mode fallback
  }
};

function generateSmartQuiz(concept, lang) {
  const c = (typeof complexityData !== 'undefined' && concept) ? complexityData[concept.id] : null;
  if (!c || !c.time || !c.space) return null;
  const title = (concept.title && (concept.title[lang] || concept.title.en)) || 'this concept';
  const seed = _seedOf(concept);

  const timePool = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)', 'O(V + E)', 'O(k)'];
  const spacePool = ['O(1)', 'O(log n)', 'O(n)', 'O(n²)', 'O(V)', 'O(capacity)', 'O(h)', 'O(depth)'];

  // ---- Variant A: time-complexity question ----
  const timeOpts = _place(c.time, _distract(timePool, c.time, seed), seed);
  const variantTime = {
    q: {
      en: `What is the time complexity of ${title}?`,
      fa: `پیچیدگی زمانی ${title} چیست؟`
    },
    opts: { en: timeOpts, fa: timeOpts }, // Big-O notation is language-agnostic
    ans: timeOpts.indexOf(c.time),
    exp: {
      en: `${title} runs in ${c.time} time and uses ${c.space} extra space.`,
      fa: `${title} در زمان ${c.time} و با حافظهٔ کمکی ${c.space} اجرا می‌شود.`
    }
  };

  // ---- Variant B: space-complexity question ----
  const spaceOpts = _place(c.space, _distract(spacePool, c.space, seed + 7), seed + 3);
  const variantSpace = {
    q: {
      en: `How much extra (auxiliary) space does ${title} use?`,
      fa: `پیچیدگی حافظهٔ ${title} چقدر است؟`
    },
    opts: { en: spaceOpts, fa: spaceOpts },
    ans: spaceOpts.indexOf(c.space),
    exp: {
      en: `${title} runs in ${c.time} time and uses ${c.space} extra space.`,
      fa: `${title} در زمان ${c.time} و با حافظهٔ کمکی ${c.space} اجرا می‌شود.`
    }
  };

  const variants = [variantTime, variantSpace];
  return variants[_nextVariant(concept, variants.length)];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateSmartQuiz };
}
