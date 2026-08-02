import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const SCRIPT_URL = import.meta.env.VITE_APP_HYPERSYN_SCRIPT || '/hypersyn-chord-helper/app.js';

@customElement('hypersyn-embed')
export class HypersynEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;

  @state() private loaded = customElements.get('hypersyn-app') !== undefined;

  async connectedCallback() {
    super.connectedCallback();
    if (!this.loaded) {
      try {
        await import(/* @vite-ignore */ SCRIPT_URL);
        this.loaded = true;
      } catch (err) {
        console.error('Failed to load Hypersyn component script:', err);
      }
    }
  }

  render() {
    return this.loaded
      ? html`<hypersyn-app style="display:block; width:100%; height:100%;"></hypersyn-app>`
      : html`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING HYPERSYN HELPER...</div>`;
  }
}
