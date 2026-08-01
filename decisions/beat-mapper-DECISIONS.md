# beat-mapper — Decisions

## Project summary
Beat Mapper is a browser-based (Lit + TypeScript) tool that listens to a performer beatboxing into a microphone (or an uploaded audio file), detects and classifies each hit as kick/snare/hat using onset detection and spectral analysis (via Meyda), and outputs a quantized 16-step pattern mapped to the pads of a real hardware sampler (Roland SP-404MKII, Teenage Engineering PO-33, or PO-32 Tonic). It runs entirely client-side and is deployed as a static site to GitHub Pages via a committed `docs/` build.

## Decisions

### Project inception: real-time beatbox-to-pad classifier
- **When:** 2026-07-18
- **What:** Initial commit establishing the app: Meyda-based onset detection, a rule-based kick/snare/hat classifier, a hardware-abstracted device layer for SP-404MKII and PO-33, and a scrolling beat-timeline UI, with build output committed to `docs/` for GitHub Pages.
- **Why:** Not stated beyond the commit message; this is the project's starting architecture.
- **Commit(s):** `eb4ef36`

### Rework from live real-time flashing to record-then-transcribe workflow
- **When:** 2026-07-18
- **What:** Replaced the live real-time pad-flashing model with an explicit record/stop/review flow: hits are timestamped during recording, tempo is auto-estimated from hit spacing after the fact, and the take is quantized onto a 16-step grid per drum class with an adjustable BPM to correct misdetected tempo. Pads also gained persistent per-session hit counts.
- **Why:** So results survive after the moment they happened instead of being visible only as a momentary flash, and so quantization could work against the whole take rather than react hit-by-hit.
- **Commit(s):** `6de4e5c`

### Invert sensitivity control, anchor pattern timing, make pad mapping editable
- **When:** 2026-07-18
- **What:** Fixed the SENS knob, which was wired backwards (raising it raised the detection threshold instead of lowering it), and changed `quantizeHits` to anchor step-0 to the take's first hit instead of the record-button press (removing lead-in silence offset). Also made the class-to-pad mapping editable and multi-pad (`classMapping` became `DrumClass -> pad id[]`), with clickable KICK/SNARE/HAT lane labels that let a user assign/unassign real device pads.
- **Why:** The inverted knob and press-anchored timing were both correctness bugs found through use; editable mapping was added so the app could show exactly which real-device pads to hit for each sound rather than a fixed assumption.
- **Commit(s):** `02327d7` (and duplicate `0139707` on the feature branch)

### Adaptive (self-calibrating) onset threshold + two-panel UI redesign
- **When:** 2026-07-18
- **What:** Replaced the absolute rms onset threshold with a rolling noise-floor estimate (EMA over rms while listening); the SENS knob now controls a margin above that floor rather than a fixed level. Restructured the UI into a two-panel "Analysis & Recording" / "Hardware Mapping" layout with the pad grid redressed as a compact hardware unit, and added PO-32 Tonic as a third selectable device.
- **Why:** A fixed absolute rms threshold required guessing a magic number between a given mic's ambient noise and its actual hits, and "never really worked well across setups" — a self-calibrating margin removes that guesswork.
- **Commit(s):** `2065e8c` (and duplicate `e586c05`)

### Pads double as a step sequencer for pattern entry/correction
- **When:** 2026-07-18
- **What:** Selecting KICK/SNARE/HAT turns the 16 pads into a step-entry display mirroring real hardware pattern entry: pad N = step N of the bar, pads light up in the sound's color at every step that sound hits, and tapping a pad toggles the hit (serving as manual correction for misdetected hits). Also relaxed kick classification (dropped the spectral-flatness requirement, raised the centroid ceiling to 600Hz) because phone mic low-end rolloff was misrouting real kicks to the snare bucket.
- **Why:** To match how the real hardware's pattern entry actually works, and to give a direct way to correct misdetected hits rather than only viewing the auto-detected pattern.
- **Commit(s):** `7ad2b9d` (and duplicate `45af79a`)

### Design token system + component decomposition (pure refactor)
- **When:** 2026-07-18
- **What:** Introduced a single source of truth for color, type, spacing, radius, and motion as CSS custom properties in `index.css`, consolidating drifted one-off grays, and split the 1021-line `app-root.ts` into `app-header`, `recording-panel`, and `hardware-panel` components communicating via custom events.
- **Why:** Stated as "so future visual changes don't require editing one monolithic file"; explicitly a pure refactor with no intended visual or behavioral change.
- **Commit(s):** `e25b11e` (and duplicate `eee9063`)

