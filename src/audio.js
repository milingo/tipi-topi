// Sonido generado con WebAudio (sin archivos). Todo es básico y se puede afinar en SFX / MELODY.
let ctx = null, master = null, musicGain = null, muted = false, timer = null, step = 0, nextT = 0;

export function unlock() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = muted ? 0 : 0.8; master.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value = 0.16; musicGain.connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume();
}
export function isMuted() { return muted; }
export function toggleMute() { muted = !muted; if (master) master.gain.value = muted ? 0 : 0.8; return muted; }

function tone(freq, dur, type = 'square', vol = 0.2, slideTo = null, when = 0, dest = null) {
  if (!ctx) return;
  const t = ctx.currentTime + when;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(dest || master); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur, vol = 0.2, freq = 1200, when = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + when;
  const n = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const s = ctx.createBufferSource(); s.buffer = buf;
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq;
  const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(master); s.start(t);
}

export const SFX = {
  jump: () => tone(330, 0.18, 'square', 0.12, 740),
  land: () => noise(0.08, 0.12, 500),
  bump: () => { noise(0.12, 0.2, 1800); tone(180, 0.12, 'sawtooth', 0.14, 90); },
  stomp: () => { tone(520, 0.1, 'square', 0.16, 160); noise(0.06, 0.1, 900); },
  pop: () => tone(700, 0.14, 'triangle', 0.2, 1400),
  hurt: () => { tone(420, 0.35, 'sawtooth', 0.18, 90); },
  star: () => { tone(880, 0.08, 'square', 0.1); tone(1320, 0.14, 'square', 0.1, null, 0.07); },
  jump2: () => tone(520, 0.2, 'square', 0.12, 1250),
  boing: () => { tone(200, 0.35, 'sine', 0.3, 900); tone(400, 0.3, 'triangle', 0.12, 1500, 0.04); },
  seed: () => tone(260, 0.15, 'triangle', 0.14, 520),
  splat: () => noise(0.1, 0.12, 700),
  checkpoint: () => [523, 659, 784].forEach((f, i) => tone(f, 0.15, 'triangle', 0.16, null, i * 0.09)),
  bossHit: () => { tone(120, 0.4, 'sawtooth', 0.22, 60); noise(0.25, 0.2, 1500); },
  bossRoar: () => { tone(90, 0.7, 'sawtooth', 0.2, 55); tone(95, 0.7, 'square', 0.1, 50); },
  win: () => [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, 'square', 0.14, null, i * 0.13)),
  lose: () => [392, 330, 262, 196].forEach((f, i) => tone(f, 0.3, 'triangle', 0.2, null, i * 0.22)),
  click: () => tone(600, 0.06, 'square', 0.1),
  fart: () => { tone(150, 0.32, 'sawtooth', 0.22, 55); tone(110, 0.3, 'square', 0.12, 45, 0.03); noise(0.3, 0.12, 400); },
  boom: () => { noise(0.5, 0.35, 700); tone(110, 0.5, 'sawtooth', 0.28, 35); },
  fuse: () => tone(900, 0.5, 'sawtooth', 0.06, 1500),
  cane: () => { noise(0.1, 0.16, 2500); tone(240, 0.14, 'triangle', 0.2, 80, 0.07); },
  bite: () => { tone(300, 0.05, 'square', 0.16, 180); tone(300, 0.05, 'square', 0.16, 180, 0.08); },
  splash: () => { noise(0.25, 0.2, 2200); tone(500, 0.2, 'sine', 0.12, 150); },
  snort: () => { noise(0.35, 0.22, 600); tone(80, 0.35, 'sawtooth', 0.15, 50); },
  charge: () => { tone(70, 0.9, 'sawtooth', 0.2, 140); noise(0.8, 0.15, 500); },
  gust: () => { noise(0.6, 0.25, 1400); tone(200, 0.5, 'sine', 0.08, 500); },
  crash: () => { noise(0.5, 0.3, 900); tone(70, 0.4, 'square', 0.25, 30); },
};

