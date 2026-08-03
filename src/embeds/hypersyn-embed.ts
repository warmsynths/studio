import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hypersyn-embed')
export class HypersynEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
  `;

  render() {
    return html`<iframe src="/hypersyn-chord-helper/index.html"></iframe>`;
  }
}
