# chroma-chords — Decisions

## Project summary
Chroma Chords is a browser-based, Lit + TypeScript web app that generates 4-chord (or longer) progressions from a chosen genre and mood, plays them back with Tone.js-synthesized instrument voices, and lets a user swap/re-voice individual chords, view music-theory notation, arrange progressions into song sections, and export the result (WAV, MIDI, or device-specific URLs) to hardware/DAW tools such as Dirtywave M8 and Novation Circuit. The repository's history shows it started life under a different name and UI concept ("Chord Voyager," a maritime/nautical-themed modular chord studio with Google Drive-synced projects, a piano-roll style timeline, and mic-based scale detection) before being rebuilt into its current genre/mood "seed → loop → swap" flow and renamed to Chroma Chords partway through development.

## Decisions

### Initial app concept: Chord Voyager, a Drive-synced modular chord studio
- **When:** 2026-06-30
- **What:** First commits establish the project as "Chord Voyager — Modular Chord Studio": a Lit/TypeScript/Vite app with a neumorphic visual style, a large static chord-data JSON, a chord-profile/timeline UI, Google Drive project sync, and a Google sign-in gate blocking all use of the app.
- **Why:** Not stated; inferred: establishing baseline architecture and account-based project persistence before any product/UX exploration.
- **Commit(s):** `94a56543d2d1511bd1dc1e9131f0cc329d4e2885`, `4b79d5065c76e0fc4363c19ebe5a9343fd2a0789`

### Build output moved to docs/ for GitHub Pages hosting
- **When:** 2026-06-30
- **What:** Vite build output directory changed to `docs/`, with the built bundle committed to the repo.
- **Why:** Inferred: enables serving the static build directly from GitHub Pages without a separate deploy step or hosting service.
- **Commit(s):** `ab4c5d9cfd155be81e7ce2ac926c4352ab962594`, `9898f6e1bb2488e9bafccacad2d478181a187e77`

### Added Meyda-based audio scale detection to onboarding
- **When:** 2026-07-01
- **What:** `OnboardingLanding` component gained audio-based scale detection using the Meyda audio-analysis library (listening to input audio to infer a musical scale as part of onboarding).
- **Why:** Not stated in commit message.
- **Commit(s):** `8a2c77d25a4778609f05c6a9a38708d46ab28d52`, `83b0463d2ed917ca37bf5a6adf74d6548bcc5500`

### Removed the mandatory Google sign-in gate
- **When:** 2026-07-01
- **What:** Deleted the full-screen "Sign in with Google" gate that previously blocked the entire app; the app now renders its main UI regardless of authentication state, and cloud-sync calls are guarded to only run `if (this.isAuthenticated)`.
- **Why:** Not stated in commit message; inferred: lower friction for first-time users, since Drive sync is a nice-to-have rather than a requirement to try the app.
- **Commit(s):** `cb49145aca9acfaeb9593b3a716753e5977bcf51`, `c96915172ba2ce93b029ce3c723ab142565117d1`

### Maritime-themed seasonal easter eggs added
- **When:** 2026-07-06
- **What:** Added hidden sun/wind/sea-monster imagery and interaction easter eggs to the (then maritime-themed) app, later aligned/adjusted for consistency.
- **Why:** Not stated; decorative/personality addition consistent with the app's original nautical "Voyager" branding.
- **Commit(s):** `be6124a1d75a22d1171605af9861fd7d16bf7d1b`, `876d5af4faa3e9c8bb6cfa43cdbe6417a7179476`, `1602e56bda94aaed3aed696961280c06442d43c4`, `fdca5ba3c594ec27e77d0eae97b21183d3224377`

### Complete UI rebuild: maritime UI replaced by Seed/Loop/Swap flow
- **When:** 2026-07-20
- **What:** Replaced the entire maritime-themed UI (timeline builder, next-options table, mic-scan onboarding, profile-card UI) with a new "editorial" paper/ink design built around three screens — pick genre+mood (Seed), get an instant chord loop (Loop), tap a chord to swap it via plain-language emotional descriptors (Swap) — backed by a new `chord-engine` progression generator. Existing project save/Drive-sync plumbing was kept underneath the new UI.
- **Why:** Stated as following an "editorial redesign handoff" (external design direction); the new flow trades the modular/timeline studio concept for a simpler, faster "instant chord loop" concept.
- **Commit(s):** `80b172702eb52c00e040ced78ba9d3226e0ce16e`, `56199cb751f2cf72aef621797df0b9a3cc0fb497`

