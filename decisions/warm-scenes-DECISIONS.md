# warm-scenes — Decisions

## Project summary
warm-scenes ("Lofi Diorama Generator") is a Lit + TypeScript + Three.js web app that renders interactive, audio-reactive lofi-aesthetic scenes: a 3D desk/room "diorama" full of draggable synth/pedal gear, a waveform-driven "wavefield" screen visualizer, and a cinematic end-credits sequence. It includes an AudioDirector that derives camera/timing markers from an audio track and a bundled render.js script that uses those markers to export a scene as a static HyperFrames-compatible video composition, built and deployed via Vite to GitHub Pages (docs/).

## Decisions

### Project genesis: dual-mode screen (wavefield + diorama)
- **When:** 2026-07-12
- **What:** Initial commit scaffolds the Vite/Lit/TypeScript project and adds the two founding scene concepts: `wavefield-screen.ts` (audio waveform visualizer) and `lofi-diorama.ts`/`diorama-screen.ts` (3D desk scene), wired together by `lofi-dashboard.ts` and `main-app.ts`.
- **Why:** Inferred: establishes the app's core premise of switchable audio-reactive "scenes" rather than a single fixed visualization.
- **Commit(s):** `f4d64a0`

### Config UI redesign: overlays replace monolithic panel
- **When:** 2026-07-14
- **What:** Replaced a single monolithic config panel with frameless, contextual overlay panels in `lofi-dashboard.ts`; also fixed an audio-scrubber seek bug (preserving `pausedTime` in AudioManager), added a GainNode + volume slider, and prevented slider jitter during drag.
- **Why:** Stated in commit message (implicit UX improvement); no explicit rationale beyond the change itself.
- **Commit(s):** `97bc0669`

### Build output redirected to docs/ for GitHub Pages
- **When:** 2026-07-14
- **What:** Added `vite.config.ts` setting `build.outDir` to `docs`, so the production build lands in a `docs/` folder instead of the default `dist/`.
- **Why:** Inferred: GitHub Pages can serve directly from a repository's `docs/` folder, avoiding a separate deploy step or branch.
- **Commit(s):** `328c9cac`

### Gear inventory moved from 2D menu into the 3D scene
- **When:** 2026-07-14
- **What:** Moved device/gear selection out of a flat 2D dashboard menu and into physical, clickable shelf objects inside the 3D diorama. The dashboard menu was narrowed to handle only non-interactive decor items (plants, lamp, cup, posters) with real image thumbnails.
- **Why:** "Physical shelf interactions provide a more immersive diorama experience than the previous 2D gear menu" (commit message).
- **Commit(s):** `3c334b8e`

### Add "backrooms" alternate environment mode
- **When:** 2026-07-14
- **What:** Added a new `environment-manager.ts` and diorama changes to support a procedurally-built "backrooms" room environment (damp carpet, drop ceiling, yellow wallpaper textures) as an alternate scene theme alongside the default desk room.
- **Why:** Inferred: matches the atmospheric-variety goals later formalized in the RFC (`rfcs/RFC-upcoming-features.md`), which explicitly proposes alternate "Liminal"/mood environment modes.
- **Commit(s):** `a1a2fe24`

### Offline render pipeline introduced (AudioDirector + render.js)
- **When:** 2026-07-15
- **What:** Added `AudioDirector.ts` (and an `analyzer.worker.ts`) that extracts audio reactivity from the wavefield scene into seek-safe transient markers, plus a bundled `render.js` script that exports those markers into a static, HyperFrames-compatible HTML composition.
- **Why:** Commit message frames this as decoupling live audio reactivity from a reusable export path ("extracts wavefield audio reactivity... bundles a local render script").
- **Commit(s):** `851870496`

### Offline render made truly headless
- **When:** 2026-07-15
- **What:** Extended `render.js` to run a Vite build, probe audio duration with `ffprobe`, and manually decode `audio.wav` to compute RMS/bass filters, removing the dependency on the browser's Web Audio API during render. Also hid AudioDirector UI panels in headless render mode.
- **Why:** Stated in commit message: enables "deterministic headless rendering without Web Audio API."
- **Commit(s):** `6f1da4a0`

### Add "end credits" cinematic scene as a third mode
- **When:** 2026-07-18
- **What:** Added `cinematic-credits.ts`, a new full scene mode (star-field/scrolling credits style sequence) wired into `main-app.ts` alongside the existing diorama and wavefield modes.
- **Why:** Inferred: expands the app from two scene types to three, adding a cinematic/narrative output distinct from the interactive diorama and the audio visualizer.
- **Commit(s):** `456fd03c`

