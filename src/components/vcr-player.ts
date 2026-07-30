import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vcr-player')
export class VcrPlayerComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      right: 112px;
      top: 52px;
      width: 296px;
      height: 95px;
      z-index: 3;
      font-family: Arial, Helvetica, sans-serif;
      pointer-events: none;
      transition: opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1);
    }
  `;

  @property({ type: Number }) setOp = 0.75;
  @property({ type: String }) setFx = 'blur(5px)';
  @property({ type: Boolean }) isPlaying = false;

  private onEject(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('eject-click'));
  }

  render() {
    const ejectPE = this.isPlaying ? 'auto' : 'none';

    return html`
      <div style="position:relative; width:100%; height:100%; opacity:${this.setOp}; filter:${this.setFx}; transition:opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1)">
        <div style="position:absolute; left:11px; right:11px; top:0; height:23px; background:linear-gradient(180deg,#2b2b2d,#1b1b1c); border-radius:3px 3px 0 0; clip-path:polygon(1.4% 0,98.6% 0,100% 100%,0 100%)">
          <div style="position:absolute; right:9px; top:6px; width:30px; height:8px; background:repeating-linear-gradient(180deg,#242426 0 2px,#101011 2px 3px)"></div>
        </div>

        <div style="position:absolute; left:0; right:0; top:22px; height:44px; background:linear-gradient(180deg,#141415,#0d0d0e); border-radius:2px">
          <div style="position:absolute; left:14px; top:14px; width:45px; height:5px; background:#2e2e30; border-radius:3px"></div>
          <div style="position:absolute; left:14px; top:26px; width:45px; height:5px; background:#2e2e30; border-radius:3px"></div>
          <div data-slot style="position:absolute; left:67px; top:4px; right:89px; bottom:11px; background:#08080a; border-radius:2px"></div>
          <div style="position:absolute; right:5px; top:3px; width:78px; bottom:3px; background:linear-gradient(160deg,#1a1a1e,#0b0b0d 55%); border-radius:2px"></div>
        </div>

        <div style="position:absolute; left:0; right:0; top:66px; height:29px; background:linear-gradient(180deg,#1a1a1c,#101011); border-radius:0 0 2px 2px">
          <div style="position:absolute; left:13px; top:9px; width:52px; height:8px; background:rgba(239,236,228,.75); border-radius:1px"></div>
          <div style="position:absolute; right:5px; top:5px; bottom:5px; width:80px; display:flex; gap:3px">
            <div 
              @click=${this.onEject} 
              style="flex:1; background:#2c2c2e; border-radius:4px; pointer-events:${ejectPE}; cursor:pointer; position:relative; transition:transform 90ms cubic-bezier(.23,1,.32,1)"
            >
              <div style="position:absolute; left:-8px; right:-8px; top:-14px; bottom:-14px"></div>
              <div style="position:absolute; left:0; right:0; top:4px; text-align:center; font-size:4.5px; color:#b6b6b6; letter-spacing:.06em; line-height:1.5">■ ▲<br>EJECT</div>
            </div>
            <div style="flex:1; background:#2c2c2e; border-radius:4px"></div>
            <div style="flex:1; background:#2c2c2e; border-radius:4px"></div>
          </div>
        </div>
      </div>
    `;
  }
}
