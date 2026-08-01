import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Placeholder for the real chroma-chords Lit component.
 * Replace this file's contents with the real embed — keep the
 * `chroma-chords-embed` tag name so tape-app-slot.ts picks it up unchanged.
 */
@customElement('chroma-chords-embed')
export class ChromaChordsEmbed extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      border: 1px dashed rgba(230, 226, 217, 0.25);
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.02);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 8.5px;
      letter-spacing: 0.1em;
      color: rgba(230, 226, 217, 0.45);
      text-align: center;
    }
  `;

  render() {
    return html`EMBED PENDING — CHROMA CHORDS`;
  }
}
