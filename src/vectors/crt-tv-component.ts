import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('crt-tv-vector')
export class CrtTvVectorComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 580">
        <defs>
          <linearGradient id="woodCabinet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#9a6539"/>
            <stop offset="50%" stop-color="#7a4e28"/>
            <stop offset="100%" stop-color="#5c381a"/>
          </linearGradient>
          <linearGradient id="bezelOuter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#d9d6cd"/>
            <stop offset="100%" stop-color="#b0ad9e"/>
          </linearGradient>
          <linearGradient id="bezelInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a2a2a"/>
            <stop offset="100%" stop-color="#141414"/>
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="640" height="420" rx="12" fill="url(#woodCabinet)"/>
        <rect x="40" y="38" width="600" height="384" rx="8" fill="url(#bezelOuter)"/>
        <rect x="56" y="54" width="436" height="352" rx="12" fill="url(#bezelInner)" stroke="#111" stroke-width="2"/>
        <rect x="20" y="440" width="640" height="24" rx="2" fill="#5c381a"/>
        <polygon points="80,464 120,464 104,550 64,550" fill="#7a4e28" stroke="#42250e" stroke-width="2"/>
        <polygon points="560,464 600,464 616,550 576,550" fill="#7a4e28" stroke="#42250e" stroke-width="2"/>
      </svg>
    `;
  }
}
