# po20 — Decisions

## Project summary
po20 (package name `po-20-lit`) is a browser-based, local-only companion app for the Teenage Engineering Pocket Operator PO-20 Arcade, letting users document 16-step sequencer patterns (per-sound step grids with pitch/filter parameter automation) and build chord progressions using the PO-20's chord set, since the hardware itself has no save/export feature. It is built with Lit web components, TypeScript, and Vite, persists state to browser localStorage, and includes a Web Audio synth engine for previewing chords in-browser. The app is deployed as a static site (built to `docs/` for GitHub Pages).

## Decisions

### Step-selection logic simplified and touch input added to knob controls
- **When:** 2026-06-15
- **What:** Reworked the branching step-toggle/select state machine in the pattern editor into a simpler active/selected model, and added `touchstart`/`touchmove`/`touchend` handlers to the knob component (mirroring the existing mouse-drag behavior) so parameter knobs can be operated on touchscreens.
- **Why:** Not stated explicitly in commit message; inferred: the prior click-handling logic branched on four overlapping conditions and was hard to reason about, and mouse-only dragging excluded touch/mobile devices.
- **Commit(s):** `fbfaa31c3dc4ee0d06a39a755e9e2024280b7f8d`

### README rewritten to drop stale Create React App boilerplate
- **When:** 2026-06-17
- **What:** Replaced a README that still began "Getting Started with Create React App" (with CRA-specific sections on `yarn start`/`eject`/code-splitting) with a description of po20 as a Lit-based, Web Component companion app, and introduced the "po20" project name/branding.
- **Why:** Not stated explicitly; inferred: the project's actual stack (Vite + Lit, confirmed already in the initial commit's package.json) had diverged from its README, which still carried text left over from an earlier Create React App scaffold.
- **Commit(s):** `920e7f36ea914a012dfa58fdb550ec8f1bb3f3dd`

### Migration from JavaScript to TypeScript
- **When:** 2026-06-24
- **What:** Renamed all `src/` component, util, and icon files from `.js` to `.ts`, added `tsconfig.json` (strict mode, decorators enabled), added `typescript` and `@types/uuid` dependencies, removed `jsconfig.json`, and adjusted the GitHub Pages build/deploy configuration. Authored by Reynold Ismail, whose commits (this and the three that follow the same day) are a distinct contribution burst separate from the primary author's commits.
- **Why:** Stated in commit message as a combined "migrate to TypeScript and configure build artifacts for GitHub Pages"; the type system (strict mode, `noUnusedLocals`/`noUnusedParameters`) suggests an intent toward stronger compile-time safety.
- **Commit(s):** `41a24c54b26db9ebf324e3e8692f7687b52a27bb`

### Theme state added to central store
- **When:** 2026-06-24
- **What:** Added a `Theme = 'dark' | 'light'` type and `theme` field to `AppState`, plus `_applyTheme()`/`setTheme()` methods on the store that toggle a `data-theme` attribute on `document.body` and persist the choice; also expanded header/footer/landing components and base CSS as part of the same commit.
- **Why:** Not stated explicitly; inferred: this is the persistence/state layer needed to support the dual dark/light theme feature later exposed in the header UI.
- **Commit(s):** `b5e0204d11fcfa1b92453120370dd0676ea1eaad`

### Dedicated Web Audio synth engine introduced for chord preview
- **When:** 2026-06-25
- **What:** Added `src/utils/chord-synth.ts`, a ~314-line, documented Web Audio module (oscillator → lowpass filter → per-voice gain envelope → shared compressor/limiter → destination) with a hard-capped 3-voice pool and voice-stealing (fade-out old voice) to avoid signal clipping when chords overlap; wired into the chord editor for live audio preview.
- **Why:** Stated in commit message: to add "audio preview and sequence management" to the chord editor; the in-code comments explain the voice-stealing design exists specifically "to prevent summed signal from clipping."
- **Commit(s):** `bd02a79209dfc3724a7a551366794a49d0099b8b`

### Chord-pill interaction changed from click-to-remove to click-to-preview
- **When:** 2026-06-28
- **What:** In the chord editor's progression timeline, clicking a chord pill previously removed it; changed so clicking a pill now plays an audio preview of that chord, while a separate "×" icon (with its own click handler and `stopPropagation`) handles removal. Timeline hint text was updated to "Click chord to preview, × to remove."
- **Why:** Not stated explicitly; inferred: click-to-remove was likely too easy to trigger accidentally and didn't let users hear a chord already placed in the sequence, so removal and preview were separated into distinct affordances.
- **Commit(s):** `dc7d8348db365548c4c0d7b0cba0b16fbc27bd70`

### Header navigation redesigned: drawer menu removed
- **When:** 2026-06-28
- **What:** Removed the sliding drawer/hamburger navigation menu (overlay, slide-in panel, nav list, all associated CSS — over 250 lines deleted) from `po20-header.ts`, and removed the `isDrawerOpen` property. Replaced with an inline `header-actions` row and added creation modals (for new patterns/chords) plus a visible theme toggle directly in the header, alongside footer and landing page updates.
- **Why:** Not stated explicitly; inferred: with only a few actions (theme toggle, create pattern/chord) needed, an off-canvas drawer was likely unnecessary complexity for the app's actual navigation surface.
- **Commit(s):** `25f2daabd6a8f9ff752fb12511a3820efcbf2ccc`

### Accent color changed from orange to purple ("purple theme")
- **When:** 2026-06-28
- **What:** Changed the `--accent`/`--accent-hover` CSS custom properties in both the dark theme (`#ff5722`/`#e64a19` → `#a855f7`/`#9333ea`) and light theme (`#d94f1e`/`#bf4218` → `#7e22ce`/`#6b21a8`), added a new `--accent-rgb` variable, and updated several components (chord editor, footer, knob, landing, pattern editor) to match the new palette.
- **Why:** Not stated beyond the commit message "purple theme"; a visual branding/identity change with no functional behavior change.
- **Commit(s):** `43ea2c175a02e24116feb2de4c53cdc652af121a`

### Project formally licensed under GPLv3
- **When:** 2026-07-05
- **What:** Added a full `LICENSE` file (GNU GPLv3 text) and updated the README's licensing section to state the project is "open-source and available under the GNU GPLv3 License," including a disclaimer that the project is not affiliated with or endorsed by Teenage Engineering.
- **Why:** Not stated beyond the commit message; this is the point the project's licensing terms became explicit rather than implicit.
- **Commit(s):** `77463c09296bda464f65d43bd8cd2a3d0c7f0cde`

---

**Commits reviewed but treated as routine (not listed above):** `df7eb94` (initial commit — baseline import, already Lit/Vite-based), `63fbcc6` and `0ef0b23` (minor README wording tweaks), `1c3c678` and `14065be` (pure build-artifact regeneration in `docs/`, no source change), `df80676` (DOM-order/wrapper tweak moving the LCD screen inside a panel div, cosmetic), `3e66046` (mostly a rebuild plus a single unused-variable removal), `c6946f5` (chord pill background/hover color simplification and removal of a helper-text row), `7c467a3` (README feature list and screenshots update, no behavior change).
