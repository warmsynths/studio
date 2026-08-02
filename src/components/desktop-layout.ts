import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';
import { CutsceneDirector } from './cutscene-director.js';

import './tape-shelf.js';
import './vcr-player.js';
import './crt-display.js';
import './cutscene-overlay.js';
import './tape-app-slot.js';

@customElement('desktop-layout')
export class DesktopLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .desktop-wrap {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #f5f2ea;
    }
    .main-card {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1100px;
      height: 700px;
      background: #f5f2ea;
      overflow: hidden;
      transform-origin: center center;
    }
    .camera-stage {
      position: absolute;
      inset: 0;
      will-change: transform;
      transition: transform 560ms cubic-bezier(.32,.72,0,1);
    }
  `;

  @property({ type: Object }) director!: CutsceneDirector;
  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: String }) stageState: string = 'idle';
  @property({ type: String }) currentShot: string = 'none';
  @property({ type: String }) flightTransform: string = 'none';
  @property({ type: Number }) stageScale: number = 1;

  private _f: { dx: number; dy: number; deg: number; s: number } | null = null;

  private zoom(): number {
    const card = this.shadowRoot?.querySelector('.main-card');
    const host = card ? card.getBoundingClientRect().width / 1100 : 1;
    return host * (this.director.camOn ? this.director.camScale : 1);
  }

  public flip(k: TapeKey): string {
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

  public screenOrigin(): string {
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
    this.director.pick(k, this.flip(k), this.screenOrigin(), false);
  }

  private eject() {
    this.director.eject(false);
  }

  render() {
    const d = this.director;
    const a = d.activeKey;
    const st = d.stageState;
    const dim = st !== 'idle' && st !== 'home';
    const playing = st === 'play' || st === 'playWipe';
    const reading = st === 'read';
    const sharp = playing || reading || st === 'ejectCollapse';
    const activeTape = a ? TAPES[a] : null;

    return html`
      <div class="desktop-wrap">
      <div class="main-card" style="transform: translate(-50%, -50%) scale(${this.stageScale})">
        <div
          class="camera-stage"
          style="transform: ${d.camOn ? `scale(${d.camScale})` : 'none'}; transform-origin: ${d.camOrigin}; transition: transform ${d.camDur}ms cubic-bezier(.32,.72,0,1)"
        >
          <!-- Background Scene -->
          <div 
            class="scene-bg" 
            @click=${() => { if (d.currentShot !== 'none') d.skip(); else if (playing) this.eject(); else if (st !== 'idle') d.cancel(); }}
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
              <div style="font:400 34px/1.25 Georgia,serif; color:#2a2621">Memories grow in the spaces between living.</div>
              <div style="margin-top:16px; font:14px/1.6 Inter,sans-serif; color:rgba(42,38,33,.55)">Apps I grew, not coded. Pick a tape to load one — eject to come back.</div>
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
            .activeKey=${a}
            .setOp=${sharp ? 1 : (dim ? 0.9 : 0.75)}
            .setFx=${sharp ? 'blur(0px)' : (dim ? 'blur(2px)' : 'blur(5px)')}
            ?isPlaying=${playing}
            ?isReading=${reading}
            ?isPlayWipe=${st === 'playWipe'}
          >
            <tape-app-slot .activeKey=${a}></tape-app-slot>
          </crt-display>

          <!-- Tape Shelf Stack -->
          <tape-shelf
            .activeKey=${a}
            .stage=${st}
            .sceneOp=${dim ? (playing ? 0.18 : 0.35) : 1}
            .flightTransform=${d.flightTransform}
            .flightDur=${d.flightDur}
            .flightEase=${d.flightEase}
            .flightFx=${['lift', 'fly', 'pop', 'home'].includes(st) ? 'drop-shadow(0 22px 20px rgba(42,38,33,.26))' : 'drop-shadow(0 2px 4px rgba(42,38,33,.12))'}
            @pick-tape=${(e: CustomEvent) => this.pick(e.detail.key)}
          ></tape-shelf>
        </div>

        <!-- Info Case Panel -->
        <div 
          style="position:absolute; left:44px; top:146px; width:352px; z-index:6; pointer-events:${playing ? 'auto' : 'none'}; opacity:${playing ? 1 : 0}; transform:${playing ? 'translateY(0)' : 'translateY(14px)'}; transition:opacity 380ms cubic-bezier(.23,1,.32,1), transform 380ms cubic-bezier(.23,1,.32,1)"
        >
          <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.16em; color:rgba(42,38,33,.45)">NOW PLAYING · ${activeTape ? activeTape.year : ''}</div>
          <div style="margin-top:14px; font:400 34px/1.12 Georgia,serif; color:#2a2621; text-wrap:pretty">${activeTape ? activeTape.title : ''}</div>
          <div style="margin-top:16px; font:13.5px/1.6 Inter,sans-serif; color:rgba(42,38,33,.62); max-width:330px; text-wrap:pretty">${activeTape ? activeTape.sub : ''}</div>
          <div style="margin-top:26px; display:grid; grid-template-columns:82px 1fr; gap:9px 14px; font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:.06em; color:#2a2621">
            <span style="color:rgba(42,38,33,.42)">ROLE</span><span>${activeTape ? activeTape.role : ''}</span>
            <span style="color:rgba(42,38,33,.42)">BUILT WITH</span><span>${activeTape ? activeTape.stack : ''}</span>
            <span style="color:rgba(42,38,33,.42)">CASE</span><span>/${activeTape ? activeTape.slug : ''}</span>
          </div>
          <div style="margin-top:30px; padding-top:14px; border-top:1px solid rgba(42,38,33,.16); display:flex; align-items:center; justify-content:space-between">
            <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.12em; color:rgba(42,38,33,.45)">■ ▲ EJECT TO RETURN TO THE SHELF</div>
            <a
              href="https://warmsynths.github.io/${activeTape ? activeTape.slug : ''}"
              target="_blank"
              rel="noopener"
              style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.1em; color:#2a2621; text-decoration:none; white-space:nowrap; opacity:.55; transition:opacity 140ms linear"
              @mouseenter=${(e: MouseEvent) => (e.target as HTMLElement).style.opacity = '1'}
              @mouseleave=${(e: MouseEvent) => (e.target as HTMLElement).style.opacity = '.55'}
            >↗ OPEN APP</a>
          </div>
        </div>

        <!-- 3-Shot Cutscene Overlay -->
        <cutscene-overlay
          .activeKey=${a}
          .currentShot=${d.currentShot}
          ?showFlash=${d.showFlash}
          .shotADur=${d.shotADur}
          .shotBDur=${d.shotBDur}
          .flashDur=${d.flashDur}
          ?isPaused=${d.activeHold !== null}
          .scrubVal=${d.scrubVal}
          @skip-cutscene=${() => d.skip()}
        ></cutscene-overlay>
      </div>
      </div>
    `;
  }
}
