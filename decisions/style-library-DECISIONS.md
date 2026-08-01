# style-library — Decisions

## Project summary
Style Library is a local Vite + TypeScript web app (with a small Node/tsx ingestion pipeline) that ingests screenshots of web/visual design references, uses a vision-capable AI model to classify each into a style taxonomy, and generates a reusable image-generation prompt, website design brief, and visual style lexicon per entry. Entries are stored in a local `data.json`/`vocabulary.json` pair and browsed through a searchable, filterable card grid with a lightbox detail view. The full commit history is small (7 commits, all dated 2026-07-31), so this is an early-stage/single-session project rather than one with a long evolution — of the 7 commits, 5 are decision-shaped and 2 are routine housekeeping (a GPL-3.0 license addition and a `.gitignore` entry for the Vite cache).

## Decisions

### Initial build: ingestion pipeline + Vite dashboard
- **When:** 2026-07-31
- **What:** First commit establishes the whole project: a CLI ingestion script (`ingest.ts`) that scans `incoming/`, sends screenshots to a vision model, and writes structured entries to `data.json`/`vocabulary.json`; a `consolidate.ts` script for interactive taxonomy cleanup; and a Vite/TypeScript frontend (`src/app.ts`, `src/style.css`, `src/types.ts`) that renders the cataloged entries as a filterable card grid with lightbox. Ships with 10 seed screenshot entries already classified.
- **Why:** Not stated explicitly; this is the foundational commit establishing the tool's purpose (per README: turning unorganized reference screenshots into structured, reusable design specs).
- **Commit(s):** `acb6283773dd798397723cfc5d6bb4e2469aa2f1`

### Move ingestion in-app; add multi-model comparison and re-analysis
- **When:** 2026-07-31
- **What:** Added an in-UI ingestion modal (provider/model picker, free-model filter, drag-and-drop upload) so screenshots can be ingested from the browser instead of only via the CLI script. Also added a version-select dropdown in the lightbox allowing a single entry to be re-analyzed with a different model and the results compared side by side. Split ingestion logic out of `ingest.ts` into a new shared `ingest-core.ts` module (610 lines) so both the CLI script and the new browser-triggered flow could call the same classification code.
- **Why:** Not stated explicitly. Inferred: enables comparing how different AI models classify the same reference and removes the CLI as the only path to add new entries.
- **Commit(s):** `e09dbc9094a048e3ca5734776c0e04a6c79065e7`

### Introduce versioned ingestion history in data.json
- **When:** 2026-07-31
- **What:** Reworked the "Maxima Early Intervention" entry's `data.json` record to add an `ingestions` array holding the full prior version(s) of an entry (original CLI ingestion plus a newer OpenRouter/Nemotron re-analysis) alongside the current top-level fields, which were themselves updated to the newer analysis (title changed from "Maxima Early Intervention" to "Early Intervention Visual", tags/brief/lexicon rewritten).
- **Why:** Not stated explicitly. Inferred: this establishes the data schema needed to support the re-analysis/model-comparison feature added in the previous commit — without an `ingestions` history array, re-running analysis with a different model would simply overwrite the original with no way to compare or roll back.
- **Commit(s):** `64799d0d029b980f9558b1e8b90fae15c63c198e`

### Add Google AI Studio provider and Cloudflare Worker proxy; default provider switched to Google
- **When:** 2026-07-31
- **What:** Added a new "google" ingestion provider (direct calls to `generativelanguage.googleapis.com` using `GOOGLE_API_KEY`/`GEMINI_API_KEY`) and an "opencodeai" provider, plus a Cloudflare Worker (`worker/worker.ts`) acting as a proxy for vision classification that is tried before falling back to local provider keys. The Worker README/config documents "strict free tier enforcement." `getConfigStatus()` was changed so `defaultProvider` is now hardcoded to `'google'` with `defaultModel: 'gemini-3.1-flash-lite'`, replacing the prior logic that picked between OpenRouter/Anthropic based on which API key was present. Config flags (`hasGoogleKey`, `hasOpenRouterKey`, etc.) were also changed to report `true` unconditionally (`|| true`), effectively no longer gating the UI on whether a key is actually configured locally, consistent with the new proxy-first flow.
- **Why:** Commit message states this supports "Google AI Studio Gemini models and dedicated Cloudflare worker proxy for vision style taxonomy extraction with strict free tier enforcement" — i.e., adding a free/low-cost model path that doesn't require the user to hold their own API key locally.
- **Commit(s):** `1e0cc4590f8f9d11214dac97716fdaaac99dd7e7`

### Add Google OAuth app gate; drop OpenAI/OpenCode from UI providers; switch build output to docs/ for hosting
- **When:** 2026-07-31
- **What:** Added a full-screen Google Identity Services login gate (`auth-service.ts`, dark glassmorphism overlay UI in `index.html`/`style.css`) that blocks app usage until the user authenticates, backed by a new `/auth/verify` Cloudflare Worker endpoint that checks the signed-in email against an `ALLOWED_EMAILS` allowlist. In the same commit, OpenAI and OpenCode were removed as selectable providers in the model dropdowns, and `vite.config.ts` was changed to build to `docs/` (`outDir: 'docs', emptyOutDir: true`) instead of the default `dist/`, with a built `docs/index.html` and asset bundle committed directly into the repo.
- **Why:** Not stated explicitly for the provider removal or build-output change. Inferred: the auth gate restricts the app to specific allowed Google accounts, suggesting the app was being made accessible outside a purely local/single-user context (e.g., shared or deployed access); the `docs/` build output and committed build artifacts are the convention for serving a static site via GitHub Pages from the `docs/` folder, suggesting the app started being deployed/hosted rather than run only via `npm run dev`.
- **Commit(s):** `47336a7b6ceaeb7bee402f3b42fad1405523afa1`
