# Changelog

All notable changes to CodeVis since the v3.1.1 audit & refactor run are documented here.

## Unreleased

### Added
- **Smart quiz fallback** for the 43+ concepts that have no hand-written quiz. `src/smartquiz.js` builds a real multiple-choice question from the concept's own `complexityData` (time + space variants, deterministic distractors, per-concept rotation via `cv_sq_rot_<id>`).
- **`scripts/swver.js`** — stamps `sw.js` `CV_VERSION` with a sha1 of the final `index.html` so every content change invalidates the old service-worker cache automatically. Deterministic → CI-safe.
- **Webfonts**: Vazirmatn (Persian body) + Fira Code (code blocks) loaded from Google Fonts with `display=swap` and `preconnect` hints. Both were declared in CSS but never fetched — now actually load.
- **`scripts/phase22.js`** — rebuild-safe patcher that injects the Google Fonts `<link>` after `apple-touch-icon`.

### Changed
- **Service worker rewritten**: network-first for navigations, same-origin stale-while-revalidate for assets, cross-origin passthrough for the gif.js CDN (never cached). `CV_VERSION` is now content-derived, so stale caches are evicted automatically.
- **CI hardened**: `.github/workflows/ci.yml` now `node --check`s every `.js` file, verifies `npm run build` is **idempotent** (sha1 before/after), runs the 15-suite test harness, and asserts SEO/PWA bits exist (description, manifest, icons, defer'd CDN).
- **Quiz modal**: `openConceptQuiz()` tries `generateSmartQuiz` before falling back to the generic template question.
- **`build.js`**: reads `src/smartquiz.js` and injects it into the runtime data block so the generator ships in the single-file bundle.

### Fixed (phase-0 hygiene)
- `drill_master` badge now lives in `data/badges.js` (was only present in the phase5-injected build output → rebuilds lost it).
- Deleted the orphaned root-level `drill_engine.js` (byte-identical copy lives in `scripts/` where the build expects it).
- Removed a shadowed ~1 KB duplicate CSS block from `index.html`.
- Reset button clears only `cv_*` keys (was `localStorage.clear()` → wiped foreign data sharing the origin).
- README counters synced to 62 concepts / 15 test suites in both English & Persian.

### Build
- `npm run build` chain now ends with `phase22.js` (fonts) → `swver.js` (cache stamp).
- `index.html` is both build output *and* build input — every hand edit is mirrored by a `phase*.js` patcher so rebuilds are byte-stable (CI enforces this via a hash gate).
