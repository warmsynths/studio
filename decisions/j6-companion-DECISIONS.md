# j6-companion — Decisions

## Project summary
j6-companion is a static browser app (Lit 3 + TypeScript + Vite, no backend) for exploring data related to the Roland J-6 chord synthesizer. It lets users search and filter the J-6's factory presets, chord sets, and arpeggiator "styles," combining raw hardware data (originally sourced from a community-made spreadsheet/CSV) with inferred tags, filters, and small visualizations (an SVG envelope tracer, step-grid pattern views). It builds to a `docs/` folder and is deployed as a static site (e.g. GitHub Pages), and later gained PWA (installable/offline) support.

## Decisions

### Initial architecture: Lit components + static preset data
- **When:** 2026-06-13
- **What:** First commit of the app: a Lit/TypeScript project with `j6-app.ts` (shell), `j6-preset-list.ts`, and `j6-preset-detail.ts`, backed by a static `src/presets-data.js` array, including an SVG amp-envelope visualizer.
- **Why:** Inferred: establishes the app as a lightweight, dependency-light static web-component app rather than a framework (React/Vue) SPA, matching the "static and dependency-light" goal later stated in the README.
- **Commit(s):** `b2b39a2`

### Static-site build/deploy pipeline via committed `docs/` output
- **When:** 2026-06-13
- **What:** Changed the build script from `vite build --outDir docs --base ./` to a plain `vite build` plus a new `postbuild` step (`cleanup-dist.cjs`) that deletes the `dist/` folder, and added a `vite.config.ts` that prevents Vite from emptying `docs/` before each build.
- **Why:** Inferred: supports a workflow where built assets are committed to `docs/` and served directly (GitHub Pages-style) rather than deployed from a separate `dist/` artifact or CI pipeline.
- **Commit(s):** `1f71694`

### Producer-friendly tag inference and category-based filtering
- **When:** 2026-06-13 to 2026-06-14
- **What:** Added a keyword-matcher system (`tagMatchers`) that infers producer/genre tags (e.g. "Deadmau5" → Progressive House/EDM) from preset notes, plus a multi-category filter UI (genre/mood, instrument, character, envelope, effects, waveform). This logic was later extracted out of `j6-app.ts` into typed, tested modules (`src/types.ts`, `src/utils.ts`, `src/utils.test.ts`) with `vitest` introduced as the test runner (replacing the placeholder "no test specified" script).
- **Why:** Stated in commit message: make raw J-6 patch descriptions "easier to search, filter, and inspect" by surfacing producer-friendly tags instead of raw spreadsheet fields.
- **Commit(s):** `436306e`, `a1c09b7`

### Preset dataset regenerated from raw CSV export
- **When:** 2026-06-14
- **What:** Added Python/Node conversion scripts (`convert-presets.py`, `convert-presets-fixed.py`, `convert-presets-better.py`, `compare-presets.js`) that parse the original "Roland J-6 Preset Sounds Ver1.0 (RAW).xlsx" CSV export and regenerate `src/presets-data.js` programmatically; the file grew from 962 to 2938 lines.
- **Why:** Inferred: moves the dataset from a smaller, likely hand-curated/partial extract to one generated directly and reproducibly from the full source spreadsheet, reducing manual transcription error and making the data pipeline auditable/repeatable.
- **Commit(s):** `27beb4b`

### "Juno redesign" — skeuomorphic hardware-synth UI replaces list+detail split
- **When:** 2026-07-05
- **What:** Rebuilt the main UI as a single skeuomorphic "synth faceplate" panel (Roland Juno-styled header, knobs, metallic gradients, badges) directly inside `j6-app.ts`, dropping the `j6-preset-detail` component from the render tree (it remains in `src/` but is no longer imported/used at HEAD). This was iterated on the same day (visual refinement, then code simplification) and search/filter state was subsequently moved into `j6-preset-list.ts` as part of the same rework.
- **Why:** Inferred: pivot toward a more visually distinctive, hardware-inspired identity ("skeuomorphic retro synth UI design inspired by classic Roland instruments," per the README) instead of a generic two-pane list/detail layout.
- **Commit(s):** `a0c0f2c`, `ccb0278`, `5fd8b1b`, `27b71b7`