### Drop light mode, force dark theme unconditionally
- **When:** 2026-07-18
- **What:** The dark page background had only applied under `prefers-color-scheme: dark`, leaving a stark white gutter in light-mode browsers/OSes. Forced `color-scheme: dark` unconditionally and gave the body a dark base with soft ambient bloom, and installed Space Grotesk as a display face in preparation for a visual redesign.
- **Why:** Stated directly: "There is no light theme here," so the app should not partially defer to OS light-mode preference.
- **Commit(s):** `97a43cc` (and duplicate `0fa0991`)

### Full redesign as "The Rhythm Archive" printed field manual
- **When:** 2026-07-19
- **What:** Replaced the dark hardware-panel UI with an editorial, ink-on-cream print aesthetic (Fraunces serif masthead, monospace data readouts, hairline rules, muted risograph spot colors, geometric notation primitives for circle=kick/square=snare/triangle=hat). Introduced a live time-domain waveform "seismograph" (Fig. 01), a printed 3-lane transcribed-sequence notation grid (Fig. 02), an interactive line-art SVG device atlas (Fig. 03) replacing the pad-grid component, and per-bank (SET A-D) memory so switching banks parks/recalls each bank's take and assignment.
- **Why:** Not explicitly stated as a problem being fixed; framed as a deliberate visual/branding pivot away from the prior "hardware-panel" look.
- **Commit(s):** `a8715b1` (and duplicate `5afb616`)

### Root-cause fix for kick/snare misclassification and hit duplication
- **When:** 2026-07-20
- **What:** Found and fixed two compounding bugs: (1) Meyda's `spectralCentroid` returns a raw FFT bin index, not Hz, so the classifier's Hz-tuned thresholds (600/4000) were being compared against values that only ranged ~0-256 — fixed by converting to Hz via bin width. (2) The onset window (30ms hold + fixed 120ms cooldown) was far shorter than a real hit's natural decay (150-300ms measured), causing single hits to be detected as two — replaced with a level-based release (gate x releaseRatio with hysteresis, capped by `maxHoldMs`) and rms-weighted classification features across the held frames. Also replaced equal-weighted centroid/flatness/band-energy voting with centroid-first scoring.
- **Why:** Diagnosed against a real recorded take run through the actual production pipeline offline; verified to fix 18 spurious/misclassified hits down to 9 correct hits at 86-90% confidence.
- **Commit(s):** `f016a19` (preceded by a partial attempt at the same problem in `bcfbe5d`)

### Add a scheduled metronome and pre-record BPM lock, drop post-hoc tempo estimation
- **When:** 2026-07-20
- **What:** Added a lookahead-scheduled `Metronome` (audio-clock based, not `setInterval`) with a pre-record BPM stepper; `finishRecording()` now quantizes directly to that locked target BPM. The prior `estimateBpm()` inter-onset-interval guess was removed as dead code.
- **Why:** Human timing drift was still throwing off quantization even after detection/classification fixes (a hit landing 40ms early/late snaps to the wrong 16th-note step); locking to a known tempo during recording avoids having to estimate an inherently imperfect tempo after the fact.
- **Commit(s):** `794995e`

