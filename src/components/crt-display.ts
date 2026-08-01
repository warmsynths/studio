import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

@customElement('crt-display')
export class CrtDisplayComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      right: 60px;
      top: 148px;
      width: 540px;
      height: 470px;
      transform: scale(.92);
      transform-origin: top right;
      z-index: 2;
      font-family: Arial, Helvetica, sans-serif;
      pointer-events: none;
      transition: opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1);
    }

    @keyframes vhsSweep {
      0% { transform: translateY(-120%); }
      100% { transform: translateY(120%); }
    }

    @keyframes vhsFlicker {
      0%, 100% { filter: brightness(.86); }
      40% { filter: brightness(1.08); }
      70% { filter: brightness(.96); }
    }

    @keyframes vhsGrain {
      0% { transform: translate(0, 0); }
      50% { transform: translate(-2px, 1px); }
      100% { transform: translate(1px, -1px); }
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: Boolean }) isReading = false;
  @property({ type: Boolean }) isPlayWipe = false;
  @property({ type: Number }) setOp = 0.75;
  @property({ type: String }) setFx = 'blur(5px)';

  render() {
    const activeTape = this.activeKey ? TAPES[this.activeKey] : null;
    const screenOn = this.isPlaying || this.isReading;

    return html`
      <div style="position:relative; width:100%; height:100%; opacity:${this.setOp}; filter:${this.setFx}; transition:opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1)">

        <!-- Wood cabinet -->
        <div style="position:absolute; left:10px; right:10px; top:8px; height:330px; background:#8a5a33; border-radius:6px; box-shadow:0 2px 8px rgba(42,38,33,.18)">
          <!-- Wood grain texture -->
          <div style="position:absolute; inset:0; border-radius:6px; background:repeating-linear-gradient(90deg,transparent 0 26px,rgba(0,0,0,.06) 26px 28px)"></div>
        </div>

        <!-- Silver bezel -->
        <div style="position:absolute; left:24px; right:24px; top:20px; height:306px; background:linear-gradient(180deg,#cfcdc6,#bdbbb4); border-radius:4px">

          <!-- CRT screen assembly -->
          <div style="position:absolute; left:12px; top:12px; bottom:12px; width:344px; background:#1e1e1e; border-radius:6px">
            <!-- Tube depth ring -->
            <div style="position:absolute; inset:14px; background:#2a2a2a; border-radius:24px"></div>
            <!-- Screen with purple idle gradient -->
            <div data-screen style="position:absolute; left:24px; right:24px; top:22px; bottom:22px; background:radial-gradient(ellipse at 50% 42%,#c4c0d4,#aca8c0 70%,#928ea6); border-radius:38px 38px 34px 34px; overflow:hidden">
              <!-- Glass highlight glare -->
              <div style="position:absolute; left:14%; top:8%; width:26%; height:34%; background:rgba(255,255,255,.16); border-radius:50%; transform:rotate(-18deg); pointer-events:none; z-index:4"></div>

              <!-- Active screen layer -->
              <div style="position:absolute; inset:0; background:#0a0a0c; border-radius:38px 38px 34px 34px; opacity:${screenOn ? 1 : 0}; transition:opacity 200ms linear">
                <div style="position:absolute; left:0; top:0; width:436px; height:350px; transform:scale(.6793); transform-origin:top left; clip-path:${this.isPlayWipe ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'}; transition:clip-path 420ms cubic-bezier(.23,1,.32,1)">
                  <slot></slot>
                </div>
              </div>

              <!-- Green Retro OSD Bar -->
              <div style="position:absolute; left:26px; right:26px; top:20px; display:flex; justify-content:space-between; align-items:baseline; pointer-events:none; opacity:${this.isPlaying ? 1 : 0}; transition:opacity 240ms linear; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:11px; letter-spacing:.14em; color:#e8f0e2; text-shadow:0 0 7px rgba(180,255,190,.5); z-index:5">
                <span>▶ PLAY <span style="font-size:9px; letter-spacing:.16em; color:rgba(232,240,226,.55)">CH 3</span></span>
                <span style="font-size:10px; letter-spacing:.16em; color:rgba(232,240,226,.8)">SP · ${activeTape ? activeTape.run : '0:00:00'}</span>
              </div>

              <!-- Scanlines -->
              <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.035) 0 1px,transparent 1px 5px); pointer-events:none; z-index:3"></div>
              <!-- CRT vignette -->
              <div style="position:absolute; inset:0; pointer-events:none; box-shadow:inset 0 0 20px rgba(0,0,0,.35); border-radius:38px 38px 34px 34px; z-index:3"></div>

              <!-- VHS static overlay -->
              <div style="position:absolute; inset:0; display:${this.isReading ? 'block' : 'none'}; opacity:${this.isReading ? 1 : 0}; transition:opacity 160ms linear; background:#0c0c10; animation:vhsFlicker 240ms steps(3) infinite">
                <div style="position:absolute; inset:-10%; background:repeating-linear-gradient(180deg,rgba(255,255,255,.10) 0 2px,rgba(0,0,0,.42) 2px 5px); animation:vhsGrain 90ms steps(2) infinite"></div>
                <div style="position:absolute; left:0; right:0; height:26%; background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.22),rgba(255,255,255,0)); animation:vhsSweep 620ms linear infinite"></div>
              </div>
            </div>
          </div>

          <!-- Right control column -->
          <div style="position:absolute; right:14px; top:10px; bottom:10px; width:104px">
            <!-- Twin circular knob — white/striped -->
            <div style="position:absolute; left:18px; top:2px; width:24px; height:24px; border-radius:50%; background:#f2f0ea">
              <div style="position:absolute; inset:3px; border-radius:50%; background:#2a2a2a"></div>
              <div style="position:absolute; inset:6px; border-radius:50%; background:repeating-linear-gradient(90deg,#f2f0ea 0 2px,#2a2a2a 2px 4px)"></div>
              <div style="position:absolute; inset:6px; border-radius:50%; box-shadow:inset 0 0 0 1px #2a2a2a"></div>
            </div>
            <!-- Twin circular knob — teal/striped -->
            <div style="position:absolute; left:46px; top:2px; width:24px; height:24px; border-radius:50%; background:#f2f0ea">
              <div style="position:absolute; inset:3px; border-radius:50%; background:#3fa89a"></div>
              <div style="position:absolute; inset:6px; border-radius:50%; background:conic-gradient(#f2f0ea 0 18deg,#3fa89a 18deg 60deg,#f2f0ea 60deg 78deg,#3fa89a 78deg 120deg,#f2f0ea 120deg 138deg,#3fa89a 138deg 180deg,#f2f0ea 180deg 198deg,#3fa89a 198deg 240deg,#f2f0ea 240deg 258deg,#3fa89a 258deg 300deg,#f2f0ea 300deg 318deg,#3fa89a 318deg 360deg)"></div>
            </div>
            <!-- DEEP IMAGE COLOUR label -->
            <div style="position:absolute; left:14px; top:28px; width:66px; font-size:4.5px; font-weight:800; letter-spacing:0; color:#f2f0ea; text-align:center; background:#2a2a2a; padding:1px 3px; box-sizing:border-box; white-space:nowrap">DEEP IMAGE COLOUR</div>

            <!-- Volume slider with thumb -->
            <div style="position:absolute; left:10px; top:42px; width:14px; height:96px; background:#2c2c2c; border-radius:2px">
              <div style="position:absolute; left:4px; top:38px; width:6px; height:10px; background:#c9c7c0"></div>
            </div>
            <!-- Button bank (8 rows) -->
            <div style="position:absolute; left:30px; top:42px; width:34px; height:96px; display:flex; flex-direction:column; gap:4px">
              <div style="height:8px; background:#2c2c2c; border-radius:1px; position:relative"><div style="position:absolute; width:10px; height:6px; background:#c0392b; margin:1px 0 0 20px"></div></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
            </div>
            <!-- VOL · CH label -->
            <div style="position:absolute; left:10px; top:144px; font-size:5px; color:#555">VOL &nbsp;·&nbsp; CH</div>

            <!-- Small button row -->
            <div style="position:absolute; left:10px; top:156px; display:flex; gap:5px">
              <div style="width:16px; height:10px; background:#2c2c2c; border-radius:1px"></div>
              <div style="width:16px; height:10px; background:#2c2c2c; border-radius:1px"></div>
              <div style="width:16px; height:10px; background:#2c2c2c; border-radius:1px"></div>
            </div>

            <!-- Speaker grille -->
            <div style="position:absolute; left:10px; right:6px; top:176px; bottom:4px; background:repeating-linear-gradient(90deg,#a9a7a0 0 3px,#8f8d86 3px 6px); border-radius:2px"></div>
          </div>

          <!-- Bottom bezel icons -->
          <div style="position:absolute; left:14px; bottom:2px; font-size:6px; color:#666; letter-spacing:.06em">◉ ⌾ ▸</div>
        </div>

        <!-- Cabinet bottom lip -->
        <div style="position:absolute; left:10px; right:10px; top:338px; height:14px; background:#6e4626; border-radius:0 0 4px 4px"></div>

        <!-- Front-left leg -->
        <div style="position:absolute; left:52px; top:352px; width:38px; height:100px">
          <div style="position:absolute; top:0; left:0; right:0; height:22px; background:#7c4e2a"></div>
          <div style="position:absolute; top:22px; left:4px; right:4px; bottom:0; background:#8a5a33; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
        <!-- Inner-left leg -->
        <div style="position:absolute; left:150px; top:352px; width:30px; height:84px; opacity:.85">
          <div style="position:absolute; top:0; left:0; right:0; height:18px; background:#6e4626"></div>
          <div style="position:absolute; top:18px; left:3px; right:3px; bottom:0; background:#7c4e2a; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
        <!-- Inner-right leg -->
        <div style="position:absolute; right:150px; top:352px; width:30px; height:84px; opacity:.85">
          <div style="position:absolute; top:0; left:0; right:0; height:18px; background:#6e4626"></div>
          <div style="position:absolute; top:18px; left:3px; right:3px; bottom:0; background:#7c4e2a; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
        <!-- Front-right leg -->
        <div style="position:absolute; right:52px; top:352px; width:38px; height:100px">
          <div style="position:absolute; top:0; left:0; right:0; height:22px; background:#7c4e2a"></div>
          <div style="position:absolute; top:22px; left:4px; right:4px; bottom:0; background:#8a5a33; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
      </div>
    `;
  }
}
