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
      <div class="container" style="justify-content: center; align-items: center;">
        <div class="app-mount-notice">
          LIVE COMPONENT MOUNT POINT — ${activeTape.title} (436 × 350 AT 1:1)
        </div>
      </div>
    `;
  }
}
