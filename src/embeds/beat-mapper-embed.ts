import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const SCRIPT_URL = import.meta.env.VITE_APP_BEAT_MAPPER_SCRIPT || '/beat-mapper/app.js';

@customElement('beat-mapper-embed')
export class BeatMapperEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;

  @state() private loaded = customElements.get('app-root') !== undefined;

  async connectedCallback() {
    super.connectedCallback();
    if (!this.loaded) {
      try {
        await import(/* @vite-ignore */ SCRIPT_URL);
        this.loaded = true;
      } catch (err) {
        console.error('Failed to load Beat Mapper component script:', err);
      }
    }
  }

  render() {
    return this.loaded
      ? html`<app-root style="display:block; width:100%; height:100%;"></app-root>`
      : html`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING BEAT MAPPER...</div>`;
  }
}
