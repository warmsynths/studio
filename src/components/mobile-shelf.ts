import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';
import './vcr-player.js';
import './crt-display.js';

const ORDER: TapeKey[] = ['chord', 'scene', 'echo', 'pixel', 'drift'];

@customElement('mobile-shelf')
export class MobileShelfComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      min-height: 100%;
      background: #ece6da;
      overflow: hidden;
    }

    .bg-floor {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 42%;
      background: #d8cdba;
    }

    .bg-floor::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 2px;
      background: rgba(42, 38, 33, .16);
    }

    .set {
      position: absolute;
      top: -14px;
      right: -170px;
      width: 620px;
      height: 650px;
      transform: scale(.6);
      transform-origin: top right;
      z-index: 0;
      transition: opacity 420ms cubic-bezier(.23,1,.32,1), filter 420ms cubic-bezier(.23,1,.32,1);
    }

    .set-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .header {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 22px 22px 0;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      letter-spacing: .09em;
      color: #2a2621;
    }

    .burger {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px 4px;
    }

    .burger span {
      display: block;
      width: 18px;
      height: 1.5px;
      background: #2a2621;
    }

    .copy-stack {
      position: relative;
      z-index: 2;
      padding: 0 22px;
    }

    .copy-layer {
      grid-area: 1 / 1;
      transition: opacity 280ms cubic-bezier(.23,1,.32,1);
    }

    .copy-stack .grid {
      display: grid;
    }

    .copy-stack .grid > * {
      grid-area: 1 / 1;
    }

    h1 {
      margin: 26px 0 0;
      font: 400 clamp(24px, 8vw, 32px) / 1.18 Georgia, serif;
      color: #2a2621;
      max-width: 240px;
    }

    p {
      margin: 14px 0 0;
      font: 13px / 1.6 'Inter', sans-serif;
      color: rgba(42, 38, 33, .55);
      max-width: 260px;
    }

    .loading-copy {
      padding-top: 30px;
      font-family: 'IBM Plex Mono', monospace;
    }

    .loading-copy .kicker {
      font-size: 10px;
      letter-spacing: .16em;
      color: rgba(42, 38, 33, .5);
    }

    .loading-copy .title {
      margin-top: 10px;
      font: 400 26px/1.16 Georgia, serif;
      color: #2a2621;
    }

    .loading-copy .sub {
      margin-top: 6px;
      font-size: 10px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .45);
    }

    .skip {
      margin-top: 16px;
      font-size: 10.5px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .5);
      background: none;
      border: none;
      padding: 8px 0;
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .spacer {
      flex: 1;
      min-height: 24px;
    }

    .shelf {
      position: relative;
      z-index: 2;
      padding: 30px 20px calc(24px + env(safe-area-inset-bottom, 0px));
    }

    .shelf-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .14em;
      color: rgba(42, 38, 33, .42);
      margin-bottom: 10px;
      transition: opacity 300ms cubic-bezier(.23,1,.32,1);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 1.5%;
      max-width: 480px;
      margin: 0 auto;
    }

    .tape {
      aspect-ratio: 7.2 / 1;
      position: relative;
      border-radius: 4px 4px 2px 2px;
      background: #262626;
      box-shadow: 0 4px 12px rgba(42, 38, 33, .28);
      overflow: hidden;
      border: none;
      display: block;
      width: 100%;
      padding: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: transform 120ms cubic-bezier(.23,1,.32,1), opacity 300ms cubic-bezier(.23,1,.32,1), filter 300ms cubic-bezier(.23,1,.32,1);
    }

    .tape:active {
      transform: scale(.98);
    }

    .strip {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 12px;
    }

    .label {
      position: absolute;
      left: 22px;
      top: 9px;
      bottom: 9px;
      right: 46px;
      background: #f4f1e6;
      border-radius: 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      padding: 0 11px;
    }

    .label .title {
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: .05em;
      color: #2a2621;
    }

    .label .kicker {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.5px;
      color: rgba(42, 38, 33, .5);
      letter-spacing: .05em;
    }

    .sheen {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      background: rgba(255, 255, 255, .16);
    }

    .vhs {
      position: absolute;
      right: 12px;
      top: 20px;
      font-size: 9px;
      font-style: italic;
      color: #aaa;
      font-family: Arial, sans-serif;
    }

    .flying-tape {
      position: absolute;
      z-index: 6;
      pointer-events: none;
      transition: transform 720ms cubic-bezier(.32,.72,0,1);
      will-change: transform;
    }

    .flying-tape .tape-visual {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 4px 4px 2px 2px;
      background: #262626;
      box-shadow: 0 10px 20px rgba(42, 38, 33, .35);
      overflow: hidden;
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: String }) phase: 'idle' | 'loading' | 'ejecting' = 'idle';
  @property({ type: Boolean }) skippable = false;

  @state() private flying: 'pre' | 'in' | 'out' | null = null;
  @state() private flightTransform = 'translate(0,0) scale(1)';
  @state() private flightStart = { left: 0, top: 0, width: 0, height: 0 };
  @state() private flightKey: TapeKey | null = null;

  private lastPhase: 'idle' | 'loading' | 'ejecting' = 'idle';
  private lastFlownKey: TapeKey | null = null;

  updated(changed: Map<string, unknown>) {
    if (!changed.has('phase') && !changed.has('activeKey')) return;

    if (this.phase === 'loading' && this.activeKey && this.activeKey !== this.lastFlownKey) {
      this.lastFlownKey = this.activeKey;
      this.beginFlight('in', this.activeKey);
    } else if (this.phase === 'ejecting' && this.lastPhase !== 'ejecting' && this.activeKey) {
      this.beginFlight('out', this.activeKey);
    } else if (this.phase === 'idle' && this.lastPhase !== 'idle') {
      this.flying = null;
      this.flightKey = null;
      this.lastFlownKey = null;
    }
    this.lastPhase = this.phase;
  }

  private beginFlight(direction: 'in' | 'out', key: TapeKey) {
    const tapeEl = this.shadowRoot?.querySelector(`[data-tape="${key}"]`) as HTMLElement | null;
    const vcr = this.shadowRoot?.querySelector('vcr-player');
    const slot = vcr?.shadowRoot?.querySelector('[data-slot]') as HTMLElement | null;
    if (!tapeEl || !slot) return;

    const host = this.getBoundingClientRect();
    const tapeRect = tapeEl.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();

    this.flightKey = key;
    this.flightStart = {
      left: tapeRect.left - host.left,
      top: tapeRect.top - host.top,
      width: tapeRect.width,
      height: tapeRect.height,
    };

    const dx = (slotRect.left + slotRect.width / 2) - (tapeRect.left + tapeRect.width / 2);
    const dy = (slotRect.top + slotRect.height / 2) - (tapeRect.top + tapeRect.height / 2);
    const scale = Math.max(0.14, Math.min(slotRect.width / tapeRect.width, slotRect.height / tapeRect.height) * 1.7);
    const flownTf = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scale.toFixed(3)})`;
    const restTf = 'translate(0,0) scale(1)';

    if (direction === 'in') {
      this.flightTransform = restTf;
      this.flying = 'pre';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        this.flightTransform = flownTf;
        this.flying = 'in';
      }));
    } else {
      this.flightTransform = flownTf;
      this.flying = 'pre';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        this.flightTransform = restTf;
        this.flying = 'out';
      }));
    }
  }

  private pick(k: TapeKey) {
    this.dispatchEvent(new CustomEvent('pick-tape', { detail: { key: k } }));
  }

  private skip() {
    if (this.skippable) this.dispatchEvent(new CustomEvent('skip'));
  }

  render() {
    const dim = this.phase !== 'idle';
    const a = this.activeKey;
    const t = a ? TAPES[a] : null;
    const flyingKey = this.flightKey;

    return html`
      <div class="bg-floor"></div>

      <div class="set" style="opacity:${dim ? 1 : .75}; filter:${dim ? 'blur(0px)' : 'blur(4px)'}">
        <div class="set-inner">
          <vcr-player .setOp=${1} .setFx=${'blur(0px)'}></vcr-player>
          <crt-display .activeKey=${a} .setOp=${1} .setFx=${'blur(0px)'} ?isReading=${this.phase === 'loading'}></crt-display>
        </div>
      </div>

      <div class="header">
        <span>PORTFOLIO — DESIGN × CODE</span>
        <span class="burger"><span></span><span></span></span>
      </div>

      <div class="copy-stack">
        <div class="grid">
          <div class="copy-layer" style="opacity:${dim ? 0 : 1}; pointer-events:${dim ? 'none' : 'auto'}">
            <h1>Five working apps, shelved on tape.</h1>
            <p>I direct AI-assisted builds of interactive tools. Tap a tape to load one — eject to come back.</p>
          </div>
          <div class="copy-layer loading-copy" style="opacity:${dim ? 1 : 0}; pointer-events:${dim ? 'auto' : 'none'}">
            <div class="kicker">${this.phase === 'ejecting' ? 'EJECTING' : 'LOADING'}</div>
            <div class="title">${t ? t.title : ''}</div>
            <div class="sub">${t ? t.kicker : ''}</div>
            ${this.skippable ? html`<button class="skip" @click=${this.skip}>TAP TO SKIP</button>` : ''}
          </div>
        </div>
      </div>

      <div class="spacer"></div>

      <div class="shelf">
        <div class="shelf-label" style="opacity:${dim ? .3 : 1}">ON THE SHELF · 0${ORDER.length}</div>
        <div class="list">
          ${ORDER.map(k => {
            const tp = TAPES[k];
            const hidden = dim && k === a;
            return html`
              <button
                class="tape"
                data-tape=${k}
                @click=${() => this.pick(k)}
                aria-label="Load ${tp.title}"
                style="opacity:${hidden ? 0 : 1}; filter:${dim && !hidden ? 'brightness(.55) blur(1px)' : 'none'}"
              >
                <div class="strip" style="background:${tp.strip2 || tp.strip}"></div>
                <div class="label">
                  <span class="title">${tp.title}</span>
                  <span class="kicker">${tp.kicker}</span>
                </div>
                <div class="sheen"></div>
                <div class="vhs">VHS</div>
              </button>
            `;
          })}
        </div>
      </div>

      ${this.flying && flyingKey ? html`
        <div
          class="flying-tape"
          style="left:${this.flightStart.left}px; top:${this.flightStart.top}px; width:${this.flightStart.width}px; height:${this.flightStart.height}px; transform:${this.flightTransform}"
        >
          <div class="tape-visual">
            <div class="strip" style="background:${TAPES[flyingKey].strip2 || TAPES[flyingKey].strip}"></div>
            <div class="label">
              <span class="title">${TAPES[flyingKey].title}</span>
              <span class="kicker">${TAPES[flyingKey].kicker}</span>
            </div>
            <div class="sheen"></div>
            <div class="vhs">VHS</div>
          </div>
        </div>
      ` : ''}
    `;
  }
}
