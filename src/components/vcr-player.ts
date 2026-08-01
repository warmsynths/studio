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

        <!-- Hood -->
        <div style="position:absolute; left:11px; right:11px; top:0; height:23px; background:linear-gradient(180deg,#2b2b2d,#1b1b1c); border-radius:3px 3px 0 0; clip-path:polygon(1.4% 0,98.6% 0,100% 100%,0 100%)">
          <div style="position:absolute; left:12%; top:18%; width:48%; height:8px; background:linear-gradient(90deg,rgba(255,255,255,.10),rgba(255,255,255,0))"></div>
          <div style="position:absolute; right:9px; top:6px; width:30px; height:8px; background:repeating-linear-gradient(180deg,#242426 0 2px,#101011 2px 3px)"></div>
        </div>

        <!-- Chassis Body -->
        <div style="position:absolute; left:0; right:0; top:22px; height:44px; background:linear-gradient(180deg,#141415,#0d0d0e); border-radius:2px">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14)"></div>

          <!-- HI·TECH brand -->
          <div style="position:absolute; left:22px; top:4px; font-size:3px; font-weight:700; color:#8d8d8d; letter-spacing:.04em">HI·TECH</div>
          <div style="position:absolute; left:39px; top:1px; font-size:6.5px; font-weight:400; color:#b9b4a8; font-family:Georgia,serif">4</div>

          <!-- Power / VCR·TV toggles -->
          <div style="position:absolute; left:14px; top:14px; width:20px; height:5px; background:linear-gradient(180deg,#2e2e30,#191919); border-radius:3px"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16); border-radius:3px"></div></div>
          <div style="position:absolute; left:14px; top:11px; font-size:2.4px; color:#9a9a9a; letter-spacing:.06em">POWER</div>
          <div style="position:absolute; left:40px; top:14px; width:20px; height:5px; background:linear-gradient(180deg,#2e2e30,#191919); border-radius:3px"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16); border-radius:3px"></div></div>
          <div style="position:absolute; left:40px; top:11px; font-size:2.4px; color:#9a9a9a; letter-spacing:.06em">VCR/TV</div>

          <!-- Channel rocker -->
          <div style="position:absolute; left:14px; top:26px; width:45px; height:5px; background:linear-gradient(180deg,#2e2e30,#191919); border-radius:3px"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16); border-radius:3px"></div></div>
          <div style="position:absolute; left:15px; top:23px; font-size:2.4px; color:#9a9a9a; letter-spacing:.06em">▽ CHANNEL △</div>

          <!-- Cassette Slot Door -->
          <div data-slot style="position:absolute; left:67px; top:4px; right:89px; bottom:11px; background:#08080a; border-radius:2px; box-shadow:inset 0 1px 0 rgba(255,255,255,.06)">
            <div style="position:absolute; left:8px; top:4px; bottom:8px; width:1px; background:rgba(255,255,255,.10)"></div>
            <div style="position:absolute; right:8px; top:4px; bottom:8px; width:1px; background:rgba(255,255,255,.10)"></div>
            <div style="position:absolute; left:0; right:0; top:38%; display:flex; align-items:baseline; justify-content:center; gap:2.5px">
              <div style="text-align:right; line-height:1.05">
                <div style="font-size:4.7px; font-weight:700; color:#c9a06a; letter-spacing:-.01em">Omnivision</div>
                <div style="font-size:3.6px; color:#b08d5e; letter-spacing:.02em">audiovideo</div>
              </div>
              <div style="font-size:7px; font-weight:700; color:#dfd8cc; letter-spacing:-.02em">VHS</div>
            </div>
          </div>

          <!-- Status LEDs -->
          <div style="position:absolute; right:90px; bottom:3px; width:54px; display:flex; gap:3.6px; align-items:flex-end">
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em; white-space:nowrap">DOLBY NR</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em">STEREO</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em; white-space:nowrap">TV STEREO</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em; white-space:nowrap">AUDIO Ⅱ</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
          </div>

          <!-- Display Window Acrylic -->
          <div style="position:absolute; right:5px; top:3px; width:78px; bottom:3px; background:linear-gradient(160deg,#1a1a1e,#0b0b0d 55%); border-radius:2px; box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)">
            <div style="position:absolute; left:18%; top:22%; width:38%; height:26%; background:linear-gradient(120deg,rgba(120,150,220,.16),rgba(120,150,220,0)); border-radius:50%; filter:blur(2px)"></div>
            <div style="position:absolute; right:6px; bottom:5px; font-size:1.8px; color:#7c7c7c; border:1px solid #4a4a4a; padding:.5px 1.5px; letter-spacing:.06em">◨◧ DOLBY SYSTEM</div>
          </div>
        </div>

        <!-- Lower Controls Strip -->
        <div style="position:absolute; left:0; right:0; top:66px; height:29px; background:linear-gradient(180deg,#1a1a1c,#101011); border-radius:0 0 2px 2px">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.12)"></div>

          <!-- Brand -->
          <div style="position:absolute; left:13px; top:9px; font-size:6.5px; font-weight:700; color:#efece4; letter-spacing:-.02em; font-family:Helvetica,Arial,sans-serif">Omnivision</div>
          <div style="position:absolute; left:55px; top:11px; font-size:2.4px; color:#9d9d9d; letter-spacing:.08em">DIGITAL QUARTZ TUNING HQ</div>

          <!-- OSD badge -->
          <div style="position:absolute; left:99px; top:8px; text-align:center">
            <div style="font-size:4.7px; font-weight:700; color:#c9a06a; letter-spacing:-.01em">OSD</div>
            <div style="font-size:1.5px; color:#8f7a58; letter-spacing:.06em">PROGRAMMING</div>
          </div>

          <!-- MTS badge -->
          <div style="position:absolute; right:92px; top:9px; display:flex; align-items:baseline; gap:1.5px">
            <div style="font-size:4.3px; font-weight:700; color:#e6e2d9; letter-spacing:-.01em">MTS</div>
            <div style="line-height:1.05">
              <div style="font-size:2px; font-weight:700; color:#bdbab2; letter-spacing:.04em">BROADCAST</div>
              <div style="font-size:2px; color:#9d9a92; letter-spacing:.04em">STEREO</div>
            </div>
          </div>

          <!-- Transport label plate -->
          <div style="position:absolute; left:13px; top:9px; width:52px; height:8px; background:rgba(239,236,228,.75); border-radius:1px; opacity:0"></div>

          <!-- Transport buttons -->
          <div style="position:absolute; right:5px; top:5px; bottom:5px; width:80px; display:flex; gap:3px">
            <div
              @click=${this.onEject}
              style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; pointer-events:${ejectPE}; cursor:pointer; position:relative; transition:transform 90ms cubic-bezier(.23,1,.32,1)"
            >
              <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14); border-radius:4px"></div>
              <div style="position:absolute; left:-8px; right:-8px; top:-14px; bottom:-14px"></div>
              <div style="position:absolute; left:0; right:0; top:4px; text-align:center; font-size:2px; color:#b6b6b6; letter-spacing:.06em; line-height:1.5">■ / ▲<br>STOP<br>EJECT</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; position:relative">
              <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14); border-radius:4px"></div>
              <div style="position:absolute; left:0; right:0; top:6px; text-align:center; font-size:2px; color:#b6b6b6; letter-spacing:.06em; line-height:1.6">▶<br>PLAY / ×2</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; position:relative">
              <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14); border-radius:4px"></div>
              <div style="position:absolute; left:0; right:0; top:6px; text-align:center; font-size:2px; color:#b6b6b6; letter-spacing:.06em; line-height:1.6">● <span style="color:#c0392b">▪</span><br>REC</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
