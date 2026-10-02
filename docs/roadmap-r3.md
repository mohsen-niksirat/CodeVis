# CodeVis — Competitive Analysis & Roadmap R3 (Oct 2026)

## Competitor findings
- **VisuAlgo** (visualgo.net, NUS): 40+ DS/algos, structured lessons, **integrated quiz/assessment system**, **progress tracking**, multi-language UI, performance analysis. Weak: no export, limited animation control.
- **Algorithm Visualizer** (GitHub 46k★): 50+ algos, **custom code input** w/ code editor, full animation control, screenshots export. Weak: no progress tracking.
- **USFCA Galles visualizations**: algorithm-specific input controls (insert/delete/find on the live structure), full history **skip-back/undo** of animation commands.
- **Visual Sorting (mszula, 700★)** & **Sound of Sorting (bingmann)**: **audibilization** — bars produce tones by value; 24 oscillators; **side-by-side race mode**; **live metrics (comparisons/swaps/accesses)**; input patterns (mountain, wave, nearly-sorted, pipe organ); persistent preferences; keyboard-first.

## Gap analysis vs CodeVis (58 concepts, gallery, drill, XP, heatmap, zen, PNG/GIF/WebM export)
Missing vs competitors:
1. **Sound/Audibilization** (both big sorting tools have it) → add WebAudio tones synced to drawStep.
2. **Live operation metrics** (comparisons/swaps) → counters overlaid on canvas.
3. **Custom input** → let the user set the array/size for sort concepts.
4. **Step Back** → backwards navigation already partially exists; add "restart & replay" + prev-step highlight history.
5. **Daily challenge** (VisuAlgo training-style) → "challenge of the day" seeded by date.
6. **Persistent preferences** → already have localStorage; extend to speed/format.

## Roadmap R3 (cycle 3)
- **Phase 13 — Sound of Code:** WebAudio audibilization (tone per value/operation), mute toggle, persisted pref. Sorting + pathfinding concepts emit notes.
- **Phase 14 — Live metrics + custom array:** comparison/swap/access counters (EN/FA), custom array input (comma values + random-size slider), input patterns (mountain/wave/nearly-sorted).
- **Phase 15 — Daily Challenge:** date-seeded concept + drill of the day, streak integration, share result text.
- **Phase 16 — Pacing & replay:** step-back button, replay loop, speed presets (0.5x/1x/2x/4x), autoloop toggle.
- **Phase 17 — Content expansion:** +4 concepts (Bellman-Ford, Kruskal MST, Segment Tree, Bloom upgrade already have bloom → instead: Rabin-Karp / Huffman / Bloom done / Skip List). Verify counts, i18n, tests.
- **Phase 18 — Final polish, README, SW bump, ZIP v3.1.0.**
