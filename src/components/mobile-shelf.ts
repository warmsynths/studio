import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';
import './vcr-player.js';
import './crt-display.js';

const ORDER: TapeKey[] = ['chord', 'scene', 'echo', 'pixel', 'drift'];

@customElement('mobile-shelf')
export class MobileShelfComponent extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      grid-template-columns: 1fr;
      position: relative;
      width: 100%;
      height: 100%;
      background: #ece6da;
      overflow: hidden;
    }

    .bg-floor {
      grid-area: 4 / 1;
      position: relative;
      top: 52px;
      background: #d8cdba;
      box-shadow: 0 500px 0 0 #d8cdba;
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
      bottom: -72px;
      left: 30vw;
      width: 560px;
      height: 570px;
      transform: scale(.55);
      transform-origin: bottom left;
      z-index: 1;
      transition: opacity 420ms cubic-bezier(.23,1,.32,1), filter 420ms cubic-bezier(.23,1,.32,1);
    }

    .set-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .set-inner vcr-player {
      right: auto;
      left: 132px;
      top: 16px;
    }

    .set-inner crt-display {
      right: auto;
      left: 10px;
      top: 104px;
    }

    .header {
      grid-area: 1 / 1;
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
      grid-area: 2 / 1;
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
      font: 400 clamp(32px, 8vw, 56px) / 1.08 Georgia, serif;
      letter-spacing: -0.01em;
      color: #2a2621;
      max-width: 320px;
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
      grid-area: 3 / 1;
      min-height: 24px;
      position: relative;
    }

    .shelf {
      grid-area: 4 / 1;
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
      max-width: 480px;
      margin: 0 auto;
    }

    .tape-slot {
      aspect-ratio: 7.2 / 1;
      overflow: hidden;
      margin-bottom: 1.5%;
      transition: aspect-ratio 460ms cubic-bezier(.6,0,.4,1), margin-bottom 460ms cubic-bezier(.6,0,.4,1);
    }

    .tape-slot:last-child {
      margin-bottom: 0;
    }

    .tape-slot.collapsed {
      aspect-ratio: 7.2 / 0.02;
      margin-bottom: 0;
    }

    .tape {
      width: 100%;
      height: 100%;
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


  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: String }) phase: 'idle' | 'loading' | 'ejecting' = 'idle';

  private pick(k: TapeKey) {
    this.dispatchEvent(new CustomEvent('pick-tape', { detail: { key: k } }));
  }

  render() {
    const dim = this.phase !== 'idle';
    const a = this.activeKey;
    const t = a ? TAPES[a] : null;

    return html`
      <div class="bg-floor"></div>

      <div class="header">
        <span>PORTFOLIO — DESIGN × CODE</span>
        <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.08em; color:rgba(42,38,33,.6); display:flex; gap:8px">
          <span style="cursor:pointer" @click=${() => this.dispatchEvent(new CustomEvent('open-info', { detail: { mode: 'about' }, bubbles: true, composed: true }))}>ABOUT</span>
          <span>·</span>
          <span style="cursor:pointer" @click=${() => this.dispatchEvent(new CustomEvent('open-info', { detail: { mode: 'contact' }, bubbles: true, composed: true }))}>CONTACT</span>
        </div>
      </div>

      <div class="copy-stack">
        <div class="grid">
          <div class="copy-layer" style="opacity:${dim ? 0 : 1}; pointer-events:${dim ? 'none' : 'auto'}">
            <h1>Memories grow in the spaces between living.</h1>
            <p>A web developer, using AI to catch up to my own imagination. Tap a tape to load one — eject to come back.</p>
          </div>
          <div class="copy-layer loading-copy" style="opacity:${dim ? 1 : 0}; pointer-events:${dim ? 'auto' : 'none'}">
            <div class="kicker">${this.phase === 'ejecting' ? 'EJECTING' : 'LOADING'}</div>
            <div class="title">${t ? t.title : ''}</div>
            <div class="sub">${t ? t.kicker : ''}</div>
          </div>
        </div>
      </div>

      <div class="spacer">
        <div class="set" style="opacity:${dim ? 1 : .6}; filter:${dim ? 'blur(0px)' : 'blur(4px)'}">
          <div class="set-inner">
            <vcr-player .setOp=${1} .setFx=${'blur(0px)'}></vcr-player>
            <crt-display .activeKey=${a} .setOp=${1} .setFx=${'blur(0px)'} ?isReading=${this.phase === 'loading'}></crt-display>
          </div>
        </div>
      </div>

      <div class="shelf">
        <div class="shelf-label" style="opacity:${dim ? .3 : 1}">ON THE SHELF · 0${ORDER.length}</div>
        <div class="list">
          ${ORDER.map(k => {
            const tp = TAPES[k];
            const hidden = dim && k === a;
            return html`
              <div class="tape-slot ${hidden ? 'collapsed' : ''}">
                <button
                  class="tape"
                  data-tape=${k}
                  @click=${() => this.pick(k)}
                  aria-label="Load ${tp.title}"
                  style="filter:${dim && !hidden ? 'brightness(.55) blur(1px)' : 'none'}"
                >
                  <div class="strip" style="background:${tp.strip2 || tp.strip}"></div>
                  <div class="label">
                    <span class="title">${tp.title}</span>
                    <span class="kicker">${tp.kicker}</span>
                  </div>
                  <div class="sheen"></div>
                  <div class="vhs">VHS</div>
                </button>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
