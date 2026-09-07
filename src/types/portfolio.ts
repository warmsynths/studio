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
    sub: 'Listens to a live beatboxer and classifies kick, snare, and hi-hat relative to each other rather than guessing fixed frequencies across voices and microphones. A self-calibrating noise floor brings classification to 90% confidence, packaged in the visual style of a printed field manual.',
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
    sub: 'A chord-progression studio built around a fast Seed → Loop → Swap flow, redesigned from an earlier Google-gated prototype called Chord Voyager. An authenticated proxy validates plain-language mood prompts through Claude, turning descriptive text into playable progressions.',
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
    sub: 'A WebMIDI chord-to-pad mapper and editor for the Novation Circuit. Features two-way SysEx patch transfer and dedicated light and dark themes styled after the Circuit Tracks and Circuit Rhythm hardware.',
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
    sub: 'A hex chord converter for the Hypersyn synth, styled as a retro CRT boot terminal. Includes command-line input, scanline flicker, eight switchable color themes, and mobile-friendly badge controls for cycling chord voicings.',
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
    sub: 'A skeuomorphic companion app for the Roland J-6 synthesizer. Links presets, chord sets, and arpeggiator styles across a structured local dataset, packaged as an offline PWA for use beside the instrument.',
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
