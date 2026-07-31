# circuit-chords — Decisions

## Project summary
Circuit Chords is a Lit + TypeScript web app that maps text-based chord progressions (e.g. `Am7 D9 Gmaj7`) onto a 4x8 pad grid styled after the Novation Circuit Tracks/Rhythm hardware, using Tonal.js for chord/scale parsing and Tone.js for an in-browser audio preview. It also supports WebMIDI, including sending/receiving Novation Circuit SysEx patch dumps through a built-in synth patch editor, and is deployed as a static site to GitHub Pages from a `docs/` build output.

## Decisions

### Tech stack: Lit + Tonal.js chord mapper
- **When:** 2026-04-14
- **What:** Repository initialized as a Vite + TypeScript project using Lit for web components and the `tonal` package for chord parsing, with an initial `chord-input.ts` component and `main.ts` app entry point.
- **Why:** Inferred: establishes the core stack (Lit for UI, Tonal.js for music theory) that all later work builds on.
- **Commit(s):** `092f803`

### GitHub Pages deployment via `/docs` build output
- **When:** 2026-04-14
- **What:** Vite config changed to output production builds to a `docs/` directory with `base: "/circuit-chords/"`, enabling GitHub Pages to serve the app directly from a branch + `/docs` folder rather than a separate `gh-pages` branch or hosting provider.
- **Why:** Inferred: simplest zero-infrastructure deployment path for a static single-page app on GitHub.
- **Commit(s):** `6a05a4a`

### Adopt Tonal.js voicing library and pad anchor mode
- **When:** 2026-04-15
- **What:** Added the `@tonaljs/voicing` dependency and extended `music-grid.ts` with voicing-option logic and a new "pad anchor" mode, plus corresponding UI state in `main.ts` for selecting the anchor mode.
- **Why:** Not stated explicitly in the commit message; message describes the change as enabling voicing-based chord-to-pad mapping.
- **Commit(s):** `3c0124a`

### Internal audio engine: Tone.js + Rhodes piano sampler
- **When:** 2026-06-24
- **What:** Added the `tone` dependency and rewrote `src/lib/audio.ts` around a Tone.js-based Rhodes piano sampler (later commits added dynamic velocity scaling and a limiter) so chords can be previewed in the browser without external hardware.
- **Why:** Inferred: gives the app a self-contained audio preview so users don't need MIDI hardware connected to hear progressions.
- **Commit(s):** `eea5b3f`, `4a10a4d`

### MIDI device UI reworked to explicit connect/disconnect per device
- **When:** 2026-06-24
- **What:** Replaced the passive MIDI device list (dot + name) with an explicit `selectedMidiDevice`/`activeMidiDevice` state model and dedicated connect/disconnect buttons, rather than treating "any device present" as connected.
- **Why:** Inferred: prior implementation could not distinguish "device available" from "device actively in use," which the new state model fixes.
- **Commit(s):** `af9586a`

### Add SysEx patch parsing and full synth patch editor
- **When:** 2026-06-27
- **What:** Added `src/lib/circuit-sysex.ts` to parse Novation Circuit SysEx patch dumps, plus new `knob-element.ts` and `slider-element.ts` UI components and a `circuit-patch-editor.ts` component exposing oscillator/mixer/filter/envelope controls.
- **Why:** Not stated in commit message; extends the app from a chord-mapping tool into a full synth patch editor with WebMIDI patch send/receive.
- **Commit(s):** `285d0bb`

### Add light theme (Circuit Rhythm aesthetic)
- **When:** 2026-06-29
- **What:** Introduced a `.theme-light` CSS variable set alongside the existing dark theme, giving the app two selectable visual themes matching the two hardware targets (Circuit Tracks = dark, Circuit Rhythm = light), applied across chord-input, circuit-grid, patch-editor, stepper, knob and slider components.
- **Why:** Inferred: mirrors the two pieces of hardware the app targets (Circuit Tracks vs. Circuit Rhythm), aligning the app's look with whichever device the user has.
- **Commit(s):** `72df9ca`