### Custom film-grain shader replaces built-in FilmPass
- **When:** 2026-07-19
- **What:** Replaced Three.js's built-in `FilmPass` with a custom `ShaderPass` using luminance-weighted noise in the credits scene, and moved the sun glow effect into the fragment shader.
- **Why:** "Built-in FilmPass caused digital static... prevent post-processing bloom from bleeding over the terrain horizon" (commit message).
- **Commit(s):** `0ec572ce`

### Backrooms room-building approach churned: skybox tried, then reverted to procedural maze
- **When:** 2026-07-19 to 2026-07-22
- **What:** `9663979` ("wip: new kind of diorama") reworked `lofi-diorama.ts`'s backrooms room construction (net removal of ~40 lines) and added new backrooms texture maps (albedo/emission/roughness), moving toward an inverted-sphere-skybox approach. `ac8d765` then explicitly reverted that inverted sphere skybox back to the original procedural backrooms maze, removed a folding table prop, and added raycast-based wall occlusion so only walls blocking the camera's line of sight fade transparent.
- **Why:** Stated in `ac8d765`'s commit message: the skybox approach was reverted in favor of the original maze; no reason given for why the skybox was rejected beyond the revert itself.
- **Commit(s):** `9663979`, `ac8d765`

### Component architecture refactor: Scene Controller seam + unified gear/audio engines
- **When:** 2026-07-23
- **What:** Three sequential refactors: (1) deleted `diorama-screen.ts` as a "shallow wrapper" and moved export/render responsibilities directly onto `lofi-dashboard.ts`/`wavefield-screen.ts`/`cinematic-credits.ts`; (2) deepened `LofiDashboard` and `LofiDiorama` into what the commit message calls a "Scene Controller Seam"; (3) consolidated per-scene procedural screen-canvas instances and asset definitions behind a new `GearRegistry`, and encapsulated WebWorker lifecycle/spectrum analysis behind a new `AudioAutomationEngine`.
- **Why:** Inferred (titles state the mechanism, not a business reason): reduce duplicated per-scene wrapper/glue code and centralize gear-asset and audio-worker management ahead of adding more scene types.
- **Commit(s):** `88d89cff`, `684cc38b`, `d838319c`

### Render pipeline regressions fixed, CDN GSAP dependency removed
- **When:** 2026-07-23
- **What:** Fixed `render.js` still emitting the now-deleted `<diorama-screen>` element (causing blank diorama renders) by switching it to `<lofi-dashboard>`; pinned the `hyperframes` dependency to `^0.7.68` instead of a stale `^0.1.0` placeholder; restored `window.__timelines` registration using the app's own bundled GSAP instead of a CDN `<script>` tag; and exported weather/time-of-day/scene-mode/celestial/rain/lightning/active-gear state into the render-mode data-attribute round trip instead of falling back to hardcoded defaults.
- **Why:** Fixes regressions introduced by the same day's scene-controller refactor; removing the CDN GSAP script means renders "no longer depend on network access or a second GSAP version" (commit message).
- **Commit(s):** `dbe26748`

### Shared, reusable visual-effects module (grain/VHS/noir)
- **When:** 2026-07-23
- **What:** Replaced a per-pixel-random film grain shader (previously visible as digital static) with a spatially-coherent `FilmGrainShader`, and introduced `src/utils/visual-effects.ts` containing `FilmGrainShader`, `VHSShader`, `NoirShader`, and a `VisualEffectsStack` helper that any scene can plug into its own `EffectComposer`, rather than duplicating shader code per scene. Wired into Cinematic Credits first (toggles, intensity sliders, export/render round-trip); a same-day follow-up (`42a6f39c`) extended the same VHS/grain/noir controls to the wavefield and diorama scenes, reusing the diorama's existing `sceneState` plumbing instead of a parallel config schema.
- **Why:** "The old grain shader hashed a fresh random value per pixel per frame, which is literally video static (zero spatial coherence)" (commit message); the shared-module extraction is presented as avoiding duplicated shader code across scenes.
- **Commit(s):** `043394a4`, `42a6f39c`

### Add TARDIS console room as a GLB-model-based diorama scene
- **When:** 2026-07-28 to 2026-07-29
- **What:** Added a `tardis-console-room.glb` model and a new togglable "TARDIS" scene mode in `lofi-diorama.ts`, alongside an updated `backrooms-diorama.glb` model (also introduced in this commit, replacing the earlier procedural/texture-based backrooms approach with an actual 3D model). Camera wall occlusion was extended to the new scene. A follow-up commit added room-floor device defaults, raycast-based surface snapping for placing gear in the new room, and scene-aware gear visibility.
- **Why:** Inferred: continues the app's pattern of adding alternate diorama environments (after the desk room and backrooms), moving from hand-built procedural geometry toward imported GLB models for new rooms.
- **Commit(s):** `196ec3a0`, `1b608ed`
