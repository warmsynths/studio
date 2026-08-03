import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

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

    @keyframes crtTextFlicker {
      0%, 100% {
        text-shadow: 0.6px 0 0.8px rgba(234, 54, 175, 0.4), -0.6px 0 0.8px rgba(117, 250, 105, 0.4);
      }
      50% {
        text-shadow: 1px 0.3px 1px rgba(234, 54, 175, 0.5), -0.5px -0.3px 1px rgba(117, 250, 105, 0.5);
      }
    }

    @keyframes crtPhosphorMicroFlicker {
      0% { opacity: 0.993; }
      25% { opacity: 1; }
      50% { opacity: 0.989; }
      75% { opacity: 0.997; }
      100% { opacity: 1; }
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
      text-shadow: 0.6px 0 0.8px rgba(234, 54, 175, 0.4), -0.6px 0 0.8px rgba(117, 250, 105, 0.4);
      animation: crtTextFlicker 0.1s infinite alternate;
    }

    ::slotted(*) {
      width: 100%;
      height: 100%;
      animation: crtPhosphorMicroFlicker 0.12s infinite alternate;
    }

    .scanlines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0 1px, transparent 1px 4px);
    }

    .rgb-fringe {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(90deg, rgba(234, 54, 175, 0.012) 0 1px, rgba(117, 250, 105, 0.012) 1px 2px, transparent 2px 3px);
      animation: crtPhosphorMicroFlicker 0.15s infinite alternate;
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
      padding: 14px 0 calc(24px + env(safe-area-inset-bottom, 0px));
      border-top: 1px solid rgba(42, 38, 33, .16);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .45);
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
                <div class="rgb-fringe"></div>
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
    `;
  }
}