### Design-token system introduced
- **When:** 2026-07-07
- **What:** Added `design-system/tokens.css` (CSS custom properties for colors, fonts) and a one-off `scripts/replace-tokens.js` script that mechanically replaced hardcoded hex colors and font strings across `j6-app.ts`, `j6-preset-list.ts`, and `j6-preset-detail.ts` with `var(--token)` references.
- **Why:** Inferred: centralize the visual language established by the Juno redesign so colors/fonts are maintained in one place rather than duplicated across components.
- **Commit(s):** `6c8a2ec`

### Chords feature added (new data domain and view)
- **When:** 2026-07-07
- **What:** Added a large chords dataset (`data/chords.json`, ~13.8k lines) and a new `j6-chords-view.ts` component with genre/key filtering and a chord-complexity calculation, iterated through several follow-up commits the same day (retro-styled controls, genre/complexity UI, data-shape cleanup that shrank `chords.json` from ~12.9k to a smaller normalized form).
- **Why:** Inferred: expands the app's scope beyond preset browsing into a second, related J-6 data domain (chord sets), moving it toward a general "companion" tool rather than a single-purpose preset explorer.
- **Commit(s):** `812833a`, `156966b`, `93bd34a`, `5ef93b3`, `0407ef0`, `159d36d`

### RFC-driven relational restructuring of chord data
- **When:** 2026-07-07
- **What:** Added a script to generate a normalized relational dataset (`data/relational/genres.json`, `chord_sets.json`, `set_chords.json`) from the flat chord data, along with a written RFC document (`docs/RFC-data-features.md`, later moved to `rfcs/`) describing the new analytical fields (complexity score, inferred key, chord-quality/extension breakdowns, recommended progressions) and proposing future features built on them.
- **Why:** Stated in the RFC: the flat chord dataset was enriched with music-theory-derived analytics, and the document explicitly lays out the tradeoff between keeping data flat client-side vs. moving to a backend/database if heavier querying features are pursued.
- **Commit(s):** `66aad6c`

### Styles (arpeggiator pattern) view added as a third feature area
- **When:** 2026-07-10
- **What:** Added `data/styles.json` and a new `j6-styles-view.ts` component (replacing a "Styles view coming soon" placeholder), then substantially reworked it the same day — replacing a simple oscilloscope-style bar visualization with a step-grid pattern renderer that adapts columns to note subdivision (8th/16th/triplet/etc).
- **Why:** Commit message for the rework states the first version was "rubbish"; the feature itself extends the app to a third J-6 data domain (arpeggiator/rhythm styles) alongside presets and chords.
- **Commit(s):** `6f98f24`, `2ba38da`

### Project renamed from "Preset Explorer" to "J-6 Companion"
- **When:** 2026-07-10
- **What:** Renamed the app in `README.md` and `package.json` (`j6-presets` → `j6-companion`, "Roland J-6 Preset Explorer" → "Roland J-6 Companion"), and updated the README description to cover "presets, chord sets, and styles" instead of presets alone.
- **Why:** Inferred: the name change follows directly from the app having grown beyond preset browsing (chords and styles views added days earlier), making "Preset Explorer" no longer an accurate description.
- **Commit(s):** `b0f90b6`

### PWA support added
- **When:** 2026-07-11
- **What:** Added `vite-plugin-pwa` with a web manifest (name, icons, theme color, standalone display), service worker generation, and apple-touch/PWA meta tags in `index.html`.
- **Why:** Inferred: makes the app installable and usable offline as a home-screen app, appropriate for a companion tool a musician might want available without a browser chrome or network connection while at their instrument.
- **Commit(s):** `c8c6d2d`
