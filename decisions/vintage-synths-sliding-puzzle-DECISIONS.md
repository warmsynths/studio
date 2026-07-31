# vintage-synths-sliding-puzzle — Decisions

## Project summary
The app is a browser-based sliding-tile (15-puzzle style) game where each puzzle image is a digital illustration of a classic synthesizer (Minimoog, ARP Odyssey Mk III, Yamaha DX7, Roland Juno-60/TB-303/TR-808/TR-909, Casio CZ-1, Akai MPC60, E-mu SP-1200). It is built with Lit 3 + TypeScript + Vite, styled with vanilla CSS, has no backend or data collection, and builds to `/docs` for GitHub Pages hosting. All commits in the visible history (`git log --all`) land on a single day, 2026-07-09, spanning an initial build through incremental feature/polish commits and two later README wording fixes.

## Decisions

### Deploy target set to relative-path GitHub Pages build
- **When:** 2026-07-09
- **What:** Added `base: './'` to `vite.config.ts` and switched the puzzle's synth image asset URLs from absolute paths (`/assets/...`) to relative paths (`./assets/...`) so the built `/docs` output resolves correctly when served from a GitHub Pages project subpath rather than a domain root.
- **Why:** Inferred: required for the built app (output to `/docs`, per the README's stated GitHub Pages workflow) to load assets correctly when hosted at a non-root URL.
- **Commit(s):** `6228815b6af09fdfd98f4fb909e2596a130f7b59`

### Added Freeplay vs. Play Mode toggle
- **What:** Introduced a `gameMode` state (`'freeplay' | 'play'`) with a segmented mode-selector UI. In Freeplay, tiles can be moved at any time with no timer/move-counting pressure (stats show "FREE" and are styled cyan) and the blank tile stays visible. In Play Mode, the board is locked behind a "START GAME" overlay until the user shuffles, and only then are moves, elapsed time, hints, and auto-solve tracked/enabled.
- **When:** 2026-07-09
- **Why:** Inferred: supports the README's framing of the app as a low-pressure "fidget toy" — Freeplay lets users manipulate tiles just to fidget/explore the art, while Play Mode preserves the traditional timed-puzzle challenge.
- **Commit(s):** `6cf44b9b51bfb183274b08f9d496ed3cef577b67`

### Per-synth brand-specific typography and color
- **When:** 2026-07-09
- **What:** Added a dedicated CSS class per synth id (`.active-synth-name.minimoog`, `.dx7`, `.tb303`, etc.), each with its own font family, weight, color, letter-spacing, and glow/text-shadow matching that synth's real-world branding aesthetic, applied to the active-synth name in the header.
- **Why:** Implements the README's "Brand-Specific UI" feature ("header changes colors and typography dynamically to match the exact aesthetic and branding of the active synth").
- **Commit(s):** `732d244d34b62e94b3ce7f2e2f0f3c1806c5f908`

### Added poster-shop teaser / promo footer
- **What:** Added a "Posters Coming Soon" button/badge in the header and a win-screen promo ("Like these prints? Posters coming soon!") plus supporting CSS (LED-lit order button, patch-jack styling), tying the puzzle UI to a planned future print shop.
- **When:** 2026-07-09
- **Why:** Inferred: aligns with the README's "Upcoming Poster Shop" section announcing plans to sell prints of the synth illustrations; this commit lays the UI groundwork/teaser for that before the shop exists.
- **Commit(s):** `a44405b17f67bf313a4411542b5b151609e7a4de`

### Added site footer with attribution and support links
- **When:** 2026-07-09
- **What:** Added a page-level `<footer>` (outside the puzzle component) with links to the GitHub repo, a "Made with 🧡 by warmsynths" credit/mailto, and a Ko-fi support link, plus matching CSS including a small-screen responsive layout.
- **Why:** Not stated in commit message; establishes project attribution and a donation/support channel.
- **Commit(s):** `a9e23f2bdfc5fc88229cc3b66ab2031a76b7440b`

### Sticker "peel corner" evolved from static decoration into an interactive drag mechanic
- **What:** The `feat: add peeling edges` commit first added purely decorative CSS-only "peeled corner" effects on a few fixed tiles (via `::after` pseudo-elements on `.tile`). The later `feat: peeling sticker` commit reworked this into a physics-driven interaction: each peelable tile got a separate `.sticker-layer` (clipped with `clip-path` per corner), per-tile `peelProgress`/`isPeeledOff`/`peelCorner` state, and dedicated pointer-drag handlers (`handlePeelPointerDown/Move/Up`) letting the user drag a tile's corner to peel it back, with the corner popping fully off past a 0.75 progress threshold (triggering haptic feedback).
- **When:** 2026-07-09
- **Why:** Inferred: extends the "fidget toy" concept from a passive visual flourish into a hands-on tactile interaction, consistent with the README's description of the app as tactile and playful beyond just solving the puzzle.
- **Commit(s):** `8850be8def90ec373c06876d90957e10ca29b28c` (initial decorative version), `32d15aa6f4794d438309d63976cc1a914f03d98a` (interactive drag-to-peel rework)

### Mobile layout redesigned as a distinct "bento" grid rather than a stacked column
- **What:** The earlier `fix: mobile breakpoints` commit added conventional `@media (max-width: 480px)` rules that mostly stacked/shrunk existing desktop elements. The later `refactor: mobile` commit replaced this with a purpose-built mobile-only `.bento-dashboard` 2x2 CSS grid (synth select / size select / stats / mode selector as named grid areas) using `.mobile-only` / `.desktop-only` element duplication, rather than reflowing the same desktop markup.
- **When:** 2026-07-09
- **Why:** Inferred: the first responsive pass (simple stacking) was judged insufficient for the control-dense header/controls area on small screens, prompting a mobile-specific layout structure instead of a purely reflowed one.
- **Commit(s):** `b8ed763d214b65713dd62e82463cacc28f2eb7d1` (initial breakpoint fixes), `1fe389e08d29ec0cc16798b18de8edc5cf4a5eb9` (bento-grid mobile refactor)

## Notes on excluded commits
The following were reviewed and excluded as routine/non-decision-shaped: `feat: initialize app` and the first documentation-build-setup commit (initial scaffolding, no design choice beyond what's captured above), `feat: add favicon` (asset addition, no behavioral change), `chore: add README and GPL-3.0 license files` (boilerplate), and the two README commits `Update README.md` / `Correct Live Stats description punctuation` (a punctuation mark removed then re-added — no content change).
