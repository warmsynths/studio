import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TapeKey } from '../types/portfolio.js';
import '../embeds/beat-mapper-embed.js';
import '../embeds/chroma-chords-embed.js';
import '../embeds/circuit-chords-embed.js';
import '../embeds/hypersyn-embed.js';
import '../embeds/j6-companion-embed.js';
import './crt-info-view.js';

@customElement('tape-app-slot')
export class TapeAppSlotComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: #14141a;
    }

    crt-info-view, beat-mapper-embed, chroma-chords-embed, circuit-chords-embed, hypersyn-embed, j6-companion-embed {
      display: block;
      width: 100%;
      height: 100%;
      transition: opacity 260ms ease-out;
    }

    @starting-style {
      crt-info-view, beat-mapper-embed, chroma-chords-embed, circuit-chords-embed, hypersyn-embed, j6-companion-embed {
        opacity: 0;
      }
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: String }) infoMode: 'about' | 'contact' | null = null;
  @property({ type: Boolean }) isMobile = false;

  render() {
    if (this.infoMode) {
      return html`<crt-info-view .mode=${this.infoMode} ?isMobile=${this.isMobile}></crt-info-view>`;
    }

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
