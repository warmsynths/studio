import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

/**
 * Portrait-cropped Shot B — the VCR deck insertion / eject scene
 * recomposed for a mobile viewport. Matches design 10b.
 */
@customElement('mobile-cutscene')
export class MobileCutsceneComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 20;
      pointer-events: none;
    }

    .scene {
      position: absolute;
      inset: 0;
      pointer-events: auto;
      overflow: hidden;
      font-family: Arial, Helvetica, sans-serif;
    }

    @keyframes shotBInsertM {
      0%   { transform: rotateX(-72deg) translate3d(0, 180px, 0); }
      22%  { transform: rotateX(-72deg) translate3d(0, 100px, 0); }
      48%  { transform: rotateX(-72deg) translate3d(0, 14px, 0); }
      76%  { transform: rotateX(-72deg) translate3d(0, -200px, 0); }
      90%  { transform: rotateX(-72deg) translate3d(0, -400px, 0); }
      95%  { transform: rotateX(-72deg) translate3d(0, -370px, 0); }
      100% { transform: rotateX(-72deg) translate3d(0, -430px, 0); }
    }

    @keyframes shotBEjectM {
      0%   { transform: rotateX(-72deg) translate3d(0, -430px, 0); }
      14%  { transform: rotateX(-72deg) translate3d(0, -140px, 0); }
      26%  { transform: rotateX(-72deg) translate3d(0, -186px, 0); }
      70%  { transform: rotateX(-72deg) translate3d(0, 106px, 0); }
      100% { transform: rotateX(-72deg) translate3d(0, 180px, 0); }
    }

    @keyframes ledBlink {
      0%, 44% { opacity: .25; }
      50% { opacity: 1; }
      64% { opacity: .35; }
      72% { opacity: 1; }
      100% { opacity: .8; }
    }

    @keyframes cutFlash {
      0% { opacity: 1; }
      70% { opacity: .55; }
      100% { opacity: 0; }
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: String }) currentShot: 'none' | 'B' | 'Be' = 'none';
  @property({ type: Boolean }) showFlash = false;
  @property({ type: Number }) shotBDur = 1250;
  @property({ type: Number }) flashDur = 130;

  private onSkip() {
    this.dispatchEvent(new CustomEvent('skip-cutscene'));
  }

  render() {
    if (this.currentShot === 'none' && !this.showFlash) return html``;

    const activeTape = this.activeKey ? TAPES[this.activeKey] : TAPES.echo;
    const bDur = this.currentShot === 'Be' ? Math.round(this.shotBDur * 0.72) : this.shotBDur;
    const shotBAnim = this.currentShot === 'B' ? 'shotBInsertM' : (this.currentShot === 'Be' ? 'shotBEjectM' : 'none');
    const flashAnim = this.showFlash ? 'cutFlash' : 'none';

    return html`
      <!-- Flash Static -->
      <div
        style="position:absolute; inset:0; z-index:30; display:${this.showFlash ? 'block' : 'none'}; pointer-events:none; background:#d8d4c8; animation-name:${flashAnim}; animation-duration:${this.flashDur}ms; animation-timing-function:linear; animation-fill-mode:both"
      >
        <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.85) 0 3px,rgba(20,20,22,.65) 3px 7px)"></div>
      </div>

      <!-- Shot B: Portrait VCR Deck -->
      <div
        class="scene"
        style="display:${this.currentShot !== 'none' ? 'block' : 'none'}; background:#6f5a3f"
        @click=${this.onSkip}
      >
        <!-- Dark ceiling -->
        <div style="position:absolute; left:0; right:0; top:0; height:560px; background:linear-gradient(180deg,#08080a,#131316)"></div>

        <!-- Wood floor -->
        <div style="position:absolute; left:0; right:0; top:558px; bottom:0; perspective:620px; perspective-origin:50% -60%">
          <div style="position:absolute; left:-60%; right:-60%; top:0; height:900px; transform:rotateX(76deg); transform-origin:top center; background:linear-gradient(180deg,#c9ab84,#8a6d46)">
            <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg,rgba(90,62,34,.1) 0 3px,transparent 3px 60px)"></div>
          </div>
        </div>

        <!-- Deck body -->
        <div style="position:absolute; left:-40px; right:-40px; top:262px; height:250px; background:linear-gradient(180deg,#141417,#0d0d0f)"></div>

        <!-- Button panel -->
        <div style="position:absolute; left:-40px; right:-40px; top:424px; height:98px; background:linear-gradient(180deg,#1c1c1f,#101012)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.055)"></div>
          <div style="position:absolute; left:34px; top:40px; width:118px; height:11px; background:rgba(239,236,228,.62); border-radius:2px"></div>
          <div style="position:absolute; right:26px; top:24px; width:172px; height:52px; display:flex; gap:9px">
            <div style="flex:1; background:linear-gradient(180deg,#333336,#26262a); border-radius:6px; position:relative">
              <div style="position:absolute; left:0; right:0; top:14px; text-align:center; font-size:9px; color:#b6b6b6; letter-spacing:.1em">EJECT</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
          </div>
        </div>

        <!-- Shelf strip -->
        <div style="position:absolute; left:-40px; right:-40px; top:522px; height:32px; background:linear-gradient(180deg,#efe9dc 0 72%,#c7c0b0 72%); box-shadow:0 16px 26px rgba(20,14,6,.55)">
          <div style="position:absolute; left:40px; top:12px; width:200px; height:4px; background:rgba(60,55,45,.3)"></div>
        </div>

        <!-- Slot mouth -->
        <div style="position:absolute; left:66px; right:66px; top:260px; height:96px; background:linear-gradient(180deg,#000 0 34%,#08080c); box-shadow:inset 0 14px 22px rgba(0,0,0,.9), inset 0 -2px 0 rgba(255,255,255,.045)"></div>

        <!-- Animated tape -->
        <div style="position:absolute; left:0; right:0; top:0; bottom:0; pointer-events:none">
          <div style="position:absolute; left:50%; margin-left:-162px; top:262px; width:324px; height:180px; transform-style:preserve-3d; animation-name:${shotBAnim}; animation-duration:${bDur}ms; animation-timing-function:linear; animation-fill-mode:both">
            <!-- Tape shadow -->
            <div style="position:absolute; left:-20px; right:-20px; top:150px; height:60px; background:rgba(0,0,0,.55); filter:blur(20px); border-radius:50%"></div>

            <!-- Tape body -->
            <div style="position:absolute; left:50%; margin-left:-165px; top:0; width:330px; height:178px; transform:scale(.982,1.011); transform-origin:center top">
              <div style="width:330px; height:178px; position:relative; border-radius:9px; background:#262626; overflow:hidden">
                <div style="position:absolute; top:0; left:0; right:0; height:24px; background:#1a1a1a; border-bottom:2px solid #333; display:flex; align-items:center; justify-content:center">
                  <span style="font-size:10px; font-weight:800; color:#e8e8e8; letter-spacing:.12em">VHS</span>
                </div>
                <!-- Left reel -->
                <div style="position:absolute; left:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <!-- Right reel -->
                <div style="position:absolute; right:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <!-- Label sticker -->
                <div style="position:absolute; left:118px; top:44px; width:94px; height:84px; background:#f4f4f4; border-radius:2px">
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${activeTape.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                </div>
              </div>
            </div>

            <!-- Front panel (perspective-rotated below tape) -->
            <div style="position:absolute; left:0; top:180px; width:324px; height:44px; transform-origin:50% 0%; transform:rotateX(72deg); background:linear-gradient(180deg,#242427 0 3px,#18181b 3px 46%,#101012 46%,#0a0a0b); border-radius:0 0 7px 7px; box-shadow:0 20px 26px rgba(0,0,0,.5)">
              <div style="position:absolute; left:50px; right:50px; top:12px; bottom:8px; background:linear-gradient(160deg,#2b2b2f,#101013 60%); border-radius:2px"></div>
              <div style="position:absolute; left:14px; top:14px; width:30px; height:18px; background:rgba(226,222,210,.82); border-radius:1px"></div>
            </div>
          </div>
        </div>

        <!-- Top VCR panel (covers tape entry) -->
        <div style="position:absolute; left:0; right:0; top:0; height:20px; background:#08080a"></div>
        <div style="position:absolute; left:-40px; right:-40px; top:18px; height:246px; background:linear-gradient(180deg,#212125 0 34%,#16161a 34%,#131316); border-bottom:2px solid #34343a; box-shadow:0 8px 18px rgba(0,0,0,.6)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.09)"></div>
          <div style="position:absolute; left:44px; top:24px; width:120px; height:24px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; right:44px; top:24px; width:120px; height:24px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; left:44px; top:150px; width:96px; height:13px; background:rgba(239,236,228,.7); border-radius:2px"></div>
          <div style="position:absolute; right:40px; top:134px; width:170px; height:52px; background:linear-gradient(160deg,#101014,#06060a 60%); border-radius:3px; box-shadow:inset 0 2px 6px rgba(0,0,0,.8)"></div>
        </div>

        <!-- LED indicators -->
        <div style="position:absolute; right:52px; top:450px; display:flex; gap:22px">
          <div style="width:13px; height:13px; border-radius:50%; background:#c9a06a; animation-name:ledBlink; animation-duration:${bDur}ms; animation-timing-function:linear; animation-fill-mode:both; animation-delay:140ms"></div>
          <div style="width:13px; height:13px; border-radius:50%; background:#7fb37a; animation-name:ledBlink; animation-duration:${bDur}ms; animation-timing-function:linear; animation-fill-mode:both"></div>
        </div>

        <!-- Bottom gradient -->
        <div style="position:absolute; left:0; right:0; bottom:0; height:36%; pointer-events:none; background:linear-gradient(180deg,rgba(20,14,6,0),rgba(20,14,6,.5) 42%,rgba(20,14,6,.86))"></div>

        <!-- Loading info overlay -->
        <div style="position:absolute; left:22px; right:22px; bottom:36px; font-family:'IBM Plex Mono',monospace; color:#f0e9dc; text-align:center; z-index:5">
          <div style="font-size:10px; letter-spacing:.16em; color:rgba(240,233,220,.6)">${this.currentShot === 'Be' ? 'EJECTING' : 'LOADING'}</div>
          <div style="margin-top:9px; font-size:19px; font-weight:600; letter-spacing:.02em">${activeTape.title}</div>
          <div style="margin-top:6px; font-size:10px; letter-spacing:.14em; color:rgba(240,233,220,.5)">${activeTape.kicker}</div>
          <div style="margin-top:20px; font-size:10.5px; letter-spacing:.12em; color:rgba(240,233,220,.45)">TAP TO SKIP</div>
        </div>
      </div>
    `;
  }
}
