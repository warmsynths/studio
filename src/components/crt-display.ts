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
        <div style="position:absolute; left:10px; right:10px; top:8px; height:330px; background:#8a5a33; border-radius:6px"></div>
        
        <div style="position:absolute; left:24px; right:24px; top:20px; height:306px; background:linear-gradient(180deg,#cfcdc6,#bdbbb4); border-radius:4px">
          <div style="position:absolute; left:12px; top:12px; bottom:12px; width:344px; background:#1e1e1e; border-radius:6px">
            <div data-screen style="position:absolute; left:24px; right:24px; top:22px; bottom:22px; background:radial-gradient(ellipse at 50% 42%,#c4c0d4,#aca8c0 70%,#928ea6); border-radius:38px; overflow:hidden">
              <div style="position:absolute; inset:0; background:#0a0a0c; border-radius:38px; opacity:${screenOn ? 1 : 0}; transition:opacity 200ms linear">
                <div style="position:absolute; left:0; top:0; width:436px; height:350px; transform:scale(.6793); transform-origin:top left; clip-path:${this.isPlayWipe ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'}; transition:clip-path 420ms cubic-bezier(.23,1,.32,1)">
                  <slot></slot>
                </div>
              </div>

              <!-- Green Retro OSD Bar -->
              <div style="position:absolute; left:26px; right:26px; top:20px; display:flex; justify-content:space-between; align-items:baseline; pointer-events:none; opacity:${this.isPlaying ? 1 : 0}; transition:opacity 240ms linear; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:11px; letter-spacing:.14em; color:#e8f0e2; text-shadow:0 0 7px rgba(180,255,190,.5)">
                <span>▶ PLAY <span style="font-size:9px; letter-spacing:.16em; color:rgba(232,240,226,.55)">CH 3</span></span>
                <span style="font-size:10px; letter-spacing:.16em; color:rgba(232,240,226,.8)">SP · ${activeTape ? activeTape.run : '0:00:00'}</span>
              </div>

              <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.035) 0 1px,transparent 1px 5px); pointer-events:none"></div>
              <div style="position:absolute; inset:0; pointer-events:none; box-shadow:inset 0 0 20px rgba(0,0,0,.35); border-radius:38px"></div>

              <div style="position:absolute; inset:0; display:${this.isReading ? 'block' : 'none'}; opacity:${this.isReading ? 1 : 0}; transition:opacity 160ms linear; background:#0c0c10; animation:vhsFlicker 240ms steps(3) infinite">
                <div style="position:absolute; inset:-10%; background:repeating-linear-gradient(180deg,rgba(255,255,255,.10) 0 2px,rgba(0,0,0,.42) 2px 5px); animation:vhsGrain 90ms steps(2) infinite"></div>
                <div style="position:absolute; left:0; right:0; height:26%; background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.22),rgba(255,255,255,0)); animation:vhsSweep 620ms linear infinite"></div>
              </div>
            </div>
          </div>

          <div style="position:absolute; right:14px; top:10px; bottom:10px; width:104px">
            <div style="position:absolute; left:18px; top:2px; width:24px; height:24px; border-radius:50%; background:#f2f0ea"></div>
            <div style="position:absolute; left:46px; top:2px; width:24px; height:24px; border-radius:50%; background:#3fa89a"></div>
            <div style="position:absolute; left:10px; top:42px; width:54px; height:96px; background:#2c2c2c; border-radius:2px"></div>
            <div style="position:absolute; left:10px; right:6px; top:176px; bottom:4px; background:repeating-linear-gradient(90deg,#a9a7a0 0 3px,#8f8d86 3px 6px); border-radius:2px"></div>
          </div>
        </div>

        <div style="position:absolute; left:10px; right:10px; top:338px; height:14px; background:#6e4626; border-radius:0 0 4px 4px"></div>
        <div style="position:absolute; left:52px; top:352px; width:38px; height:100px; background:#8a5a33; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        <div style="position:absolute; right:52px; top:352px; width:38px; height:100px; background:#8a5a33; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
      </div>
    `;
  }
}
