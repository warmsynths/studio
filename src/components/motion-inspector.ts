import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('motion-inspector')
export class MotionInspectorComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 1100px;
      margin: 14px auto 0;
    }

    .inspector-card {
      padding: 16px 20px 18px;
      box-sizing: border-box;
      background: #efece3;
      border: 1px solid rgba(42, 38, 33, 0.14);
      border-radius: 4px;
      font-family: 'IBM Plex Mono', monospace;
      color: #2a2621;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid rgba(42, 38, 33, 0.14);
      padding-bottom: 10px;
    }

    .title {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
    }

    .status {
      font-size: 10px;
      letter-spacing: 0.08em;
      color: rgba(42, 38, 33, 0.5);
    }

    .btn-group {
      display: flex;
      gap: 8px;
      margin-top: 14px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 7px 12px;
      font-size: 10px;
      letter-spacing: 0.08em;
      border: 1px solid rgba(42, 38, 33, 0.24);
      border-radius: 2px;
      cursor: pointer;
      background: transparent;
      transition: background 120ms ease;
    }

    .btn:hover {
      background: #e3dfd2;
    }

    .btn.active {
      background: #dcd7c8;
      font-weight: bold;
    }

    .run-btn {
      padding: 7px 14px;
      font-size: 10px;
      letter-spacing: 0.08em;
      border: 1px solid #2a2621;
      border-radius: 2px;
      cursor: pointer;
      background: #2a2621;
      color: #f5f2ea;
      margin-left: auto;
    }

    .scrub-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 16px;
    }

    .grid-sliders {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 34px;
      margin-top: 16px;
    }

    .slider-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .slider-label {
      font-size: 10px;
      letter-spacing: 0.08em;
      width: 120px;
      color: rgba(42, 38, 33, 0.55);
    }

    input[type='range'] {
      flex: 1;
      accent-color: #2a2621;
    }

    .foot-info {
      margin-top: 14px;
      font-size: 10px;
      line-height: 1.7;
      color: rgba(42, 38, 33, 0.5);
    }
  `;

  @property({ type: String }) inspectState = 'SHELF';
  @property({ type: String }) activeHold: 'idle' | 'A' | 'B' | 'Be' | 'play' | null = null;
  @property({ type: Number }) scrubVal = 0;
  @property({ type: Number }) shotADur = 1300;
  @property({ type: Number }) shotBDur = 1250;
  @property({ type: Number }) flashDur = 130;
  @property({ type: Number }) dollyDur = 420;
  @property({ type: Number }) readDur = 620;
  @property({ type: Number }) camPct = 174;

  private onHold(hold: 'idle' | 'A' | 'B' | 'Be' | 'play') {
    this.dispatchEvent(new CustomEvent('hold-shot', { detail: { hold } }));
  }

  private onRunSeq() {
    this.dispatchEvent(new CustomEvent('run-sequence'));
  }

  private onParamChange(name: string, val: number) {
    this.dispatchEvent(new CustomEvent('param-change', { detail: { name, val } }));
  }

  render() {
    const totalMs = (this.shotADur + 200 + this.shotBDur + 150 + this.flashDur + this.dollyDur + this.readDur + 260) + 'ms';

    return html`
      <div class="inspector-card">
        <div class="header">
          <span class="title">MOTION INSPECTOR</span>
          <span class="status">${this.inspectState}</span>
        </div>

        <div class="btn-group">
          <button class="btn ${this.activeHold === 'idle' ? 'active' : ''}" @click=${() => this.onHold('idle')}>SHELF</button>
          <button class="btn ${this.activeHold === 'A' ? 'active' : ''}" @click=${() => this.onHold('A')}>SHOT A · SLEEVE SLIDE-OUT</button>
          <button class="btn ${this.activeHold === 'B' ? 'active' : ''}" @click=${() => this.onHold('B')}>SHOT B · INSERT</button>
          <button class="btn ${this.activeHold === 'Be' ? 'active' : ''}" @click=${() => this.onHold('Be')}>SHOT B · EJECT</button>
          <button class="btn ${this.activeHold === 'play' ? 'active' : ''}" @click=${() => this.onHold('play')}>SHOT C · PLAYING</button>
          <button class="run-btn" @click=${this.onRunSeq}>▶ RUN FULL SEQUENCE</button>
        </div>

        <div class="scrub-row">
          <span style="font-size:10px; letter-spacing:.08em; width:74px; color:rgba(42,38,33,.55)">SCRUB</span>
          <input type="range" min="0" max="1000" .value=${this.scrubVal} @input=${(e: Event) => this.onParamChange('scrub', +(e.target as HTMLInputElement).value)} />
          <span style="font-size:10px; letter-spacing:.06em; width:104px; text-align:right; color:rgba(42,38,33,.55)">${this.activeHold ? `${this.scrubVal}ms` : 'hold a shot'}</span>
        </div>

        <div class="grid-sliders">
          <div class="slider-row">
            <span class="slider-label">SHOT A HOLD</span>
            <input type="range" min="500" max="2600" step="50" .value=${this.shotADur} @input=${(e: Event) => this.onParamChange('shotADur', +(e.target as HTMLInputElement).value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.shotADur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">SHOT B HOLD</span>
            <input type="range" min="500" max="2600" step="50" .value=${this.shotBDur} @input=${(e: Event) => this.onParamChange('shotBDur', +(e.target as HTMLInputElement).value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.shotBDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">CUT FLASH</span>
            <input type="range" min="40" max="400" step="10" .value=${this.flashDur} @input=${(e: Event) => this.onParamChange('flashDur', +(e.target as HTMLInputElement).value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.flashDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">SETTLE DOLLY</span>
            <input type="range" min="120" max="1200" step="20" .value=${this.dollyDur} @input=${(e: Event) => this.onParamChange('dollyDur', +(e.target as HTMLInputElement).value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.dollyDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">READ BEAT</span>
            <input type="range" min="0" max="1600" step="50" .value=${this.readDur} @input=${(e: Event) => this.onParamChange('readDur', +(e.target as HTMLInputElement).value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.readDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">CAMERA IN</span>
            <input type="range" min="140" max="260" step="1" .value=${this.camPct} @input=${(e: Event) => this.onParamChange('camPct', +(e.target as HTMLInputElement).value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.camPct}%</span>
          </div>
        </div>

        <div class="foot-info">
          Total load → playing: <b style="color:#2a2621">${totalMs}</b>. Holding a shot pauses its animation so the scrub bar seeks it; RUN plays the whole cut sequence with the values above. Esc or the deck's EJECT key returns to the shelf.
        </div>
      </div>
    `;
  }
}
