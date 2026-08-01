import { ReactiveController, ReactiveControllerHost } from 'lit';
import { TapeKey, CutsceneState, TAPES } from '../types/portfolio.js';
import { sounds } from '../audio/sound-effects.js';

const OUT = 'cubic-bezier(.23,1,.32,1)';

export class CutsceneDirector implements ReactiveController {
  host: ReactiveControllerHost;

  activeKey: TapeKey | null = null;
  stageState: CutsceneState = 'idle';
  flightTransform: string = 'none';
  flightDur: number = 220;
  flightEase: string = OUT;
  
  currentShot: 'none' | 'A' | 'B' | 'Be' = 'none';
  showFlash: boolean = false;
  camOn: boolean = false;
  camScale: number = 1.6;
  camDur: number = 0;
  camOrigin: string = '735px 307px';

  shotADur: number = 1300;
  shotBDur: number = 1250;
  flashDur: number = 130;
  dollyDur: number = 420;
  readDur: number = 620;
  camPct: number = 174;
  activeHold: 'idle' | 'A' | 'B' | 'Be' | 'play' | null = null;
  scrubVal: number = 0;

  private _t: number[] = [];

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostDisconnected() {
    this.clear();
  }

  clear() {
    this._t.forEach(id => clearTimeout(id));
    this._t = [];
  }

  private at(ms: number, fn: () => void) {
    const id = window.setTimeout(() => {
      fn();
      this.host.requestUpdate();
    }, ms);
    this._t.push(id);
  }

  setStateIdle() {
    this.activeKey = null;
    this.stageState = 'idle';
    this.flightTransform = 'none';
    this.currentShot = 'none';
    this.camOn = false;
    this.host.requestUpdate();
  }

  pick(k: TapeKey, flip: string, origin: string, isMobile: boolean) {
    if (this.currentShot !== 'none') { this.skip(); return; }
    if (['lift', 'fly', 'insert', 'settle', 'ejectCollapse', 'ejectCam', 'pop', 'home'].includes(this.stageState)) return;
    if (this.stageState === 'read') { this.toPlay(); return; }
    
    this.clear();
    sounds.playClick();
    history.pushState({ p: TAPES[k].slug }, '', '#/' + TAPES[k].slug);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.activeKey = k;
      this.stageState = 'playWipe';
      this.flightTransform = flip;
      this.flightDur = 0;
      this.camOn = true;
      this.camScale = 1.6;
      this.camDur = 0;
      this.host.requestUpdate();
      return;
    }

