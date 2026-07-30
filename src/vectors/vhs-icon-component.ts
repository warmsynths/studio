import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type VhsIconType = 'play' | 'eject' | 'pause' | 'rewind' | 'fast-forward' | 'record' | 'sp-lp' | 'tracking' | 'vhs-tape';

@customElement('vhs-icon')
export class VhsIconComponent extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      width: 1em;
      height: 1em;
      vertical-align: -0.125em;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
      display: block;
    }
  `;

  @property({ type: String }) icon: VhsIconType = 'play';

  render() {
    switch (this.icon) {
      case 'play':
        return html`<svg viewBox="0 0 24 24"><path d="M 6 4 L 20 12 L 6 20 Z"/></svg>`;
      case 'eject':
        return html`<svg viewBox="0 0 24 24"><path d="M 12 3 L 20 11 L 4 11 Z"/><rect x="4" y="14" width="16" height="4" rx="1"/></svg>`;
      case 'pause':
        return html`<svg viewBox="0 0 24 24"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>`;
      case 'rewind':
        return html`<svg viewBox="0 0 24 24"><path d="M 12 4 L 2 12 L 12 20 Z"/><path d="M 22 4 L 12 12 L 22 20 Z"/></svg>`;
      case 'fast-forward':
        return html`<svg viewBox="0 0 24 24"><path d="M 2 4 L 12 12 L 2 20 Z"/><path d="M 12 4 L 22 12 L 12 20 Z"/></svg>`;
      case 'record':
        return html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#e53935"/></svg>`;
      case 'sp-lp':
        return html`<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="15" font-family="'IBM Plex Mono', monospace" font-size="8" font-weight="bold" text-anchor="middle">SP</text></svg>`;
      case 'tracking':
        return html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="2"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="2"/><line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/></svg>`;
      case 'vhs-tape':
      default:
        return html`<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><rect x="11" y="9" width="2" height="6"/></svg>`;
    }
  }
}
