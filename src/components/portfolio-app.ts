import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TAPES, TapeKey, CutsceneState } from '../types/portfolio.js';
import { sounds } from '../audio/sound-effects.js';

import './tape-shelf.js';
import './vcr-player.js';
import './crt-display.js';
import './cutscene-overlay.js';
import './motion-inspector.js';
import './tape-app-slot.js';

const OUT = 'cubic-bezier(.23,1,.32,1)';

@customElement('portfolio-app')
export class PortfolioAppComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 100vh;
      background: #f5f2ea;
      padding: clamp(14px, 4vw, 44px);
      box-sizing: border-box;
      user-select: none;
    }

    .stage-outer {
      position: relative;
      width: min(1100px, 100%);
      aspect-ratio: 1100 / 700;
    }

    .main-card {
      position: absolute;
      top: 0;
      left: 50%;
      width: 1100px;
      height: 700px;
      background: #f5f2ea;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,.06);
      border-radius: 4px;
      transform-origin: top center;
    }

    .camera-stage {
      position: absolute;
      inset: 0;
      will-change: transform;
      transition: transform 560ms cubic-bezier(.32,.72,0,1);
    }
  `;

  @state() private stageScale: number = 1;
  private resizeObserver?: ResizeObserver;

  @state() private activeKey: TapeKey | null = null;
  @state() private stageState: CutsceneState = 'idle';
  @state() private flightTransform: string = 'none';
  @state() private flightDur: number = 220;
  @state() private flightEase: string = OUT;
  
  @state() private currentShot: 'none' | 'A' | 'B' | 'Be' = 'none';
  @state() private showFlash: boolean = false;
  @state() private camOn: boolean = false;
  @state() private camScale: number = 1.6;
  @state() private camDur: number = 0;
  @state() private camOrigin: string = '735px 307px';

  // Configurable Inspector Parameters (Hidden by default)
  @state() private showInspector: boolean = false;
  @state() private shotADur: number = 1300;
  @state() private shotBDur: number = 1250;
  @state() private flashDur: number = 130;
  @state() private dollyDur: number = 420;
  @state() private readDur: number = 620;
  @state() private camPct: number = 174;
  @state() private activeHold: 'idle' | 'A' | 'B' | 'Be' | 'play' | null = null;
  @state() private scrubVal: number = 0;

  private _t: number[] = [];
  private _f: { dx: number; dy: number; deg: number; s: number } | null = null;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('popstate', this.handlePopState);
    requestAnimationFrame(() => this.route(true));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('popstate', this.handlePopState);
    this.resizeObserver?.disconnect();
    this.clear();
  }

  firstUpdated() {
    const outer = this.shadowRoot?.querySelector('.stage-outer');
    if (!outer) return;
    this.resizeObserver = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width;
      if (w) this.stageScale = w / 1100;
    });
    this.resizeObserver.observe(outer);
  }

  private clear() {
    this._t.forEach(id => clearTimeout(id));
    this._t = [];
  }

  private at(ms: number, fn: () => void) {
    const id = window.setTimeout(fn, ms);
    this._t.push(id);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.currentShot !== 'none') this.skip();
      else if (this.stageState === 'play' || this.stageState === 'playWipe') this.eject();
      else if (this.stageState !== 'idle') this.cancel();
    }
  };

  private handlePopState = () => this.route(false);

  private route(initial: boolean) {
    const slug = (location.hash || '').replace(/^#\/?/, '');
    const foundKey = (Object.keys(TAPES) as TapeKey[]).find(x => TAPES[x].slug === slug);
    if (foundKey && this.activeKey !== foundKey) {
      this.jump(foundKey);
      return;
    }
    if (!foundKey && this.activeKey) {
      initial ? this.setStateIdle() : this.eject();
    }
  }

  private setStateIdle() {
    this.activeKey = null;
    this.stageState = 'idle';
    this.flightTransform = 'none';
    this.currentShot = 'none';
    this.camOn = false;
  }

  private zoom(): number {
    const card = this.shadowRoot?.querySelector('.main-card');
    const host = card ? card.getBoundingClientRect().width / 1100 : 1;
    return host * (this.camOn ? this.camScale : 1);
  }

  private flip(k: TapeKey): string {
    const t = TAPES[k];
    const shelf = this.shadowRoot?.querySelector('tape-shelf');
    const player = this.shadowRoot?.querySelector('vcr-player');
    const el = shelf?.shadowRoot?.querySelector(`[data-tape="${k}"] [data-flight]`);
    const slot = player?.shadowRoot?.querySelector('[data-slot]');
    if (!el || !slot) {
      this._f = null;
      return 'none';
    }
    const z = this.zoom();
    const r = el.getBoundingClientRect();
    const sr = slot.getBoundingClientRect();
    const dx = (sr.left + sr.width / 2 - r.left - r.width / 2) / z;
    const dy = (sr.top + sr.height / 2 - r.top - r.height / 2) / z;
    const w = (el as HTMLElement).offsetWidth;
    const h = (el as HTMLElement).offsetHeight;
    const deg = -t.rest + (t.onEnd ? -90 : 0);
    const lw = t.onEnd ? h : w;
    const lh = t.onEnd ? w : h;
    const sc = Math.min((sr.width / z) / lw, (sr.height / z) / lh);
    this._f = { dx, dy, deg, s: sc };
    return this.tf(1);
  }

  private tf(p: number, extra?: string): string {
    const f = this._f;
    if (!f) return 'none';
    const lift = -14 - 96 * Math.sin(Math.PI * p) * (p < 1 ? 1 : 0);
    const x = f.dx * p;
    const y = f.dy * p + lift * (p < 1 ? 1 : 0);
    const deg = f.deg * (p < 0.6 ? p / 0.6 : 1) * (p === 0 ? 0 : 1);
    const sc = p === 0 ? 1.04 : (1.04 + (f.s - 1.04) * Math.pow(p, 1.6));
    return `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${deg.toFixed(2)}deg) scale(${sc.toFixed(3)}) ${extra || ''}`;
  }

  private screenOrigin(): string {
    const card = this.shadowRoot?.querySelector('.main-card');
    const crt = this.shadowRoot?.querySelector('crt-display');
    const sc = crt?.shadowRoot?.querySelector('[data-screen]');
    if (!card || !sc) return '735px 307px';
    const z = this.zoom();
    const c = card.getBoundingClientRect();
    const r = sc.getBoundingClientRect();
    return `${((r.left + r.width / 2 - c.left) / z).toFixed(0)}px ${((r.top + r.height / 2 - c.top) / z).toFixed(0)}px`;
  }

  private pick(k: TapeKey) {
    if (this.currentShot !== 'none') { this.skip(); return; }
    if (['lift', 'fly', 'insert', 'settle', 'ejectCollapse', 'ejectCam', 'pop', 'home'].includes(this.stageState)) return;
    if (this.stageState === 'read') { this.toPlay(); return; }
    
    this.clear();
    const flip = this.flip(k);
    const origin = this.screenOrigin();
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
      return;
    }

    this.cut(k, flip, origin);
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

  private skip() {
    this.clear();
    sounds.playClick();
    this.currentShot = 'none';
    this.showFlash = true;
    this.camOn = true;
    this.camScale = 1.6;
    this.camDur = 0;
    this.stageState = 'play';
    this.at(90, () => { this.showFlash = false; });
    this.at(160, () => { this.stageState = 'playWipe'; });
  }

  private toPlay() {
    this.clear();
    this.stageState = 'play';
    this.camOn = true;
    this.camScale = 1.6;
    this.camDur = 560;
    this.at(560, () => { this.stageState = 'playWipe'; });
  }

  private jump(k: TapeKey) {
    this.clear();
    const flip = this.flip(k);
    this.activeKey = k;
    this.stageState = 'playWipe';
    this.flightTransform = flip;
    this.flightDur = 0;
    this.camOrigin = this.screenOrigin();
    this.camOn = true;
    this.camScale = 1.6;
  }

  private eject() {
    if (!this.activeKey) return;
    this.clear();
    sounds.playClick();
    sounds.playEjectPop();

    if (location.hash && location.hash !== '#/') history.pushState({}, '', '#/');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.setStateIdle();
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
  }

  private cancel() {
    this.clear();
    this.stageState = 'home';
    this.flightTransform = 'none';
    this.flightDur = 220;
    this.flightEase = OUT;
    this.at(220, () => { this.setStateIdle(); });
  }

  private handleHold(which: 'idle' | 'A' | 'B' | 'Be' | 'play') {
    this.clear();
    const k = this.activeKey || 'echo';
    const origin = this.screenOrigin();

    if (which === 'idle') {
      this.activeHold = null;
      this.scrubVal = 0;
      this.currentShot = 'none';
      this.showFlash = false;
      this.activeKey = null;
      this.stageState = 'idle';
      this.flightTransform = 'none';
      this.camOn = false;
      return;
    }

    if (which === 'play') {
      const flip = this.flip(k);
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
      return;
    }

    const flip = this.flip(k);
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
  }

  private handleParamChange(name: string, val: number) {
    if (name === 'shotADur') this.shotADur = val;
    else if (name === 'shotBDur') this.shotBDur = val;
    else if (name === 'flashDur') this.flashDur = val;
    else if (name === 'dollyDur') this.dollyDur = val;
    else if (name === 'readDur') this.readDur = val;
    else if (name === 'camPct') this.camPct = val;
    else if (name === 'scrub') this.scrubVal = val;
  }

  private runSequence() {
    const k = this.activeKey || 'echo';
    this.handleHold('idle');
    setTimeout(() => this.pick(k), 60);
  }

  render() {
    const a = this.activeKey;
    const st = this.stageState;
    const dim = st !== 'idle' && st !== 'home';
    const playing = st === 'play' || st === 'playWipe';
    const reading = st === 'read';
    const sharp = playing || reading || st === 'ejectCollapse';
    const activeTape = a ? TAPES[a] : null;

    const inspectState = this.activeHold
      ? 'HOLDING ' + (this.activeHold === 'A' ? 'SHOT A' : this.activeHold === 'B' ? 'SHOT B · INSERT' : 'SHOT B · EJECT') + (a ? ' — ' + TAPES[a].title : '')
      : st === 'idle' ? 'SHELF'
      : (playing ? 'PLAYING' : this.currentShot !== 'none' ? 'RUNNING · ' + (this.currentShot === 'A' ? 'SHOT A' : this.currentShot === 'Be' ? 'EJECT' : 'SHOT B') : reading ? 'RUNNING · SETTLE / READ' : 'RUNNING') + (a ? ' — ' + TAPES[a].title : '');

    return html`
      <div class="stage-outer">
      <div class="main-card" style="transform: translate(-50%, 0) scale(${this.stageScale})">
        <div
          class="camera-stage"
          style="transform: ${this.camOn ? `scale(${this.camScale})` : 'none'}; transform-origin: ${this.camOrigin}; transition: transform ${this.camDur}ms cubic-bezier(.32,.72,0,1)"
        >
          <!-- Background Scene -->
          <div 
            class="scene-bg" 
            @click=${() => { if (this.currentShot !== 'none') this.skip(); else if (playing) this.eject(); else if (st !== 'idle') this.cancel(); }}
            style="position:absolute; inset:0; z-index:1; opacity: ${dim ? (playing ? 0.18 : 0.35) : 1}; filter: ${dim ? (playing ? 'blur(6px)' : 'blur(3px)') : 'blur(0px)'}; transition: opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)"
          >
            <div style="position:absolute; left:0; right:0; top:0; height:452px; background:#ece6da; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:0; right:0; top:452px; bottom:0; background:#d8cdba; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:0; right:0; top:450px; height:2px; background:rgba(42,38,33,.18); filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:56px; top:470px; width:660px; height:170px; background:#cdbfa6; border-radius:6px; transform:perspective(500px) rotateX(58deg); filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; right:34px; top:236px; width:56px; height:216px; background:#c9b79a; border-radius:4px 4px 0 0; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; right:22px; top:196px; width:80px; height:52px; background:#e2d6c0; border-radius:6px 6px 3px 3px; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:64px; top:300px; width:120px; height:152px; background:#d8ccb6; border-radius:6px 6px 0 0; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:96px; top:250px; width:56px; height:56px; background:#c2ceb4; border-radius:50% 50% 40% 40%; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:48px; top:40px; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.08em; color:#2a2621">PORTFOLIO — DESIGN × CODE</div>
            <div style="position:absolute; right:48px; top:40px; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.08em; color:rgba(42,38,33,.45)">ABOUT · CONTACT</div>
            <div style="position:absolute; left:48px; top:212px; max-width:520px">
              <div style="font:400 34px/1.25 Georgia,serif; color:#2a2621">Five working apps, shelved on tape.</div>
              <div style="margin-top:16px; font:14px/1.6 Inter,sans-serif; color:rgba(42,38,33,.55)">I direct AI-assisted builds of interactive tools.<br>Pick a tape to load one — eject to come back.</div>
            </div>
          </div>

          <!-- VCR Deck -->
          <vcr-player 
            .setOp=${sharp ? 1 : (dim ? 0.9 : 0.75)}
            .setFx=${sharp ? 'blur(0px)' : (dim ? 'blur(2px)' : 'blur(5px)')}
            ?isPlaying=${playing}
            @eject-click=${this.eject}
          ></vcr-player>

          <!-- CRT TV Display -->
          <crt-display
            .activeKey=${this.activeKey}
            .setOp=${sharp ? 1 : (dim ? 0.9 : 0.75)}
            .setFx=${sharp ? 'blur(0px)' : (dim ? 'blur(2px)' : 'blur(5px)')}
            ?isPlaying=${playing}
            ?isReading=${reading}
            ?isPlayWipe=${st === 'playWipe'}
          >
            <tape-app-slot .activeKey=${this.activeKey}></tape-app-slot>
          </crt-display>

          <!-- Tape Shelf Stack -->
          <tape-shelf
            .activeKey=${this.activeKey}
            .stage=${this.stageState}
            .sceneOp=${dim ? (playing ? 0.18 : 0.35) : 1}
            .flightTransform=${this.flightTransform}
            .flightDur=${this.flightDur}
            .flightEase=${this.flightEase}
            .flightFx=${['lift', 'fly', 'pop', 'home'].includes(st) ? 'drop-shadow(0 22px 20px rgba(42,38,33,.26))' : 'drop-shadow(0 2px 4px rgba(42,38,33,.12))'}
            @pick-tape=${(e: CustomEvent) => this.pick(e.detail.key)}
          ></tape-shelf>
        </div>

        <!-- Info Case Panel -->
        <div 
          style="position:absolute; left:44px; top:146px; width:352px; z-index:6; pointer-events:none; opacity:${playing ? 1 : 0}; transform:${playing ? 'translateY(0)' : 'translateY(14px)'}; transition:opacity 380ms cubic-bezier(.23,1,.32,1), transform 380ms cubic-bezier(.23,1,.32,1)"
        >
          <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.16em; color:rgba(42,38,33,.45)">NOW PLAYING · ${activeTape ? activeTape.year : ''}</div>
          <div style="margin-top:14px; font:400 34px/1.12 Georgia,serif; color:#2a2621; text-wrap:pretty">${activeTape ? activeTape.title : ''}</div>
          <div style="margin-top:16px; font:13.5px/1.6 Inter,sans-serif; color:rgba(42,38,33,.62); max-width:330px; text-wrap:pretty">${activeTape ? activeTape.sub : ''}</div>
          <div style="margin-top:26px; display:grid; grid-template-columns:82px 1fr; gap:9px 14px; font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:.06em; color:#2a2621">
            <span style="color:rgba(42,38,33,.42)">ROLE</span><span>${activeTape ? activeTape.role : ''}</span>
            <span style="color:rgba(42,38,33,.42)">BUILT WITH</span><span>${activeTape ? activeTape.stack : ''}</span>
            <span style="color:rgba(42,38,33,.42)">CASE</span><span>/${activeTape ? activeTape.slug : ''}</span>
          </div>
          <div style="margin-top:30px; padding-top:14px; border-top:1px solid rgba(42,38,33,.16); font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.12em; color:rgba(42,38,33,.45)">■ ▲ EJECT TO RETURN TO THE SHELF</div>
        </div>

        <!-- 3-Shot Cutscene Overlay -->
        <cutscene-overlay
          .activeKey=${this.activeKey}
          .currentShot=${this.currentShot}
          ?showFlash=${this.showFlash}
          .shotADur=${this.shotADur}
          .shotBDur=${this.shotBDur}
          .flashDur=${this.flashDur}
          ?isPaused=${this.activeHold !== null}
          .scrubVal=${this.scrubVal}
          @skip-cutscene=${this.skip}
        ></cutscene-overlay>
      </div>
      </div>

      <!-- Motion Inspector Debug Panel (Hidden by default) -->
      ${this.showInspector
        ? html`
            <motion-inspector
              .inspectState=${inspectState}
              .activeHold=${this.activeHold}
              .scrubVal=${this.scrubVal}
              .shotADur=${this.shotADur}
              .shotBDur=${this.shotBDur}
              .flashDur=${this.flashDur}
              .dollyDur=${this.dollyDur}
              .readDur=${this.readDur}
              .camPct=${this.camPct}
              @hold-shot=${(e: CustomEvent) => this.handleHold(e.detail.hold)}
              @param-change=${(e: CustomEvent) => this.handleParamChange(e.detail.name, e.detail.val)}
              @run-sequence=${this.runSequence}
            ></motion-inspector>
          `
        : ''}
    `;
  }
}
