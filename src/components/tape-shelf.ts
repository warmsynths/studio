import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';

@customElement('tape-shelf')
export class TapeShelfComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      left: 88px;
      bottom: 56px;
      width: 560px;
      height: 210px;
      z-index: 5;
    }
  `;

  @property({ type: String }) activeKey: TapeKey | null = null;
  @property({ type: String }) stage: string = 'idle';
  @property({ type: Number }) sceneOp = 1;
  @property({ type: String }) flightTransform = 'none';
  @property({ type: Number }) flightDur = 0;
  @property({ type: String }) flightEase = 'cubic-bezier(.23,1,.32,1)';
  @property({ type: String }) flightFx = 'drop-shadow(0 2px 4px rgba(42,38,33,.12))';

  private pick(k: TapeKey) {
    this.dispatchEvent(new CustomEvent('pick-tape', { detail: { key: k } }));
  }

  render() {
    const a = this.activeKey;
    const st = this.stage;
    const dim = st !== 'idle' && st !== 'home';
    const playing = st === 'play' || st === 'playWipe';
    const tapePE = playing || st === 'read' || st === 'ejectCollapse' ? 'none' : 'auto';

    const getVal = (k: TapeKey) => {
      const K = k[0].toUpperCase() + k.slice(1);
      const act = a === k;
      const op = !dim ? 1 : (act ? (playing ? 0 : 1) : (playing ? 0.18 : 0.35));
      const fx = dim && !act ? (playing ? 'blur(6px)' : 'blur(3px)') : 'blur(0px)';
      const tf = act ? this.flightTransform : 'none';
      const z = act ? 40 : TAPES[k].z;
      return { op, fx, tf, z };
    };

    const vDrift = getVal('drift');
    const vPixel = getVal('pixel');
    const vChord = getVal('chord');
    const vEcho = getVal('echo');
    const vScene = getVal('scene');

    return html`
      <div style="position:relative; width:100%; height:100%; pointer-events:${tapePE}">
        <!-- Shadows -->
        <div style="position:absolute; left:-4px; bottom:-4px; width:222px; height:8px; background:rgba(42,38,33,.18); filter:blur(5px); border-radius:50%; opacity:${this.sceneOp}; transition:opacity 260ms cubic-bezier(.23,1,.32,1)"></div>
        <div style="position:absolute; left:226px; bottom:-4px; width:116px; height:8px; background:rgba(42,38,33,.2); filter:blur(5px); border-radius:50%; opacity:${this.sceneOp}; transition:opacity 260ms cubic-bezier(.23,1,.32,1)"></div>

        <!-- DRIFT Tape -->
        <div data-tape="drift" style="position:absolute; left:8px; bottom:0; z-index:${vDrift.z}; opacity:${vDrift.op}; filter:${vDrift.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${vDrift.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-.8deg)">
              <div @click=${() => this.pick('drift')} style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${TAPES.drift.strip}"></div>
                <div style="position:absolute; left:18px; top:6px; bottom:6px; right:34px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; gap:8px; padding:0 8px">
                  <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">BEAT MAPPER</span>
                  <span style="font-family:'IBM Plex Mono',monospace; font-size:6px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${TAPES.drift.kicker}</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; right:8px; top:11px; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- PIXEL LOOM Tape -->
        <div data-tape="pixel" style="position:absolute; left:2px; bottom:33px; z-index:${vPixel.z}; opacity:${vPixel.op}; filter:${vPixel.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${vPixel.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(1.2deg)">
              <div @click=${() => this.pick('pixel')} style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${TAPES.pixel.strip}"></div>
                <div style="position:absolute; left:18px; top:6px; bottom:6px; right:34px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; gap:8px; padding:0 8px">
                  <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">CHROMA CHORDS</span>
                  <span style="font-family:'IBM Plex Mono',monospace; font-size:6px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${TAPES.pixel.kicker}</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; right:8px; top:11px; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- CHORDCRAFT Tape -->
        <div data-tape="chord" style="position:absolute; left:11px; bottom:66px; z-index:${vChord.z}; opacity:${vChord.op}; filter:${vChord.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${vChord.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-.5deg)">
              <div @click=${() => this.pick('chord')} style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${TAPES.chord.strip2}"></div>
                <div style="position:absolute; left:18px; top:6px; bottom:6px; right:34px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; gap:8px; padding:0 8px">
                  <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">CIRCUIT CHORDS</span>
                  <span style="font-family:'IBM Plex Mono',monospace; font-size:6px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${TAPES.chord.kicker}</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; right:8px; top:11px; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ECHO ROOM Tape -->
        <div data-tape="echo" style="position:absolute; left:232px; bottom:0; z-index:${vEcho.z}; opacity:${vEcho.op}; filter:${vEcho.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${vEcho.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-13deg); transform-origin:bottom left">
              <div @click=${() => this.pick('echo')} style="width:35px; height:200px; position:relative; border-radius:2px 2px 4px 4px; background:#262626; box-shadow:0 3px 10px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; right:0; bottom:0; height:10px; background:${TAPES.echo.strip}"></div>
                <div style="position:absolute; left:6px; right:6px; top:34px; bottom:18px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; justify-content:center; overflow:hidden">
                  <span style="writing-mode:vertical-rl; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">HYPERSYN</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; left:0; right:0; top:12px; text-align:center; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- SCENE BUILDER Tape -->
        <div data-tape="scene" style="position:absolute; left:267px; bottom:0; z-index:${vScene.z}; opacity:${vScene.op}; filter:${vScene.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${vScene.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-13deg); transform-origin:bottom left">
              <div @click=${() => this.pick('scene')} style="width:35px; height:200px; position:relative; border-radius:2px 2px 4px 4px; background:#262626; box-shadow:0 3px 10px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; right:0; bottom:0; height:10px; background:${TAPES.scene.strip2}"></div>
                <div style="position:absolute; left:6px; right:6px; top:34px; bottom:18px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; justify-content:center; overflow:hidden">
                  <span style="writing-mode:vertical-rl; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">J-6 COMPANION</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; left:0; right:0; top:12px; text-align:center; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
