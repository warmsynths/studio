class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(mute: boolean) {
    this.muted = mute;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  // Tactile VCR Button Click
  public playClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Friction Whoosh for Shot A Sleeve Slide
  public playSleeveSlide() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.3; // 300ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.25);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Heavy Mechanical VCR Deck Thunk for Shot B Deck Insertion
  public playDeckThunk() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Sub Bass Thunk
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, t);
    subOsc.frequency.exponentialRampToValueAtTime(35, t + 0.12);

    subGain.gain.setValueAtTime(0.5, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 0.14);

    // Latch Metal Clack
    const clackOsc = this.ctx.createOscillator();
    const clackGain = this.ctx.createGain();
    clackOsc.type = 'square';
    clackOsc.frequency.setValueAtTime(950, t + 0.03);
    clackOsc.frequency.exponentialRampToValueAtTime(220, t + 0.08);

    clackGain.gain.setValueAtTime(0.0, t);
    clackGain.gain.setValueAtTime(0.25, t + 0.03);
    clackGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    clackOsc.connect(clackGain);
    clackGain.connect(this.ctx.destination);
    clackOsc.start(t + 0.03);
    clackOsc.stop(t + 0.09);
  }

  // VHS Tracking Static Burst during Cut Flash
  public playStaticCrackle(durationMs: number = 90) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const duration = durationMs / 1000;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.4 ? 1 : 0.1);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    noise.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // CRT TV Power-On Degauss & Hum
  public playCrtHum() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // High pitched flyback transformer whine
    const whineOsc = this.ctx.createOscillator();
    const whineGain = this.ctx.createGain();
    whineOsc.type = 'sine';
    whineOsc.frequency.setValueAtTime(12000, t);

    whineGain.gain.setValueAtTime(0.04, t);
    whineGain.gain.exponentialRampToValueAtTime(0.005, t + 0.4);

    whineOsc.connect(whineGain);
    whineGain.connect(this.ctx.destination);
    whineOsc.start(t);
    whineOsc.stop(t + 0.4);

    // Degauss thud
    const degaussOsc = this.ctx.createOscillator();
    const degaussGain = this.ctx.createGain();
    degaussOsc.type = 'triangle';
    degaussOsc.frequency.setValueAtTime(120, t);
    degaussOsc.frequency.exponentialRampToValueAtTime(50, t + 0.2);

    degaussGain.gain.setValueAtTime(0.3, t);
    degaussGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    degaussOsc.connect(degaussGain);
    degaussGain.connect(this.ctx.destination);
    degaussOsc.start(t);
    degaussOsc.stop(t + 0.2);
  }

  // Eject Spring Release Pop
  public playEjectPop() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }
}

export const sounds = new RetroSoundEngine();
