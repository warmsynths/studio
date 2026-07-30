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
}

export const TAPES: Record<TapeKey, TapeData> = {
  drift: {
    key: 'drift',
    rest: -0.8,
    onEnd: false,
    z: 1,
    slug: 'drift',
    title: 'DRIFT',
    sub: 'Soundscape mixer — layered generative ambience, built as a live web component.',
    year: '2025',
    role: 'Direction · build',
    stack: 'Web Audio · Canvas',
    run: '0:04:12',
    kicker: 'SOUNDSCAPE MIXER',
    bg: '#f2f2f2',
    fg: '#111',
    strip: '#c62828',
    strip2: '#7f1d1d'
  },
  pixel: {
    key: 'pixel',
    rest: 1.2,
    onEnd: false,
    z: 1,
    slug: 'pixel-loom',
    title: 'PIXEL LOOM',
    sub: 'Texture generator — seeded tiling patterns exported as flat sheets.',
    year: '2025',
    role: 'Direction · build',
    stack: 'Canvas · WebGL',
    run: '0:02:48',
    kicker: 'TEXTURE GENERATOR',
    bg: '#f6d000',
    fg: '#111',
    strip: '#e91e8c',
    strip2: '#7e57c2'
  },
  chord: {
    key: 'chord',
    rest: -0.5,
    onEnd: false,
    z: 1,
    slug: 'chordcraft',
    title: 'CHORDCRAFT',
    sub: 'Chord progressions — voice-led harmony sketching in the browser.',
    year: '2024',
    role: 'Design · build',
    stack: 'Web Audio · SVG',
    run: '0:03:30',
    kicker: 'CHORD PROGRESSIONS',
    bg: '#f4efdd',
    fg: '#111',
    strip: '#d9a441',
    strip2: '#b8860b'
  },
  echo: {
    key: 'echo',
    rest: -13,
    onEnd: true,
    z: 3,
    slug: 'echo-room',
    title: 'ECHO ROOM',
    sub: 'Audio visualiser — frequency-reactive geometry driven by live input.',
    year: '2024',
    role: 'Direction · build',
    stack: 'WebGL · Analyser',
    run: '0:05:06',
    kicker: 'AUDIO VISUALIZER',
    bg: '#141414',
    fg: '#eee',
    strip: '#43a047',
    strip2: '#1b5e20'
  },
  scene: {
    key: 'scene',
    rest: -13,
    onEnd: true,
    z: 2,
    slug: 'scene-builder',
    title: 'SCENE/BUILDER',
    sub: '3D music videos — timeline-sequenced scenes rendered in real time.',
    year: '2023',
    role: 'Direction · build',
    stack: 'three.js · timeline',
    run: '0:06:20',
    kicker: '3D MUSIC VIDEOS',
    bg: '#1a3fa0',
    fg: '#fff',
    strip: '#1e88e5',
    strip2: '#0d3fa0'
  }
};
