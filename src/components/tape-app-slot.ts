import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TapeKey } from '../types/portfolio.js';
import '../embeds/beat-mapper-embed.js';
import '../embeds/chroma-chords-embed.js';
import '../embeds/circuit-chords-embed.js';
import '../embeds/hypersyn-embed.js';
import '../embeds/j6-companion-embed.js';

@customElement('tape-app-slot')
export class TapeAppSlotComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: #14141a;
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;

  render() {
    switch (this.activeKey) {
      case 'drift':
        return html`<beat-mapper-embed></beat-mapper-embed>`;
      case 'pixel':
        return html`<chroma-chords-embed></chroma-chords-embed>`;
      case 'chord':
        return html`<circuit-chords-embed></circuit-chords-embed>`;
      case 'echo':
        return html`<hypersyn-embed></hypersyn-embed>`;
      case 'scene':
        return html`<j6-companion-embed></j6-companion-embed>`;
      default:
        return html``;
    }
  }
}
