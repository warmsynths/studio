import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

@customElement('mobile-insert')
export class MobileInsertComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      min-height: 100%;
      background: #08080a;
      overflow: hidden;
    }

    .screen {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #101014, #06060a 60%);
    }

    .grain {
      position: absolute;
      inset: -10%;
      background: repeating-linear-gradient(180deg, rgba(255,255,255,.09) 0 2px, rgba(0,0,0,.4) 2px 5px);
      animation: grain 100ms steps(2) infinite;
      opacity: .5;
    }

    .sweep {
      position: absolute;
      left: 0;
      right: 0;
      height: 26%;
      background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.16), rgba(255,255,255,0));
      animation: sweep 680ms linear infinite;
    }

    @keyframes grain {
      0% { transform: translate(0,0); }
      50% { transform: translate(-2px,1px); }
      100% { transform: translate(1px,-1px); }
    }

    @keyframes sweep {
      0% { transform: translateY(-120%); }
      100% { transform: translateY(120%); }
    }

    .reels {
      position: absolute;
      left: 0;
      right: 0;
      top: 22%;
      display: flex;
      justify-content: center;
      gap: 20vw;
    }

    .reel {
      width: 22vw;
      max-width: 88px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: #d9d9d9;
      opacity: .82;
      position: relative;
      animation: spin 1.4s linear infinite;
    }

    .reel::before {
      content: '';
      position: absolute;
      inset: 22%;
      border-radius: 50%;
      background: #a8a8a8;
    }

    .reel::after {
      content: '';
      position: absolute;
      inset: 34%;
      border-radius: 50%;
      background: #17130f;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .copy {
      position: absolute;
      left: 24px;
      right: 24px;
      bottom: 40px;
      font-family: 'IBM Plex Mono', monospace;
      color: #f0e9dc;
      text-align: center;
    }

    .kicker {
      font-size: 10px;
      letter-spacing: .16em;
      color: rgba(240, 233, 220, .6);
    }

    .title {
      margin-top: 9px;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: .02em;
    }

    .sub {
      margin-top: 6px;
      font-size: 10px;
      letter-spacing: .14em;
      color: rgba(240, 233, 220, .5);
    }

    .skip {
      margin-top: 20px;
      font-size: 10.5px;
      letter-spacing: .12em;
      color: rgba(240, 233, 220, .45);
      background: none;
      border: none;
      padding: 10px;
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(20,14,6,0), rgba(20,14,6,.5) 42%, rgba(20,14,6,.86));
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: Boolean }) ejecting = false;
  @property({ type: Boolean }) skippable = false;

  private skip() {
    if (this.skippable) this.dispatchEvent(new CustomEvent('skip'));
  }

  render() {
    const t = this.activeKey ? TAPES[this.activeKey] : null;
    return html`
      <div class="screen">
        <div class="grain"></div>
        <div class="sweep"></div>
      </div>
      <div class="reels">
        <div class="reel"></div>
        <div class="reel"></div>
      </div>
      <div class="copy">
        <div class="kicker">${this.ejecting ? 'EJECTING' : 'LOADING'}</div>
        <div class="title">${t ? t.title : ''}</div>
        <div class="sub">${t ? t.kicker : ''}</div>
        ${this.skippable ? html`<button class="skip" @click=${this.skip}>TAP TO SKIP</button>` : ''}
      </div>
      <div class="vignette"></div>
    `;
  }
}
