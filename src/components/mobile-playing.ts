import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

const ORDER: TapeKey[] = ['chord', 'scene', 'echo', 'pixel', 'drift'];

@customElement('mobile-playing')
export class MobilePlayingComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      min-height: 100%;
      background: #e8e2d6;
      overflow: hidden;
    }

    .deck {
      position: relative;
      background: #2a2621;
      padding: 20px 16px 14px;
    }

    .tv {
      position: relative;
      background: #8a5a33;
      border-radius: 6px;
      padding: 11px;
    }

    .bezel {
      background: linear-gradient(180deg, #cfcdc6, #bdbbb4);
      border-radius: 4px;
      padding: 9px;
    }

    .screen {
      position: relative;
      background: #1e1e1e;
      border-radius: 8px;
      padding: 12px;
    }

    .screen-inner {
      position: relative;
      aspect-ratio: 4 / 3;
      background: #0a0a0c;
      border-radius: 16px;
      overflow: hidden;
    }

    .osd {
      position: absolute;
      left: 14px;
      right: 14px;
      top: 10px;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      pointer-events: none;
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      font-size: 9px;
      letter-spacing: .12em;
      color: #e8f0e2;
      text-shadow: 0 0 7px rgba(180,255,190,.5);
    }

    ::slotted(*) {
      width: 100%;
      height: 100%;
    }

    .scanlines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(180deg, rgba(255,255,255,.035) 0 1px, transparent 1px 5px);
    }

    .transport {
      margin-top: 10px;
      height: 40px;
      background: linear-gradient(180deg, #1a1a1c, #101011);
      border-radius: 3px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      gap: 10px;
    }

    .transport .label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 8.5px;
      letter-spacing: .14em;
      color: rgba(239, 236, 228, .5);
    }

    .eject-btn {
      margin-left: auto;
      height: 30px;
      padding: 0 14px;
      background: #2c2c2e;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9px;
      letter-spacing: .12em;
      color: #cfcfcf;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .eject-btn:active {
      transform: translateY(1px);
    }

    .notes {
      padding: 24px 22px 14px;
    }

    .kicker {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .16em;
      color: rgba(42, 38, 33, .45);
    }

    .title {
      margin-top: 12px;
      font: 400 clamp(22px, 7vw, 28px) / 1.14 Georgia, serif;
      color: #2a2621;
    }

    .sub {
      margin-top: 12px;
      font: 13px / 1.6 'Inter', sans-serif;
      color: rgba(42, 38, 33, .62);
    }

    .grid {
      margin-top: 22px;
      display: grid;
      grid-template-columns: 78px 1fr;
      gap: 9px 14px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      letter-spacing: .06em;
      color: #2a2621;
    }

    .grid span:nth-child(odd) {
      color: rgba(42, 38, 33, .42);
    }

    .return {
      margin: 22px 22px 0;
      padding-top: 14px;
      border-top: 1px solid rgba(42, 38, 33, .16);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .45);
    }

    .mini-tapes {
      margin: 18px 22px 20px;
      display: flex;
      gap: 5px;
      align-items: flex-end;
    }

    .mini-tape {
      flex: 1;
      height: 32px;
      border-radius: 3px 3px 2px 2px;
      background: #262626;
      opacity: .5;
      position: relative;
      overflow: hidden;
    }

    .mini-tape .strip {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 8px;
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;

  private eject() {
    this.dispatchEvent(new CustomEvent('eject-tape'));
  }

  render() {
    const t = this.activeKey ? TAPES[this.activeKey] : null;

    return html`
      <div class="deck">
        <div class="tv">
          <div class="bezel">
            <div class="screen">
              <div class="screen-inner">
                <div class="osd">
                  <span>▶ PLAY <span style="opacity:.7">CH 3</span></span>
                  <span>SP · ${t ? t.run : '0:00:00'}</span>
                </div>
                <slot></slot>
                <div class="scanlines"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="transport">
          <span class="label">HI-TECH VCR</span>
          <button class="eject-btn" @click=${this.eject}>■ ▲ EJECT</button>
        </div>
      </div>

      <div class="notes">
        <div class="kicker">NOW PLAYING · ${t ? t.year : ''}</div>
        <div class="title">${t ? t.title : ''}</div>
        <div class="sub">${t ? t.sub : ''}</div>
        <div class="grid">
          <span>ROLE</span><span>${t ? t.role : ''}</span>
          <span>BUILT WITH</span><span>${t ? t.stack : ''}</span>
          <span>CASE</span><span>/${t ? t.slug : ''}</span>
        </div>
      </div>

      <div class="return">SWIPE DOWN OR HIT ■ ▲ TO RETURN TO THE SHELF</div>

      <div class="mini-tapes">
        ${ORDER.map(k => html`
          <div class="mini-tape">
            <div class="strip" style="background:${TAPES[k].strip2 || TAPES[k].strip}"></div>
          </div>
        `)}
      </div>
    `;
  }
}