### Progression generation rewritten as curated genre/mood-weighted templates
- **When:** 2026-07-20
- **What:** Replaced the deterministic hash-based key selection and generic diatonic random-walk with a curated bank of idiomatic chord-shape templates per scale/mode, weighted by mood and picked randomly (falling back to the old graph walk when no template exists for a scale/mode).
- **Why:** Stated: the old approach produced the same loop every time for a given genre+mood, and needed genuinely varied, idiomatic-sounding output.
- **Commit(s):** `6685d807c2129c4a6439fe2bf436e81145471cdd`, `7a9a23910281aa12301d807389b32d49fbea2853`

### Per-genre instrument voices and humanized playback
- **When:** 2026-07-20
- **What:** Added four new Tone.js-synthesized voices (organ, cinematic pad, Synthwave-style Juno pad, House stab) alongside the existing sampled Rhodes, and wired up per-genre velocity/timing/duration "humanize" parameters and arpeggiation, replacing a single flat Rhodes hit for every genre.
- **Why:** Not stated directly; inferred from the change itself — genre-appropriate sound and feel instead of one uniform playback style.
- **Commit(s):** `7768843ab40bc9116509a56898235260ac6f75a0`, `a97939540e2682cf46bd5d7f9f5742254febd71d`

### Architecture refactor: extracted chord engine and redesigned UI screens
- **When:** 2026-07-21
- **What:** Merged a multi-commit PR consolidating chord-generation logic into a dedicated `chord-engine` module and further reworking the Seed/Loop/Swap screens (desktop layout, drag-to-reorder, animated transitions, device-share links, footer restoration).
- **Why:** Not stated beyond the PR title; consolidates logic separated from UI during the prior day's rapid UI rebuild.
- **Commit(s):** `12609f43e70f626b08e05043374042986e5d2aa5` (merge of PR #1)

### Rebrand: Chord Voyager renamed to Chroma Chords
- **When:** 2026-07-22
- **What:** Renamed the app/product from "Chord Voyager" to "Chroma Chords." LocalStorage keys and data files migrated to a new `chroma_chords` namespace; old `chord-voyager`-keyed local data is no longer loaded automatically.
- **Why:** Not stated in commit message.
- **Commit(s):** `1a5616eacd81f5185ec52542c15a5524eae594d3`, `7ab42f2f47b0d91a0bd1ce133da9930217ed28ac`

### Added variable progression length and a Song screen for sections
- **When:** 2026-07-22
- **What:** Added a 1–8 chord length stepper and a new Song screen where Verse/Chorus/Pre-chorus/Bridge/Outro sections each hold a progression in the same key/scale, tappable to load into the Loop screen.
- **Why:** Stated: implements pieces of an "editorial redesign" spec not yet present in the app.
- **Commit(s):** `4cbaf91da1353b9131e4c0cbf22df50648d7b37c`, `b14ad4bc52ebf4be3260c3a4944af469bdb6d5bb`

### Song sections changed to reorder/reuse one progression instead of regenerating
- **When:** 2026-07-24
- **What:** `SECTION_TEMPLATES` replaced plain section names with a name + caption + reorder function per section type, so adding a song section reuses and reorders the same chord progression rather than generating an unrelated new one.
- **Why:** Stated: the UI already promised sections would be "related but never identical," but the prior implementation generated a fresh random progression per section, contradicting that promise.
- **Commit(s):** `7041b5635dde04d128ee4b8264fc65900731c543`

### Second visual redesign: flat-vector illustration style
- **When:** 2026-07-24
- **What:** Replaced the paper/ink editorial visual system with a "Flat Vector Concept" language (pastel red/blue/yellow on warm cream, Plus Jakarta Sans type, a tension-driven chord shape/color dictionary), rebuilding Seed/Loop/Swap/Song/Share screens as one responsive layout instead of separate mobile/desktop shells, while preserving existing functionality underneath.
- **Why:** Stated: applying a new "Flat Vector Concept" visual language from an external design handoff.
- **Commit(s):** `90c236d6551fe733b4ee2ed5ad035642f8dbe23b`

### Added an LLM-backed freetext-to-suggestion classifier
- **When:** 2026-07-24
- **What:** Added a pipeline wiring free-text vibe input to an LLM classifier via a Cloudflare Worker proxying OpenRouter, constrained to return only normalized genre/mood/key/scale values from the existing controlled vocabulary, falling back to a local keyword heuristic on failure.
- **Why:** Stated: the app is a static site with no other backend, so a Worker proxy was needed to call an LLM without exposing API keys, and normalizing output prevents the model from inventing invalid values.
- **Commit(s):** `27c603992469e7c9e7eb55dc753204fa795c6099`

### Classifier's LLM provider switched from OpenRouter free-tier to Anthropic directly
- **When:** 2026-07-24
- **What:** Replaced auto-discovered free-tier OpenRouter models (with model-picker UI and dead-code removal) with a single fixed call to Claude Haiku via a required `ANTHROPIC_API_KEY` Worker secret.
- **Why:** Stated: free-tier OpenRouter models kept surfacing new failure modes (deprecated IDs, JSON-format rejections, chain-of-thought preambles) one at a time; a single fixed, instruction-following model removed the variability.
- **Commit(s):** `df3489f73cf6afe83f8417e9f14ed33d4e39d071`

### Classifier allowed to return a full chord progression, not just genre/mood
- **When:** 2026-07-24
- **What:** Extended the classifier schema so the LLM can return key/scaleType/chords (constrained to closed root/quality enums, snapped onto real scale degrees via a new `alignChordsToScale`) instead of only genre and mood tags; later made this a required field so a real progression is always returned rather than omitted when the model isn't "certain."
- **Why:** Stated: the original prompt told the model to omit chords unless it could recall an exact known song, which meant most free-text queries (e.g. an artist name) got no chords at all, defeating the purpose of the field.
- **Commit(s):** `d2f4ae5263a668f014b2452ad66dce274fd5d773`, `fc69891e52ea5fa054838a3ed116a2f8ece26d6e`

### CORS hardened and Claude API access restricted to authorized users
- **When:** 2026-07-25
- **What:** Enforced strict URL-origin checking in the Worker's CORS handler, replaced an unauthenticated completion-check endpoint with an auth-key check, and required a valid Google OAuth token plus an `ALLOWED_EMAILS` allow-list before proxying requests to the Anthropic Claude API.
- **Why:** Stated (security fix): closing an open proxy that could be used by anyone to consume the app owner's Claude API quota.
- **Commit(s):** `747cfe78cd28a8a42d70076fac1f3a1bed9fe0b7`

### Instrument and Play-style playback controls added, tied to per-genre defaults
- **When:** 2026-07-25
- **What:** Added user-facing Instrument (Piano, Rhodes, Nylon Guitar, Warm Pad, Synth Bell) and Play style (Block chords, Arpeggio, Strum, Broken/swing, Half-time) pickers on the Loop screen, persisted via localStorage; a follow-up commit fixed the shipped defaults (which had been hardcoded to "Piano"/"Block chords") to instead derive from each genre's existing auto-selected voice/arpeggiation so untouched genres kept sounding as they did before this feature.
- **Why:** Stated for the follow-up fix: the initial hardcoded default silently flattened every genre onto the same playback behavior, killing existing per-genre arpeggiation (e.g. Lo-fi/Chill, Jazz-ish) the instant the feature shipped.
- **Commit(s):** `58ead406a5711f227cdb78505618e2e683fff990`, `83805caea12ff54871d82eb12c88c4ba353a775d`

### Added a Cloudflare Worker-proxied Google AI Studio (Gemini) provider
- **When:** 2026-07-27
- **What:** Added Google AI Studio (Gemini) as an alternate free LLM provider for classification, proxied through the Worker; a same-day follow-up migrated the Gemini model choice to `gemini-3.1-flash-lite` after `gemini-2.5` was restricted for new users and `gemini-3.5` occasionally truncated strict-JSON output mid-string.
- **Why:** Stated: switched from "OpenCode AI" to Google AI Studio specifically to avoid a minimum-deposit requirement for free-tier API access.
- **Commit(s):** `6e3946aeb81b0cd14d309793203e51f6030edc21`, `e99d17fb73cbf2bd5ae806303a535f8e4a8357e8`

### Architecture refactor: core services split into deep modules
- **When:** 2026-07-26
- **What:** Extracted shallow state/logic from the top-level app orchestrator into four separated modules (storage, playback, prompt classifier, song arranger), adding unit test suites and a domain glossary.
- **Why:** Not stated beyond the commit's own framing ("deepen core services into deep seams" — a module-design principle); inferred: the orchestrator component had accumulated too much direct logic as features were added.
- **Commit(s):** `b479c0fddfbc64e2ac19259406608f97f45eaf31`

### Static hero graphics replaced with a 2D physics-based background
- **When:** 2026-07-26
- **What:** Replaced static hero SVGs on the Seed screen with a 2D physics simulation: rounded shapes spawn on load and drift with elastic collisions, squish deformation, and mouse-repulsion currents.
- **Why:** Not stated beyond the commit summary ("serene aquarium jelly physics"); appears to be a purely visual/tactile-feel enhancement.
- **Commit(s):** `cb39020acb92b1614ecce0276a0c0655c496d4f9`

### Auto-saving replaced with explicit manual save and a sets-management screen
- **When:** 2026-07-27
- **What:** Removed implicit auto-saving of progressions in favor of an explicit user "save" action, adding a `<sets-screen>` to view/delete saved sets, a save modal, and a bookmark button across views.
- **Why:** Not stated directly in the commit message; the change from implicit to explicit save is a deliberate data-model/UX shift (users now control what gets persisted, rather than every change being silently saved).
- **Commit(s):** `39a0e3900f86060b3815e59d7083f4f0e0d5ee98`

### Client-side auth hardened against spoofing
- **When:** 2026-07-27
- **What:** Fixed the auth flow so the constructor no longer trusts `localStorage` state without validating an authorized-user hash, and added the same hash check to the login-request path (previously any Google account could bypass the admin-gated hash check).
- **Why:** Stated (security fix): admin-only UI relied on this bypassable authenticated state, so any Google user could reach it.
- **Commit(s):** `9fffc14c174ed6c363b26cb811d64e38c6afefe8`

### Silent/background Google auth and Drive sync disabled
- **When:** 2026-07-27
- **What:** Removed automatic silent token requests and background cloud uploads that ran on page load or on every project save; the Google Identity Services script now loads only when a user explicitly signs in, with no native-prompt fallback.
- **Why:** Not stated directly; a same-week related commit ("prevent google auth prompt on page refresh") notes mobile browsers were popping up unwanted auth dialogs from these background silent-auth checks, which this change removes at the source.
- **Commit(s):** `b820c839a0547526e32aa5d330ff315bb6f707b7`

### WAV and MIDI export added to the hardware/DAW share flow
- **When:** 2026-07-26
- **What:** Extended the existing device-share feature (M8/Circuit URL export) with in-browser rendering of a WAV file matching the active instrument/play style, and generation of a Standard MIDI file with arpeggio/strum timing, both named using key/mood/BPM.
- **Why:** Not stated; extends the app's stated hardware/DAW export capability beyond device-specific links to portable audio/MIDI files.
- **Commit(s):** `675e35290c09aee3b36b2244c8c459fc77adc9b9`

### Playback engine stabilized and legacy saved data auto-migrated
- **When:** 2026-07-28
- **What:** Added on-the-fly reconstruction of malformed notes arrays, stripped invalid trailing-octave data before playback, normalized an "Unknown" genre value to "Pop" to avoid missing-profile silent failures, and added a local-storage migration to permanently upgrade old "Unknown"-genre projects.
- **Why:** Stated: prior data/format changes had left some saved sets in a state that silently broke playback; this both fixes the immediate failures and permanently migrates the underlying bad data.
- **Commit(s):** `a2df9f0b97f16535b6a632bf09e30ede443bbafe`
