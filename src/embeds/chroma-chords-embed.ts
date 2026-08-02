import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const SCRIPT_URL = import.meta.env.VITE_APP_CHROMA_CHORDS_SCRIPT || '/chroma-chords/app.js';

@customElement('chroma-chords-embed')
export class ChromaChordsEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;

  @state() private loaded = customElements.get('chroma-chords-app') !== undefined;

  async connectedCallback() {
    super.connectedCallback();
    if (!this.loaded) {
      try {
        await import(/* @vite-ignore */ SCRIPT_URL);
        this.loaded = true;
      } catch (err) {
        console.error('Failed to load Chroma Chords component script:', err);
      }
    }
  }

  render() {
    return this.loaded
      ? html`<chroma-chords-app style="display:block; width:100%; height:100%;"></chroma-chords-app>`
      : html`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING CHROMA CHORDS...</div>`;
  }
}