    if (isMobile) {
      this.mobileCut(k);
    } else {
      this.cut(k, flip, origin);
    }
    this.host.requestUpdate();
  }

  private cut(k: TapeKey, flip: string, origin: string) {
    const { shotADur: A, shotBDur: B, flashDur: F, dollyDur: D, readDur: R, camPct } = this;
    const cutA = A + 200, cutB = cutA + B + 150, land = cutB + F + D + R;
    
    this.activeKey = k;
    this.stageState = 'read';
    this.flightTransform = flip;
    this.flightDur = 0;
    this.flightEase = OUT;
    this.camOrigin = origin;
    this.currentShot = 'A';
    this.showFlash = true;
    this.camOn = true;
    this.camScale = camPct / 100;
    this.camDur = 0;
    this.activeHold = null;
    this.scrubVal = 0;

    sounds.playSleeveSlide();

    this.at(F, () => { this.showFlash = false; });
    this.at(cutA, () => {
      this.currentShot = 'B';
      this.showFlash = true;
      sounds.playDeckThunk();
    });
    this.at(cutA + F, () => { this.showFlash = false; });
    this.at(cutB, () => {
      this.currentShot = 'none';
      this.showFlash = true;
      sounds.playCrtHum();
    });
    this.at(cutB + F, () => {
      this.showFlash = false;
      this.camScale = 1.6;
      this.camDur = D;
    });
    this.at(land, () => { this.stageState = 'play'; });
    this.at(land + 260, () => { this.stageState = 'playWipe'; });
  }

  skip() {
    this.clear();
    sounds.playClick();
    this.currentShot = 'none';
    this.showFlash = true;
    this.camOn = true;
    this.camScale = 1.6;
    this.camDur = 0;
    this.stageState = 'play';
    this.host.requestUpdate();
    this.at(90, () => { this.showFlash = false; });
    this.at(160, () => { this.stageState = 'playWipe'; });
  }

  toPlay() {
    this.clear();
    this.stageState = 'play';
    this.camOn = true;
    this.camScale = 1.6;
    this.camDur = 560;
    this.host.requestUpdate();
    this.at(560, () => { this.stageState = 'playWipe'; });
  }

  jump(k: TapeKey, flip: string, origin: string) {
    this.clear();
    this.activeKey = k;
    this.stageState = 'playWipe';
    this.flightTransform = flip;
    this.flightDur = 0;
    this.camOrigin = origin;
    this.camOn = true;
    this.camScale = 1.6;
    this.host.requestUpdate();
  }

  eject(isMobile: boolean) {
    if (!this.activeKey) return;
    this.clear();
    sounds.playClick();
    sounds.playEjectPop();

    if (location.hash && location.hash !== '#/') history.pushState({}, '', '#/');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.setStateIdle();
      return;
    }

    if (isMobile) {
      this.mobileEject();
      this.host.requestUpdate();
      return;
    }

    const F = this.flashDur;
    const E = Math.round(this.shotBDur * 0.72);
    this.stageState = 'ejectCollapse';
    this.activeHold = null;

    this.at(200, () => {
      this.currentShot = 'Be';
      this.showFlash = true;
    });
    this.at(200 + F, () => { this.showFlash = false; });
    this.at(200 + E + 60, () => {
      this.currentShot = 'none';
      this.showFlash = true;
      this.camOn = false;
      this.camDur = 0;
      this.flightTransform = 'none';
    });
    this.at(200 + E + 60 + F, () => {
      this.showFlash = false;
      this.setStateIdle();
    });
    this.host.requestUpdate();
  }

  private mobileCut(k: TapeKey) {
    const F = this.flashDur;
    const B = this.shotBDur;

    this.activeKey = k;
    this.stageState = 'read';
    this.currentShot = 'B';
    this.showFlash = true;
    this.activeHold = null;
    this.scrubVal = 0;

    sounds.playDeckThunk();

    this.at(F, () => { this.showFlash = false; });
    this.at(B + 100, () => {
      this.currentShot = 'none';
      this.showFlash = true;
    });
    this.at(B + 100 + F, () => {
      this.showFlash = false;
      this.stageState = 'play';
    });
    this.at(B + 100 + F + 260, () => {
      this.stageState = 'playWipe';
    });
  }

  private mobileEject() {
    const F = this.flashDur;
    const E = Math.round(this.shotBDur * 0.72);

    this.stageState = 'ejectCollapse';
    this.activeHold = null;
    this.currentShot = 'Be';
    this.showFlash = true;

    this.at(F, () => { this.showFlash = false; });
    this.at(E + 60, () => {
      this.currentShot = 'none';
      this.showFlash = true;
    });
    this.at(E + 60 + F, () => {
      this.showFlash = false;
      this.setStateIdle();
    });
  }

  cancel() {
    this.clear();
    this.stageState = 'home';
    this.flightTransform = 'none';
    this.flightDur = 220;
    this.flightEase = OUT;
    this.host.requestUpdate();
    this.at(220, () => { this.setStateIdle(); });
  }

  handleHold(which: 'idle' | 'A' | 'B' | 'Be' | 'play', flip: string, origin: string) {
    this.clear();
    const k = this.activeKey || 'echo';

    if (which === 'idle') {
      this.activeHold = null;
      this.scrubVal = 0;
      this.currentShot = 'none';
      this.showFlash = false;
      this.activeKey = null;
      this.stageState = 'idle';
      this.flightTransform = 'none';
      this.camOn = false;
      this.host.requestUpdate();
      return;
    }

    if (which === 'play') {
      this.activeHold = null;
      this.scrubVal = 0;
      this.currentShot = 'none';
      this.showFlash = false;
      this.activeKey = k;
      this.stageState = 'playWipe';
      this.flightTransform = flip;
      this.camOrigin = origin;
      this.camOn = true;
      this.camScale = 1.6;
      this.host.requestUpdate();
      return;
    }

    this.activeHold = which;
    this.scrubVal = 0;
    this.currentShot = which;
    this.showFlash = false;
    this.activeKey = k;
    this.stageState = 'read';
    this.flightTransform = flip;
    this.camOrigin = origin;
    this.camOn = true;
    this.camScale = this.camPct / 100;
    this.host.requestUpdate();
  }

  handleParamChange(name: string, val: number) {
    if (name === 'shotADur') this.shotADur = val;
    else if (name === 'shotBDur') this.shotBDur = val;
    else if (name === 'flashDur') this.flashDur = val;
    else if (name === 'dollyDur') this.dollyDur = val;
    else if (name === 'readDur') this.readDur = val;
    else if (name === 'camPct') this.camPct = val;
    else if (name === 'scrub') this.scrubVal = val;
    this.host.requestUpdate();
  }
}
