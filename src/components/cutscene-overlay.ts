import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

@customElement('cutscene-overlay')
export class CutsceneOverlayComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
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

    @keyframes shotASlide {
      0% { transform: translateX(0); }
      12% { transform: translateX(6px); }
      46% { transform: translateX(140px); }
      88% { transform: translateX(312px); }
      100% { transform: translateX(296px); }
    }

    @keyframes shotAPush {
      0% { transform: perspective(1800px) rotate(-4deg) rotateX(6deg) scale(.97); }
      100% { transform: perspective(1800px) rotate(-4deg) rotateX(2deg) scale(1.01); }
    }

    @keyframes shotBInsert {
      0% { transform: rotateX(-72deg) translate3d(0,268px,0); }
      22% { transform: rotateX(-72deg) translate3d(0,150px,0); }
      48% { transform: rotateX(-72deg) translate3d(0,20px,0); }
      76% { transform: rotateX(-72deg) translate3d(0,-300px,0); }
      90% { transform: rotateX(-72deg) translate3d(0,-610px,0); }
      95% { transform: rotateX(-72deg) translate3d(0,-566px,0); }
      100% { transform: rotateX(-72deg) translate3d(0,-650px,0); }
    }

    @keyframes shotBEject {
      0% { transform: rotateX(-72deg) translate3d(0,-650px,0); }
      14% { transform: rotateX(-72deg) translate3d(0,-210px,0); }
      26% { transform: rotateX(-72deg) translate3d(0,-280px,0); }
      70% { transform: rotateX(-72deg) translate3d(0,160px,0); }
      100% { transform: rotateX(-72deg) translate3d(0,268px,0); }
    }

    @keyframes doorGive {
      0%, 48% { transform: scaleY(1) translateY(0); }
      68% { transform: scaleY(.5) translateY(-2px); }
      100% { transform: scaleY(.78) translateY(-1px); }
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
  @property({ type: String }) currentShot: 'none' | 'A' | 'B' | 'Be' = 'none';
  @property({ type: Boolean }) showFlash = false;
  @property({ type: Number }) shotADur = 1300;
  @property({ type: Number }) shotBDur = 1250;
  @property({ type: Number }) flashDur = 130;
  @property({ type: Boolean }) isPaused = false;
  @property({ type: Number }) scrubVal = 0;

  private onSkip() {
    this.dispatchEvent(new CustomEvent('skip-cutscene'));
  }

  render() {
    const activeTape = this.activeKey ? TAPES[this.activeKey] : TAPES.echo;
    const shotPlay = this.isPaused ? 'paused' : 'running';
    const bDur = this.currentShot === 'Be' ? Math.round(this.shotBDur * 0.72) : this.shotBDur;
    const heldLen = this.currentShot === 'A' ? this.shotADur : bDur;
    const shotDelay = this.isPaused ? '-' + Math.round((this.scrubVal / 1000) * heldLen) + 'ms' : '0ms';

    const shotAAnim = this.currentShot === 'A' ? 'shotASlide' : 'none';
    const shotAPushAnim = this.currentShot === 'A' ? 'shotAPush' : 'none';
    const shotBAnim = this.currentShot === 'B' ? 'shotBInsert' : (this.currentShot === 'Be' ? 'shotBEject' : 'none');
    const flashAnim = this.showFlash ? 'cutFlash' : 'none';

    return html`
      <!-- Flash Static Transition Layer -->
      <div 
        style="position:absolute; inset:0; z-index:95; display:${this.showFlash ? 'block' : 'none'}; pointer-events:none; background:#d8d4c8; animation-name:${flashAnim}; animation-duration:${this.flashDur}ms; animation-timing-function:linear; animation-fill-mode:both"
      >
        <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.85) 0 3px,rgba(20,20,22,.65) 3px 7px)"></div>
      </div>

      <!-- SHOT A: Macro Sleeve Slide-Out Cut -->
      <div 
        style="position:absolute; inset:0; z-index:90; display:${this.currentShot === 'A' ? 'block' : 'none'}; font-family:Arial,Helvetica,sans-serif"
        @click=${this.onSkip}
      >
        <div style="position:absolute; left:-4000px; right:-4000px; top:-4000px; bottom:-4000px; background:#efeadf;">
          <div style="position:absolute; inset:0; background:radial-gradient(550px 350px at calc(4000px + 462px) calc(4000px + 308px), rgba(255,255,255,.62), rgba(42,38,33,.18))"></div>
        </div>

        <div style="position:absolute; left:150px; top:96px; width:700px; height:500px; transform-origin:26% 50%; animation-name:${shotAPushAnim}; animation-duration:${this.shotADur}ms; animation-timing-function:cubic-bezier(.32,.72,0,1); animation-fill-mode:both; animation-delay:${shotDelay}; animation-play-state:${shotPlay}">
          <div style="position:absolute; left:20px; top:30px; width:420px; height:470px; background:rgba(42,38,33,.2); filter:blur(26px); border-radius:14px"></div>

          <!-- Sliding Tape Wrapper -->
          <div style="position:absolute; left:34px; top:8px; width:258px; height:480px; animation-name:${shotAAnim}; animation-duration:${this.shotADur}ms; animation-timing-function:cubic-bezier(.32,.72,0,1); animation-fill-mode:both; animation-delay:${shotDelay}; animation-play-state:${shotPlay}">
            <div style="position:absolute; left:50%; top:50%; width:330px; height:178px; transform:translate(-50%,-50%) rotate(90deg) scale(1.45); box-shadow:0 22px 34px rgba(42,38,33,.3)">
              <div style="width:330px; height:178px; position:relative; border-radius:9px; background:#262626; box-shadow:0 2px 6px rgba(0,0,0,.15); overflow:hidden; font-family:Arial,Helvetica,sans-serif">
                <div style="position:absolute; top:0; left:0; right:0; height:24px; background:#1a1a1a; border-bottom:2px solid #333; display:flex; align-items:center; justify-content:center">
                  <span style="font-size:10px; font-weight:800; color:#e8e8e8; letter-spacing:.12em">VHS</span>
                </div>
                <div style="position:absolute; left:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; right:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; left:118px; top:44px; width:94px; height:84px; background:#f4f4f4; border-radius:2px">
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${activeTape.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:34px; height:1px; background:#c9c9c9"></div>
                </div>
                <div style="position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.015) 3px 4px); pointer-events:none"></div>
              </div>
            </div>
          </div>

          <!-- Outer Sleeve Box -->
          <div style="position:absolute; left:0; top:0; width:326px; height:496px">
            <div style="position:absolute; left:14px; top:14px; width:326px; height:496px; background:#8d8474; border-radius:8px 8px 0 0"></div>
            <div style="position:absolute; left:0; top:0; width:96px; height:146px; transform:scale(3.4); transform-origin:top left; box-shadow:0 20px 32px rgba(42,38,33,.26)">
              <div style="width:96px; height:146px; position:relative; border-radius:6px 6px 0 0; background:${activeTape.bg}; box-shadow:0 2px 6px rgba(0,0,0,.15); overflow:hidden">
                <div style="position:absolute; top:0; bottom:0; right:0; width:11px; background:#181818; border-left:1px solid rgba(255,255,255,.22); z-index:6">
                  <div style="position:absolute; top:10px; bottom:10px; left:3px; width:2px; background:rgba(255,255,255,.14)"></div>
                </div>
                <div style="position:absolute; right:0; bottom:0; width:28px; height:38px; background:#181818; clip-path:polygon(100% 0,100% 100%,0 100%); z-index:6"></div>
                <div style="position:absolute; left:0; right:14px; top:38px; height:60px; background:linear-gradient(180deg,#e53935 0 16.6%,#fb8c00 16.6% 33.3%,#fdd835 33.3% 50%,#8bc34a 50% 66.6%,#43a047 66.6% 83.3%,#1e88e5 83.3% 100%)"></div>
                <div style="position:absolute; left:8px; top:10px; font-weight:800; font-size:11px; color:#fff">VIDEO<span style="color:#e53935">◄</span></div>
                <div style="position:absolute; left:8px; bottom:22px; font-size:10px; color:#fff; font-weight:700">T-120</div>
                <div style="position:absolute; left:6px; bottom:6px; font-size:6px; color:#cdd; font-style:italic">VHS</div>
              </div>
            </div>
            <div style="position:absolute; right:0; top:0; bottom:0; width:26px; background:linear-gradient(270deg,rgba(0,0,0,.5),rgba(0,0,0,0))"></div>
          </div>
        </div>

        <div style="position:absolute; right:56px; bottom:48px; width:300px; text-align:right; font-family:'IBM Plex Mono',monospace; color:#2a2621">
          <div style="font-size:11px; letter-spacing:.14em; color:rgba(42,38,33,.6)">LOADING</div>
          <div style="margin-top:10px; font-size:20px; font-weight:600; letter-spacing:.02em">${activeTape.title}</div>
          <div style="margin-top:7px; font-size:11px; letter-spacing:.14em; color:rgba(42,38,33,.55)">${activeTape.kicker}</div>
          <div style="margin-top:22px; font-size:12px; letter-spacing:.12em; color:rgba(42,38,33,.62)">CLICK TO SKIP</div>
        </div>
      </div>

      <!-- SHOT B: Extreme Close-Up Deck Insertion & Eject -->
      <div 
        style="position:absolute; inset:0; z-index:91; display:${this.currentShot === 'B' || this.currentShot === 'Be' ? 'block' : 'none'}; background:#6f5a3f; font-family:Arial,Helvetica,sans-serif"
        @click=${this.onSkip}
      >
        <!-- Background Extensions for Wide Screens -->
        <div style="position:absolute; left:-4000px; right:-4000px; top:0; height:474px; z-index:0; background:linear-gradient(180deg,#08080a,#131316)"></div>
        <div style="position:absolute; left:0; right:0; top:472px; bottom:0; z-index:1; perspective:820px; perspective-origin:50% -60%">
          <div style="position:absolute; left:-3940px; right:-3940px; top:0; height:1200px; transform:rotateX(76deg); transform-origin:top center; background:linear-gradient(180deg,#c9ab84,#8a6d46)">
            <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg,rgba(90,62,34,.1) 0 3px,transparent 3px 70px)"></div>
          </div>
        </div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:206px; height:230px; z-index:0; background:linear-gradient(180deg,#141417,#0d0d0f)"></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:350px; height:86px; z-index:0; background:linear-gradient(180deg,#1c1c1f,#101012)"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.055)"></div></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:436px; height:30px; z-index:0; background:linear-gradient(180deg,#efe9dc 0 72%,#c7c0b0 72%); box-shadow:0 16px 26px rgba(20,14,6,.55)"></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:0; height:24px; z-index:0; background:#08080a"></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:22px; height:186px; z-index:0; background:linear-gradient(180deg,#212125 0 34%,#16161a 34%,#131316); border-bottom:2px solid #34343a; box-shadow:0 8px 18px rgba(0,0,0,.6)"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.09)"></div></div>

        <!-- Original centered content -->
        <div style="position:absolute; left:0; right:0; top:0; height:474px; z-index:1; background:linear-gradient(180deg,#08080a,#131316)"></div>

        <div style="position:absolute; left:-30px; right:-30px; top:206px; height:230px; z-index:2; background:linear-gradient(180deg,#141417,#0d0d0f)"></div>
        <div style="position:absolute; left:-30px; right:-30px; top:350px; height:86px; z-index:2; background:linear-gradient(180deg,#1c1c1f,#101012)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.055)"></div>
          <div style="position:absolute; left:64px; top:34px; width:196px; height:12px; background:rgba(239,236,228,.62); border-radius:2px"></div>
          <div style="position:absolute; right:56px; top:18px; width:250px; height:50px; display:flex; gap:12px">
            <div style="flex:1; background:linear-gradient(180deg,#333336,#26262a); border-radius:6px; position:relative">
              <div style="position:absolute; left:0; right:0; top:12px; text-align:center; font-size:11px; color:#b6b6b6; letter-spacing:.1em; line-height:1.5">EJECT</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
          </div>
        </div>
        <div style="position:absolute; left:-30px; right:-30px; top:436px; height:30px; z-index:2; background:linear-gradient(180deg,#efe9dc 0 72%,#c7c0b0 72%); box-shadow:0 16px 26px rgba(20,14,6,.55)">
          <div style="position:absolute; left:76px; top:11px; width:340px; height:4px; background:rgba(60,55,45,.3)"></div>
          <div style="position:absolute; left:76px; top:19px; width:250px; height:4px; background:rgba(60,55,45,.18)"></div>
        </div>

        <div style="position:absolute; left:182px; right:182px; top:204px; height:108px; z-index:3; background:linear-gradient(180deg,#000 0 34%,#08080c); box-shadow:inset 0 14px 22px rgba(0,0,0,.9),inset 0 -2px 0 rgba(255,255,255,.045)"></div>

        <div style="position:absolute; left:0; right:0; top:0; bottom:0; z-index:5; pointer-events:none">
          <div style="position:absolute; left:243px; top:206px; width:620px; height:343px; transform-origin:50% 0%; transform-style:preserve-3d; animation-name:${shotBAnim}; animation-duration:${bDur}ms; animation-timing-function:linear; animation-fill-mode:both; animation-delay:${shotDelay}; animation-play-state:${shotPlay}">
            <div style="position:absolute; left:-30px; right:-30px; top:300px; height:90px; background:rgba(0,0,0,.55); filter:blur(24px); border-radius:50%"></div>
            
            <div style="position:absolute; left:0; top:0; width:330px; height:178px; transform:scale(1.879,1.927); transform-origin:top left">
              <div style="width:330px; height:178px; position:relative; border-radius:9px; background:#262626; overflow:hidden; font-family:Arial,Helvetica,sans-serif">
                <div style="position:absolute; top:0; left:0; right:0; height:24px; background:#1a1a1a; border-bottom:2px solid #333; display:flex; align-items:center; justify-content:center">
                  <span style="font-size:10px; font-weight:800; color:#e8e8e8; letter-spacing:.12em">VHS</span>
                </div>
                <div style="position:absolute; left:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; right:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; left:118px; top:44px; width:94px; height:84px; background:#f4f4f4; border-radius:2px">
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${activeTape.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:34px; height:1px; background:#c9c9c9"></div>
                </div>
                <div style="position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.015) 3px 4px); pointer-events:none"></div>
              </div>
            </div>

            <div style="position:absolute; left:0; top:343px; width:620px; height:82px; transform-origin:50% 0%; transform:rotateX(72deg); background:linear-gradient(180deg,#242427 0 4px,#18181b 4px 46%,#101012 46%,#0a0a0b); border-radius:0 0 7px 7px; box-shadow:0 20px 26px rgba(0,0,0,.5)">
              <div style="position:absolute; left:0; right:0; top:4px; height:1px; background:rgba(255,255,255,.08)"></div>
              <div style="position:absolute; left:96px; right:96px; top:22px; bottom:14px; background:linear-gradient(160deg,#2b2b2f,#101013 60%); border-radius:2px; box-shadow:inset 0 1px 3px rgba(0,0,0,.7)"></div>
              <div style="position:absolute; left:24px; top:26px; width:56px; height:34px; background:rgba(226,222,210,.82); border-radius:1px"></div>
              <div style="position:absolute; right:26px; top:30px; width:34px; height:26px; background:#191919; border-radius:1px"></div>
            </div>
          </div>
        </div>

        <div style="position:absolute; left:0; right:0; top:0; height:24px; z-index:7; background:#08080a"></div>
        <div style="position:absolute; left:-30px; right:-30px; top:22px; height:186px; z-index:8; background:linear-gradient(180deg,#212125 0 34%,#16161a 34%,#131316); border-bottom:2px solid #34343a; box-shadow:0 8px 18px rgba(0,0,0,.6)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.09)"></div>
          <div style="position:absolute; left:70px; top:16px; width:150px; height:26px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; right:80px; top:16px; width:150px; height:26px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; left:74px; top:96px; width:112px; height:14px; background:rgba(239,236,228,.7); border-radius:2px"></div>
          <div style="position:absolute; right:74px; top:82px; width:250px; height:64px; background:linear-gradient(160deg,#101014,#06060a 60%); border-radius:3px; box-shadow:inset 0 2px 6px rgba(0,0,0,.8)"></div>
        </div>

        <div style="position:absolute; right:110px; top:378px; z-index:9; display:flex; gap:30px">
          <div style="width:15px; height:15px; border-radius:50%; background:#c9a06a; animation-name:ledBlink; animation-duration:${bDur}ms; animation-timing-function:linear; animation-fill-mode:both; animation-play-state:${shotPlay}; animation-delay:140ms"></div>
          <div style="width:15px; height:15px; border-radius:50%; background:#7fb37a; animation-name:ledBlink; animation-duration:${bDur}ms; animation-timing-function:linear; animation-fill-mode:both; animation-play-state:${shotPlay}; animation-delay:${shotDelay}"></div>
        </div>
        <div style="position:absolute; left:-4000px; right:-4000px; bottom:0; height:20%; z-index:10; pointer-events:none; background:linear-gradient(180deg,rgba(30,20,10,0),rgba(30,20,10,.5))"></div>
      </div>
    `;
  }
}
