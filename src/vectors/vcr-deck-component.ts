import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vcr-deck-vector')
export class VcrDeckVectorComponent extends LitElement {
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

  @property({ type: String }) statusText = '0:42:18';
  @property({ type: Boolean }) powered = true;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 592 190">
        <defs>
          <linearGradient id="vcrTopGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2b2b2d"/>
            <stop offset="100%" stop-color="#1b1b1c"/>
          </linearGradient>
          <linearGradient id="vcrBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#141415"/>
            <stop offset="100%" stop-color="#0d0d0e"/>
          </linearGradient>
          <linearGradient id="vcrBottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a1a1c"/>
            <stop offset="100%" stop-color="#101011"/>
          </linearGradient>
          <linearGradient id="vcrAcrylic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a1a1e"/>
            <stop offset="55%" stop-color="#0b0b0d"/>
          </linearGradient>
        </defs>

        <!-- Hood -->
        <path d="M 22 0 L 570 0 L 592 46 L 0 46 Z" fill="url(#vcrTopGlow)"/>
        <rect x="532" y="12" width="40" height="16" rx="2" fill="#121213"/>
        <path d="M 536 15 h 32 M 536 19 h 32 M 536 23 h 32" stroke="#242426" stroke-width="1.5"/>

        <!-- Chassis Body -->
        <rect x="0" y="44" width="592" height="88" rx="4" fill="url(#vcrBody)"/>
        <rect x="28" y="72" width="90" height="10" rx="5" fill="#2e2e30"/>
        <rect x="28" y="96" width="90" height="10" rx="5" fill="#2e2e30"/>

        <!-- Cassette Slot Door -->
        <rect x="134" y="52" width="280" height="66" rx="3" fill="#08080a" stroke="#1f1f22" stroke-width="1"/>
        <rect x="140" y="58" width="268" height="54" rx="2" fill="#111114" opacity="0.8"/>
        <line x1="140" y1="58" x2="408" y2="58" stroke="#333338" stroke-width="2"/>
        <text x="274" y="90" font-family="'IBM Plex Mono', monospace" font-size="10" font-weight="600" fill="#555560" letter-spacing="3" text-anchor="middle">AUTO HIGH SPEED REWIND</text>

        <!-- Display Window Acrylic -->
        <rect x="424" y="50" width="156" height="70" rx="3" fill="url(#vcrAcrylic)" stroke="#222228" stroke-width="1"/>
        <text x="440" y="76" font-family="'IBM Plex Mono', monospace" font-size="13" font-weight="700" fill="${this.powered ? '#66bb6a' : '#223322'}" letter-spacing="2">${this.statusText}</text>
        <text x="440" y="96" font-family="'IBM Plex Mono', monospace" font-size="9" font-weight="600" fill="${this.powered ? '#ffb74d' : '#332211'}" letter-spacing="1">SP  HQ</text>
        <circle cx="550" cy="72" r="4" fill="${this.powered ? '#ef5350' : '#331111'}"/>
        <text x="540" y="96" font-family="'IBM Plex Mono', monospace" font-size="8" fill="#888890">REC</text>

        <!-- Lower Controls Strip -->
        <rect x="0" y="132" width="592" height="58" rx="0 0 4 4" fill="url(#vcrBottom)"/>
        <rect x="26" y="150" width="104" height="16" rx="2" fill="#d0cbbe" opacity="0.85"/>
        <text x="78" y="162" font-family="'IBM Plex Mono', monospace" font-size="9" font-weight="700" fill="#2a2621" letter-spacing="1" text-anchor="middle">VHS HQ STEREO</text>
      </svg>
    `;
  }
}