### Abandon the audible metronome click for a headphones-gated + visual pulse approach
- **When:** 2026-07-21
- **What:** After two rounds of mitigating metronome click bleed into the mic recording (suppression windows around the click in `aa263fb`, and extending that suppression to cover a hit's full onset-hold window in `556fcab`), the click was replaced outright: it now plays only when the performer confirms they're on headphones (a manual toggle, default off since headphone use can't be reliably auto-detected); otherwise the beat is tracked silently and a 4-dot visual pulse on the seismograph gives the same reference with no risk of contaminating the recording.
- **Why:** Even with suppression, the click only ever worked cleanly through headphones — on speakers the mic always picked up some bleed, which "no amount of suppression window tuning changes... fundamentally."
- **Commit(s):** `86fb2ad` (culmination of `aa263fb` and `556fcab`)

### Classify hits relative to each other within a take, not fixed Hz targets
- **When:** 2026-07-21
- **What:** Replaced fixed reference centroids (kick 300Hz, snare 2800Hz, hat 8000Hz) with relative classification: `classifyTakeHits` now takes every hit's centroid from the whole take at once, sorts them, and splits at the largest gaps in log-frequency (small gaps are treated as within-class variance, not a class boundary). Fixed reference points remain only as a last-resort tie-break when a take lacks enough of its own variety to self-calibrate. Because this requires the whole take in hand, classification moved from hit-by-hit during recording to once at the end (`finishRecording`); the live per-hit pad flash, the now-unused BeatBus/live-flash plumbing (`state/beat-bus.ts`), and the "tone" knob (which scaled all three fixed targets together and couldn't correct one independently) were all removed.
- **Why:** A performer's actual kick/snare/hat pitches vary by voice/mic/kit, so no fixed absolute reference (or single "tone" scaling factor) could hold across performers; what's actually invariant is the relative ordering (kick lowest, snare middle, hat highest) within one take.
- **Commit(s):** `4bea0b4`

### Compute classification brightness from band energy, not spectral centroid
- **When:** 2026-07-21 to 2026-07-22
- **What:** First fixed centroid itself to be computed from the power spectrum rather than Meyda's amplitude-weighted one (`6e625d4`), since amplitude-weighting let small-amplitude high-frequency noise bins skew the average. Then abandoned centroid (a mean, sensitive to a thin high-frequency noise tail) entirely in favor of a new `brightness` metric — `midBandEnergy + 2*highBandEnergy` — built directly from the already-computed band energies.
- **Why:** Verified against real takes where mic self-noise/breath hiss pulled a hit's mean centroid up even when the clear plurality of its energy was low-band, causing bass-heavy hits to be swept into "hat."
- **Commit(s):** `4500e64` (building on `6e625d4`)

### Add file upload as an alternative input path to live mic recording
- **When:** 2026-07-22
- **What:** Added an "Upload audio" button that decodes a chosen file and runs it through the same onset-detection + classification pipeline as a live take, via a new shared `offline-analysis.ts` module, landing on the same review screen either way.
- **Why:** Stated as a fallback "for when the mic or live recording isn't cooperating."
- **Commit(s):** `71dee77`

### Anchor kick/snare/hat fallback labeling on the take's own first hit
- **When:** 2026-07-23
- **What:** Changed the fallback path (used when a take doesn't cleanly separate into 3 groups) from scoring each possible labeling against fixed absolute brightness targets to anchoring "kick" on whichever group contains the take's first hit and filling snare/hat outward from there.
- **Why:** Fixed absolute brightness targets in the fallback failed for a real take where the performer's kick was a quiet, breathy sound reading spectrally closer to "hat" than "kick" — no retuning of a fixed reference could fix that for one performer without breaking another. A performer almost always opens a beat on the kick, so anchoring to the first hit is performer-relative instead.
- **Commit(s):** `da09471`

### Let a performer disable drum classes they never use
- **When:** 2026-07-23
- **What:** `classifyTakeHits` now takes which classes are actually in play, and a take can never be labeled with a disabled class; the Fig. 01 legend is now clickable to toggle each class off, folding those hits into the remaining active classes by their own brightness. Default remains all three classes active.
- **Why:** A real performer whose takes were consistently kick/snare only (0% high-band energy) kept having some hits misclassified as "hat" despite confirming they never use one; the gap between their real sounds and the false "hat" reading (~1.6 on a 0-2 brightness scale) was too large for any threshold/tolerance tuning to bridge without breaking legitimate 3-way takes, so the fix removes the option to guess a class that's known not to exist.
- **Commit(s):** `de9e60e`

### Add "download audio" and "download diagnostics" for a finished take
- **When:** 2026-07-23
- **What:** Added two downloads once a take is reviewable: the literal audio bytes the engine analyzed (live mic capture via `MediaRecorder` alongside analysis, or the uploaded file), and a JSON dump of every hit's full classification detail (brightness, band energy, confidence, class, timing) straight from `classifyTakeHits`.
- **Why:** Removes the mismatch between what was actually analyzed and a separately-recorded reference clip of the same performance, and avoids having to reverse-engineer classification numbers from a screenshot during debugging.
- **Commit(s):** `dea25a9`
