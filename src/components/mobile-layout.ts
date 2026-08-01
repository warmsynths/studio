import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TapeKey } from '../types/portfolio.js';
import { CutsceneDirector } from './cutscene-director.js';

import './tape-app-slot.js';
import './mobile-shelf.js';
import './mobile-playing.js';
import './mobile-cutscene.js';

const OUT = 'cubic-bezier(.23,1,.32,1)';

@customElement('mobile-layout')
export class MobileLayout extends LitElement {
  static styles = css`
    .mobile-wrap {
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow: hidden;
      background: #f5f2ea;
    }
    .mobile-panel {
      position: absolute;
      inset: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;

  @property({ type: Object }) director!: CutsceneDirector;

  private get mobileShelfPhase(): 'idle' | 'loading' | 'ejecting' {
    const st = this.director.stageState;
    if (st === 'ejectCollapse') return 'ejecting';
    if (st === 'idle' || st === 'home') return 'idle';
    return 'loading';
  }

  private get mobilePlayingVisible(): boolean {
    return this.director.stageState === 'play' || this.director.stageState === 'playWipe';
  }

  private pick(k: TapeKey) {
    this.director.pick(k, 'none', 'none', true);
  }

  private eject() {
    this.director.eject(true);
  }

  render() {
    const d = this.director;
    const a = d.activeKey;
    const playingVisible = this.mobilePlayingVisible;
    const cutsceneVisible = d.currentShot === 'B' || d.currentShot === 'Be';

    return html`
      <div class="mobile-wrap">
        <mobile-shelf
          class="mobile-panel"
          style="opacity:${playingVisible || cutsceneVisible ? 0 : 1}; pointer-events:${playingVisible || cutsceneVisible ? 'none' : 'auto'}; transition:opacity 320ms ${OUT}"
          .activeKey=${a}
          .phase=${this.mobileShelfPhase}
          @pick-tape=${(e: CustomEvent) => this.pick(e.detail.key)}
        ></mobile-shelf>

        <mobile-playing
          class="mobile-panel"
          style="opacity:${playingVisible ? 1 : 0}; pointer-events:${playingVisible ? 'auto' : 'none'}; transition:opacity 260ms ${OUT}"
          .activeKey=${a}
          @eject-tape=${() => this.eject()}
        >
          <tape-app-slot .activeKey=${a}></tape-app-slot>
        </mobile-playing>

        <mobile-cutscene
          .activeKey=${a}
          .currentShot=${d.currentShot as 'none' | 'B' | 'Be'}
          ?showFlash=${d.showFlash}
          .shotBDur=${d.shotBDur}
          .flashDur=${d.flashDur}
          @skip-cutscene=${() => d.skip()}
        ></mobile-cutscene>
      </div>
    `;
  }
}
