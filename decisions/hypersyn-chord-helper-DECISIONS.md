# hypersyn-chord-helper — Decisions

## Project summary
Hypersyn Chord Helper is a client-side web app that converts typed chord names (e.g. `Cmaj7`, `Dm7`) into hex-code representations and voicings for the Hypersyn/M8-tracker music workflow, with Web Audio playback of the resulting progressions. It is built with TypeScript and Vite (no framework — vanilla DOM/ES modules, not Lit), uses `@tonaljs` packages for chord/interval parsing, Jest for unit tests, and deploys as a static build to GitHub Pages via the `docs/` directory.

## Decisions

### Project inception as a single-file hex converter
- **When:** 2025-08-25
- **What:** Initial working version committed: a plain `index.html` plus `src/core.js` implementing chord-name-to-hex conversion logic, with no build tooling.
- **Why:** Inferred: minimal viable tool to solve the author's own need for converting chord progressions into Hypersyn-compatible hex codes.
- **Commit(s):** `ae844f83ccf3da294e79d33b7f38596d6a5dd760`

### Synthwave video background and visual identity
- **When:** 2025-08-26
- **What:** Added a looping muted synthwave video as the page background with a blur/overlay filter, establishing a synthwave visual theme for the app (later removed during the 2026-07 terminal redesign).
- **Why:** Inferred: aesthetic branding choice to match the synth/tracker music theme.
- **Commit(s):** `b33e11fc4a601dbdc4c6a216cdbfb255f96d7249`

### Show true (non mod-12) interval hex values
- **When:** 2025-08-29
- **What:** Changed the interval hex output to use actual interval values instead of values wrapped modulo 12, and dimmed intervals past the 6th slot in the UI for root-baked, interval, and unique-chord-type displays.
- **Why:** Not stated explicitly; the change makes the hex output reflect real extended-interval content rather than losing octave information through modulo wrapping.
- **Commit(s):** `5f9ae87a7c8bc681884638d1b27f5355018194e8`

### Expanded voicing vocabulary (inversions, shell/altered dominant)
- **When:** 2025-08-29
- **What:** Added first/second/third inversion, shell dominant, and altered dominant voicing options to the voicing dropdown, on top of the existing closed/open-triad/drop voicings.
- **Why:** Stated in commit message: "Improves user control over chord voicing selection."
- **Commit(s):** `065d77463ba516ec4bfe598b6d3ebc9499e1c7a4`

### Save/load named chord sets with toast feedback
- **When:** 2025-08-29
- **What:** Added localStorage-backed save/load/delete of named chord sets and a toast-notification system for user feedback, directly in `index.html`.
- **Why:** Inferred: lets users persist and recall chord progressions across sessions instead of re-entering them each time.
- **Commit(s):** `36766dac099ff6cc6a27fe362d164a245bb7f721`

### Modularize app into ES modules under src/core and src/ui
- **When:** 2025-10-22
- **What:** Split the previously monolithic `main.js`/inline-script code into `src/core/` (chord parsing, voicing, audio, storage, utils) and `src/ui/` (sidebar, chord cards, keyboard viz, toast, event wiring) modules, removed inline event handlers from `index.html`, and eliminated `window.*` globals in favor of module-scoped state and direct imports. Introduced npm/Vite project scaffolding to support the modular build.
- **Why:** Stated in commit messages: "Prepare for scalable, maintainable, and testable codebase structure" / "enforce separation of UI and [core] logic."
- **Commit(s):** `784093106c01082c15188f80546a47eaaafec33d`, `fd0b78dcc05610771374284befd8d54310220594`, `ad41773669e2288c735c9db1211808f6c50e3dcb`, `45c858759c1314cdaabd7f50aaed6de0adffa925`

### Migrate codebase to TypeScript
- **When:** 2025-10-30
- **What:** Renamed all `src/**/*.js` modules to `.ts`, added `tsconfig.json`, and wired Vite/TypeScript into the build (`npm run typecheck` added later).
- **Why:** Not stated explicitly in the commit message beyond "setup Vite and convert codebase to TypeScript"; inferred: type safety for a growing modular codebase.
- **Commit(s):** `56c10c2e9d8a67b4f518cbb5307701cb6e77d06b`

