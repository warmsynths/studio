import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-info-view')
export class CrtInfoViewComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 800px;
      height: 643px;
      background: #0a0a0c;
      color: #e8f0e2;
      font-family: 'IBM Plex Mono', monospace;
      box-sizing: border-box;
      padding: 38px 52px 28px;
      position: relative;
      user-select: text;
    }

    /* Mobile mode override */
    :host([isMobile]) {
      width: 100%;
      height: 100%;
      padding: 14px 16px 10px;
    }

    /* Desktop typography (for 800x643 canvas scaled down by 0.37) */
    .nav-tabs {
      display: flex;
      gap: 40px;
      font-size: 44px;
      font-weight: 600;
      letter-spacing: 0.16em;
      margin-bottom: 20px;
    }
    :host([isMobile]) .nav-tabs {
      gap: 20px;
      font-size: 15px;
      margin-bottom: 10px;
    }

    .tab {
      cursor: pointer;
      color: rgba(232, 240, 226, 0.35);
      transition: color 180ms ease, text-shadow 180ms ease, transform 160ms ease-out;
    }

    .tab:hover {
      color: rgba(232, 240, 226, 0.75);
    }

    .tab:active {
      transform: scale(0.97);
    }

    .tab.active {
      color: #e8f0e2;
      text-shadow: 0 0 10px rgba(180, 255, 190, 0.7), 0 0 20px rgba(180, 255, 190, 0.3);
    }

    .divider {
      width: 100%;
      height: 1px;
      background: rgba(232, 240, 226, 0.18);
      margin-bottom: 28px;
      box-shadow: 0 0 6px rgba(180, 255, 190, 0.2);
    }
    :host([isMobile]) .divider {
      margin-bottom: 12px;
    }

    .content-area {
      height: 420px;
      overflow-y: auto;
      padding-right: 16px;
      font-size: 30px;
      line-height: 1.55;
      letter-spacing: 0.03em;
      color: #e8f0e2;
      text-shadow: 0 0 5px rgba(180, 255, 190, 0.35);
    }
    :host([isMobile]) .content-area {
      height: calc(100% - 66px);
      padding-right: 8px;
      font-size: 11.5px;
      line-height: 1.5;
    }

    /* Custom retro scrollbar */
    .content-area::-webkit-scrollbar {
      width: 8px;
    }
    :host([isMobile]) .content-area::-webkit-scrollbar {
      width: 4px;
    }
    .content-area::-webkit-scrollbar-track {
      background: rgba(232, 240, 226, 0.06);
      border-radius: 4px;
    }
    .content-area::-webkit-scrollbar-thumb {
      background: rgba(180, 255, 190, 0.4);
      border-radius: 4px;
    }
    .content-area::-webkit-scrollbar-thumb:hover {
      background: rgba(180, 255, 190, 0.7);
    }

    .paragraph {
      margin-bottom: 26px;
    }
    :host([isMobile]) .paragraph {
      margin-bottom: 12px;
    }
    .paragraph:last-child {
      margin-bottom: 0;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 28px 36px;
      font-size: 30px;
      letter-spacing: 0.05em;
      margin-top: 10px;
    }
    :host([isMobile]) .contact-grid {
      grid-template-columns: 70px 1fr;
      gap: 12px 16px;
      font-size: 11.5px;
      margin-top: 4px;
    }

    .contact-label {
      color: rgba(232, 240, 226, 0.42);
      font-weight: 500;
    }

    .contact-value a {
      color: #e8f0e2;
      text-decoration: underline;
      text-decoration-color: rgba(180, 255, 190, 0.4);
      text-underline-offset: 6px;
      transition: text-shadow 150ms ease, color 150ms ease;
      word-break: break-all;
    }
    :host([isMobile]) .contact-value a {
      text-underline-offset: 3px;
    }

    .contact-value a:hover {
      color: #ffffff;
      text-shadow: 0 0 12px rgba(180, 255, 190, 0.8);
    }

    .footer {
      position: absolute;
      bottom: 22px;
      left: 52px;
      right: 52px;
      text-align: center;
      font-size: 22px;
      letter-spacing: 0.16em;
      color: rgba(232, 240, 226, 0.4);
      text-shadow: 0 0 4px rgba(180, 255, 190, 0.2);
    }
    :host([isMobile]) .footer {
      display: none;
    }
  `;

  @property({ type: String }) mode: 'about' | 'contact' = 'about';
  @property({ type: Boolean, reflect: true }) isMobile = false;

  private selectTab(m: 'about' | 'contact') {
    this.mode = m;
    this.dispatchEvent(new CustomEvent('switch-tab', { detail: { mode: m }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="nav-tabs">
        <span class="tab ${this.mode === 'about' ? 'active' : ''}" @click=${() => this.selectTab('about')}>ABOUT</span>
        <span class="tab ${this.mode === 'contact' ? 'active' : ''}" @click=${() => this.selectTab('contact')}>CONTACT</span>
      </div>

      <div class="divider"></div>

      <div class="content-area">
        ${this.mode === 'about'
          ? html`
              <div class="paragraph">
                I'm a developer using AI to build faster than I ever could alone — closing the gap between an idea and a working thing, built between everything else life asks for.
              </div>
              <div class="paragraph">
                Most of what's here started as something only I needed: a way to write chords without knowing theory, a companion for a synth that didn't have one, a tool to save me from doing something tedious by hand. I didn't set out to launch products. I set out to solve a problem I had, quickly, and see what happened.
              </div>
              <div class="paragraph">
                I sit at the intersection of design and development — technical enough to know what a good app needs under the hood, and increasingly serious about how it should look and feel. AI does the typing. I do the directing: the decisions about what to build, what to cut, and what actually makes something worth using.
              </div>
              <div class="paragraph">
                Everything you see here works. Try it.
              </div>
            `
          : html`
              <div class="contact-grid">
                <span class="contact-label">EMAIL</span>
                <span class="contact-value">
                  <a href="mailto:warmsynthsiloveyou@gmail.com">warmsynthsiloveyou@gmail.com</a>
                </span>

                <span class="contact-label">GITHUB</span>
                <span class="contact-value">
                  <a href="https://github.com/warmsynths/" target="_blank" rel="noopener">github.com/warmsynths/</a>
                </span>
              </div>
            `}
      </div>

      <div class="footer">
        ESC OR CLICK OUTSIDE THE SET TO CLOSE
      </div>
    `;
  }
}
