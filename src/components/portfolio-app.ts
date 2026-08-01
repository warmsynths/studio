import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TAPES, TapeKey } from '../types/portfolio.js';
import { CutsceneDirector } from './cutscene-director.js';

import './desktop-layout.js';
import './mobile-layout.js';
import './motion-inspector.js';

@customElement('portfolio-app')
export class PortfolioAppComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background: #f5f2ea;
      box-sizing: border-box;
      user-select: none;
    }
  `;

  @state() private stageScale: number = 1;
  private resizeObserver?: ResizeObserver;
  private observedStageEl?: Element;

  @state() private isMobile: boolean = false;
  private mq?: MediaQueryList;
  private handleMqChange = (e: MediaQueryListEvent) => { this.isMobile = e.matches; };

  director = new CutsceneDirector(this);
  @state() private showInspector: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('popstate', this.handlePopState);
    this.mq = window.matchMedia('(max-width: 639px)');
    this.isMobile = this.mq.matches;
    this.mq.addEventListener('change', this.handleMqChange);
    requestAnimationFrame(() => this.route(true));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('popstate', this.handlePopState);
    this.mq?.removeEventListener('change', this.handleMqChange);
    this.resizeObserver?.disconnect();
  }

  updated() {
    const outer = this.shadowRoot?.querySelector('desktop-layout');
    if (!outer || outer === this.observedStageEl) return;
    this.resizeObserver?.disconnect();
    this.observedStageEl = outer;
    this.resizeObserver = new ResizeObserver(entries => {
      const r = entries[0]?.contentRect;
      if (r) this.stageScale = Math.max(r.width / 1100, r.height / 700);
    });
    this.resizeObserver.observe(outer);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.director.currentShot !== 'none') this.director.skip();
      else if (this.director.stageState === 'play' || this.director.stageState === 'playWipe') this.director.eject(this.isMobile);
      else if (this.director.stageState !== 'idle') this.director.cancel();
    }
  };

  private handlePopState = () => this.route(false);

  private route(initial: boolean) {
    const slug = (location.hash || '').replace(/^#\/?/, '');
    const foundKey = (Object.keys(TAPES) as TapeKey[]).find(x => TAPES[x].slug === slug);
    if (foundKey && this.director.activeKey !== foundKey) {
      const desktop = this.shadowRoot?.querySelector('desktop-layout') as any;
      const flip = desktop ? desktop.flip(foundKey) : 'none';
      const origin = desktop ? desktop.screenOrigin() : '735px 307px';
      this.director.jump(foundKey, flip, origin);
      return;
    }
    if (!foundKey && this.director.activeKey) {
      initial ? this.director.setStateIdle() : this.director.eject(this.isMobile);
    }
  }

  private runSequence() {
    const k = this.director.activeKey || 'echo';
    const desktop = this.shadowRoot?.querySelector('desktop-layout') as any;
    const flip = desktop ? desktop.flip(k) : 'none';
    const origin = desktop ? desktop.screenOrigin() : '735px 307px';
    
    this.director.handleHold('idle', flip, origin);
    setTimeout(() => this.director.pick(k as TapeKey, flip, origin, this.isMobile), 60);
  }

  render() {
    const d = this.director;
    const a = d.activeKey;
    const inspectState = d.activeHold
      ? 'HOLDING ' + (d.activeHold === 'A' ? 'SHOT A' : d.activeHold === 'B' ? 'SHOT B · INSERT' : 'SHOT B · EJECT') + (a ? ' — ' + TAPES[a].title : '')
      : d.stageState === 'idle' ? 'SHELF'
      : ((d.stageState === 'play' || d.stageState === 'playWipe') ? 'PLAYING' : d.currentShot !== 'none' ? 'RUNNING · ' + (d.currentShot === 'A' ? 'SHOT A' : d.currentShot === 'Be' ? 'EJECT' : 'SHOT B') : d.stageState === 'read' ? 'RUNNING · SETTLE / READ' : 'RUNNING') + (a ? ' — ' + TAPES[a].title : '');

    return html`
      ${this.isMobile 
        ? html`<mobile-layout .director=${d}></mobile-layout>` 
        : html`<desktop-layout .director=${d} .stageScale=${this.stageScale}></desktop-layout>`
      }

      ${this.showInspector
        ? html`
            <motion-inspector
              .inspectState=${inspectState}
              .activeHold=${d.activeHold}
              .scrubVal=${d.scrubVal}
              .shotADur=${d.shotADur}
              .shotBDur=${d.shotBDur}
              .flashDur=${d.flashDur}
              .dollyDur=${d.dollyDur}
              .readDur=${d.readDur}
              .camPct=${d.camPct}
              @hold-shot=${(e: CustomEvent) => {
                const desktop = this.shadowRoot?.querySelector('desktop-layout') as any;
                const flip = desktop ? desktop.flip(a || 'echo') : 'none';
                const origin = desktop ? desktop.screenOrigin() : '735px 307px';
                d.handleHold(e.detail.hold, flip, origin);
              }}
              @param-change=${(e: CustomEvent) => d.handleParamChange(e.detail.name, e.detail.val)}
              @run-sequence=${this.runSequence}
            ></motion-inspector>
          `
        : ''}
    `;
  }
}
