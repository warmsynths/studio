import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const SCRIPT_URL = import.meta.env.VITE_APP_CIRCUIT_CHORDS_SCRIPT || '/circuit-chords/app.js';

@customElement('circuit-chords-embed')
export class CircuitChordsEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;

  @state() private loaded = customElements.get('circuit-chord-forge') !== undefined;

  async connectedCallback() {
    super.connectedCallback();
    if (!this.loaded) {
      try {
        await import(/* @vite-ignore */ SCRIPT_URL);
        this.loaded = true;
      } catch (err) {
        console.error('Failed to load Circuit Chords component script:', err);
      }
    }
  }

  render() {
    return this.loaded
      ? html`<circuit-chord-forge style="display:block; width:100%; height:100%;"></circuit-chord-forge>`
      : html`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING CIRCUIT CHORDS...</div>`;
  }
}
