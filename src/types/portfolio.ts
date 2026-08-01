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
    sub: 'Beatbox-to-pad classifier — turns mic input into a quantized 16-step pattern for real hardware samplers.',
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
    sub: 'Genre + mood chord progressions — swap chords by feel, export to WAV, MIDI, or hardware.',
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
    sub: 'Text progressions mapped onto a Novation Circuit-style pad grid, with WebMIDI SysEx patch editing.',
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
    sub: 'Chord names to hex — a CRT terminal for the Hypersyn/M8-tracker workflow.',
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
    sub: 'Presets, chord sets, and arpeggiator styles for the Roland J-6, installable as a PWA.',
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