// Melodía alegre en Do mayor (8 compases de 4 tiempos, 1 paso = corchea). 0 = silencio
const N = { C4: 262, D4: 294, E4: 330, G4: 392, A4: 440, C5: 523, D5: 587, E5: 659, G5: 784, F4: 349, B4: 494, F5: 698, A5: 880, G4s: 415, D4s: 311, D5s: 622, F4s: 370 };
const MELODY = [
  'E5', 0, 'G5', 'E5', 'C5', 0, 'D5', 0, 'E5', 'D5', 'C5', 'A4', 'G4', 0, 0, 0,
  'A4', 0, 'C5', 'A4', 'G4', 0, 'E4', 0, 'G4', 'A4', 'G4', 'E4', 'D4', 0, 'E4', 0,
  'E5', 0, 'G5', 'E5', 'C5', 0, 'D5', 0, 'E5', 'G5', 'E5', 'D5', 'C5', 0, 0, 0,
  'A4', 'C5', 'A4', 'G4', 'E4', 'G4', 'A4', 'B4', 'C5', 0, 'G4', 0, 'C5', 0, 0, 0,
];
const BASS = ['C4', 'C4', 'A4', 'F4', 'C4', 'C4', 'G4', 'C4'];
const MELODY2 = [
  'A4', 0, 'C5', 'A4', 'E5', 0, 'D5', 0, 'C5', 'A4', 'G4', 'A4', 'E4', 0, 0, 0,
  'A4', 0, 'C5', 'A4', 'G5', 0, 'E5', 0, 'D5', 'C5', 'D5', 'E5', 'A4', 0, 'B4', 0,
  'A4', 0, 'C5', 'A4', 'E5', 0, 'D5', 0, 'C5', 'D5', 'E5', 'G5', 'E5', 0, 0, 0,
  'D5', 'E5', 'D5', 'C5', 'A4', 'C5', 'D5', 'B4', 'A4', 0, 'E4', 0, 'A4', 0, 0, 0,
];
const BASS2 = ['A4', 'A4', 'F4', 'F4', 'A4', 'A4', 'G4', 'E4'];
const MELODY3 = [
  'G4', 0, 'C5', 'E5', 'G5', 0, 'E5', 0, 'D5', 0, 'G4', 'B4', 'D5', 0, 0, 0,
  'A4', 0, 'C5', 'E5', 'A4', 0, 'C5', 0, 'G4', 'B4', 'D5', 'G5', 'D5', 0, 'B4', 0,
  'G4', 0, 'C5', 'E5', 'G5', 0, 'E5', 'G5', 'A4', 0, 'C5', 'D5', 'E5', 0, 0, 0,
  'F4', 'A4', 'C5', 'F4', 'G4', 'B4', 'D5', 'G4', 'C5', 0, 'E5', 0, 'C5', 0, 0, 0,
];
const BASS3 = ['C4', 'C4', 'F4', 'G4', 'C4', 'A4', 'F4', 'G4'];
const MELODY4 = [
  'D4', 0, 'F4', 'D4', 'A4', 0, 'G4', 0, 'F4', 'E4', 'D4', 0, 'E4', 0, 'G4', 0,
  'A4', 0, 'C5', 'A4', 'G4', 0, 'F4', 'G4', 'A4', 0, 'E4', 0, 'D4', 0, 0, 0,
  'D4', 0, 'F4', 'D4', 'A4', 0, 'C5', 0, 'D5', 'C5', 'A4', 'F4', 'G4', 0, 'E4', 0,
  'F4', 'G4', 'A4', 'G4', 'F4', 'E4', 'D4', 'E4', 'F4', 0, 'D4', 0, 'D4', 0, 0, 0,
];
const BASS4 = ['D4', 'D4', 'F4', 'F4', 'C4', 'C4', 'G4', 'A4'];
const MELODY5 = [
  'E4', 'G4', 'C5', 'G4', 'E4', 'G4', 'C5', 'E5', 'D4', 'F4', 'A4', 'F4', 'D4', 'F4', 'A4', 'D5',
  'E4', 'G4', 'C5', 'G4', 'E4', 'G4', 'C5', 'G5', 'G4', 'B4', 'D5', 'B4', 'G4', 'B4', 'D5', 0,
  'A4', 'C5', 'E5', 'C5', 'A4', 'C5', 'E5', 'A4', 'F4', 'A4', 'C5', 'A4', 'F4', 'A4', 'C5', 'F4',
  'G4', 'B4', 'D5', 'G5', 'D5', 'B4', 'G4', 'D5', 'C5', 0, 'E5', 0, 'C5', 0, 0, 0,
];
const BASS5 = ['C4', 'C4', 'F4', 'F4', 'C4', 'A4', 'G4', 'G4'];
const MELODY6 = [
  'A4', 0, 'C5', 'E5', 'D5', 0, 'C5', 'B4', 'A4', 0, 'E4', 'A4', 'B4', 0, 'C5', 0,
  'D5', 0, 'F5', 'E5', 'D5', 0, 'C5', 'A4', 'B4', 0, 'G4', 'B4', 'A4', 0, 0, 0,
  'A4', 0, 'C5', 'E5', 'A5', 0, 'G5', 'E5', 'F5', 0, 'D5', 'F5', 'E5', 0, 'C5', 0,
  'D5', 'E5', 'F5', 'E5', 'D5', 'C5', 'B4', 'C5', 'A4', 0, 'E4', 0, 'A4', 0, 0, 0,
];
const BASS6 = ['A4', 'A4', 'D4', 'D4', 'F4', 'E4', 'A4', 'E4'];
const MELODY7 = [
  'A4', 0, 'C5', 'B4', 'C5', 0, 'A4', 'G4s', 'A4', 0, 'E4', 0, 'G4s', 'A4', 0, 0,
  'D5', 0, 'F5', 'E5', 'D5', 0, 'C5', 'B4', 'C5', 0, 'A4', 'G4s', 'A4', 0, 0, 0,
  'E5', 0, 'E5', 'F5', 'E5', 'D5', 'C5', 0, 'B4', 'C5', 'D5', 0, 'C5', 'B4', 'A4', 0,
  'G4s', 0, 'B4', 'D5', 'F5', 'D5', 'B4', 'G4s', 'A4', 0, 'E4', 0, 'A4', 0, 0, 0,
];
const BASS7 = ['A4', 'A4', 'D4', 'E4', 'A4', 'F4', 'E4', 'E4'];
const MELODY8 = [
  'C4', 0, 'D4s', 'G4', 'D4s', 0, 'C4', 0, 'F4s', 0, 'G4', 0, 'D4s', 0, 'C4', 0,
  'C5', 0, 'G4', 'D4s', 'C5', 0, 'G4', 'F4s', 'G4', 0, 'D4s', 0, 'C4', 0, 0, 0,
  'C4', 'D4s', 'F4s', 'G4', 'C5', 'G4', 'F4s', 'D4s', 'C4', 0, 'G4', 0, 'D4s', 0, 'C4', 0,
  'D5s', 0, 'C5', 'G4', 'F4s', 0, 'G4', 0, 'D4s', 0, 'C4', 0, 0, 0, 0, 0,
];
const BASS8 = ['C4', 'C4', 'F4s', 'G4', 'C4', 'D4s', 'F4s', 'G4'];
const MUS = [[MELODY, BASS], [MELODY2, BASS2], [MELODY3, BASS3], [MELODY4, BASS4], [MELODY5, BASS5], [MELODY6, BASS6], [MELODY7, BASS7], [MELODY8, BASS8]];
let variant = 0;
const STEP = 0.2;

function schedule() {
  if (!ctx) return;
  while (nextT < ctx.currentTime + 0.4) {
    const [M, B] = MUS[variant] || MUS[0], n = M[step % M.length];
    const when = Math.max(0, nextT - ctx.currentTime);
    if (n) tone(N[n], STEP * 1.6, 'square', 0.35, null, when, musicGain);
    if (step % 8 === 0) tone(N[B[(step / 8) % B.length | 0]] / 2, STEP * 6, 'triangle', 0.8, null, when, musicGain);
    if (step % 2 === 0) noise(0.03, 0.05, 6000, when);
    step++; nextT += variant ? STEP * 0.85 : STEP;
  }
}
export function startMusic(v = 0) {
  variant = v;
  if (!ctx || timer) return;
  nextT = ctx.currentTime + 0.1; step = 0;
  timer = setInterval(schedule, 100);
}
export function stopMusic() { if (timer) { clearInterval(timer); timer = null; } }