### Adopt Jest unit testing
- **When:** 2025-11-11 to 2025-11-13
- **What:** Introduced Jest (`jest.config.js`, `jest-environment-jsdom`, `ts-jest`) and added unit test suites covering core chord/voicing logic and UI event modules, plus npm test/test:watch/test:coverage scripts.
- **Why:** Inferred: establish automated regression coverage as the codebase grew past a single script file.
- **Commit(s):** `7cc4f4e6347ab952e28523dd9889b8d40322c2b4`, `730187c0b445f678b515cb5263015cae38450fc2`, `2eed12ae3c85e5251af07cd42daa5d15a31b323d`, `390888b3f87ab40ce90c43a565f5d19a9a790a75`, `b430fcb71ff98dfb1ca8ace854b8a08a738b1749`

### Switch GitHub Pages build output from dist/ to docs/
- **When:** 2025-11-13
- **What:** Changed the Vite build output directory from `dist` to `docs`, so the repository's `docs/` folder (committed to the repo) becomes the published GitHub Pages site.
- **Why:** Stated in commit message: "Prepares project for GitHub Pages deployment using /docs as the published directory."
- **Commit(s):** `a7eb9b8713e3c0763031e8ea0f0a616da4824818`

### Replace hand-rolled chord parsing with Tonal.js
- **When:** 2026-04-14 to 2026-04-15
- **What:** Added `@tonaljs/chord`, `@tonaljs/interval`, `@tonaljs/midi`, `@tonaljs/voicing`, and `@tonaljs/voicing-dictionary` as dependencies, and rewrote chord-symbol normalization/parsing in `src/core/chords.ts` to route through Tonal's parser (with alias/variant tables) while keeping a fallback interval-mapping path for unsupported symbols.
- **Why:** Stated in commit message: "Reduce brittle chord parsing for aliases, case, and unicode accidentals while keeping fallback interval mapping for coverage."
- **Commit(s):** `fa72604acc628b450811caf6660830d5780a58d0`, `9ff04e14d2f89f758a26d0f292d6490fb4380542`, `8f6f1a74736761b335ff30293863bf6a79187f09`

### Relicense project under GNU GPLv3
- **When:** 2026-07-05
- **What:** Replaced the existing LICENSE text with the full GNU GPLv3 license and updated the license field in `package.json` and README accordingly.
- **Why:** Not stated beyond "relicense project under GNU GPLv3."
- **Commit(s):** `897cd666a539af4581208dbd635ff939d426f401`

### M8-tracker-inspired UI redesign
- **When:** 2026-07-08
- **What:** Reworked chord card rendering and styling (`src/ui/chordCards.ts`, `src/styles.css`) toward an M8-tracker-inspired visual style, changing chord visualization layout and event wiring.
- **Why:** Inferred from commit message and README credits ("Inspired by the M8 Tracker"): align the UI's look with the target hardware tracker aesthetic.
- **Commit(s):** `2f05a1183a8c59ad2b64d7e9a0387555507824b1`

### Redo UX and UI
- **When:** 2026-06-26
- **What:** Broad rewrite of chord card, event, keyboard-visualization, sidebar, and toast UI modules plus styles (~3,000 lines changed), reworking layout and interaction across the app.
- **Why:** Not detailed in commit message beyond "redo UX and UI."
- **Commit(s):** `517282c29ad669dc2d2337b9f1dc9429b1d86ecd`

### Add interval-only output mode and set deletion
- **When:** 2026-06-27
- **What:** Added a mode to display chords as interval-only hex output (as opposed to root-baked), along with a "delete set" function, updating `storage.ts`, `chordCards.ts`, and `events.ts`.
- **Why:** Inferred: gives users a root-agnostic hex representation alongside the existing root-baked one.
- **Commit(s):** `b2717808b178358e17e95ba717ac49ac9eed719e`

