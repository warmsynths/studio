export type CutsceneState = 
  | 'idle'
  | 'arming'
  | 'lift'
  | 'fly'
  | 'insert'
  | 'settle'
  | 'read'
  | 'play'
  | 'playWipe'
  | 'ejectCollapse'
  | 'ejectCam'
  | 'pop'
  | 'home';

export type TapeKey = 'drift' | 'pixel' | 'chord' | 'echo' | 'scene';

export interface TapeData {
  key: TapeKey;
  rest: number;
  onEnd: boolean;
  z: number;
  slug: string;
  title: string;
  sub: string;
  year: string;
  role: string;
  stack: string;
  run: string;
  kicker: string;
  bg: string;
  fg: string;
  strip: string;
  strip2: string;
  /** Custom element tag name mounted in the CRT screen when this tape is playing. */
  embedTag: string;
}

export const TAPES: Record<TapeKey, TapeData> = {
  drift: {
    key: 'drift',
    rest: -0.8,
    onEnd: false,
    z: 1,
    slug: 'beat-mapper',
    title: 'BEAT MAPPER',
    sub: 'Started as a live pad-flasher and got rebuilt around a harder problem: classifying a performer’s own kick, snare, and hat relative to each other instead of guessing fixed frequencies that never held across voices or mics. A self-calibrating noise floor and root-cause debugging against real takes took it from spurious hits to 90% confidence — reskinned as a printed field manual, seismograph and all.',
    year: '2026',
    role: 'Direction · build',
    stack: 'Meyda · Web Audio',
    run: '0:04:12',
    kicker: 'BEATBOX TO PAD',
    bg: '#f2f2f2',
    fg: '#111',
    strip: '#c62828',
    strip2: '#7f1d1d',
    embedTag: 'beat-mapper-embed'
  },
  pixel: {
    key: 'pixel',
    rest: 1.2,
    onEnd: false,
    z: 1,
    slug: 'chroma-chords',
    title: 'CHROMA CHORDS',
    sub: 'Began life as Chord Voyager, a maritime-themed modular studio gated behind Google sign-in. Rebuilt from the ground up into a three-tap Seed → Loop → Swap flow, then taught to read plain-language mood through Claude — constrained, validated, and hardened behind an authenticated proxy so a free-text vibe becomes a real, idiomatic progression in one request.',
    year: '2026',
    role: 'Direction · build',
    stack: 'Tone.js · Claude',
    run: '0:02:48',
    kicker: 'CHORD PROGRESSIONS',
    bg: '#f6d000',
    fg: '#111',
    strip: '#e91e8c',
    strip2: '#7e57c2',
    embedTag: 'chroma-chords-embed'
  },
  chord: {
    key: 'chord',
    rest: -0.5,
    onEnd: false,
    z: 1,
    slug: 'circuit-chords',
    title: 'CIRCUIT CHORDS',
    sub: 'What started as a simple chord-to-pad mapper for the Novation Circuit grew into a full WebMIDI instrument: SysEx patch dumps in and out, a dual light/dark theme matching Circuit Tracks and Circuit Rhythm hardware, and a componentized architecture built to keep growing without buckling under its own state.',
    year: '2026',
    role: 'Design · build',
    stack: 'Tonal.js · WebMIDI',
    run: '0:03:30',
    kicker: 'PAD GRID MAPPER',
    bg: '#f4efdd',
    fg: '#111',
    strip: '#d9a441',
    strip2: '#b8860b',
    embedTag: 'circuit-chords-embed'
  },
  echo: {
    key: 'echo',
    rest: -13,
    onEnd: true,
    z: 3,
    slug: 'hypersyn-chord-helper',
    title: 'HYPERSYN HELPER',
    sub: 'A single-file hex converter, hand-modularized into typed, tested TypeScript as it grew — then reimagined entirely as a CRT boot terminal: command-line input, scanline flicker, eight switchable color themes, and voicings you cycle by tapping the badge itself, on desktop or thumb alike.',
    year: '2026',
    role: 'Direction · build',
    stack: 'Tonal.js · Web Audio',
    run: '0:05:06',
    kicker: 'CHORD → HEX',
    bg: '#141414',
    fg: '#eee',
    strip: '#43a047',
    strip2: '#1b5e20',
    embedTag: 'hypersyn-embed'
  },
  scene: {
    key: 'scene',
    rest: -13,
    onEnd: true,
    z: 2,
    slug: 'j6-companion',
    title: 'J-6 COMPANION',
    sub: 'Started as a two-pane preset browser for the Roland J-6, rebuilt as a skeuomorphic synth faceplate, then expanded across three linked data domains — presets, chord sets, and arpeggiator styles — backed by an RFC-driven relational dataset and shipped installable as a PWA for use at the instrument, offline.',
    year: '2026',
    role: 'Direction · build',
    stack: 'Lit · PWA',
    run: '0:06:20',
    kicker: 'SYNTH COMPANION',
    bg: '#1a3fa0',
    fg: '#fff',
    strip: '#1e88e5',
    strip2: '#0d3fa0',
    embedTag: 'j6-companion-embed'
  }
};