### Cross-project integration: dynamically load external "human-engine" panel
- **When:** 2026-06-29
- **What:** Added a slide-out "human" sidebar panel that dynamically imports a separate `human-engine` component — from a CDN URL in production (`VITE_HUMAN_ENGINE_URL` env var) or a local Vite alias in development — and later (commit `ef59682`) wired it to decode a `?state=` URL parameter containing a shared progression, labeled in the UI as "Shared from Chord Voyager".
- **Why:** Not stated in commit messages; diff evidence indicates this integrates Circuit Chords with a separate sibling tool ("Chord Voyager"/human-engine) so progressions can be shared between the two apps via URL state.
- **Commit(s):** `cdffbce`, `ef59682`

### Project renamed from "Circuit Chord Forge" to "Circuit Chords"
- **When:** 2026-06-26
- **What:** README title and project references changed from "Circuit Chord Forge" to "Circuit Chords"; redundant documentation sections (project structure, event shape docs) removed from the README at the same time.
- **Why:** Not stated in commit message.
- **Commit(s):** `0096103`

### Default pad mode changed to Chromatic
- **When:** 2026-07-01
- **What:** Changed the app's default pad-grid mode from Scale Collapse to Chromatic on load, per `circuit-chord-forge.ts` state defaults.
- **Why:** Not stated in commit message.
- **Commit(s):** `6410e9a`

### Voicing mechanism and mobile drawer restructured
- **When:** 2026-07-02
- **What:** Moved most voicing-mechanism logic out of `music-grid.ts` and into `circuit-chord-forge.ts` (net removal of ~200 lines from `music-grid.ts`, large additions to the component), and reworked the mobile layout so the voicing keyboard now lives inside the slide-out drawer instead of its own fixed area.
- **Why:** Not stated in commit message ("update voicing mechanism" / "mobile version of drawer").
- **Commit(s):** `065c702`, `8a305d7`

### GPLv3 license adopted
- **When:** 2026-07-05
- **What:** Added a `LICENSE` file (GNU GPLv3), set `"license": "GPL-3.0-only"` in `package.json`, and updated the README license section.
- **Why:** Not stated in commit message.
- **Commit(s):** `481b799`

### Shareable progressions via URL query parameter
- **When:** 2026-07-06
- **What:** Replaced the hardcoded default-progression loader with logic that reads a `?p=` query parameter and parses it via the (new) shared `parseProgression` helper, falling back to a default progression (`Cmaj7 Am7 Dm7 G7`) if the parameter is missing or fails to parse.
- **Why:** Not stated in commit message; enables linking directly to a specific progression.
- **Commit(s):** `82add33`

### Component architecture split into modular UI pieces with Lit context store
- **When:** 2026-07-07
- **What:** Split the large monolithic `circuit-chord-forge.ts` component by extracting `brand-header.ts`, `settings-panel.ts`, `sidebar-nav.ts`, and `voicing-keyboard.ts` into `src/components/ui/`, added a `@lit/context`-based store (`src/store/contexts.ts`) to provide UI/MIDI/chord state to children, and moved styling into a `theme.scss` file compiled via a new `sass` dependency. Two Node scripts (`refactor.cjs`, `refactor-html.cjs`) were added to mechanically perform parts of this extraction.
- **Why:** Not stated in commit message ("make it better"); diff shows this reduces duplication/size in the single-file component and introduces a shared state/context pattern.
- **Commit(s):** `fc2a4f2`

### Chord parsing extracted into a standalone, documented library
- **When:** 2026-07-08
- **What:** Created `src/lib/chord-parser.ts` exposing `normalizeQuality`, `sanitize`, `tokenize`, and `parseProgression` with JSDoc comments, consolidating regex-based tokenization, separator handling (bars, arrows, commas), and case-normalization logic that had previously been inlined in the component, and wired the component to use it.
- **Why:** Not stated in commit message; centralizes chord-string parsing so it is reusable and independently testable.
- **Commit(s):** `0c82bc2`

### Unit test suite added (Vitest)
- **When:** 2026-07-08
- **What:** Added `vitest` as a dev dependency and a `test` script, along with test files for the chord parser, music grid, and Circuit SysEx modules (`chord-parser.test.ts`, `music-grid.test.ts`, `circuit-sysex.test.ts`).
- **Why:** Not stated in commit message.
- **Commit(s):** `745ac17`
