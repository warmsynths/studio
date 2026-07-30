import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';
import '../vectors/vhs-icon-component.js';

@customElement('tape-app-slot')
export class TapeAppSlotComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: #14141a;
      padding: 22px 26px;
      box-sizing: border-box;
      font-family: 'IBM Plex Mono', monospace;
      color: #e6e2d9;
      position: relative;
    }

    .container {
      position: absolute;
      inset: 22px 26px;
      border: 1px solid rgba(230, 226, 217, 0.14);
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
    }

    .title {
      font-family: Georgia, serif;
      font-size: 22px;
      color: #fff;
      margin-bottom: 6px;
    }

    .subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: rgba(230, 226, 217, 0.65);
      line-height: 1.5;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 70px 1fr;
      gap: 6px 12px;
      font-size: 9px;
      letter-spacing: 0.05em;
    }

    .meta-label {
      color: rgba(230, 226, 217, 0.4);
    }

    .meta-val {
      color: #e6e2d9;
      font-weight: 600;
    }

    .app-mount-notice {
      padding: 10px;
      border: 1px dashed rgba(230, 226, 217, 0.25);
      border-radius: 3px;
      text-align: center;
      font-size: 8.5px;
      letter-spacing: 0.1em;
      color: rgba(230, 226, 217, 0.45);
      background: rgba(255, 255, 255, 0.02);
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;

  render() {
    const activeTape = this.activeKey ? TAPES[this.activeKey] : TAPES.chord;

    return html`
      <div class="container">
        <div>
          <div style="font-size: 8px; letter-spacing: 0.16em; color: ${activeTape.strip}; margin-bottom: 8px;">
            <vhs-icon icon="vhs-tape"></vhs-icon> ${activeTape.kicker} · ${activeTape.year}
          </div>
          <div class="title">${activeTape.title}</div>
          <div class="subtitle">${activeTape.sub}</div>
        </div>

        <div class="meta-grid">
          <span class="meta-label">ROLE</span>
          <span class="meta-val">${activeTape.role}</span>
          <span class="meta-label">STACK</span>
          <span class="meta-val">${activeTape.stack}</span>
          <span class="meta-label">ROUTE</span>
          <span class="meta-val">/#/${activeTape.slug}</span>
        </div>

        <div class="app-mount-notice">
          LIVE COMPONENT MOUNT POINT — ${activeTape.title} (436 × 350 AT 1:1)
        </div>
      </div>
    `;
  }
}
