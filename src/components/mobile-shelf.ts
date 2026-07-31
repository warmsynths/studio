import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

const ORDER: TapeKey[] = ['chord', 'scene', 'echo', 'pixel', 'drift'];

@customElement('mobile-shelf')
export class MobileShelfComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      min-height: 100%;
      background: #f5f2ea;
      overflow: hidden;
    }

    .top {
      position: relative;
      padding: 22px 22px 28px;
      background: #ece6da;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    h1 {
      margin: 28px 0 0;
      font: 400 clamp(24px, 8vw, 32px) / 1.18 Georgia, serif;
      color: #2a2621;
    }

    p {
      margin: 14px 0 0;
      font: 13px / 1.6 'Inter', sans-serif;
      color: rgba(42, 38, 33, .55);
      max-width: 300px;
    }

    .shelf {
      position: relative;
      background: #d8cdba;
      padding: 34px 20px 40px;
    }

    .shelf-label {
      position: absolute;
      top: 14px;
      left: 20px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .14em;
      color: rgba(42, 38, 33, .42);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .tape {
      height: 54px;
      position: relative;
      border-radius: 4px 4px 2px 2px;
      background: #262626;
      box-shadow: 0 3px 9px rgba(42, 38, 33, .22);
      overflow: hidden;
      border: none;
      display: block;
      width: 100%;
      padding: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: transform 120ms cubic-bezier(.23,1,.32,1);
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

  private pick(k: TapeKey) {
    this.dispatchEvent(new CustomEvent('pick-tape', { detail: { key: k } }));
  }

  render() {
    return html`
      <div class="top">
        <div class="header">
          <span>PORTFOLIO — DESIGN × CODE</span>
          <span class="burger"><span></span><span></span></span>
        </div>
        <h1>Five working apps, shelved on tape.</h1>
        <p>I direct AI-assisted builds of interactive tools. Tap a tape to load one — eject to come back.</p>
      </div>
      <div class="shelf">
        <div class="shelf-label">ON THE SHELF · 0${ORDER.length}</div>
        <div class="list">
          ${ORDER.map(k => {
            const t = TAPES[k];
            return html`
              <button class="tape" @click=${() => this.pick(k)} aria-label="Load ${t.title}">
                <div class="strip" style="background:${t.strip2 || t.strip}"></div>
                <div class="label">
                  <span class="title">${t.title}</span>
                  <span class="kicker">${t.kicker}</span>
                </div>
                <div class="sheen"></div>
                <div class="vhs">VHS</div>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}
