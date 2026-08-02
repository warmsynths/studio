import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const SCRIPT_URL = import.meta.env.VITE_APP_J6_COMPANION_SCRIPT || '/j6-companion/app.js';

@customElement('j6-companion-embed')
export class J6CompanionEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;

  @state() private loaded = customElements.get('j6-app') !== undefined;

  async connectedCallback() {
    super.connectedCallback();
    if (!this.loaded) {
      try {
        await import(/* @vite-ignore */ SCRIPT_URL);
        this.loaded = true;
      } catch (err) {
        console.error('Failed to load J-6 Companion component script:', err);
      }
    }
  }

  render() {
    return this.loaded
      ? html`<j6-app style="display:block; width:100%; height:100%;"></j6-app>`
      : html`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING J-6 COMPANION...</div>`;
  }
}