### Shareable progression via URL query string
- **When:** 2026-06-28
- **What:** Added URL-based progression sharing (encoding/decoding a chord progression into a query string) with accompanying unit tests.
- **Why:** Inferred: lets users share or bookmark a specific chord progression without needing localStorage save/load.
- **Commit(s):** `1620d967b6cf2b5d6858e3c3805eb1b88c43dcfc`

### Redesign UI as a CRT terminal ("Hypersyn Redesign")
- **When:** 2026-07-22
- **What:** Replaced the visible UI with a boot-screen/command-line terminal interface (JetBrains Mono font, CRT scanline/flicker effects, 8 switchable color themes, single command input for loading progressions and running commands like help/about/mode/theme/clear). Chord rows now expand and cycle through a fixed set of common voicings via up/down arrows with note-diffs shown, replacing the previous piano-keyboard drag interaction. Existing save/load, share-link, export/import, and multi-set-strip functionality was kept wired but hidden from the new UI rather than removed.
- **Why:** Stated in commit message: this replaced the visible surface with "the boot-screen/command-line terminal from the Claude Design mock."
- **Commit(s):** `b46cc4ce3c56f2ba340cf66026debba8b159bb57`

### Drop external human-engine dependency; switch to Juno-60-style synth voice
- **When:** 2026-07-22
- **What:** Removed a build-time alias/dependency on a sibling repo ("human-engine"/"human-midi") and the `state=` share-link decode path that relied on it (the `p=`/`progression=` querystring path was kept). Replaced the pad synth voice with a Juno-60-style patch (two detuned sawtooth DCOs through a midrange lowpass, shared chorus, light reverb bus) and reduced attack time from 1s to 40ms.
- **Why:** Stated in commit message: "The build no longer needs an external repo present," and the new voice makes "chords speak immediately instead of fading in slowly."
- **Commit(s):** `3e08483702a804b7fb51caf2b2a0d9642a62ef8d`

### Replace Konami/video easter egg with Pac-Man Konami sequence
- **When:** 2026-07-22
- **What:** Implemented a Konami-code-triggered Pac-Man animation ("WAKA WAKA WAKA") as the app's easter egg, removing the prior Konami handler that toggled the synthwave video background (along with the now-unused `#video-bg`, `.theme-synthwave` CSS, and `synthwave.mp4` asset).
- **Why:** Stated in commit message: the old handler "predated the redesign, is not part of the design," and its global keydown listener conflicted with the new terminal's arrow-key voicing controls.
- **Commit(s):** `a694868d1ca1e96f05635411e01dbad359a852c3`

### Mobile voicing control settled on tap-to-cycle badge
- **When:** 2026-07-22 to 2026-07-23
- **What:** Iterated through several mobile interaction designs for cycling chord voicings on touch devices (per-row tap ▲/▼ buttons, then swipe gestures, then dedicated tap buttons restyled and repositioned) before settling on making the voicing badge itself directly tappable/clickable to cycle forward, unifying desktop click and mobile tap behavior without touch-only gating.
- **Why:** Stated in the final commit message: "The design simplified the mobile voicing control again," matching an external design reference used throughout this sequence.
- **Commit(s):** `9ac5f0f5ab59711bab28534800ae889c87269f71`, `9ec6ff1450acd77b1a17b13f101ea4adb67c3063`, `7bf46b04396fd5e72d46413162119c613ca09e95`, `76936e9331da62e79160015e94f9c695bc0d3314`

### Internal refactor: split core.ts into focused modules
- **When:** 2026-07-28
- **What:** Broke up the large `core.ts` facade by consolidating the Web Audio synth engine into `audio.ts`, making `storage.ts` a pure persistence layer without DOM access, unifying chord voicing/pitch math into `chords.ts`, and introducing a new `trackerStore.ts` to encapsulate tracker session state — leaving `core.ts` as a thin facade (924 lines removed from it).
- **Why:** Stated in commit message: to "deepen audio, storage, harmony, and state" separation, consistent with the domain model documented the same day in `CONTEXT.md`.
- **Commit(s):** `a80ecb69482addcb0e24ebbb2639787cc3e9d89f`
