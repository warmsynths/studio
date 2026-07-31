import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';
import './vcr-player.js';
import './crt-display.js';

@customElement('mobile-insert')
export class MobileInsertComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      min-height: 100%;
      background: linear-gradient(180deg, #0c0b09 0%, #1a1510 40%, #2f2416 76%, #40311d 100%);
      overflow: hidden;
    }

    .stage {
      position: relative;
      display: flex;
      justify-content: center;
      padding-top: 6vh;
    }

    .set {
      position: relative;
      flex-shrink: 0;
      width: 620px;
      height: 650px;
      transform: scale(.58);
      transform-origin: top center;
    }

    .cassette {
      position: absolute;
      left: 430px;
      top: 69px;
      width: 130px;
      height: 46px;
      z-index: 4;
      transform-origin: left center;
      transform: translateX(0) scale(1);
      opacity: 1;
      transition: transform 680ms cubic-bezier(.32,.72,0,1), opacity 560ms cubic-bezier(.32,.72,0,1);
      filter: drop-shadow(0 6px 10px rgba(0,0,0,.4));
    }

    .cassette.inserted {
      transform: translateX(-142px) scale(.22);
      opacity: 0;
    }

    .cassette-body {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      background: #262626;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,.3);
    }

    .cassette-body .strip {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 12px;
    }

    .cassette-body .label {
      position: absolute;
      left: 18px;
      right: 8px;
      top: 6px;
      bottom: 6px;
      background: #f4f1e6;
      border-radius: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 4px;
    }

    .cassette-body .label span {
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      font-size: 9px;
      letter-spacing: .04em;
      color: #2a2621;
      line-height: 1.3;
    }

    .spacer {
      flex: 1;
      min-height: 12px;
    }

    .copy {
      position: relative;
      padding: 0 24px calc(30px + env(safe-area-inset-bottom, 0px));
      font-family: 'IBM Plex Mono', monospace;
      color: #f0e9dc;
      text-align: center;
    }

    .kicker {
      font-size: 10px;
      letter-spacing: .16em;
      color: rgba(240, 233, 220, .55);
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
      color: rgba(240, 233, 220, .45);
    }

    .skip {
      margin-top: 18px;
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
      background: radial-gradient(ellipse at 50% 30%, rgba(12,11,9,0), rgba(12,11,9,.65) 78%);
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: Boolean }) ejecting = false;
  @property({ type: Boolean }) skippable = false;

  @state() private inserted = false;
  private lastActiveKey: TapeKey | null = null;
  private lastEjecting = false;

  updated(changed: Map<string, unknown>) {
    if (changed.has('activeKey') && this.activeKey && this.activeKey !== this.lastActiveKey && !this.ejecting) {
      this.lastActiveKey = this.activeKey;
      this.inserted = false;
      requestAnimationFrame(() => requestAnimationFrame(() => { this.inserted = true; }));
    }
    if (changed.has('ejecting')) {
      if (this.ejecting && !this.lastEjecting) this.inserted = false;
      this.lastEjecting = this.ejecting;
    }
  }

  private skip() {
    if (this.skippable) this.dispatchEvent(new CustomEvent('skip'));
  }

  render() {
    const t = this.activeKey ? TAPES[this.activeKey] : null;
    return html`
      <div class="stage">
        <div class="set">
          <vcr-player .setOp=${1} .setFx=${'blur(0px)'}></vcr-player>
          <crt-display
            .activeKey=${this.activeKey}
            .setOp=${1}
            .setFx=${'blur(0px)'}
            ?isReading=${!this.ejecting}
          ></crt-display>
          <div class="cassette ${this.inserted ? 'inserted' : ''}">
            <div class="cassette-body">
              <div class="strip" style="background:${t ? (t.strip2 || t.strip) : '#888'}"></div>
              <div class="label"><span>${t ? t.title : ''}</span></div>
            </div>
          </div>
        </div>
        <div class="vignette"></div>
      </div>
      <div class="spacer"></div>
      <div class="copy">
        <div class="kicker">${this.ejecting ? 'EJECTING' : 'LOADING'}</div>
        <div class="title">${t ? t.title : ''}</div>
        <div class="sub">${t ? t.kicker : ''}</div>
        ${this.skippable ? html`<button class="skip" @click=${this.skip}>TAP TO SKIP</button>` : ''}
      </div>
    `;
  }
}
