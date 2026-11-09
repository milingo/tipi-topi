import { SFX } from './audio.js';
import { GROUND_Y } from './level1.js';
import { getSave } from './save.js';
import { byId, HEAD, skinTint } from './shop.js';

const INK = 0x2b2b44;
const rectOf = (o) => new Phaser.Geom.Rectangle(o.x - o.width / 2, o.y - o.height / 2, o.width, o.height);
export const overlaps = (a, b) => Phaser.Geom.Intersects.RectangleToRectangle(a, b);

function drawLeg(g, hx, hy, fx, fy, color, w) {
  g.lineStyle(w, color, 1);
  g.beginPath(); g.moveTo(hx, hy); g.lineTo(fx, fy); g.strokePath();
  g.fillStyle(color, 1); g.fillCircle(fx, fy, w * 0.55);
}

// ───────────────────────── Jugador ─────────────────────────
// Tres personajes jugables. atk: eye = embestida con el ojo, cane = bastonazo, bite = mordisco (y pedo cohete en el aire)
export const CHARS = {
  tipi:   { id: 'tipi',   key: 'hero',   name: 'Tipi-Topi', W: 44, H: 112, scale: 0.27, imgY: 39, hipY: 72, legX: 13, legW: 8, run: 300, jump: -800, air: -740, atk: 'eye' },
  abuelo: { id: 'abuelo', key: 'abuelo', name: 'Abuelo',    W: 46, H: 112, scale: 0.27, imgY: 39, hipY: 72, legX: 13, legW: 7, run: 265, jump: -790, air: -730, atk: 'cane' },
  cucurella: { id: 'cucurella', key: 'cucurella', name: 'Cucurella', W: 46, H: 112, scale: 0.27, imgY: 36, hipY: 72, legX: 13, legW: 8, run: 305, jump: -800, air: -740, atk: 'paella' },
  adulto: { id: 'adulto', key: 'adulto', name: 'Adulto', W: 46, H: 112, scale: 0.27, imgY: 36, hipY: 72, legX: 13, legW: 8, run: 285, jump: -790, air: -730, atk: 'cafe' },
  adolescente: { id: 'adolescente', key: 'adolescente', name: 'Adolescente', W: 46, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 315, jump: -800, air: -740, atk: 'movil' },
  perro: { id: 'perro', key: 'perro', name: 'Perro', W: 46, H: 112, scale: 0.27, imgY: 42, hipY: 72, legX: 13, legW: 8, run: 325, jump: -810, air: -750, atk: 'lamer' },
  gato: { id: 'gato', key: 'gato', name: 'Gato', W: 44, H: 112, scale: 0.27, imgY: 41, hipY: 72, legX: 12, legW: 7, run: 330, jump: -820, air: -760, atk: 'arana', extra: 2 },
  panda: { id: 'panda', key: 'panda', name: 'Panda', W: 46, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 290, jump: -800, air: -740, atk: 'roll' },
  futurista: { id: 'futurista', key: 'futurista', name: 'Futurista', W: 46, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 335, jump: -830, air: -760, atk: 'laser' },
  slimey: { id: 'slimey', key: 'slimey', name: 'Slime', W: 46, H: 112, scale: 0.27, imgY: 42, hipY: 72, legX: 13, legW: 8, run: 300, jump: -810, air: -750, atk: 'slimeball' },
  cientifico: { id: 'cientifico', key: 'cientifico', name: 'Científico', W: 46, H: 112, scale: 0.27, imgY: 36, hipY: 72, legX: 13, legW: 8, run: 290, jump: -790, air: -730, atk: 'frasco' },
  granny: { id: 'granny', key: 'granny', name: 'Granny', W: 46, H: 112, scale: 0.27, imgY: 37, hipY: 72, legX: 13, legW: 8, run: 255, jump: -780, air: -720, atk: 'bolso', tool: 'bolso' },
  astro: { id: 'astro', key: 'astro', name: 'Astro', W: 46, H: 112, scale: 0.27, imgY: 41, hipY: 72, legX: 13, legW: 8, run: 305, jump: -810, air: -750, atk: 'queso' },
  mariachi: { id: 'mariachi', key: 'mariachi', name: 'Mariachi', W: 46, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 300, jump: -800, air: -740, atk: 'nota' },
  pirata: { id: 'pirata', key: 'pirata', name: 'Pirata', W: 46, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 290, jump: -800, air: -740, atk: 'cane', tool: 'sable' },
  caquita: { id: 'caquita', key: 'caquita', name: 'Caquita', W: 46, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 300, jump: -800, air: -740, atk: 'caca', extra: 2 },
  cacazilla: { id: 'cacazilla', key: 'cacazilla', name: 'Cacazilla', W: 48, H: 112, scale: 0.27, imgY: 40, hipY: 72, legX: 13, legW: 8, run: 290, jump: -800, air: -740, atk: 'cacak' },
  bacteria: { id: 'bacteria', key: 'bacteria', name: 'Bacteria', W: 48, H: 112, scale: 0.27, imgY: 44, hipY: 72, legX: 13, legW: 8, run: 305, jump: -800, air: -740, atk: 'bact' },
  unicornio: { id: 'unicornio', key: 'unicornio', name: 'Unicornio', W: 48, H: 112, scale: 0.27, imgY: 44, hipY: 72, legX: 13, legW: 8, run: 305, jump: -810, air: -750, atk: 'taco' },
  ninja: { id: 'ninja', key: 'ninja', name: 'Ninja', W: 46, H: 112, scale: 0.27, imgY: 44, hipY: 72, legX: 13, legW: 8, run: 330, jump: -820, air: -760, atk: 'espadaj' },
  chupa: { id: 'chupa', key: 'chupa', name: 'Chupa', W: 46, H: 112, scale: 0.27, imgY: 44, hipY: 72, legX: 13, legW: 8, run: 305, jump: -810, air: -750, atk: 'lamer' },
  ojitos: { id: 'ojitos', key: 'ojitos', name: 'Ojitos', W: 50, H: 112, scale: 0.27, imgY: 46, hipY: 72, legX: 13, legW: 8, run: 305, jump: -810, air: -750, atk: 'ojito' },
  oso: { id: 'oso', key: 'oso', name: 'Oso pirado', W: 50, H: 112, scale: 0.27, imgY: 46, hipY: 72, legX: 13, legW: 8, run: 300, jump: -800, air: -740, atk: 'miel' },
  monalisa: { id: 'monalisa', key: 'monalisa', name: 'Mona Lisa', W: 48, H: 112, scale: 0.27, imgY: 44, hipY: 72, legX: 13, legW: 8, run: 295, jump: -800, air: -740, atk: 'marco' },
  bebe:   { id: 'bebe',   key: 'bebe',   name: 'Bebé',      W: 38, H: 92,  scale: 0.25, imgY: 32, hipY: 59, legX: 11, legW: 7, run: 335, jump: -830, air: -770, atk: 'bite' },
};

export class Player {
  constructor(scene, x, y, charId = 'tipi') {
    this.scene = scene; this.c = CHARS[charId] || CHARS.tipi;
    this.W = this.c.W; this.H = this.c.H;
    this.hit = scene.add.rectangle(x, y, this.W, this.H, 0xff0000, 0);
    scene.physics.add.existing(this.hit);
    this.hit.body.setMaxVelocity(700, 1200).setCollideWorldBounds(true).setGravityY(scene.L && scene.L.lowg ? -1000 : -300);
    this.body = scene.add.image(x, y, this.c.key + '_normal').setScale(this.c.scale).setDepth(6);
    this.legs = scene.add.graphics().setDepth(5);
    this.cane = this.c.atk === 'cane' || this.c.atk === 'bolso' ? scene.add.image(x, y, this.c.tool || 'baston').setOrigin(0.66, 0.27).setScale(this.c.tool ? 0.55 : 0.6).setDepth(7) : null;
    this.hp = 5; this.maxHp = 5; this.airJumps = 0; this.spin = 0; this.cutOK = false;
    this.facing = 1; this.phase = 0;
    this.coyote = 0; this.jumpBuf = 0; this.wasGround = false;
    this.invuln = 0; this.stun = 0; this.cool = 0; this.attack = 0; this.attackLen = 0.28; this.attackHits = new Set();
    this.shots = []; this.fartT = 0; this.fartHits = new Set(); this.fartX = 0; this.fartY = 0; this.farted = false;
    this.expr = 'normal'; this.exprT = 0; this.blinkT = 2 + Math.random() * 2; this.blink = 0;
    this.slow = 0; this.slimeT = 0; this.pigT = 0; this.macT = 0; this.fat = 0; this.shield = 0; this.cera = 0; this.estaca = false; this.wTime = 0; this.wHits = new Set(); this.stakeT = 0; this.stakeHits = new Set(); this.sx = 1; this.sy = 1; this.dead = false; this.fx = scene.add.graphics().setDepth(7);
    this.loadout();
  }
  // objetos comprados y puestos en la tienda
  loadout() {
    const eq = getSave().equip, hat = eq.hat && byId(eq.hat), wp = eq.weapon && byId(eq.weapon), sk = eq.skin && byId(eq.skin), tr = eq.trail && byId(eq.trail), sc = this.scene;
    this.hatDef = hat || null; this.hatImg = hat ? sc.add.image(0, 0, hat.img).setOrigin(0.5, hat.oy).setDepth(6.5) : null;
    this.wDef = wp || null; this.wImg = wp ? sc.add.image(0, 0, wp.img).setOrigin(0.5, 0.94).setScale(wp.ws || 0.4).setDepth(7.2) : null;
    this.skinTint = sk ? sk.tint : null; this.trailId = tr ? tr.id : null; this.stakeImg = null; this.trailEm = null;
    const TR = { trail_chicles: ['bub',{lifespan:900,speedY:{min:-30,max:10},speedX:{min:-30,max:30},scale:{start:0.5,end:1.0},alpha:{start:0.9,end:0},tint:[0xff80d0,0xff5da8,0xffb0e0]}], trail_lagrimas: ['px',{lifespan:600,speedY:{min:40,max:120},speedX:{min:-15,max:15},scale:{start:2.6,end:0.8},tint:[0x6ab0ff,0xa8d8ff]}], trail_ceniza: ['px',{lifespan:1000,speedY:{min:-40,max:-5},speedX:{min:-30,max:30},scale:{start:2.4,end:0.4},alpha:{start:0.8,end:0},tint:[0x707078,0xa0a0a8,0x505058]}], trail_mariposas: ['star',{lifespan:900,speed:{min:20,max:80},scale:{start:0.6,end:0},angle:{min:0,max:360},tint:[0xff9ad0,0x9ad8ff,0xffe27a,0xb57bff]}], trail_alemania: ['star',{lifespan:650,speed:{min:10,max:60},scale:{start:0.5,end:0},angle:{min:0,max:360},tint:[0x202020,0xd02a2a,0xffcc00]}], trail_portugal: ['star',{lifespan:650,speed:{min:10,max:60},scale:{start:0.5,end:0},angle:{min:0,max:360},tint:[0x1f9a3a,0xd02a2a,0xffcc00]}], trail_japon: ['star',{lifespan:650,speed:{min:10,max:60},scale:{start:0.5,end:0},angle:{min:0,max:360},tint:[0xffffff,0xd02a2a]}], trail_brasil: ['star',{lifespan:650,speed:{min:10,max:60},scale:{start:0.5,end:0},angle:{min:0,max:360},tint:[0x1f9a3a,0xffdd00,0x2a4ad0]}], trail_arcoiris2: ['star',{lifespan:800,speed:{min:30,max:110},scale:{start:0.8,end:0},angle:{min:0,max:360},tint:[0xff4a4a,0xffa02a,0xffee40,0x4acf4a,0x4a9aff,0xb04aff]}], trail_pizzas: ['px',{lifespan:800,speedY:{min:-20,max:30},speedX:{min:-30,max:30},scale:{start:3,end:0.8},tint:[0xffcd5a,0xe14b3b,0x7ed957]}], trail_luciernagas: ['spark',{lifespan:1100,speed:{min:5,max:40},scale:{start:1.0,end:0},angle:{min:0,max:360},tint:[0xeeff60,0xb8ff60]}], trail_slime: ['bub',{lifespan:900,speedY:{min:5,max:40},speedX:{min:-15,max:15},scale:{start:0.7,end:0.3},alpha:{start:0.9,end:0},tint:[0x6ae04a,0x9aff6a]}], trail_neon2: ['spark',{lifespan:600,speed:{min:20,max:100},scale:{start:1.3,end:0},angle:{min:0,max:360},tint:[0xff40ff,0x40ffff,0xffff40,0x40ff40]}], trail_rosas: ['px',{lifespan:1000,speedY:{min:10,max:50},speedX:{min:-40,max:40},scale:{start:3.2,end:0.8},tint:[0xff6a8a,0xff9ab0,0xffc0d0]}], trail_mexico: ['star', { lifespan: 650, speed: { min: 10, max: 60 }, scale: { start: 0.5, end: 0 }, angle: { min: 0, max: 360 }, tint: [0x1f9a3a, 0xffffff, 0xd02a2a] }], trail_francia: ['star', { lifespan: 650, speed: { min: 10, max: 60 }, scale: { start: 0.5, end: 0 }, angle: { min: 0, max: 360 }, tint: [0x2a4ad0, 0xffffff, 0xd02a2a] }], trail_italia: ['star', { lifespan: 650, speed: { min: 10, max: 60 }, scale: { start: 0.5, end: 0 }, angle: { min: 0, max: 360 }, tint: [0x1f9a3a, 0xffffff, 0xd02a2a] }], trail_rayos: ['spark', { lifespan: 300, speed: { min: 60, max: 160 }, scale: { start: 1.4, end: 0 }, angle: { min: 0, max: 360 }, tint: [0xffee40, 0xffffff] }], trail_humo: ['bub', { lifespan: 1000, speedY: { min: -50, max: -15 }, speedX: { min: -20, max: 20 }, scale: { start: 0.5, end: 1.3 }, alpha: { start: 0.6, end: 0 }, tint: 0x9a9aa8 }], trail_flores: ['px', { lifespan: 900, speedY: { min: -30, max: 10 }, speedX: { min: -30, max: 30 }, scale: { start: 3.6, end: 0.6 }, tint: [0xff7eb6, 0xffe14d, 0xffffff, 0xb57bff] }], trail_galaxia: ['star', { lifespan: 900, speed: { min: 10, max: 70 }, scale: { start: 0.6, end: 0 }, angle: { min: 0, max: 360 }, tint: [0x7a4aff, 0xff5dc8, 0x4acaff, 0xffffff] }], trail_hielo: ['star', { lifespan: 700, speed: { min: 10, max: 50 }, scale: { start: 0.5, end: 0 }, angle: { min: 0, max: 360 }, tint: [0xc8f0ff, 0x80d0ff, 0xffffff] }], trail_lluvia: ['px', { lifespan: 500, speedY: { min: 120, max: 220 }, speedX: { min: -10, max: 10 }, scale: { start: 1.6, end: 1 }, tint: 0x6ab0ff }], trail_pompas: ['bub', { lifespan: 1100, speedY: { min: -40, max: -10 }, speedX: { min: -25, max: 25 }, scale: { start: 0.4, end: 1.1 }, alpha: { start: 0.9, end: 0 }, tint: [0xffffff, 0xd8f0ff, 0xffd8f0] }], trail_fugaces: ['star', { lifespan: 500, speedX: { min: -220, max: -120 }, speedY: { min: -30, max: 30 }, scale: { start: 0.5, end: 0 }, tint: [0xffffff, 0xfff0a0] }], trail_purpurina: ['px', { lifespan: 700, speed: { min: 10, max: 80 }, scale: { start: 2.4, end: 0 }, angle: { min: 0, max: 360 }, tint: [0xffe27a, 0xff9ad0, 0x9ad8ff, 0xffffff] }], trail_gominolas: ['bolita', { lifespan: 800, speedY: { min: -60, max: -10 }, speedX: { min: -40, max: 40 }, scale: { start: 0.3, end: 0.05 }, alpha: { start: 1, end: 0 }, tint: [0xff5d8f, 0xffb347, 0x7ed957, 0x4cc9f0] }], trail_espana: ['star', { lifespan: 650, speed: { min: 10, max: 60 }, scale: { start: 0.5, end: 0 }, angle: { min: 0, max: 360 }, tint: [0xc60b1e, 0xffc400] }], trail_corazones: ['heart', { lifespan: 800, speedY: { min: -70, max: -30 }, speedX: { min: -25, max: 25 }, scale: { start: 0.7, end: 0.15 }, alpha: { start: 1, end: 0 }, tint: [0xff5d8f, 0xff9ab8, 0xff3a6a] }], trail_notas: ['nota', { lifespan: 800, speedY: { min: -60, max: -20 }, speedX: { min: -30, max: 30 }, scale: { start: 0.32, end: 0.1 }, alpha: { start: 1, end: 0 }, rotate: { min: -30, max: 30 } }], trail_nieve: ['px', { lifespan: 900, speedY: { min: 10, max: 50 }, speedX: { min: -30, max: 30 }, scale: { start: 2.6, end: 0.6 }, tint: [0xffffff, 0xd8f0ff] }], trail_hojas: ['px', { lifespan: 900, speedY: { min: 10, max: 60 }, speedX: { min: -50, max: 50 }, scale: { start: 3, end: 0.8 }, rotate: { min: 0, max: 360 }, tint: [0x5ac85a, 0xa0d848, 0xe8a030, 0xd86a2a] }], trail_oro: ['star', { lifespan: 700, speed: { min: 10, max: 70 }, scale: { start: 0.55, end: 0 }, angle: { min: 0, max: 360 }, tint: [0xffe27a, 0xffc830, 0xfff6b0] }], trail_noche: ['star', { lifespan: 800, speed: { min: 10, max: 50 }, scale: { start: 0.45, end: 0 }, angle: { min: 0, max: 360 }, tint: [0x8a6aff, 0x4a90ff, 0xc8a8ff] }], trail_caca: ['caca_p', { lifespan: 700, speedY: { min: -30, max: 0 }, speedX: { min: -20, max: 20 }, scale: { start: 0.28, end: 0.1 }, alpha: { start: 1, end: 0 } }], trail_lava: ['spark', { lifespan: 700, speedY: { min: -60, max: -10 }, speedX: { min: -30, max: 30 }, scale: { start: 1.6, end: 0 }, tint: [0xff2a0a, 0xc81408, 0xff7a1a] }], trail_estrellas: ['star', { lifespan: 500, speed: { min: 10, max: 50 }, scale: { start: 0.45, end: 0 }, angle: { min: 0, max: 360 } }], trail_burbujas: ['bub', { lifespan: 800, speedY: { min: -60, max: -25 }, speedX: { min: -20, max: 20 }, scale: { start: 0.7, end: 0.2 }, alpha: { start: 0.9, end: 0 }, tint: 0x9be8ff }], trail_fuego: ['spark', { lifespan: 450, speedY: { min: -90, max: -30 }, speedX: { min: -25, max: 25 }, scale: { start: 1.2, end: 0 }, tint: [0xff5a1a, 0xffa02a, 0xffe14d] }], trail_arco: ['px', { lifespan: 700, speed: 0, scale: { start: 3.4, end: 0.5 }, tint: [0xff5d8f, 0xffb347, 0xffe14d, 0x7ed957, 0x4cc9f0, 0xb57bff] }] };
    if (tr && TR[tr.id]) this.trailEm = sc.add.particles(0, 0, TR[tr.id][0], { emitting: false, ...TR[tr.id][1] }).setDepth(5.5);
  }
  get x() { return this.hit.x; } get y() { return this.hit.y; }
  get vx() { return this.hit.body.velocity.x; } get vy() { return this.hit.body.velocity.y; }
  get onGround() { return this.hit.body.blocked.down || this.hit.body.touching.down; }
  get bottom() { return this.hit.y + this.H / 2; }
  bounds() { return rectOf(this.hit); }
  // zonas que hacen daño ahora mismo: [{ rect, hits }]
  strikes() {
    const out = [], f = this.facing, R = (x, y, w, h) => new Phaser.Geom.Rectangle(x, y, w, h);
    if (this.attack > 0) {
      if (this.c.atk === 'eye') out.push({ rect: R(this.x + (f > 0 ? 4 : -72), this.y - 50, 68, 96), hits: this.attackHits });
      else if (this.c.atk === 'bolso') { if (this.attack < this.attackLen * 0.75) out.push({ rect: R(this.x + (f > 0 ? 6 : -100), this.y - 52, 94, 100), hits: this.attackHits }); }
      else if (this.c.atk === 'roll') out.push({ rect: R(this.x - 56, this.y - 58, 112, 116), hits: this.attackHits });
      else if (this.c.atk === 'lamer' || this.c.atk === 'arana') { /* más abajo */ }
      else if (this.c.atk === 'cane') { if (this.attack < this.attackLen * 0.75) out.push({ rect: R(this.x + (f > 0 ? 6 : -126), this.y - 60, 120, 104), hits: this.attackHits }); }
      else out.push({ rect: R(this.x + (f > 0 ? 0 : -60), this.y - 34, 60, 74), hits: this.attackHits });
    }
    const A = this.c.atk;
    if (this.attack > 0 && A === 'lamer') out.push({ rect: R(this.x + (f > 0 ? 8 : -104), this.y - 22, 96, 60), hits: this.attackHits });
    if (this.attack > 0 && A === 'arana') out.push({ rect: R(this.x + (f > 0 ? 2 : -90), this.y - 46, 88, 92), hits: this.attackHits });
    if (this.stakeT > 0) out.push({ rect: R(this.x + (f > 0 ? 18 : -168), this.y - 20, 150, 40), hits: this.stakeHits });
    if (this.wTime > 0 && this.wDef) {
      if (this.wDef.wk === 'tajo') out.push({ rect: R(this.x + (f > 0 ? 4 : -4 - this.wDef.reach), this.y - 48, this.wDef.reach, 96), hits: this.wHits });
      else if (this.wDef.wk === 'lados') out.push({ rect: R(this.x - this.wDef.reach, this.y - 70, this.wDef.reach * 2, 130), hits: this.wHits });
    }
    for (const sh of this.shots) out.push({ rect: R(sh.x - sh.w / 2, sh.y - sh.h / 2, sh.w, sh.h), hits: sh.hits, friend: !!sh.friend, kill: !!sh.kill });
    if (this.fartT > 0.3) out.push({ rect: R(this.fartX - 56, this.fartY - 50, 112, 100), hits: this.fartHits });
    return out;
  }
  setExpr(e, t) { this.expr = e; this.exprT = t; }

  startAttack(inp) {
    if (this.estaca) { this.stakeT = 0.3; this.stakeHits.clear(); this.cool = 0.42; this.setExpr('angry', 0.35); SFX.cane(); return; }
    this.startAttack0(inp);
    if (this.wDef) {
      this.wTime = this.wDef.dur || 0.3; this.wHits.clear();
      if (this.wDef.wk === 'tiro') this.throwShot(this.wDef.shot);
      else if (this.wDef.heavy) { this.cool = Math.max(this.cool, 0.5); this.scene.cameras.main.shake(80, 0.004); }
    }
  }
  startAttack0(inp) {
    const b = this.hit.body, s = this.scene, t = this.c.atk;
    if ((t === 'bite' || t === 'caca') && !this.onGround && !this.farted) {
      // ¡pedo cohete! una nube verde que hace daño y te lanza hacia delante
      this.farted = true; this.fartT = 0.8; this.fartHits.clear(); this.cool = 0.35; this.cutOK = false;
      this.fartX = this.x - this.facing * 34; this.fartY = this.y + 26;
      b.setVelocityY(-620); b.setVelocityX(this.facing * 330); this.sx = 0.8; this.sy = 1.3; this.setExpr('closed', 0.5);
      SFX.fart(); s.gas(this.fartX, this.fartY, 14); return;
    }
    this.attackHits.clear();
    if (t === 'cacak' && !this.onGround) { this.throwShot('caca'); return; } // en el aire: caca amiga
    if (t === 'bolso') { this.attack = this.attackLen = 0.3; this.cool = 0.42; this.setExpr('angry', 0.4); SFX.cane(); return; }
    if (t === 'roll') { this.attack = this.attackLen = 0.6; this.cool = 0.9; this.setExpr('closed', 0.6); SFX.charge(); return; }
    if (t === 'espadaj' || t === 'ojito' || t === 'miel' || t === 'paella' || t === 'cafe' || t === 'movil' || t === 'laser' || t === 'slimeball' || t === 'frasco' || t === 'queso' || t === 'nota' || t === 'caca' || t === 'cacak' || t === 'marco' || t === 'bact' || t === 'taco') { this.throwShot(t); return; }
    if (t === 'lamer') { this.attack = this.attackLen = 0.26; this.cool = 0.34; this.setExpr('closed', 0.3); SFX.bite(); return; }
    if (t === 'arana') { this.attack = this.attackLen = 0.18; this.cool = 0.2; this.setExpr('angry', 0.25); SFX.cane(); return; }
    if (t === 'eye') { this.attack = this.attackLen = 0.28; this.cool = 0.42; this.setExpr('angry', 0.4); SFX.bump(); b.setVelocityY(Math.min(this.vy, -60)); }
    else if (t === 'cane') { this.attack = this.attackLen = 0.36; this.cool = 0.5; this.setExpr('angry', 0.4); SFX.cane(); }
    else { this.attack = this.attackLen = 0.24; this.cool = 0.34; this.setExpr('bite', 0.3); SFX.bite(); }
  }

  throwShot(t) {
    const f = this.facing, s = this.scene;
    const base = { x: this.x + f * 24, y: this.y - 6, vx: 0, vy: 0, g: 0, age: 0, hits: new Set(), kind: t, dead: false, f };
    this.setExpr('angry', 0.35); this.cool = 0.5;
    if (t === 'paella') {
      if (this.onGround) Object.assign(base, { key: 'paella', sc: 0.42, w: 60, h: 44, vx: f * 560, life: 0.6, y: this.y + 12 });
      else { this.cool = 0.45; Object.assign(base, { key: 'balon', sc: 0.5, w: 44, h: 44, vx: f * 430, vy: 140, g: 1000, life: 2.2, bounce: true }); }
    } else if (t === 'cafe') { this.cool = 0.55; Object.assign(base, { key: 'cafe', sc: 0.5, w: 54, h: 54, vx: f * 340, vy: -430, g: 1100, life: 1.6, splash: true }); }
    else if (t === 'laser') { this.cool = 0.32; Object.assign(base, { key: 'laser', sc: 0.5, w: 70, h: 16, vx: f * 780, life: 0.8, norot: true }); }
    else if (t === 'slimeball') { this.cool = 0.42; Object.assign(base, { key: 'bolita', sc: 0.5, w: 40, h: 40, vx: f * 400, vy: -200, g: 1100, life: 2, bounce: true }); }
    else if (t === 'frasco') { this.cool = 0.6; Object.assign(base, { key: 'frasco', sc: 0.5, w: 44, h: 56, vx: f * 320, vy: -440, g: 1100, life: 1.6, pool: true }); }
    else if (t === 'queso') { this.cool = 0.38; Object.assign(base, { key: 'queso_p', sc: 0.5, w: 46, h: 40, vx: f * 480, vy: -150, g: 800, life: 1.8, bounce: true }); }
    else if (t === 'nota') { this.cool = 0.33; Object.assign(base, { key: 'nota', sc: 0.6, w: 44, h: 50, vx: f * 540, life: 0.9, pierce: true, norot: true }); }
    else if (t === 'bact') { this.cool = 0.3; Object.assign(base, { key: 'bact_p', sc: 0.7, w: 40, h: 28, vx: f * 540, life: 1.1, pierce: true, norot: true }); }
    else if (t === 'espadaj') { this.cool = 0.34; Object.assign(base, { key: 'espada', sc: 0.6, w: 56, h: 24, vx: f * 560, life: 1.2, norot: true }); }
    else if (t === 'ojito') { this.cool = 0.4; Object.assign(base, { key: 'ojito_p', sc: 0.5, w: 40, h: 36, vx: f * 420, vy: -120, g: 420, life: 2.2 }); }
    else if (t === 'miel') { this.cool = 0.5; Object.assign(base, { key: 'miel_p', sc: 0.55, w: 44, h: 50, vx: f * 360, vy: -420, g: 1100, life: 1.6, pool: true }); }
    else if (t === 'taco') { this.cool = 0.4; Object.assign(base, { key: 'taco_p', sc: 0.55, w: 46, h: 36, vx: f * 480, vy: -170, g: 800, life: 1.8, bounce: true }); }
    else if (t === 'caca') { this.cool = 0.45; Object.assign(base, { key: 'caca_p', sc: 0.5, w: 44, h: 40, vx: f * 420, vy: -260, g: 1000, life: 1.8, splash: true, friend: true }); }
    else if (t === 'cacak') { this.cool = 0.5; Object.assign(base, { key: 'cacak_p', sc: 0.55, w: 48, h: 44, vx: f * 460, vy: -230, g: 1000, life: 1.8, splash: true, kill: true }); }
    else if (t === 'marco') { if (this.shots.length) return; this.cool = 0.2; Object.assign(base, { key: 'marco', sc: 0.5, w: 46, h: 56, life: 1.05, boom: true, pierce: true }); }
    else if (t === 'estrella') { this.cool = 0.3; Object.assign(base, { key: 'star', sc: 0.7, w: 40, h: 40, vx: f * 640, life: 0.75, pierce: true }); }
    else { if (this.shots.length) return; this.cool = 0.2; Object.assign(base, { key: 'movil', sc: 0.5, w: 44, h: 60, life: 1.05, boom: true, pierce: true }); }
    base.img = s.add.image(base.x, base.y, base.key).setScale(base.sc).setDepth(8).setFlipX(base.norot && f < 0);
    this.shots.push(base); SFX.bump();
  }
  updateShots(dt) {
    const gy = GROUND_Y - 24, spawn = [];
    for (const sh of this.shots) {
      sh.age += dt;
      if (sh.boom) { const u = sh.age / sh.life; sh.x = this.x + sh.f * 330 * Math.sin(Math.PI * u); sh.y = this.y - 6; if (u >= 1) sh.dead = true; sh.img.rotation += dt * 16; }
      else {
        sh.vy += sh.g * dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
        if (!sh.norot) sh.img.rotation += dt * (sh.kind === 'paella' && sh.key === 'paella' ? 14 : 9) * sh.f;
        if (sh.bounce && sh.y > gy && sh.vy > 0) { sh.vy = -sh.vy * 0.8; sh.y = gy; }
        if (sh.splash && sh.y > gy && sh.vy > 0) { sh.dead = true; this.scene.burst(sh.x, gy, 8); }
        if (sh.pool && sh.y > gy && sh.vy > 0) {
          sh.dead = true; this.scene.burst(sh.x, gy, 8); SFX.splat();
          spawn.push({ x: sh.x, y: gy + 12, vx: 0, vy: 0, g: 0, age: 0, hits: new Set(), kind: 'charco', dead: false, f: 1, w: 130, h: 40, life: 0.8, pierce: true, norot: true, img: this.scene.add.image(sh.x, gy + 24, 'charco').setOrigin(0.5, 1).setScale(0.6).setDepth(3.5) });
        }
        if (sh.age > sh.life) sh.dead = true;
      }
      if (!sh.pierce && sh.hits.size > 0) { sh.dead = true; this.scene.burst(sh.x, sh.y, 7); }
      sh.img.setPosition(sh.x, sh.y);
    }
    this.shots = this.shots.filter((sh) => { if (sh.dead) sh.img.destroy(); return !sh.dead; }).concat(spawn);
  }
  update(dt, inp) {
    const b = this.hit.body, s = this.scene, C = this.c;
    this.updateShots(dt);
    for (const k of ['invuln', 'stun', 'cool', 'attack', 'exprT', 'blink', 'jumpBuf', 'coyote', 'spin', 'fartT', 'slow', 'slimeT', 'pigT', 'macT', 'cera', 'wTime', 'stakeT', 'shield']) if (this[k] > 0) this[k] = Math.max(0, this[k] - dt);
    if (this.exprT <= 0 && this.expr !== 'normal' && this.expr !== 'sad') this.expr = 'normal';
    if (this.expr === 'sad' && this.invuln <= 0 && this.exprT <= 0) this.expr = 'normal';
    const ground = this.onGround;
    if (ground) { this.coyote = 0.1; this.airJumps = 0; this.farted = false; if (!this.wasGround && this.vy >= 0) { SFX.land(); this.sx = 1.25; this.sy = 0.78; s.dust(this.x, this.bottom); } }
    this.wasGround = ground;
    if (this.dead) { b.setVelocityX(0); return this.render(dt); }

    const dir = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
    const lunge = this.attack > 0 && (C.atk === 'eye' || C.atk === 'bite' || C.atk === 'roll');
    if (this.stun <= 0 && !lunge) {
      const target = dir * C.run * (this.attack > 0 ? 0.55 : 1) * (this.slow > 0 ? 0.5 : 1) * (this.pigT > 0 ? 0.75 : 1) * (this.macT > 0 ? 0.5 : 1) * (1 - 0.4 * this.fat), k = ground ? 16 : 9;
      b.setVelocityX(this.vx + (target - this.vx) * Math.min(1, dt * k));
      if (dir) this.facing = dir;
    } else if (lunge && this.stun <= 0) {
      b.setVelocityX(this.facing * (C.atk === 'eye' ? 520 : C.atk === 'roll' ? 580 : 400));
      if (C.atk === 'roll') this.invuln = Math.max(this.invuln, 0.15);
    }
    if (inp.jumpPressed) this.jumpBuf = 0.12;
    if (this.jumpBuf > 0 && this.coyote > 0 && this.stun <= 0) {
      b.setVelocityY(C.jump * (this.pigT > 0 ? 0.82 : 1) * (this.macT > 0 ? 0.8 : 1) * (1 - 0.18 * this.fat) * (this.scene.L && this.scene.L.lowg ? 0.72 : 1)); this.cutOK = true; this.jumpBuf = 0; this.coyote = 0; this.sx = 0.8; this.sy = 1.28; SFX.jump(); s.dust(this.x, this.bottom);
    } else if (this.jumpBuf > 0 && !ground && this.coyote <= 0 && this.airJumps < (C.extra || 1) && this.stun <= 0) {
      if (this.c.atk === 'caca') { SFX.fart(); s.gas(this.x, this.bottom, 6); }
      this.airJumps++; this.cutOK = true; this.jumpBuf = 0; b.setVelocityY(C.air * (this.scene.L && this.scene.L.lowg ? 0.72 : 1)); this.spin = 0.4; this.sx = 0.8; this.sy = 1.25; SFX.jump2(); s.confetti(this.x, this.bottom, 12);
    }
    if (this.cutOK && !inp.jumpHeld && this.vy < -300 && this.spin <= 0.2) b.setVelocityY(this.vy * 0.6 > -300 ? -300 : this.vy * 0.6); // salto variable
    if (inp.attackPressed && this.cool <= 0 && this.stun <= 0 && !(this.pigT > 0) && !(this.macT > 0)) this.startAttack(inp);
    if (this.trailId && Math.abs(this.vx) > 90 && (ground || this.trailEm) && Math.random() < 0.45) { const tx = this.x - this.facing * 12, ty = this.bottom - (this.trailEm ? 14 : 8); if (this.trailEm) this.trailEm.emitParticleAt(tx, ty, 1); else if (this.trailId === 'trail_confeti') s.conf.emitParticleAt(tx, ty, 1); else s.particles.emitParticleAt(tx, ty, 1); }
    if (this.attack > 0 && this.attack - dt <= 0 && lunge) b.setVelocityX(this.vx * 0.3);
    // nube de pedo: sigue flotando y echa humo verde
    if (this.fartT > 0) { this.fartY -= 14 * dt; if (Math.random() < 0.6) s.gas(this.fartX + Phaser.Math.Between(-30, 30), this.fartY + Phaser.Math.Between(-20, 20), 1); }
    // parpadeo
    this.blinkT -= dt; if (this.blinkT <= 0) { this.blink = 0.13; this.blinkT = 2 + Math.random() * 3; }
    this.render(dt, dir);
  }

  render(dt, dir = 0) {
    const C = this.c, x = this.x, top = this.y - this.H / 2, ground = this.onGround, moving = ground && Math.abs(this.vx) > 30;
    const lunge = this.attack > 0 && (C.atk === 'eye' || C.atk === 'bite' || C.atk === 'roll');
    const rolling = this.attack > 0 && C.atk === 'roll';
    this.sx += (1 - this.sx) * Math.min(1, dt * 12); this.sy += (1 - this.sy) * Math.min(1, dt * 12);
    let face = this.expr;
    if (face === 'bite' && C.atk !== 'bite') face = 'angry';
    if (this.blink > 0 && face === 'normal') face = 'closed';
    if (this.dead) face = 'sad';
    this.body.setTexture(C.key + '_' + face);
    const bob = moving ? Math.abs(Math.sin(this.phase * 2)) * 4 : 0;
    this.body.setPosition(x + (lunge ? this.facing * 10 : 0), top + C.imgY - bob).setScale(C.scale * (1 + 0.5 * this.fat) * (this.sx + (this.slimeT > 0 ? Math.sin(this.scene.t * 12) * 0.07 : 0)), C.scale * (this.sy + (this.slimeT > 0 ? -0.12 - Math.sin(this.scene.t * 12) * 0.05 : 0)))
      .setFlipX(this.facing < 0).setRotation(Phaser.Math.Clamp(this.vx / 300, -1, 1) * 0.07 + (lunge ? this.facing * 0.2 : 0) + (this.spin > 0 ? (1 - this.spin / 0.4) * Math.PI * 2 * this.facing : 0));
    // patas
    this.legs.clear();
    if (rolling) { this.body.setPosition(x, this.y + 20).setRotation(this.facing * (1 - this.attack / this.attackLen) * Math.PI * 7).setScale(C.scale * 0.9); this.legs.setAlpha(0); }
    const hipY = top + C.hipY - bob, footY = top + this.H;
    if (moving) this.phase += dt * Math.abs(this.vx) / 22;
    else this.phase *= 0.9;
    for (let i = 0; i < 2; i++) {
      const hx = x + (i ? C.legX : -C.legX);
      let fx = hx, fy = footY;
      if (!ground) {
        const up = this.vy < 0;
        fx = hx + (i ? 1 : -1) * (up ? 8 : 11); fy = footY - (up ? 16 : 4);
      } else if (moving) {
        const ph = this.phase + i * Math.PI;
        fx = hx + Math.sin(ph) * 16; fy = footY - Math.max(0, Math.cos(ph)) * 11;
      }
      drawLeg(this.legs, hx, hipY, fx, fy, INK, C.legW);
    }
    // bastón del abuelo: apoyado en el suelo o girando al golpear
    if (this.cane) {
      const f = this.facing;
      this.cane.setOrigin(f < 0 ? 0.34 : 0.66, 0.27);
      if (this.attack > 0) {
        const u = 1 - this.attack / this.attackLen, e = 1 - (1 - u) * (1 - u);
        const r = 1.73 + (4.9 - 1.73) * e;
        this.cane.setPosition(x + f * 10, this.y - 10).setRotation(f > 0 ? r : -r).setFlipX(f < 0);
      } else {
        this.cane.setPosition(x + f * 14, footY - 58 - bob * 0.3).setRotation((f > 0 ? 5.1 : -5.1) + (moving ? Math.sin(this.phase) * 0.08 : 0)).setFlipX(f < 0);
      }
    }
    // estela del golpe
    this.fx.clear();
    if (this.attack > 0 && C.atk === 'eye') {
      this.fx.lineStyle(5, 0xffffff, 0.85);
      for (let i = -1; i <= 1; i++) { const sx = x - this.facing * 34, y = this.y - 6 + i * 22; this.fx.beginPath(); this.fx.moveTo(sx, y); this.fx.lineTo(sx - this.facing * (26 + (i === 0 ? 14 : 0)), y); this.fx.strokePath(); }
    }
    if (this.attack > 0 && (C.atk === 'cane' || C.atk === 'bolso') && this.attack < this.attackLen * 0.75) {
      this.fx.lineStyle(7, 0xffffff, 0.7).beginPath().arc(x, this.y - 10, C.atk === 'bolso' ? 84 : 100, this.facing > 0 ? -1.1 : Math.PI - 0.5, this.facing > 0 ? 0.5 : Math.PI + 1.1, false).strokePath();
    }
    if (this.attack > 0 && C.atk === 'lamer') {
      const u = 1 - this.attack / this.attackLen, L = 96 * Math.sin(Math.min(1, u * 1.6) * Math.PI * 0.5) * (u > 0.7 ? 1 - (u - 0.7) / 0.3 * 0.6 : 1), f = this.facing, y0 = this.y - 2;
      this.fx.lineStyle(14, 0xff7a9c, 1).beginPath().moveTo(x + f * 22, y0).lineTo(x + f * (22 + L), y0 + 6).strokePath().fillStyle(0xff7a9c, 1).fillCircle(x + f * (22 + L), y0 + 6, 11);
      this.fx.lineStyle(3, 0xd2436a, 1).beginPath().moveTo(x + f * 30, y0).lineTo(x + f * (22 + L), y0 + 6).strokePath();
    }
    if (this.attack > 0 && C.atk === 'arana') {
      const f = this.facing, u = 1 - this.attack / this.attackLen;
      this.fx.lineStyle(6, 0xffffff, 0.95);
      for (let i = -1; i <= 1; i++) { const sx = x + f * (24 + u * 18), sy = this.y - 34 + i * 20 + u * 10; this.fx.beginPath().moveTo(sx, sy).lineTo(sx + f * 52, sy + 36).strokePath(); }
    }
    if (this.fartT > 0.1) {
      const a = Math.min(1, this.fartT / 0.3) * 0.5, k = 1 - this.fartT / 0.8;
      this.fx.fillStyle(0x9be564, a).fillCircle(this.fartX, this.fartY, 38 + k * 26).fillStyle(0xd7ff8a, a * 0.8).fillCircle(this.fartX - 18, this.fartY - 10, 22 + k * 14).fillCircle(this.fartX + 20, this.fartY + 8, 20 + k * 12);
    }
    this.slimeT > 0 ? this.body.setTint(0x9be564) : this.pigT > 0 ? this.body.setTint(0xffb0c8) : this.slow > 0 ? this.body.setTint(0xaee4ff) : this.skinTint ? this.body.setTint(skinTint(this.skinTint, this.scene.t)) : this.body.clearTint();
    this.gear();
    // parpadeo de invulnerabilidad
    const vis = !(this.invuln > 0 && Math.floor(this.invuln * 14) % 2 === 0);
    this.body.setAlpha(vis ? 1 : 0.35); this.legs.setAlpha(rolling ? 0 : vis ? 1 : 0.35); if (this.cane) this.cane.setAlpha(vis ? 1 : 0.35);
    for (const o of [this.hatImg, this.wImg, this.stakeImg]) if (o) o.setAlpha(vis ? 1 : 0.35);
  }
  // gorro, arma, estaca, cera en las orejas y hocico de cerdo
  gear() {
    const C = this.c, b = this.body, f = this.facing, hd = HEAD[C.key] || [-0.42, 0, 0.95], cs = Math.cos(b.rotation), sn = Math.sin(b.rotation);
    const ox = hd[1] * b.displayWidth * (b.flipX ? -1 : 1), oy = hd[0] * b.displayHeight, ax = b.x + ox * cs - oy * sn, ay = b.y + ox * sn + oy * cs, bw = hd[2] * b.displayWidth;
    if (this.shield > 0) { const a = 0.35 + 0.15 * Math.sin(this.scene.t * 10); this.fx.fillStyle(0xffd23a, a * 0.5).fillCircle(b.x, b.y, 62).lineStyle(5, 0xffd23a, 0.9).strokeCircle(b.x, b.y, 62); }
    if (this.hatImg) { const h = this.hatDef; this.hatImg.setPosition(ax, ay + 2 + (h.dy || 0) * b.displayHeight).setRotation(b.rotation).setScale(h.k * bw / this.hatImg.width).setVisible(!(this.attack > 0 && C.atk === 'roll')); }
    if (this.wImg) {
      const sw = this.wTime > 0, u = sw ? 1 - this.wTime / (this.wDef.dur || 0.3) : 0;
      this.wImg.setVisible(!this.estaca).setPosition(this.x + f * (sw ? 10 : 30), this.y + (sw ? 0 : 10)).setRotation(f * (sw ? -1.2 + 2.8 * u : 0.35));
    }
    if (this.estaca) {
      if (!this.stakeImg) this.stakeImg = this.scene.add.image(0, 0, 'estaca').setOrigin(0.5, 0.08).setScale(0.55).setDepth(7.5);
      const u = this.stakeT > 0 ? 1 - this.stakeT / 0.3 : 0, th = this.stakeT > 0 ? -f * Math.PI / 2 : -f * 2.62, ext = this.stakeT > 0 ? Math.sin(Math.min(1, u * 1.4) * Math.PI) * 54 : 0;
      this.stakeImg.setPosition(this.x + f * (8 + ext), this.y + (this.stakeT > 0 ? 6 : -4)).setRotation(th);
    }
    const g = this.fx;
    if (this.cera > 0) { g.fillStyle(0xffd23a, 1).lineStyle(2, INK, 1); for (const sgn of [-1, 1]) { g.fillCircle(ax + sgn * bw * 0.46, ay + b.displayHeight * 0.3, 6); g.strokeCircle(ax + sgn * bw * 0.46, ay + b.displayHeight * 0.3, 6); } }
    if (this.pigT > 0) {
      const px = b.x + f * bw * 0.28, py = b.y + b.displayHeight * 0.12;
      g.fillStyle(0xff8fb8, 1).lineStyle(3, INK, 1);
      for (const sgn of [-1, 1]) { g.fillTriangle(ax + sgn * bw * 0.3, ay + 8, ax + sgn * bw * 0.5, ay - 12, ax + sgn * bw * 0.12, ay + 2); }
      g.fillEllipse(px, py, 34, 24); g.strokeEllipse(px, py, 34, 24); g.fillStyle(INK, 1).fillCircle(px - 6, py, 3).fillCircle(px + 6, py, 3);
    }
    if (this.macT > 0) {
      const mx = this.x, by = this.y + 32;
      g.lineStyle(4, INK, 1).fillStyle(0xd0703a, 1);
      const pts = [{ x: mx - 36, y: by - 20 }, { x: mx + 36, y: by - 20 }, { x: mx + 27, y: by + 24 }, { x: mx - 27, y: by + 24 }];
      g.fillPoints(pts, true); g.strokePoints(pts, true);
      g.fillStyle(0xe88a50, 1).fillRoundedRect(mx - 42, by - 32, 84, 16, 6); g.strokeRoundedRect(mx - 42, by - 32, 84, 16, 6);
      const fy = ay - 16;
      g.lineStyle(3, INK, 1).fillStyle(0xff7eb6, 1);
      for (let k = 0; k < 5; k++) { const a = k * 1.2566 + this.scene.t * 2; g.fillCircle(ax + Math.cos(a) * 11, fy + Math.sin(a) * 11, 7); }
      g.fillStyle(0xffe14d, 1).fillCircle(ax, fy, 7); g.strokeCircle(ax, fy, 7);
    }
  }

  // ¡maceta! 4 segundos: vas lento, saltas menos y no puedes atacar
  pot() {
    if (this.macT > 0 || this.invuln > 0 || this.dead) return false;
    this.macT = 4; this.invuln = Math.max(this.invuln, 0.8); SFX.splat(); SFX.boing(); this.scene.confetti(this.x, this.y, 20);
    this.scene.showBanner('¡Maceta!', 'Eres una maceta 4 segundos: no puedes atacar'); return true;
  }
  bounce(strong) { this.airJumps = 0; this.cutOK = false; this.hit.body.setVelocityY(strong ? -780 : -620); this.sx = 0.85; this.sy = 1.2; }

  hurt(fromX) {
    if (this.invuln > 0 || this.dead || this.shield > 0) return false;
    this.hp--; this.invuln = 2.2; this.stun = 0.3; this.attack = 0;
    this.setExpr('closed', 0.5); SFX.hurt();
    if (this.c.atk === 'bite') { this.scene.time.delayedCall(250, () => { SFX.fart(); this.scene.gas(this.x - this.facing * 20, this.y + 20, 10); }); } // el bebé se asusta y se tira un pedo
    const d = this.x < fromX ? -1 : 1;
    this.hit.body.setVelocity(d * 300, -420);
    this.scene.cameras.main.shake(180, 0.008);
    this.scene.time.delayedCall(520, () => { if (!this.dead) this.setExpr('sad', 0.9); });
    if (this.hp <= 0) this.dead = true;
    return true;
  }
  reset(x, y) {
    this.hit.setPosition(x, y); this.hit.body.setVelocity(0, 0); this.invuln = 2; this.stun = 0; this.attack = 0; this.dead = false;
  }
  destroy() { this.shots.forEach((q) => q.img.destroy()); if (this.trailEm) this.trailEm.destroy(); [this.hit, this.body, this.legs, this.fx, this.cane, this.hatImg, this.wImg, this.stakeImg].forEach((o) => o && o.destroy()); }
}

// ───────────────────────── Enemigos ─────────────────────────
class Enemy {
  constructor(scene, x, y, w, h, hp) {
    this.scene = scene; this.hp = hp; this.dead = false; this.spiky = false; this.flash = 0;
    this.hit = scene.add.rectangle(x, y, w, h, 0xff0000, 0);
    scene.physics.add.existing(this.hit);
    this.hit.body.setCollideWorldBounds(true);
  }
  get x() { return this.hit.x; } get y() { return this.hit.y; }
  bounds() { return rectOf(this.hit); }
  takeHit(kind, fromX) {
    if (this.dead) return;
    this.hp--; this.flash = 0.12; this.safe = 0.6;
    this.scene.cameras.main.shake(90, 0.004);
    if (this.hp <= 0) return this.die(kind);
    SFX.bump(); this.hit.body.setVelocityX(Math.sign(this.x - fromX || 1) * 260);
    this.sq = 0.2;
  }
  die(kind) {
    this.dead = true; this.hit.body.enable = false;
    SFX.pop(); this.scene.burst(this.x, this.y, 10);
    this.scene.kills++;
    this.scene.tweens.add({ targets: this.visuals(), alpha: 0, scaleY: 0.05, duration: 260, onComplete: () => this.destroy() });
  }
  teleport(nx) { const dx = nx - this.x; if (this.hit.body) this.hit.body.reset(nx, this.hit.y); else this.hit.setPosition(nx, this.hit.y); if (this.a != null) { this.a += dx; this.b += dx; } if (this.px != null) this.px += dx; if (this.hit.body) this.hit.body.updateFromGameObject(); }
  setVis(v) { for (const o of [...this.visuals(), this.legs]) if (o) o.setVisible(v); }
  visuals() { return [this.img]; }
  destroy() { this.hit.destroy(); this.visuals().forEach((o) => o.destroy()); if (this.legs) this.legs.destroy(); }
  tint(img) { if (this.flash > 0) img.setTintFill(0xffffff); else img.clearTint(); }
}

export class Bacteria extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 40, 70, 74, 1);
    this.a = a; this.b = b; this.dir = Math.random() < 0.5 ? -1 : 1; this.t = Math.random() * 6;
    this.img = scene.add.image(x, 0, 'bacteria').setScale(0.31).setDepth(4);
  }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    if (body.blocked.left) this.dir = 1; if (body.blocked.right) this.dir = -1;
    body.setVelocityX(this.dir * 52);
    this.img.setPosition(this.x, this.y + Math.sin(this.t * 9) * 2).setRotation(this.t * 1.4 * this.dir).setScale(0.31 * (1 + Math.sin(this.t * 6) * 0.04));
    this.tint(this.img);
  }
}

export class Gordo extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 66, 112, 132, 2);
    this.a = a; this.b = b; this.dir = -1; this.phase = 0; this.sq = 0;
    this.img = scene.add.image(x, 0, 'gordo').setScale(0.31).setDepth(4);
    this.legs = scene.add.graphics().setDepth(3);
  }
  update(dt) {
    if (this.dead) return;
    this.flash = Math.max(0, this.flash - dt); this.sq = Math.max(0, this.sq - dt);
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    if (body.blocked.left) this.dir = 1; if (body.blocked.right) this.dir = -1;
    if (Math.abs(body.velocity.x) < 120) body.setVelocityX(this.dir * 34); else body.setVelocityX(body.velocity.x * 0.9);
    this.phase += dt * 6;
    const top = this.y - 66, hipY = top + 108, footY = top + 132;
    this.img.setPosition(this.x, top + 56 + Math.abs(Math.sin(this.phase)) * 3).setFlipX(this.dir > 0).setScale(0.31 * (1 + this.sq * 1.2), 0.31 * (1 - this.sq));
    this.tint(this.img);
    this.legs.clear();
    for (let i = 0; i < 2; i++) {
      const hx = this.x + (i ? 30 : -30), ph = this.phase + i * Math.PI;
      drawLeg(this.legs, hx, hipY, hx + Math.sin(ph) * 13, footY - Math.max(0, Math.cos(ph)) * 9, 0x6d5a4e, 5);
    }
  }
}

export class Arana extends Enemy {
  constructor(scene, x, yMin, yMax) {
    super(scene, x, yMin, 70, 66, 1);
    this.hit.body.setAllowGravity(false).setImmovable(true);
    this.yMin = yMin; this.yMax = yMax; this.t = Math.random() * 6;
    this.img = scene.add.image(x, yMin, 'arana').setScale(0.3).setDepth(4);
    this.thread = scene.add.graphics().setDepth(3);
  }
  update(dt) {
    if (this.dead) { this.thread.clear(); return; }
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const y = this.yMin + (this.yMax - this.yMin) * (0.5 + 0.5 * Math.sin(this.t * 1.1));
    this.hit.y = y; this.hit.body.updateFromGameObject();
    this.img.setPosition(this.x, y).setRotation(Math.sin(this.t * 3) * 0.12);
    this.thread.clear().lineStyle(2, 0x555555, 0.9).beginPath().moveTo(this.x, -20).lineTo(this.x, y - 28).strokePath();
    this.tint(this.img);
  }
  visuals() { return [this.img, this.thread]; }
}

export class Fuego extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 52, 70, 98, 1);
    this.a = a; this.b = b; this.spiky = true; this.timer = 0.8 + Math.random(); this.t = 0;
    this.img = scene.add.image(x, 0, 'fuego').setScale(0.36).setDepth(4);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const body = this.hit.body, grounded = body.blocked.down;
    this.timer -= dt;
    if (grounded) body.setVelocityX(body.velocity.x * 0.8);
    if (grounded && this.timer <= 0) {
      this.timer = 1.9 + Math.random() * 0.8;
      const near = Math.abs(player.x - this.x) < 380;
      let d = near ? Math.sign(player.x - this.x) : (Math.random() < 0.5 ? -1 : 1);
      if (this.x < this.a) d = 1; if (this.x > this.b) d = -1;
      body.setVelocity(d * 120, -560);
    }
    const stretch = grounded ? 1 : 1.1;
    this.img.setPosition(this.x, this.y + 4).setScale(0.36 * (2 - stretch) * (1 + Math.sin(this.t * 14) * 0.03), 0.36 * stretch * (1 + Math.cos(this.t * 12) * 0.03))
      .setFlipX(body.velocity.x > 0);
    this.tint(this.img);
  }
}

// ───────────────────────── Jefe: Planta loca ─────────────────────────
export class Boss {
  constructor(scene, x) {
    this.scene = scene; this.hp = 3; this.maxHp = 3; this.dead = false; this.active = false;
    this.S = 0.72;
    const potH = 161 * this.S, potW = 248 * this.S;
    this.px = x; this.potTop = GROUND_Y + 10 - potH + 14 * this.S;
    this.pot = scene.add.image(x, GROUND_Y + 10, 'boss_pot').setOrigin(0.5, 1).setScale(this.S).setDepth(4);
    this.potBody = scene.add.rectangle(x, GROUND_Y + 10 - potH / 2, potW * 0.8, potH - 6, 0xff0000, 0);
    scene.physics.add.existing(this.potBody, true);
    this.plant = scene.add.image(x, this.potTop, 'boss_plant').setOrigin(0.5, 1).setScale(this.S).setDepth(3);
    this.headDist = 385 * this.S * 0.62; this.headR = 58;
    this.rot = 0; this.t = 0; this.phase = 'wait'; this.timer = 0; this.shots = 0; this.flash = 0;
    this.vulnerable = false; this.seeds = [];
    this.hurtT = 0;
  }
  contactBox() { return null; }
  hurtBox() { const h = this.head(); return new Phaser.Geom.Rectangle(h.x - this.headR, h.y - this.headR, this.headR * 2, this.headR * 2); }
  head() {
    const a = this.plant.rotation;
    return { x: this.px + Math.sin(a) * this.headDist, y: this.potTop - Math.cos(a) * this.headDist };
  }
  start() { this.active = true; this.phase = 'shoot'; this.timer = 3.6; this.shots = 0; this.scene.showBanner('¡Planta Loca!', '¡Golpéala cuando se agache!'); SFX.bossRoar(); }
  setPhase(p, t) { this.phase = p; this.timer = t; this.shots = 0; }
  update(dt, player) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt);
    const speed = 1 + (3 - this.hp) * 0.15;
    let target = Math.sin(this.t * 1.7) * 0.18;
    if (this.active && !this.dead) {
      this.timer -= dt;
      if (this.phase === 'shoot') {
        target = Math.sin(this.t * 2.2 * speed) * 0.3 - 0.1;
        const due = Math.floor((3.6 - this.timer) / (1.8 / speed));
        if (due > this.shots && this.timer > 0.3) { this.shots = due; this.shoot(player); }
        if (this.timer <= 0) this.setPhase('down', 0.7);
      } else if (this.phase === 'down') {
        target = -1.15; if (this.timer <= 0) { this.setPhase('stun', 5.2); SFX.bossRoar(); }
      } else if (this.phase === 'stun') {
        target = -1.15 + Math.sin(this.t * 14) * 0.03;
      } else if (this.phase === 'up') {
        target = 0; if (this.timer <= 0) this.setPhase('shoot', 3.6);
      }
      if (this.phase === 'stun' && this.timer <= 0) this.setPhase('up', 0.7);
      this.vulnerable = this.phase === 'stun';
    }
    if (this.dead) target = this.rot;
    this.rot += (target - this.rot) * Math.min(1, dt * (this.phase === 'down' ? 6 : 5));
    this.plant.setRotation(this.rot);
    this.plant.setScale(this.S * (1 + (this.flash > 0 ? 0.06 : 0)));
    this.flash > 0 ? this.plant.setTintFill(0xffffff) : this.plant.clearTint();
    // semillas
    for (const s of this.seeds) {
      s.vy += 650 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.img.setPosition(s.x, s.y).setRotation(s.x * 0.05);
      if (s.y > GROUND_Y - 8) { s.dead = true; SFX.splat(); this.scene.burst(s.x, GROUND_Y - 6, 5); }
    }
    this.seeds = this.seeds.filter((s) => { if (s.dead) s.img.destroy(); return !s.dead; });
    if (this.dead) return;
    // estrellitas mareadas
    if (this.vulnerable) {
      const h = this.head();
      this.scene.dizzy.clear();
      for (let i = 0; i < 4; i++) {
        const a = this.t * 5 + i * Math.PI / 2;
        this.scene.dizzy.fillStyle(0xffe14d, 1).fillCircle(h.x + Math.cos(a) * 52, h.y - 62 + Math.sin(a) * 12, 6);
      }
    } else this.scene.dizzy.clear();
  }
  shoot(player) {
    const h = this.head(); SFX.seed();
    const T = 1.3, g = 650;
    const tx = player.x + player.vx * 0.25, ty = player.y;
    const img = this.scene.add.image(h.x, h.y - 10, 'seed').setDepth(8);
    this.seeds.push({ x: h.x, y: h.y - 10, vx: (tx - h.x) / T, vy: (ty - h.y) / T - 0.5 * g * T, img });
  }
  takeHit() {
    if (!this.vulnerable || this.hurtT > 0) return false;
    this.hp--; this.hurtT = 0.8; this.flash = 0.2; SFX.bossHit();
    this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.head().x, this.head().y, 14);
    if (this.hp <= 0) { this.die(); return true; }
    this.setPhase('up', 0.9); this.vulnerable = false;
    return true;
  }
  die() {
    this.dead = true; this.vulnerable = false; this.scene.dizzy.clear();
    this.scene.tweens.add({ targets: this.plant, alpha: 0, scaleX: this.S * 0.2, scaleY: this.S * 0.2, angle: 360, duration: 1200 });
    this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.px + Phaser.Math.Between(-90, 90), this.potTop - Phaser.Math.Between(20, 200), 8) });
    for (const s of this.seeds) s.dead = true;
    this.scene.bossDefeated();
  }
}

// ───────────────────────── Nivel 2: lava ─────────────────────────
// Piraña de lava: salta desde su agujero y vuelve a esconderse
export class Pirana extends Enemy {
  constructor(scene, x, delay = 0) {
    super(scene, x, GROUND_Y + 90, 64, 44, 1);
    this.hit.body.setAllowGravity(false).setImmovable(true);
    this.cx = x; this.baseY = GROUND_Y + 90; this.px = x; this.py = this.baseY; this.vy = 0; this.vx = 0;
    this.state = 'wait'; this.timer = 0.8 + delay; this.t = 0;
    this.img = scene.add.image(x, this.baseY, 'pirana').setScale(0.3).setDepth(4);
  }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    if (this.state === 'wait') {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = 'leap'; this.vy = -(770 + Math.random() * 60); this.vx = (Math.random() < 0.5 ? -1 : 1) * 55;
        SFX.splash(); this.scene.burst(this.px, GROUND_Y + 30, 6);
      }
    } else {
      this.vy += 1700 * dt; this.py += this.vy * dt; this.px += this.vx * dt;
      this.px = Phaser.Math.Clamp(this.px, this.cx - 55, this.cx + 55);
      if (this.py >= this.baseY && this.vy > 0) { this.state = 'wait'; this.timer = 1.5 + Math.random() * 1.2; this.px = this.cx; this.py = this.baseY; SFX.splash(); this.scene.burst(this.cx, GROUND_Y + 30, 5); }
    }
    this.hit.setPosition(this.px, this.state === 'wait' ? this.baseY + 400 : this.py); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setRotation(Math.atan2(this.vy, this.vx || 60)).setFlipY(this.vx < 0);
    this.tint(this.img);
  }
}

// Bomba con patas: te persigue y, cuando está cerca, ¡se enciende y explota!
export class Bomba extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 50, 64, 100, 1);
    this.a = a; this.b = b; this.dir = Math.random() < 0.5 ? -1 : 1; this.state = 'walk'; this.fuse = 0; this.phase = 0; this.t = 0;
    this.tx = ['bomba', 'bomba_hot']; this.img = scene.add.image(x, 0, 'bomba').setScale(0.28).setDepth(4);
    this.legs = scene.add.graphics().setDepth(3);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const body = this.hit.body, dx = player.x - this.x, dy = Math.abs(player.y - this.y);
    let shake = 0, hot = false;
    if (this.state === 'walk') {
      const chase = Math.abs(dx) < 340 && dy < 160 && this.x > this.a - 90 && this.x < this.b + 90 && !player.dead;
      if (chase) this.dir = Math.sign(dx) || this.dir;
      else { if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1; }
      if (body.blocked.left) this.dir = 1; if (body.blocked.right) this.dir = -1;
      body.setVelocityX(this.dir * (chase ? 100 : 55));
      if (Math.abs(dx) < 130 && dy < 110 && !player.dead) { this.state = 'fuse'; this.fuse = 1.0; body.setVelocityX(0); SFX.fuse(); }
    } else {
      this.fuse -= dt; body.setVelocityX(body.velocity.x * 0.8); hot = true; shake = Math.sin(this.t * 60) * 3;
      if (this.fuse <= 0) return this.explode(player);
    }
    this.phase += dt * (this.state === 'fuse' ? 14 : Math.abs(body.velocity.x) / 9);
    const top = this.y - 50, hipY = top + 72, footY = top + 100;
    const s = 0.28 * (1 + (hot ? Math.sin(this.t * 30) * 0.06 : 0));
    this.img.setTexture(hot && Math.floor(this.t * 12) % 2 ? this.tx[1] : this.tx[0]).setPosition(this.x + shake, top + 38).setScale(s).setRotation(Math.sin(this.phase * 0.7) * 0.05);
    this.tint(this.img);
    this.legs.clear();
    for (let i = 0; i < 2; i++) {
      const hx = this.x + (i ? 17 : -17), ph = this.phase + i * Math.PI;
      drawLeg(this.legs, hx, hipY, hx + Math.sin(ph) * 11, footY - Math.max(0, Math.cos(ph)) * 8, hot ? 0x7a1a14 : 0x2b2b44, 6);
    }
  }
  explode(player) {
    this.dead = true; this.hit.body.enable = false;
    this.scene.explosion(this.x, this.y);
    if (Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y) < 125) player.hurt(this.x);
    this.scene.tweens.add({ targets: this.visuals(), alpha: 0, duration: 120, onComplete: () => this.destroy() });
  }
  visuals() { return [this.img]; }
}

// ───────────────────────── Jefe: Tipi-Topi Toro Ígneo ─────────────────────────
export class Toro {
  constructor(scene, x, minX, maxX, skin) {
    this.sk = skin || { n: 'toro', c: 'toro_charge', d: 'toro_dizzy', S: 0.42, bw: 112, bh: 136, title: '¡Toro Ígneo!', sub: '¡Esquiva su embestida y golpéalo cuando se maree!' };
    this.scene = scene; this.hp = 4; this.maxHp = 4; this.dead = false; this.active = false; this.vulnerable = false;
    this.minX = minX; this.maxX = maxX; this.x = x; this.dir = -1; this.S = this.sk.S;
    this.img = scene.add.image(x, GROUND_Y + 2, this.sk.n).setOrigin(0.5, 0.985).setScale(this.S).setDepth(4);
    this.phase = 'wait'; this.timer = 0; this.t = 0; this.flash = 0; this.hurtT = 0; this.cycle = 0; this.seeds = [];
    this.shake = 0; this.dustT = 0; this.warn = scene.add.graphics().setDepth(2);
  }
  get speed() { return 500 + (this.maxHp - this.hp) * 50; }
  contactBox() { return this.active && !this.dead && !this.vulnerable ? new Phaser.Geom.Rectangle(this.x - this.sk.bw / 2, GROUND_Y - this.sk.bh, this.sk.bw, this.sk.bh) : null; }
  hurtBox() { return new Phaser.Geom.Rectangle(this.x - this.sk.bw / 2 - 10, GROUND_Y - this.sk.bh - 14, this.sk.bw + 20, this.sk.bh + 14); }
  setPhase(p, t) { this.phase = p; this.timer = t; }
  start() { this.active = true; this.setPhase('idle', 1.3); this.scene.showBanner(this.sk.title, this.sk.sub); SFX.bossRoar(); }
  update(dt, player) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt);
    let tex = this.sk.n, rot = 0, bob = 0;
    if (this.active && !this.dead) {
      this.timer -= dt;
      if (this.phase === 'idle') {
        bob = Math.abs(Math.sin(this.t * 6)) * 3; this.dir = Math.sign(player.x - this.x) || this.dir;
        if (this.timer <= 0) { this.setPhase('windup', 0.85); SFX.charge(); this.spawnEmbers(); }
      } else if (this.phase === 'windup') {
        tex = this.sk.c; this.shake = Math.sin(this.t * 70) * 3; this.dir = Math.sign(player.x - this.x) || this.dir; rot = -this.dir * 0.05;
        this.dustT -= dt; if (this.dustT <= 0) { this.dustT = 0.1; this.scene.dust(this.x - this.dir * 50, GROUND_Y); }
        if (this.timer <= 0) { this.phase = 'charge'; this.shake = 0; }
      } else if (this.phase === 'charge') {
        tex = this.sk.c; this.x += this.dir * this.speed * dt; rot = this.dir * 0.1; bob = Math.abs(Math.sin(this.t * 28)) * 5;
        this.dustT -= dt; if (this.dustT <= 0) { this.dustT = 0.05; this.scene.dust(this.x - this.dir * 60, GROUND_Y); this.scene.particles.emitParticleAt(this.x - this.dir * 60, GROUND_Y - 10, 2); }
        if (this.x <= this.minX || this.x >= this.maxX) {
          this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX); this.cycle++;
          this.setPhase('dizzy', 3.6); SFX.crash(); this.scene.cameras.main.shake(350, 0.02); this.scene.burst(this.x + this.dir * 50, GROUND_Y - 80, 18);
        }
      } else if (this.phase === 'dizzy') {
        tex = this.sk.d; rot = Math.sin(this.t * 5) * 0.07;
        if (this.timer <= 0) { this.setPhase('idle', 0.8); SFX.snort(); }
      }
      this.vulnerable = this.phase === 'dizzy';
    }
    if (this.dead) tex = this.sk.d;
    this.img.setTexture(tex).setPosition(this.x + this.shake, GROUND_Y + 2 - bob).setRotation(rot).setFlipX(this.dir > 0)
      .setScale(this.S * (1 + (this.flash > 0 ? 0.05 : 0)));
    this.flash > 0 ? this.img.setTintFill(0xffffff) : this.img.clearTint();
    this.updateEmbers(dt);
    // estrellitas mareadas
    const d = this.scene.dizzy; if (this.vulnerable && !this.dead) {
      d.clear();
      for (let i = 0; i < 4; i++) { const a = this.t * 5 + i * Math.PI / 2; d.fillStyle(0xffe14d, 1).fillCircle(this.x + Math.cos(a) * 56, GROUND_Y - 175 + Math.sin(a) * 12, 6); }
    }
  }
  spawnEmbers() {
    const n = this.hp <= 2 ? 3 : this.cycle >= 1 ? 2 : 0;
    for (let k = 0; k < n; k++) {
      const x = Phaser.Math.Between(this.minX - 40, this.maxX - 40);
      this.seeds.push({ x, y: -40, vy: 0, warn: 0.9 + k * 0.25, dead: false, harm: false, r: 40, img: this.scene.add.image(x, -40, 'ember').setDepth(8).setVisible(false) });
      if (this.sk.spore) this.seeds[this.seeds.length - 1].img.setTint(0xd09bff);
      if (this.sk.tint) this.seeds[this.seeds.length - 1].img.setTint(this.sk.tint);
    }
  }
  updateEmbers(dt) {
    const g = this.warn.clear();
    for (const s of this.seeds) {
      if (s.warn > 0) {
        s.warn -= dt; const k = 1 - s.warn / 1.2;
        g.fillStyle(0xff5a1a, 0.35 + 0.3 * Math.sin(this.t * 18)).fillEllipse(s.x, GROUND_Y + 2, 30 + k * 30, 10 + k * 6);
        if (s.warn <= 0) { s.harm = true; s.img.setVisible(true); }
      } else {
        s.vy += 1500 * dt; s.y += s.vy * dt; s.img.setPosition(s.x, s.y).setRotation(Math.sin(this.t * 20 + s.x) * 0.2);
        if (s.y > GROUND_Y - 14) { s.dead = true; SFX.splat(); this.scene.burst(s.x, GROUND_Y - 6, 8); }
      }
    }
    this.seeds = this.seeds.filter((s) => { if (s.dead) s.img.destroy(); return !s.dead; });
  }
  takeHit() {
    if (!this.vulnerable || this.hurtT > 0) return false;
    this.hp--; this.hurtT = 0.8; this.flash = 0.2; SFX.bossHit();
    this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.x, GROUND_Y - 100, 14);
    if (this.hp <= 0) { this.die(); return true; }
    this.setPhase('idle', 1.0); this.vulnerable = false; this.scene.dizzy.clear();
    return true;
  }
  die() {
    this.dead = true; this.vulnerable = false; this.scene.dizzy.clear(); this.warn.clear();
    this.scene.tweens.add({ targets: this.img, alpha: 0, scaleX: this.S * 1.5, scaleY: this.S * 0.1, duration: 1200 });
    this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.x + Phaser.Math.Between(-80, 80), GROUND_Y - Phaser.Math.Between(20, 150), 8) });
    for (const s of this.seeds) s.dead = true;
    this.scene.bossDefeated();
  }
}

// ───────────────────────── Nivel 3: cielo ─────────────────────────
const ROTOR_R = { normal: 38, listo: 38, fuerte: 52, vampiro: 38 };
// Tropix: vuelan con los ojos girando como un helicóptero. normal, listo (te persigue), fuerte (2 golpes), vampiro (se lanza en picado)
export class Tropix extends Enemy {
  constructor(scene, x, y, a, b, kind = 'normal') {
    const big = kind === 'fuerte';
    super(scene, x, y, big ? 92 : 64, big ? 96 : 76, big ? 2 : 1);
    this.hit.body.setAllowGravity(false).setImmovable(true);
    this.kind = kind; this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6; this.state = 'fly'; this.cd = 1.5;
    this.k = big ? 0.42 : 0.34; this.pivotDy = (kind === 'fuerte' ? -92 : -78) * this.k;
    this.img = scene.add.image(x, y, kind === 'normal' || kind === 'campeon' ? 'tropix' : 'tropix_' + kind).setScale(this.k).setDepth(4);
    if (kind === 'campeon') { this.cap = scene.add.image(x, y, 'seta_cap').setDepth(4.5); this.shield = 0; this.sh = 2.5; }
    this.bar = scene.add.graphics().setDepth(4.1);
    this.eyes = [0, 1].map(() => scene.add.image(x, y, 'ojo_rotor').setScale(big ? 0.62 : 0.46).setDepth(4.2));
  }
  update(dt, player) {
    if (this.dead) { this.bar.clear(); return; }
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    const dx = player.x - this.px, dy = player.y - this.py;
    if (this.kind === 'vampiro') {
      if (this.state === 'fly') {
        this.px += this.dir * 60 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
        this.py = this.y0 + Math.sin(this.t * 2) * 10;
        if (this.cd <= 0 && Math.abs(dx) < 300 && dy > 20) { this.state = 'dive'; this.cd = 0.8; const l = Math.hypot(dx, dy) || 1; this.vx = dx / l * 400; this.vy = dy / l * 400; }
      } else if (this.state === 'dive') {
        this.px += this.vx * dt; this.py += this.vy * dt;
        if (this.cd <= 0 || this.py > GROUND_Y - 50) { this.state = 'back'; this.cd = 3; }
      } else {
        this.py += (this.y0 - this.py) * Math.min(1, dt * 1.6); this.px += (Math.sign(this.a + (this.b - this.a) / 2 - this.px)) * 40 * dt;
        if (Math.abs(this.py - this.y0) < 8) this.state = 'fly';
      }
    } else if (this.kind === 'listo' && Math.abs(dx) < 420 && Math.abs(dy) < 380) {
      this.px += Math.sign(dx) * 85 * dt; this.py += Phaser.Math.Clamp((player.y - 70) - this.py, -1, 1) * 70 * dt; this.dir = Math.sign(dx) || this.dir;
    } else {
      const sp = this.kind === 'fuerte' ? 48 : 70;
      this.px += this.dir * sp * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
      this.py = this.y0 + Math.sin(this.t * 2.4) * 16;
    }
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setFlipX(this.dir < 0).setRotation(Math.sin(this.t * 3) * 0.06); this.tint(this.img);
    if (this.cap) {
      // el casco de seta se convierte en escudo 2 s, con 5 s de espera
      this.sh -= dt;
      if (this.shield > 0) { this.shield -= dt; if (this.shield <= 0) { this.sh = 5; this.shield = 0; } }
      else if (this.sh <= 0) { this.shield = 2; SFX.charge(); }
      const on = this.shield > 0;
      this.cap.setPosition(this.px, on ? this.py - 2 : this.py - 52).setScale(on ? 0.78 : 0.34).setAlpha(on ? 0.95 : 1).setRotation(on ? 0 : -0.25);
    }
    // rotor
    const th = this.t * 11, R = ROTOR_R[this.kind] * (this.k / 0.34) * 0.8, py = this.py + this.pivotDy * 1.02;
    this.bar.clear().lineStyle(5, 0x2b2b44, 1).beginPath();
    const pos = [0, 1].map((i) => ({ x: this.px + Math.cos(th + i * Math.PI) * R, y: py + Math.sin(th + i * Math.PI) * R * 0.28 }));
    this.bar.moveTo(pos[0].x, pos[0].y).lineTo(pos[1].x, pos[1].y).strokePath();
    this.eyes.forEach((e, i) => e.setPosition(pos[i].x, pos[i].y));
  }
  takeHit(kind, fromX) { if (this.cap && this.shield > 0) { SFX.bump(); this.safe = 0.4; return; } super.takeHit(kind, fromX); }
  visuals() { return this.cap ? [this.img, this.bar, this.cap, ...this.eyes] : [this.img, this.bar, ...this.eyes]; }
}

// Abeja: vuela por arriba y lanza aguijones hacia ti
export class Abeja extends Enemy {
  constructor(scene, x, y, a, b) {
    super(scene, x, y, 64, 56, 1);
    this.hit.body.setAllowGravity(false).setImmovable(true);
    this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6; this.cd = 2 + Math.random();
    this.img = scene.add.image(x, y, 'abeja').setScale(0.4).setDepth(4);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    this.px += this.dir * 80 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
    this.py = this.y0 + Math.sin(this.t * 3) * 14;
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setFlipX(this.dir < 0).setScale(0.4, 0.4 * (1 + Math.sin(this.t * 40) * 0.03)); this.tint(this.img);
    if (this.cd <= 0 && Math.abs(player.x - this.px) < 540 && player.y > this.py) {
      this.cd = 3.6; const dx = player.x - this.px, dy = player.y - this.py, l = Math.hypot(dx, dy) || 1;
      this.scene.addProjectile({ type: 'aguijon', x: this.px, y: this.py + 20, vx: dx / l * 270, vy: dy / l * 270, life: 3 }); SFX.seed();
    }
  }
}

// Torreta: dispara balas explosivas
export class Torreta extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 44, 90, 90, 2);
    this.cd = 1.8; this.rec = 0;
    this.img = scene.add.image(x, GROUND_Y - 44, 'torreta').setScale(0.62).setDepth(4);
    this.canon = scene.add.image(x, GROUND_Y - 62, 'canon').setOrigin(0.28, 0.5).setScale(0.5).setDepth(4.2);
  }
  update(dt, player) {
    if (this.dead) return;
    this.flash = Math.max(0, this.flash - dt); this.cd -= dt; this.rec = Math.max(0, this.rec - dt);
    const dx = player.x - this.x, dy = player.y - (this.y - 18), ang = Math.atan2(dy, dx);
    this.canon.setPosition(this.x, this.y - 18).setRotation(Math.abs(dx) > 1 ? ang : 0).setFlipY(dx < 0);
    this.canon.setScale(0.5 - this.rec * 0.2, 0.5);
    this.tint(this.img);
    if (this.cd <= 0 && Math.abs(dx) < 560 && Math.abs(dx) > 60) {
      this.cd = 3.8; this.rec = 0.25;
      const sp = 210, l = Math.hypot(dx, dy) || 1;
      this.scene.addProjectile({ type: 'bala', x: this.x + Math.cos(ang) * 50, y: this.y - 18 + Math.sin(ang) * 50, vx: dx / l * sp, vy: dy / l * sp - 60, g: 160, life: 3.2 }); SFX.bossHit();
    }
  }
  visuals() { return [this.img, this.canon]; }
}

// Lavadora: te avisa (se enfada y tiembla) y sale disparada
export class Lavadora extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 55, 96, 108, 2);
    this.a = a; this.b = b; this.state = 'idle'; this.timer = 1.2 + Math.random(); this.dir = -1; this.t = 0;
    this.img = scene.add.image(x, 0, 'lavadora').setScale(0.5).setDepth(4);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.timer -= dt;
    const body = this.hit.body; let shake = 0, tex = 'lavadora';
    if (this.state === 'idle') {
      body.setVelocityX(body.velocity.x * 0.85);
      if (this.timer <= 0 && Math.abs(player.x - this.x) < 520) { this.state = 'warn'; this.timer = 0.9; SFX.fuse(); this.dir = Math.sign(player.x - this.x) || 1; }
      else if (this.timer <= 0) this.timer = 0.5;
    } else if (this.state === 'warn') {
      tex = 'lavadora_hot'; shake = Math.sin(this.t * 70) * 3; body.setVelocityX(0); this.dir = Math.sign(player.x - this.x) || this.dir;
      if (this.timer <= 0) { this.state = 'dash'; this.timer = 0.8; SFX.charge(); }
    } else if (this.state === 'dash') {
      tex = 'lavadora_hot'; body.setVelocityX(this.dir * 470);
      this.scene.dust(this.x - this.dir * 40, GROUND_Y);
      if (this.timer <= 0 || this.x < this.a || this.x > this.b || body.blocked.left || body.blocked.right) { this.state = 'rest'; this.timer = 1.4; body.setVelocityX(0); this.scene.cameras.main.shake(120, 0.006); SFX.crash(); }
    } else {
      body.setVelocityX(body.velocity.x * 0.8); shake = Math.sin(this.t * 6) * 1;
      if (this.timer <= 0) { this.state = 'idle'; this.timer = 2.4 + Math.random(); }
    }
    this.img.setTexture(tex).setPosition(this.x + shake, this.y + 1).setRotation(this.state === 'rest' ? Math.sin(this.t * 5) * 0.05 : 0); this.tint(this.img);
  }
}

// Bloque rompible: hay que saltar encima para romperlo (y salen Tropix)
export class Bloque {
  constructor(scene, x) {
    this.scene = scene; this.x = x; this.broken = false;
    this.img = scene.add.image(x, GROUND_Y + 2, 'bloque').setOrigin(0.5, 1).setScale(0.62).setDepth(3);
    this.hit = scene.add.rectangle(x, GROUND_Y - 52, 70, 104, 0xff0000, 0);
    scene.physics.add.existing(this.hit, true);
  }
  update(player) {
    if (this.broken) return;
    const top = GROUND_Y - 104;
    if (Math.abs(player.x - this.x) < 50 && player.vy >= 0 && Math.abs(player.bottom - top) < 10 && player.onGround) this.breakIt();
  }
  breakIt() {
    this.broken = true; this.hit.destroy(); SFX.crash(); this.scene.cameras.main.shake(200, 0.01);
    this.scene.burst(this.x, GROUND_Y - 60, 18); this.scene.confetti(this.x, GROUND_Y - 80, 14);
    this.scene.tweens.add({ targets: this.img, alpha: 0, scaleY: 0.1, duration: 250, onComplete: () => this.img.destroy() });
    for (const sg of [-1, 1]) {
      const t = new Tropix(this.scene, this.x + sg * 30, GROUND_Y - 150, this.x - 160, this.x + 160, 'normal');
      t.dir = sg; this.scene.enemies.push(t);
    }
  }
}

// ───────────────────────── Jefe: Tipi-Topi pájaro ─────────────────────────
export class Pajaro {
  constructor(scene, x, minX, maxX) {
    this.scene = scene; this.hp = 4; this.maxHp = 4; this.dead = false; this.active = false; this.vulnerable = false;
    this.minX = minX; this.maxX = maxX; this.x = x; this.y = 170; this.S = 0.5; this.t = 0; this.flash = 0; this.hurtT = 0;
    this.phase = 'wait'; this.timer = 0; this.cycle = 0; this.shots = 0; this.seeds = []; this.dir = -1; this.shake = 0;
    this.img = scene.add.image(x, this.y, 'pajaro').setScale(this.S).setDepth(4);
  }
  contactBox() { return this.active && !this.dead && !this.vulnerable ? new Phaser.Geom.Rectangle(this.x - 62, this.y - 74, 124, 150) : null; }
  hurtBox() { return new Phaser.Geom.Rectangle(this.x - 80, this.y - 78, 160, 170); }
  setPhase(p, t) { this.phase = p; this.timer = t; this.shots = 0; }
  start() { this.active = true; this.setPhase('idle', 2); this.scene.showBanner('¡Tipi-Topi Pájaro!', '¡Esquiva las ráfagas y golpéalo cuando se estrelle!'); SFX.bossRoar(); }
  update(dt, player) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt);
    let tex = 'pajaro', sy = 1, rot = 0; const mid = (this.minX + this.maxX) / 2, half = (this.maxX - this.minX) / 2 - 40;
    if (this.active && !this.dead) {
      this.timer -= dt;
      const fast = this.hp <= 2 ? 1.25 : 1;
      if (this.phase === 'idle') {
        const tx = mid + Math.sin(this.t * 0.9 * fast) * half; this.x += (tx - this.x) * Math.min(1, dt * 2.2);
        this.y += (170 + Math.sin(this.t * 2) * 12 - this.y) * Math.min(1, dt * 3);
        tex = Math.floor(this.t * 5) % 2 ? 'pajaro_up' : 'pajaro'; sy = 1 + Math.sin(this.t * 14) * 0.05;
        if (this.timer <= 0) { this.setPhase(this.cycle++ % 2 === 0 ? 'gust' : 'dive', this.cycle % 2 === 1 ? 0.8 : 0.9); SFX.charge(); this.dir = Math.sign(player.x - this.x) || -1; }
      } else if (this.phase === 'gust') {
        tex = 'pajaro_up'; this.shake = Math.sin(this.t * 60) * 2;
        if (this.timer <= 0 && this.shots < (this.hp <= 2 ? 4 : 3)) {
          this.shots++; this.timer = 0.5 / fast; this.shake = 0; SFX.gust();
          this.scene.addProjectile({ type: 'rafaga', x: this.x, y: GROUND_Y - 44, vx: this.dir * 340 * fast, vy: 0, life: 6 });
        } else if (this.timer <= 0) { this.shake = 0; this.setPhase('idle', 1.6); }
      } else if (this.phase === 'dive') {
        tex = 'pajaro_up'; this.shake = Math.sin(this.t * 60) * 3; this.y += (80 - this.y) * Math.min(1, dt * 4);
        if (this.timer <= 0) { this.shake = 0; this.setPhase('swoop', 1.0); this.tx = player.x; SFX.charge(); }
      } else if (this.phase === 'swoop') {
        tex = 'pajaro_up'; const ty = GROUND_Y - 95, dx = this.tx - this.x, dy = ty - this.y, l = Math.hypot(dx, dy);
        if (l < 30 || this.timer <= 0) { this.setPhase('dizzy', 3.4); SFX.crash(); this.scene.cameras.main.shake(350, 0.02); this.scene.burst(this.x, GROUND_Y - 20, 20); }
        else { this.x += dx / l * 780 * dt; this.y += dy / l * 780 * dt; rot = Math.sign(dx) * 0.4; }
      } else if (this.phase === 'dizzy') {
        tex = 'pajaro_dizzy'; this.y = GROUND_Y - 95; rot = Math.sin(this.t * 5) * 0.06;
        if (this.timer <= 0) { this.setPhase('idle', 1.2); SFX.snort(); }
      }
      this.vulnerable = this.phase === 'dizzy';
      this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX);
    }
    if (this.dead) tex = 'pajaro_dizzy';
    this.img.setTexture(tex).setPosition(this.x + this.shake, this.y).setScale(this.S * (1 + (this.flash > 0 ? 0.05 : 0)), this.S * sy).setRotation(rot);
    this.flash > 0 ? this.img.setTintFill(0xffffff) : this.img.clearTint();
    if (this.vulnerable && !this.dead) {
      const d = this.scene.dizzy; d.clear();
      for (let i = 0; i < 4; i++) { const a = this.t * 5 + i * Math.PI / 2; d.fillStyle(0xffe14d, 1).fillCircle(this.x + Math.cos(a) * 56, this.y - 95 + Math.sin(a) * 12, 6); }
    }
  }
  takeHit() {
    if (!this.vulnerable || this.hurtT > 0) return false;
    this.hp--; this.hurtT = 0.8; this.flash = 0.2; SFX.bossHit();
    this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.x, this.y, 14);
    if (this.hp <= 0) { this.die(); return true; }
    this.setPhase('idle', 1.2); this.vulnerable = false; this.scene.dizzy.clear();
    return true;
  }
  die() {
    this.dead = true; this.vulnerable = false; this.scene.dizzy.clear();
    this.scene.tweens.add({ targets: this.img, alpha: 0, y: this.y - 120, angle: 540, scale: 0.1, duration: 1400 });
    this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.x + Phaser.Math.Between(-80, 80), this.y + Phaser.Math.Between(-70, 70), 8) });
    this.scene.bossDefeated();
  }
}

// ───────────────────────── Nivel 4: slime ─────────────────────────
// Fantaslime: fantasma de slime que flota; al derrotarlo deja un charco que te vuelve slime
export class Fantaslime extends Enemy {
  constructor(scene, x, y, a, b) {
    super(scene, x, y, 64, 80, 1);
    this.hit.body.setAllowGravity(false).setImmovable(true);
    this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6;
    this.img = scene.add.image(x, y, 'fantaslime').setScale(0.42).setDepth(4).setAlpha(0.92);
  }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    this.px += this.dir * 55 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
    this.py = this.y0 + Math.sin(this.t * 2.2) * 22;
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setFlipX(this.dir < 0).setScale(0.42 * (1 + Math.sin(this.t * 5) * 0.04), 0.42 * (1 - Math.sin(this.t * 5) * 0.05)); this.tint(this.img);
  }
  die(kind) { super.die(kind); this.scene.addCharco(this.x, true); }
}

// Mandíbulas: se abren y se cierran; solo hacen daño cuando se cierran (¡avisan antes!)
export class Mandibulas extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 48, 110, 100, 99);
    this.hit.body.setAllowGravity(false).setImmovable(true); this.spiky = true;
    this.t = Math.random() * 2; this.phase = 'open'; this.timer = 1.4 + Math.random() * 0.8;
    this.img = scene.add.image(x, GROUND_Y + 2, 'mandibulas_open').setOrigin(0.5, 1).setScale(0.52).setDepth(3.5);
  }
  get biting() { return this.phase === 'closed' || this.phase === 'warn' && this.timer < 0.12; }
  bounds() { return this.biting ? rectOf(this.hit) : new Phaser.Geom.Rectangle(-999, -999, 1, 1); }
  takeHit() {}
  update(dt) {
    this.t += dt; this.timer -= dt;
    let shake = 0, tex = 'mandibulas_open';
    if (this.phase === 'open') { if (this.timer <= 0) { this.phase = 'warn'; this.timer = 0.55; SFX.fuse(); } }
    else if (this.phase === 'warn') { shake = Math.sin(this.t * 60) * 2; if (this.timer <= 0) { this.phase = 'closed'; this.timer = 0.7; SFX.crash(); this.scene.dust(this.hit.x, GROUND_Y); } }
    else if (this.phase === 'closed') { tex = 'mandibulas_closed'; if (this.timer <= 0) { this.phase = 'open'; this.timer = 1.8; } }
    this.img.setTexture(tex).setPosition(this.hit.x + shake, GROUND_Y + 2);
  }
}

// Bolita: una bolita de slime que bota muchísimo
export class Bolita extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 24, 44, 44, 1);
    this.a = a; this.b = b; this.dir = Math.random() < 0.5 ? -1 : 1; this.t = Math.random() * 6; this.sq = 0;
    this.img = scene.add.image(x, 0, 'bolita').setScale(0.55).setDepth(4);
  }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.sq = Math.max(0, this.sq - dt);
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    if (body.blocked.down) { body.setVelocityY(-760); this.sq = 0.15; }
    body.setVelocityX(this.dir * 70);
    const st = this.sq > 0 ? 1.3 : 1;
    this.img.setPosition(this.x, this.y).setScale(0.55 * st, 0.55 / st).setRotation(this.t * 3 * this.dir); this.tint(this.img);
  }
}

// Babosa: se arrastra y te escupe bolas de slime
export class Babosa extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 30, 80, 56, 1);
    this.a = a; this.b = b; this.dir = -1; this.t = Math.random() * 6; this.cd = 2 + Math.random() * 1.5;
    this.img = scene.add.image(x, 0, 'babosa').setScale(0.46).setDepth(4);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    const body = this.hit.body, dx = player.x - this.x;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    body.setVelocityX(this.dir * (28 + Math.sin(this.t * 3) * 12));
    const faceDir = Math.abs(dx) < 450 ? Math.sign(dx) || this.dir : this.dir;
    if (this.cd <= 0 && Math.abs(dx) < 430 && Math.abs(dx) > 80) {
      this.cd = 3.4; SFX.splat();
      this.scene.addProjectile({ type: 'glob', x: this.x + faceDir * 40, y: this.y - 20, vx: Phaser.Math.Clamp(dx * 0.85, -270, 270), vy: -380, g: 760, life: 3 });
    }
    this.img.setPosition(this.x, this.y + 3).setFlipX(faceDir > 0).setScale(0.46 * (1 + Math.sin(this.t * 3) * 0.04), 0.46 * (1 - Math.sin(this.t * 3) * 0.04)); this.tint(this.img);
  }
}

// ───────────────────────── Jefe: Fantaslime gigante ─────────────────────────
export class GranSlime {
  constructor(scene, x, minX, maxX) {
    this.scene = scene; this.hp = 4; this.maxHp = 4; this.dead = false; this.active = false; this.vulnerable = false;
    this.minX = minX; this.maxX = maxX; this.x = x; this.y = 0; this.S = 0.55; this.t = 0; this.flash = 0; this.hurtT = 0;
    this.phase = 'wait'; this.timer = 0; this.cycle = 0; this.seeds = []; this.jumps = 0; this.dir = -1; this.air = false;
    this.img = scene.add.image(x, GROUND_Y + 2, 'gran_slime').setOrigin(0.5, 0.975).setScale(this.S).setDepth(4);
    this.warn = scene.add.graphics().setDepth(2);
  }
  contactBox() { return this.active && !this.dead && !this.vulnerable ? new Phaser.Geom.Rectangle(this.x - 85, GROUND_Y - 120 - this.y, 170, 120) : null; }
  hurtBox() { return new Phaser.Geom.Rectangle(this.x - 120, GROUND_Y - 100, 240, 100); }
  setPhase(p, t) { this.phase = p; this.timer = t; }
  start() { this.active = true; this.setPhase('idle', 1.2); this.scene.showBanner('¡Fantaslime Gigante!', '¡Esquiva sus saltos y golpéalo cuando se desinfle!'); SFX.bossRoar(); }
  update(dt, player) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt);
    let tex = 'gran_slime', sx = 1, sy = 1; this.y = 0;
    const g = this.warn.clear();
    if (this.active && !this.dead) {
      this.timer -= dt;
      const fast = this.hp <= 2;
      if (this.phase === 'idle') {
        sy = 1 + Math.sin(this.t * 6) * 0.04; sx = 1 - Math.sin(this.t * 6) * 0.03; this.dir = Math.sign(player.x - this.x) || this.dir;
        if (this.timer <= 0) { this.tx = Phaser.Math.Clamp(player.x, this.minX + 130, this.maxX - 130); this.setPhase('aim', 0.8); SFX.charge(); }
      } else if (this.phase === 'aim') {
        tex = 'gran_slime_squash'; sx = 1 + Math.sin(this.t * 40) * 0.02;
        const k = 1 - this.timer / 0.8; g.fillStyle(0x2b2b44, 0.25 + 0.2 * k).fillEllipse(this.tx, GROUND_Y + 4, 120 + k * 70, 18);
        if (this.timer <= 0) { this.setPhase('air', 0.75); this.fromX = this.x; this.air = true; SFX.jump2(); }
      } else if (this.phase === 'air') {
        tex = 'gran_slime_jump'; const u = 1 - this.timer / 0.75;
        this.x = this.fromX + (this.tx - this.fromX) * u; this.y = Math.sin(u * Math.PI) * 280;
        g.fillStyle(0x2b2b44, 0.45).fillEllipse(this.tx, GROUND_Y + 4, 190 - Math.sin(u * Math.PI) * 60, 20);
        if (this.timer <= 0) {
          this.x = this.tx; this.y = 0; this.air = false; this.jumps++;
          SFX.crash(); this.scene.cameras.main.shake(300, 0.016); this.scene.burst(this.x, GROUND_Y - 10, 18);
          for (const sg of [-1, 1]) this.seeds.push({ x: this.x + sg * 90, y: GROUND_Y - 30, vx: sg * (300 + (fast ? 70 : 0)), r: 42, harm: true, dead: false, img: this.scene.add.image(this.x + sg * 90, GROUND_Y - 36, 'ola_slime').setScale(0.75).setDepth(8).setFlipX(sg < 0) });
          if (fast && this.jumps % 2 === 1) this.setPhase('idle', 0.5); else { this.setPhase('rest', 3.4); this.jumps = 0; }
        }
      } else if (this.phase === 'rest') {
        tex = 'gran_slime_squash'; sy = 1 + Math.sin(this.t * 3) * 0.02;
        if (this.timer <= 0) { this.setPhase('idle', 0.9); SFX.snort(); }
      }
      this.vulnerable = this.phase === 'rest';
    }
    if (this.dead) tex = 'gran_slime_squash';
    this.img.setTexture(tex).setPosition(this.x, GROUND_Y + 2 - this.y).setScale(this.S * sx, this.S * sy);
    this.flash > 0 ? this.img.setTintFill(0xffffff) : this.img.clearTint();
    // olas de slime
    for (const s of this.seeds) {
      s.x += s.vx * dt; s.img.setPosition(s.x, GROUND_Y - 36 + Math.sin(this.t * 14 + s.x * 0.05) * 3);
      if (s.x < this.minX - 60 || s.x > this.maxX + 60) s.dead = true;
    }
    this.seeds = this.seeds.filter((s) => { if (s.dead) s.img.destroy(); return !s.dead; });
    const d = this.scene.dizzy; if (this.vulnerable && !this.dead) {
      d.clear(); for (let i = 0; i < 4; i++) { const a = this.t * 5 + i * Math.PI / 2; d.fillStyle(0xffe14d, 1).fillCircle(this.x + Math.cos(a) * 60, GROUND_Y - 175 + Math.sin(a) * 12, 6); }
    }
  }
  takeHit() {
    if (!this.vulnerable || this.hurtT > 0) return false;
    this.hp--; this.hurtT = 0.8; this.flash = 0.2; SFX.bossHit();
    this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.x, GROUND_Y - 80, 14);
    if (this.hp <= 0) { this.die(); return true; }
    this.setPhase('idle', 1.0); this.vulnerable = false; this.scene.dizzy.clear();
    return true;
  }
  die() {
    this.dead = true; this.vulnerable = false; this.scene.dizzy.clear(); this.warn.clear();
    this.scene.tweens.add({ targets: this.img, alpha: 0, scaleX: this.S * 1.8, scaleY: this.S * 0.05, duration: 1200 });
    this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.x + Phaser.Math.Between(-90, 90), GROUND_Y - Phaser.Math.Between(10, 120), 8) });
    for (const s of this.seeds) s.dead = true;
    this.scene.bossDefeated();
  }
}

// ───────────────────────── Nivel 5: champiñones ─────────────────────────
// Champiñón: camina por una seta gigante y pega cabezazos; si te da, ¡alucinación!
export class Champi extends Enemy {
  constructor(scene, x, y, a, b) {
    super(scene, x, y, 60, 84, 1);
    this.a = a; this.b = b; this.dir = -1; this.t = Math.random() * 6; this.cd = 2 + Math.random(); this.state = 'walk'; this.timer = 0; this.halu = true; this.onPlat = true;
    this.img = scene.add.image(x, y, 'champi').setOrigin(0.5, 0.97).setScale(0.5).setDepth(4);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt; this.timer -= dt;
    const body = this.hit.body, dx = player.x - this.x; let sh = 0;
    if (this.state === 'walk') {
      if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
      body.setVelocityX(this.dir * 40);
      if (this.cd <= 0 && Math.abs(dx) < 340 && Math.abs(player.y - this.y) < 120) { this.state = 'warn'; this.timer = 0.7; this.dir = Math.sign(dx) || this.dir; SFX.fuse(); }
    } else if (this.state === 'warn') {
      body.setVelocityX(0); sh = Math.sin(this.t * 60) * 2;
      if (this.timer <= 0) { this.state = 'bash'; this.timer = 0.5; SFX.charge(); }
    } else if (this.state === 'bash') {
      body.setVelocityX(this.dir * 250);
      if (this.timer <= 0 || this.x < this.a - 10 || this.x > this.b + 10) { this.state = 'rest'; this.timer = 1.2; body.setVelocityX(0); }
    } else { body.setVelocityX(0); if (this.timer <= 0) { this.state = 'walk'; this.cd = 2.5 + Math.random() * 1.5; } }
    this.img.setTexture('champi').setPosition(this.x + sh, this.hit.body.bottom + 2).setFlipX(this.dir > 0).setRotation(this.state === 'bash' ? this.dir * 0.25 : this.state === 'rest' ? Math.sin(this.t * 6) * 0.05 : 0);
    this.tint(this.img);
  }
}

// ───────────────────────── Nivel 6: máquinas ─────────────────────────
// Robot: ataca cuerpo a cuerpo; se acerca y te pega un puñetazo
export class Robot extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 62, 66, 118, 2);
    this.a = a; this.b = b; this.dir = -1; this.t = Math.random() * 6; this.state = 'walk'; this.timer = 0; this.cd = 1.5; this.punching = false;
    this.img = scene.add.image(x, 0, 'robot').setOrigin(0.5, 0.97).setScale(0.52).setDepth(4);
  }
  bounds() { const r = rectOf(this.hit); if (this.punching) { r.width += 74; if (this.dir < 0) r.x -= 74; } return r; }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt; this.timer -= dt;
    const body = this.hit.body, dx = player.x - this.x; this.punching = false;
    if (this.state === 'walk') {
      const near = Math.abs(dx) < 300 && Math.abs(player.y - this.y) < 130;
      if (near) this.dir = Math.sign(dx) || this.dir; else { if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1; }
      body.setVelocityX(this.dir * (near ? 75 : 40));
      if (near && Math.abs(dx) < 130 && this.cd <= 0) { this.state = 'warn'; this.timer = 0.55; SFX.fuse(); }
    } else if (this.state === 'warn') { body.setVelocityX(0); if (this.timer <= 0) { this.state = 'punch'; this.timer = 0.3; SFX.cane(); } }
    else if (this.state === 'punch') { body.setVelocityX(0); this.punching = true; if (this.timer <= 0) { this.state = 'rest'; this.timer = 0.9; } }
    else { body.setVelocityX(0); if (this.timer <= 0) { this.state = 'walk'; this.cd = 1.8; } }
    const sh = this.state === 'warn' ? Math.sin(this.t * 60) * 2 : 0;
    this.img.setTexture(this.state === 'punch' ? 'robot_punch' : 'robot').setPosition(this.x + sh, this.hit.body.bottom + 2).setFlipX(this.dir > 0);
    this.tint(this.img);
  }
}

// Dron: vuela y dispara rayos
export class Dron extends Enemy {
  constructor(scene, x, y, a, b) {
    super(scene, x, y, 80, 60, 1);
    this.hit.body.setAllowGravity(false).setImmovable(true);
    this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6; this.cd = 2 + Math.random();
    this.img = scene.add.image(x, y, 'dron').setScale(0.42).setDepth(4);
  }
  update(dt, player) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    this.px += this.dir * 70 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
    this.py = this.y0 + Math.sin(this.t * 2.6) * 12;
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setFlipX(this.dir < 0).setRotation(Math.sin(this.t * 3) * 0.05); this.tint(this.img);
    if (this.cd <= 0 && Math.abs(player.x - this.px) < 520 && player.y > this.py - 20) {
      this.cd = 3.4; const dx = player.x - this.px, dy = player.y - this.py, l = Math.hypot(dx, dy) || 1;
      this.scene.addProjectile({ type: 'rayo', x: this.px, y: this.py + 18, vx: dx / l * 290, vy: dy / l * 290, life: 3 }); SFX.seed();
    }
  }
}

// ───────────────────────── Nivel 7: la Odisea ─────────────────────────
export class Oveja extends Bacteria {
  constructor(scene, x, a, b) { super(scene, x, a, b); this.img.setTexture('oveja').setScale(0.85); }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    if (body.blocked.left) this.dir = 1; if (body.blocked.right) this.dir = -1;
    body.setVelocityX(this.dir * 48);
    this.img.setPosition(this.x, this.y + 4 + Math.abs(Math.sin(this.t * 8)) * -4).setFlipX(this.dir < 0); this.tint(this.img);
  }
}

// Sirena: vuela vigilando y se lanza en picado hacia ti. Con cera en los oídos su canto no te hace daño.
export class Sirena extends Enemy {
  constructor(scene, x, y, a, b) {
    super(scene, x, y, 60, 66, 1);
    this.hit.body.setAllowGravity(false).setImmovable(true); this.siren = true;
    this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6; this.mode = 'fly'; this.mt = 0; this.cd = 1.5 + Math.random() * 2; this.noteT = 0;
    this.tex = ['sirena', 'sirena_up']; this.notes = true; this.img = scene.add.image(x, y, 'sirena').setScale(0.4).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.noteT -= dt;
    let sh = 0;
    if (this.mode === 'fly') {
      this.px += this.dir * 80 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
      this.py = this.y0 + Math.sin(this.t * 2) * 14; this.cd -= dt;
      if (this.cd <= 0 && Math.abs(pl.x - this.px) < 400 && !pl.dead) { this.mode = 'tele'; this.mt = 0.55; this.tx = pl.x; this.ty = pl.y; SFX.seed(); }
    } else if (this.mode === 'tele') {
      this.mt -= dt; sh = Math.sin(this.t * 70) * 3; this.tx = pl.x; this.ty = pl.y;
      if (this.mt <= 0) { const dx = this.tx - this.px, dy = this.ty - this.py, l = Math.hypot(dx, dy) || 1; this.vx = dx / l * 400; this.vy = dy / l * 400; this.mode = 'dive'; this.mt = 1.2; }
    } else if (this.mode === 'dive') {
      this.mt -= dt; this.px += this.vx * dt; this.py += this.vy * dt;
      if (this.py > GROUND_Y - 36 || this.mt <= 0 || Math.hypot(this.tx - this.px, this.ty - this.py) < 16) this.mode = 'back';
    } else {
      const dx = this.px - Phaser.Math.Clamp(this.px, this.a, this.b), dy = this.y0 - this.py, l = Math.hypot(dx, dy) || 1;
      this.py += dy / l * 260 * dt; this.px -= dx / l * 260 * dt;
      if (Math.abs(this.y0 - this.py) < 12) { this.mode = 'fly'; this.cd = 3 + Math.random() * 1.5; }
    }
    if (this.notes && this.noteT <= 0 && Math.abs(pl.x - this.px) < 640) {
      this.noteT = 1.1; const n = this.scene.add.image(this.px + Phaser.Math.Between(-20, 20), this.py - 20, 'nota').setScale(0.5).setDepth(5).setAngle(Phaser.Math.Between(-20, 20));
      this.scene.tweens.add({ targets: n, y: n.y - 70, x: n.x + Phaser.Math.Between(-30, 30), alpha: 0, duration: 1200, onComplete: () => n.destroy() });
    }
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setTexture(Math.floor(this.t * 5) % 2 ? this.tex[1] : this.tex[0]).setPosition(this.px + sh, this.py).setFlipX(this.dir < 0 && this.mode === 'fly'); this.tint(this.img);
  }
}

// Escila: una roca con 12 cabezas que se lanzan hacia ti (¡avisan antes!). Si las golpeas se encogen un rato.
export class Escila extends Enemy {
  constructor(scene, x) {
    super(scene, x, -600, 10, 10, 99); this.hit.body.setAllowGravity(false); this.hit.body.enable = false; this.custom = true; this.cx = x; this.t = 0;
    this.S = 1.3; this.top = GROUND_Y + 2 - 190 * this.S;
    this.rock = scene.add.image(x, GROUND_Y + 2, 'escila').setOrigin(0.5, 1).setScale(this.S).setDepth(1.5);
    this.g = scene.add.graphics().setDepth(2.5);
    this.heads = [];
    for (let i = 0; i < 12; i++) {
      const dx = -100 + i * (200 / 11);
      this.heads.push({ ax: x + dx, ay: this.top + 30 + Math.abs(dx) * 0.55, ph: i * 1.7, st: 'sway', t: 0, cd: 1 + Math.random() * 4, k: 0, hx: 0, hy: 0, img: scene.add.image(x, this.top, 'escila_cabeza').setScale(0.62).setDepth(4.2), tx: 0, ty: 0 });
    }
  }
  restPos(h) { const sd = Math.sign(h.ax - this.cx) || 1; return [h.ax + sd * 34 + Math.sin(this.t * 1.3 + h.ph) * 20, h.ay + 52 + Math.sin(this.t * 1.7 + h.ph) * 14]; }
  update(dt, pl) {
    this.t += dt;
    const g = this.g.clear(), strikes = pl.strikes(); let active = this.heads.filter((h) => h.st === 'tele' || h.st === 'lunge').length;
    for (const h of this.heads) {
      let [rx, ry] = this.restPos(h), x = rx, y = ry, col = 0xffffff, ang;
      h.t -= dt;
      if (h.st === 'sway') {
        h.cd -= dt;
        if (h.cd <= 0 && active < 2 && Math.abs(pl.x - this.cx) < 330 && !pl.dead) { h.st = 'tele'; h.t = 0.55; active++; SFX.seed(); }
      } else if (h.st === 'tele') {
        x += Math.sin(this.t * 60) * 4; col = 0xff9a9a; h.tx = pl.x; h.ty = Phaser.Math.Clamp(pl.y, GROUND_Y - 110, GROUND_Y - 30);
        if (h.t <= 0) { h.st = 'lunge'; h.t = 1.0; h.k = 0; }
      } else if (h.st === 'lunge') {
        const u = 1 - h.t / 1.0; h.k = u < 0.3 ? u / 0.3 : u < 0.55 ? 1 : 1 - (u - 0.55) / 0.45;
        x = rx + (h.tx - rx) * h.k; y = ry + (h.ty - ry) * h.k;
        if (h.k > 0.45 && !pl.dead && Phaser.Math.Distance.Between(x, y, pl.x, pl.y) < 40 && pl.hurt(x)) this.scene.burst(pl.x, pl.y, 6);
        if (h.t <= 0) { h.st = 'sway'; h.cd = 2.5 + Math.random() * 3; }
      } else if (h.st === 'stun') {
        x = h.ax + (h.ax > this.cx ? 14 : -14); y = h.ay + 26; col = 0x9a9ab0;
        if (h.t <= 0) { h.st = 'sway'; h.cd = 1.5; }
      }
      if (h.st !== 'stun') for (const st of strikes) if (!st.hits.has(h) && Phaser.Geom.Intersects.RectangleToRectangle(st.rect, new Phaser.Geom.Rectangle(x - 26, y - 24, 52, 48))) {
        st.hits.add(h); h.st = 'stun'; h.t = 3.5; SFX.bump(); this.scene.burst(x, y, 6); this.scene.kills++;
      }
      ang = Math.atan2(y - h.ay, x - h.ax);
      const mx = (h.ax + x) / 2, my = (h.ay + y) / 2 - 26;
      for (const [w, c] of [[17, INK], [11, h.st === 'stun' ? 0x8a9a80 : 0x82c86e]]) {
        g.lineStyle(w, c, 1).beginPath().moveTo(h.ax, h.ay);
        for (let k = 1; k <= 8; k++) { const u = k / 8; g.lineTo((1 - u) * (1 - u) * h.ax + 2 * (1 - u) * u * mx + u * u * x, (1 - u) * (1 - u) * h.ay + 2 * (1 - u) * u * my + u * u * y); }
        g.strokePath();
      }
      h.hx = x; h.hy = y;
      h.img.setPosition(x, y).setRotation(ang).setFlipY(Math.cos(ang) < 0); h.col = col; col === 0xffffff ? h.img.clearTint() : h.img.setTint(col);
    }
  }
  bounds() { return new Phaser.Geom.Rectangle(-999, -999, 1, 1); }
  visuals() { return [this.rock, ...this.heads.map((h) => h.img)]; }
  destroy() { this.visuals().forEach((o) => o.destroy()); this.g.destroy(); this.hit.destroy(); }
}

// Circe: pasea por su isla. Si la tocas te convierte en cerdo 4 segundos (no puedes atacar y vas más lento).
export class Circe extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 65, 56, 130, 10); this.spiky = true; this.a = a; this.b = b; this.dir = 1; this.t = 0; this.cd = 0;
    this.img = scene.add.image(x, GROUND_Y + 4, 'circe').setOrigin(0.5, 1).setScale(0.5).setDepth(4);
  }
  onTouch(p) {
    if (this.cd > 0 || p.pigT > 0 || p.invuln > 0 || p.dead) return;
    p.pigT = 4; this.cd = 6; SFX.splat(); SFX.boing(); this.scene.confetti(p.x, p.y, 20); this.scene.showBanner('¡Oink!', 'Circe te ha convertido en cerdo 4 segundos');
  }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd = Math.max(0, this.cd - dt);
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    body.setVelocityX(this.dir * 42);
    this.img.setPosition(this.x, GROUND_Y + 4 - Math.abs(Math.sin(this.t * 5)) * 4).setFlipX(this.dir < 0).setRotation(Math.sin(this.t * 5) * 0.03); this.tint(this.img);
    if (Math.random() < 0.08) this.scene.particles.emitParticleAt(this.x + this.dir * 40, this.y - 20, 1);
  }
}

// Polifemo: jefe final. Lanza 2 ojitos cada 4 segundos. Solo la estaca de madera le hace daño.
export class Polifemo {
  constructor(scene, x, minX, maxX) {
    this.scene = scene; this.hp = 4; this.maxHp = 4; this.dead = false; this.active = false; this.vulnerable = false;
    this.minX = minX; this.maxX = maxX; this.x = x; this.dir = -1; this.S = 0.62; this.phase = 'wait'; this.timer = 0; this.t = 0; this.flash = 0; this.hurtT = 0; this.hint = 0; this.seeds = [];
    this.img = scene.add.image(x, GROUND_Y + 8, 'polifemo').setOrigin(0.5, 0.97).setScale(this.S).setDepth(4);
  }
  contactBox() { return this.active && !this.dead ? new Phaser.Geom.Rectangle(this.x - 68, GROUND_Y - 195, 136, 195) : null; }
  hurtBox() { return new Phaser.Geom.Rectangle(this.x - 85, GROUND_Y - 215, 170, 215); }
  start() { this.active = true; this.vulnerable = true; this.phase = 'idle'; this.timer = 2.0; this.scene.showBanner('¡Polifemo!', '¡Solo la estaca de madera puede con él!'); SFX.bossRoar(); }
  throwEyes() {
    const pl = this.scene.player, dir = Math.sign(pl.x - this.x) || -1;
    for (let k = 0; k < 2; k++) {
      const x = this.x + dir * 60, y = GROUND_Y - 170, vx = Phaser.Math.Clamp((pl.x - x) / (1.1 - k * 0.2), -440, 440) * (k ? 0.7 : 1);
      this.seeds.push({ x, y, vx, vy: -430 - k * 60, r: 28, harm: true, dead: false, bn: 0, age: 0, img: this.scene.add.image(x, y, 'miniojo').setScale(0.75).setDepth(8) });
    }
    SFX.seed();
  }
  update(dt, pl) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt); this.hint -= dt;
    let tex = 'polifemo', bob = 0;
    if (this.active && !this.dead) {
      this.timer -= dt;
      if (this.phase === 'idle') {
        bob = Math.abs(Math.sin(this.t * 4)) * 3; this.dir = Math.sign(pl.x - this.x) || this.dir;
        if (this.hp <= 2) this.x = Phaser.Math.Clamp(this.x + this.dir * 36 * dt, this.minX + 80, this.maxX);
        if (this.timer <= 0) { this.phase = 'throw'; this.timer = 0.7; this.thrown = false; SFX.charge(); }
      } else if (this.phase === 'throw') {
        tex = 'polifemo_throw'; this.dir = Math.sign(pl.x - this.x) || this.dir;
        if (this.timer < 0.35 && !this.thrown) { this.thrown = true; this.throwEyes(); }
        if (this.timer <= 0) { this.phase = 'idle'; this.timer = 3.3; }
      } else if (this.phase === 'dizzy') {
        tex = 'polifemo_dizzy';
        if (this.timer <= 0) { this.phase = 'idle'; this.timer = 2.2; }
      }
    }
    if (this.dead) tex = 'polifemo_dizzy';
    this.img.setTexture(tex).setPosition(this.x, GROUND_Y + 8 - bob).setFlipX(this.dir > 0 ? false : false).setScale(this.S * (this.flash > 0 ? 1.04 : 1));
    this.flash > 0 ? this.img.setTintFill(0xffffff) : this.img.clearTint();
    for (const s of this.seeds) {
      s.age += dt; s.vy += 1100 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.img.setPosition(s.x, s.y).setRotation(s.age * 8);
      if (s.y > GROUND_Y - 24 && s.vy > 0) { if (s.bn >= 2) { s.dead = true; this.scene.burst(s.x, s.y, 6); } else { s.bn++; s.vy = -s.vy * 0.55; s.y = GROUND_Y - 24; SFX.boing(); } }
      if (s.age > 5 || s.x < this.minX - 120 || s.x > this.maxX + 120) s.dead = true;
    }
    this.seeds = this.seeds.filter((s) => { if (s.dead) s.img.destroy(); return !s.dead; });
  }
  takeHit(kind) {
    if (!this.active || this.dead || this.hurtT > 0 || kind === 'stomp') return false;
    if (!this.scene.player.estaca) { if (this.hint <= 0) { this.hint = 3; this.scene.showBanner('¡Necesitas la estaca!', 'Solo la estaca de madera hiere a Polifemo'); } return false; }
    this.hp--; this.hurtT = 1.6; this.flash = 0.2; SFX.bossHit(); this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.x, GROUND_Y - 130, 14);
    if (this.hp <= 0) { this.die(); return true; }
    this.phase = 'dizzy'; this.timer = 1.6; return true;
  }
  die() {
    this.dead = true; this.vulnerable = false;
    this.scene.tweens.add({ targets: this.img, alpha: 0, scaleX: this.S * 1.4, scaleY: this.S * 0.1, duration: 1200 });
    this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.x + Phaser.Math.Between(-80, 80), GROUND_Y - Phaser.Math.Between(20, 170), 8) });
    for (const s of this.seeds) s.dead = true;
    this.scene.bossDefeated();
  }
}

// ───────────────────────── Nivel 8: dentro del taco ─────────────────────────
// Taco-bot: patrulla y lanza láseres horizontales cuando te ve de frente.
export class TacoBot extends Enemy {
  constructor(scene, x, a, b, tex = 'tacobot', proj = 'rayo', sc = 0.5) {
    super(scene, x, GROUND_Y - 38, 92, 76, 1); this.a = a; this.b = b; this.dir = -1; this.t = Math.random() * 6; this.cd = 2 + Math.random(); this.tele = 0; this.proj = proj;
    this.img = scene.add.image(x, 0, tex).setScale(sc).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt; this.tele = Math.max(0, this.tele - dt);
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    body.setVelocityX(this.tele > 0 ? 0 : this.dir * 40);
    const near = Math.abs(pl.x - this.x) < 440 && Math.abs(pl.y - this.y) < 110 && !pl.dead;
    if (near && this.cd <= 0 && this.tele <= 0) { this.dir = Math.sign(pl.x - this.x) || this.dir; this.tele = 0.5; this.cd = 3; SFX.fuse(); }
    if (this.tele > 0 && this.tele - dt <= 0) { this.scene.addProjectile({ type: this.proj, x: this.x + this.dir * 50, y: this.y - 6, vx: this.dir * 360, vy: 0, life: 2.2 }); SFX.seed(); }
    this.img.setPosition(this.x + (this.tele > 0 ? Math.sin(this.t * 70) * 2 : 0), this.y + 4 + Math.abs(Math.sin(this.t * 6)) * -2).setFlipX(this.dir < 0); this.tint(this.img);
  }
}

// ───────────────────────── Niveles 9, 10 y 11 ─────────────────────────
export class Escorpion extends Enemy {
  constructor(scene, x, a, b, tex = 'escorpion', sc = 0.55) {
    super(scene, x, GROUND_Y - 30, 78, 56, 1); this.a = a; this.b = b; this.dir = Math.random() < 0.5 ? -1 : 1; this.t = Math.random() * 6;
    this.img = scene.add.image(x, 0, tex).setScale(sc).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const body = this.hit.body, dx = pl.x - this.x, chase = Math.abs(dx) < 300 && Math.abs(pl.y - this.y) < 120 && !pl.dead;
    if (chase) this.dir = Math.sign(dx) || this.dir; else { if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1; }
    if (body.blocked.left) this.dir = 1; if (body.blocked.right) this.dir = -1;
    if (Math.abs(body.velocity.x) < 140) body.setVelocityX(this.dir * (chase ? 95 : 55));
    this.img.setPosition(this.x, this.y + 6 + Math.sin(this.t * 14) * 1.5).setFlipX(this.dir > 0); this.tint(this.img);
  }
}
// Tropix escorpión: vuela y escupe veneno
export class TropixEsc extends Enemy {
  constructor(scene, x, y, a, b, tex = 'tropix_escorpion', sc = 0.38) {
    super(scene, x, y, 78, 70, 1); this.hit.body.setAllowGravity(false).setImmovable(true);
    this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6; this.cd = 2 + Math.random();
    this.img = scene.add.image(x, y, tex).setScale(sc).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    this.px += this.dir * 65 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
    this.py = this.y0 + Math.sin(this.t * 2.4) * 14;
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setRotation(Math.sin(this.t * 3) * 0.06).setFlipX(this.dir < 0); this.tint(this.img);
    if (this.cd <= 0 && Math.abs(pl.x - this.px) < 480 && pl.y > this.py - 20 && !pl.dead) {
      this.cd = 3.4; const dx = pl.x - this.px, dy = pl.y - this.py, l = Math.hypot(dx, dy) || 1;
      this.scene.addProjectile({ type: 'glob', x: this.px, y: this.py + 20, vx: dx / l * 270, vy: dy / l * 270, life: 3 }); SFX.seed();
    }
  }
}
// Planta carnívora: quieta, te escupe polen y, si la tocas, te convierte en maceta 4 s (¡se puede aplastar!)
export class PlantaMaceta extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 50, 64, 100, 2); this.a = a; this.b = b; this.t = Math.random() * 6; this.cd = 1.5 + Math.random() * 1.5;
    this.img = scene.add.image(x, GROUND_Y + 6, 'planta').setOrigin(0.5, 1).setScale(0.62).setDepth(4);
  }
  onTouch(p) { p.pot(); }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    const dx = pl.x - this.x; this.hit.body.setVelocityX(0);
    if (this.cd <= 0 && Math.abs(dx) < 440 && !pl.dead) { this.cd = 3.2; this.scene.addProjectile({ type: 'polen', x: this.x, y: this.y - 50, vx: Phaser.Math.Clamp(dx / 0.73, -400, 400), vy: -330, g: 900, life: 3 }); SFX.seed(); this.snap = 0.25; }
    this.snap = Math.max(0, (this.snap || 0) - dt);
    this.img.setPosition(this.x, GROUND_Y + 6).setScale(0.62 * (1 + (this.snap > 0 ? 0.12 : 0)), 0.62 * (1 + Math.sin(this.t * 3) * 0.03 + (this.snap > 0 ? 0.1 : 0))).setRotation(Math.sin(this.t * 2.2) * 0.05); this.tint(this.img);
  }
}
// Tipi-momia: camina; te enrolla si la tocas y lanza escorpiones
export class Momia extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 62, 58, 124, 2); this.a = a; this.b = b; this.dir = -1; this.t = Math.random() * 6; this.cd = 3 + Math.random() * 2;
    this.img = scene.add.image(x, GROUND_Y + 4, 'momia').setOrigin(0.5, 1).setScale(0.43).setDepth(4);
  }
  onTouch(p) { if (p.invuln > 0 || p.dead) return; if (p.hurt(this.x)) { p.stun = 1.1; this.scene.burst(p.x, p.y, 8); this.scene.showBanner('¡Enrollado!', 'La momia te ha atado un momento'); } }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt;
    const body = this.hit.body;
    if (this.x < this.a) this.dir = 1; if (this.x > this.b) this.dir = -1;
    if (Math.abs(body.velocity.x) < 100) body.setVelocityX(this.dir * 38);
    this.img.setPosition(this.x, GROUND_Y + 4 - Math.abs(Math.sin(this.t * 5)) * 3).setFlipX(this.dir < 0).setRotation(Math.sin(this.t * 5) * 0.03); this.tint(this.img);
    if (this.cd <= 0 && Math.abs(pl.x - this.x) < 420 && Math.abs(pl.y - this.y) < 130 && !pl.dead) {
      this.cd = 5; const d = Math.sign(pl.x - this.x) || 1, e = this.scene.addEnemy('escorpion', this.x + d * 40, 0, this.x - 200, this.x + 200);
      if (e) { e.hit.body.setVelocity(d * 230, -320); SFX.seed(); }
    }
  }
}
export class MiniVamp extends Sirena {
  constructor(scene, x, y, a, b) { super(scene, x, y, a, b); this.siren = false; this.notes = false; this.tex = ['minivamp', 'minivamp_up']; this.img.setTexture('minivamp').setScale(0.4); }
  onTouch(p) { if (p.invuln > 0 || p.dead) return; if (p.hurt(this.x)) { p.slow = 5; this.scene.showBanner('¡Mordisco!', 'Vas lento durante 5 segundos'); } }
}
export class Calabaza extends Bomba {
  constructor(scene, x, a, b) { super(scene, x, a, b); this.tx = ['calabaza', 'calabaza_hot']; this.img.setTexture('calabaza'); }
}
export class PezLinterna extends Enemy {
  constructor(scene, x, y, a, b) {
    super(scene, x, y, 80, 60, 1); this.hit.body.setAllowGravity(false).setImmovable(true);
    this.a = a; this.b = b; this.y0 = y; this.px = x; this.py = y; this.dir = 1; this.t = Math.random() * 6; this.lit = 0; this.cd = 0;
    this.img = scene.add.image(x, y, 'pez_linterna').setScale(0.42).setDepth(4); this.g = scene.add.graphics().setDepth(3.9);
  }
  visuals() { return [this.img, this.g]; }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd = Math.max(0, this.cd - dt);
    this.px += this.dir * 55 * dt; if (this.px < this.a) this.dir = 1; if (this.px > this.b) this.dir = -1;
    this.py = this.y0 + Math.sin(this.t * 2) * 16;
    this.hit.setPosition(this.px, this.py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, this.py).setFlipX(this.dir < 0); this.tint(this.img);
    const lx = this.px + this.dir * 50, ly = this.py - 20, near = Math.hypot(pl.x - lx, pl.y - ly) < 210 && !pl.dead;
    this.g.clear().fillStyle(0xfff08a, 0.16 + 0.1 * Math.sin(this.t * 6)).fillCircle(lx, ly, 120).fillStyle(0xfff08a, 0.18).fillCircle(lx, ly, 70);
    this.lit = near ? this.lit + dt : Math.max(0, this.lit - dt);
    if (this.lit > 0.7 && this.cd <= 0) { this.cd = 9; this.lit = 0; this.scene.hallucinate('invert', '¡Hipnotizado!', 'El pez linterna te controla: teclas al revés', 4); }
  }
}

// ── Jefes de los niveles 9 y 10: la Pirámide (salta y aplasta) y el Vampiro (vuela y muerde) ──

// Empujón (columna roja del mundo raro): no se puede matar; si la tocas, ¡te empuja lejos!
export class Empujon extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 60, 60, 120, 1); this.spiky = true; this.t = Math.random() * 6; this.cd = 0;
    this.img = scene.add.image(x, GROUND_Y + 6, 'empujon').setOrigin(0.5, 1).setScale(0.75).setDepth(4);
  }
  takeHit() {}
  update(dt) { if (this.dead) return; this.t += dt; this.cd = Math.max(0, this.cd - dt); this.img.setScale(0.75 * (1 + Math.sin(this.t * 5) * 0.03), 0.75 * (1 - Math.sin(this.t * 5) * 0.03)); }
  onTouch(p) {
    if (this.cd > 0 || p.dead) return; this.cd = 0.4; const d = Math.sign(p.x - this.x) || 1;
    p.stun = Math.max(p.stun, 0.35); p.hit.body.setVelocity(d * 650, -260); SFX.boing(); this.scene.burst(this.x, this.y - 20, 8); this.img.setScale(0.9, 0.6);
  }
}

// Planta manotazo (selva): quieta; cuando te acercas levanta la mano y ¡manotazo! que te tira hacia atrás (sin daño). Se puede golpear.
export class PlantaMano extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 60, 70, 120, 2); this.t = Math.random() * 6; this.cd = 1.2 + Math.random(); this.ph = 'idle'; this.pt = 0; this.face = -1;
    this.img = scene.add.image(x, GROUND_Y + 6, 'planta_mano').setOrigin(0.5, 1).setScale(0.62).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.cd -= dt; const dx = pl.x - this.x;
    if (this.ph === 'idle') { if (Math.abs(dx) < 260 && !pl.dead) this.face = Math.sign(dx) || this.face; if (this.cd <= 0 && Math.abs(dx) < 230 && Math.abs(pl.y - this.y) < 130 && !pl.dead) { this.ph = 'tele'; this.pt = 0.45; } }
    else if (this.ph === 'tele') { this.pt -= dt; if (this.pt <= 0) { this.ph = 'slap'; this.pt = 0.3; SFX.crash(); const d = pl.x - this.x; if (Math.sign(d) === this.face && Math.abs(d) < 170 && Math.abs(pl.y - this.y) < 110 && !pl.dead) { pl.stun = Math.max(pl.stun, 0.35); pl.hit.body.setVelocity(this.face * 700, -280); this.scene.burst(pl.x, pl.y, 8); } } }
    else { this.pt -= dt; if (this.pt <= 0) { this.ph = 'idle'; this.cd = 1.8; } }
    const sw = this.ph === 'slap', wob = this.ph === 'tele' ? Math.sin(this.t * 50) * 0.04 : Math.sin(this.t * 2) * 0.02;
    this.img.setTexture(sw ? 'planta_mano_slap' : 'planta_mano').setPosition(this.x, GROUND_Y + 6).setFlipX(this.face > 0).setRotation(wob); this.tint(this.img);
  }
  onTouch(p) { if (p.dead) return; const d = Math.sign(p.x - this.x) || 1; p.stun = Math.max(p.stun, 0.25); p.hit.body.setVelocity(d * 420, -200); }
}

// Higo chungo (granja): cuelga en lo alto; cuando pasas debajo ¡cae! Se puede golpear. Vuelve a colgar tras un rato.
export class HigoCaida extends Enemy {
  constructor(scene, x, tex = 'higo') {
    super(scene, x, GROUND_Y - 230, 46, 60, 1); this.hit.body.setAllowGravity(false).setImmovable(true); this.y0 = GROUND_Y - 230; this.ph = 'hang'; this.vy = 0; this.wt = 0; this.t = Math.random() * 6;
    this.img = scene.add.image(x, this.y0, tex).setScale(0.55).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); const x = this.x;
    if (this.ph === 'hang') { this.hit.y = this.y0 + Math.sin(this.t * 3) * 3; if (Math.abs(pl.x - x) < 90 && !pl.dead) { this.ph = 'shake'; this.wt = 0.4; } }
    else if (this.ph === 'shake') { this.wt -= dt; this.img.x = x + Math.sin(this.t * 80) * 3; if (this.wt <= 0) { this.ph = 'fall'; this.vy = 0; } }
    else if (this.ph === 'fall') { this.vy += 1500 * dt; this.hit.y += this.vy * dt; if (this.hit.y >= GROUND_Y - 24) { this.hit.y = GROUND_Y - 24; this.ph = 'splat'; this.wt = 0.5; this.hit.body.enable = false; this.scene.burst(x, GROUND_Y - 10, 8); SFX.splat(); } }
    else if (this.ph === 'splat') { this.wt -= dt; this.img.setScale(0.7, 0.25); if (this.wt <= 0) { this.ph = 'wait'; this.wt = 3; this.img.setVisible(false); } }
    else if (this.ph === 'wait') { this.wt -= dt; if (this.wt <= 0 && Math.abs(pl.x - x) > 200) { this.ph = 'hang'; this.hit.y = this.y0; this.hit.body.enable = true; this.img.setVisible(true).setScale(0.55); } }
    if (this.hit.body.enable) this.hit.body.updateFromGameObject();
    this.img.setPosition(this.ph === 'shake' ? this.img.x : x, this.hit.y + (this.ph === 'splat' ? 14 : 0)); this.tint(this.img);
  }
}

// ───────────────────────── Nivel 24: Rebuscado ─────────────────────────
// Espejo: flota y copia tus movimientos al revés (como si fuera tu reflejo).
export class Espejo extends Enemy {
  constructor(scene, x, a, b) {
    super(scene, x, GROUND_Y - 120, 70, 120, 1); this.hit.body.setAllowGravity(false).setImmovable(true);
    this.a = a; this.b = b; this.c = (a + b) / 2; this.t = Math.random() * 6; this.px = x; this.y0 = GROUND_Y - 120;
    this.img = scene.add.image(x, this.y0, 'rb_espejo').setScale(0.55).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt);
    const near = Math.abs(pl.x - this.c) < 520, tx = near ? Phaser.Math.Clamp(2 * this.c - pl.x, this.a - 120, this.b + 120) : this.c;
    this.px += Phaser.Math.Clamp(tx - this.px, -420 * dt, 420 * dt);
    const py = this.y0 + Math.sin(this.t * 3) * 8; this.hit.setPosition(this.px, py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, py).setFlipX(pl.x > this.px).setRotation(Math.sin(this.t * 2) * 0.04); this.tint(this.img);
  }
}
// Imán: flota y te atrae hacia él si te acercas.
export class Iman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y || GROUND_Y - 150, 80, 80, 1); this.hit.body.setAllowGravity(false).setImmovable(true); this.t = Math.random() * 6; this.y0 = y || GROUND_Y - 150; this.px = x;
    this.img = scene.add.image(x, this.y0, 'rb_iman').setScale(0.5).setDepth(4); this.fx = scene.add.graphics().setDepth(3.5);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); const py = this.y0 + Math.sin(this.t * 2.5) * 10;
    this.hit.setPosition(this.px, py); this.hit.body.setVelocity(0, 0); this.hit.body.updateFromGameObject();
    this.img.setPosition(this.px, py).setRotation(Math.sin(this.t * 2) * 0.1); this.tint(this.img);
    const dx = this.px - pl.x, dy = py - pl.y, d = Math.hypot(dx, dy); this.fx.clear();
    if (d < 380 && !pl.dead) {
      pl.hit.body.setVelocityX(pl.hit.body.velocity.x + Math.sign(dx) * 1500 * dt * (1 - d / 480));
      for (let i = 0; i < 3; i++) { const u = ((this.t * 1.5 + i / 3) % 1); this.fx.lineStyle(3, 0xff5566, 1 - u).strokeCircle(this.px, py, 30 + u * 150); }
    }
  }
  destroy() { super.destroy(); this.fx.destroy(); }
}
// Mimo: se esfuma y reaparece justo a tu lado.
export class Mimo extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 60, 50, 110, 1); this.t = Math.random() * 6; this.ph = 'show'; this.wt = 2 + Math.random(); this.face = -1;
    this.img = scene.add.image(x, GROUND_Y + 8, 'rb_mimo').setOrigin(0.5, 1).setScale(0.55).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.wt -= dt; const b = this.hit.body;
    if (this.ph === 'show') { this.face = Math.sign(pl.x - this.x) || this.face; b.setVelocityX(this.face * 40); if (this.wt <= 0) { this.ph = 'fade'; this.wt = 0.5; SFX.fuse(); } }
    else if (this.ph === 'fade') { b.setVelocityX(0); this.img.setAlpha(Math.max(0, this.wt / 0.5)); if (this.wt <= 0) { this.ph = 'gone'; this.wt = 0.9; b.enable = false; this.img.setVisible(false); this.scene.burst(this.x, GROUND_Y - 60, 8); } }
    else if (this.ph === 'gone') { if (this.wt <= 0) { const nx = Phaser.Math.Clamp(pl.x + (Math.random() < 0.5 ? -1 : 1) * 190, 80, this.scene.worldW ? this.scene.worldW - 80 : 6300); this.hit.body.reset(nx, GROUND_Y - 60); b.enable = true; this.ph = 'appear'; this.wt = 0.5; this.img.setVisible(true); this.scene.burst(nx, GROUND_Y - 60, 8); SFX.pop(); } }
    else { b.setVelocityX(0); this.img.setAlpha(Math.min(1, 1 - this.wt / 0.5 + 0.2)); if (this.wt <= 0) { this.ph = 'show'; this.wt = 2.2 + Math.random(); this.img.setAlpha(1); } }
    this.img.setPosition(this.x, GROUND_Y + 8 + Math.sin(this.t * 8) * (this.ph === 'show' ? 2 : 0)).setFlipX(this.face > 0); if (this.ph === 'show') this.tint(this.img);
  }
}

// Mini impresión (nivel 25): la crea la Impresora 3D y va a por ti por toda la arena. Se apaga sola a los 14 s.
export class MiniPrint extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 36, 60, 64, 1); this.t = Math.random() * 6; this.life = 14; this.dir = -1; this.grow = 0;
    this.img = scene.add.image(x, 0, 'tc_miniprint').setScale(0.4).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.grow = Math.min(1, this.grow + dt * 3); this.flash = Math.max(0, this.flash - dt); this.life -= dt;
    const dx = pl.x - this.x, body = this.hit.body;
    if (!pl.dead) this.dir = Math.sign(dx) || this.dir;
    if (Math.abs(body.velocity.x) < 190) body.setVelocityX(this.dir * 120);
    if (this.life <= 0) return this.die('time');
    this.img.setPosition(this.x, this.y + 6 + Math.abs(Math.sin(this.t * 12)) * -4).setFlipX(this.dir > 0).setScale(0.4 * this.grow, 0.4 * (0.4 + 0.6 * this.grow)); this.tint(this.img);
  }
}

// Regalo trampa (nivel 26): parece un regalo; si te acercas tiembla, se abre y ¡salta a morderte!
export class Regalo extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 36, 64, 66, 1); this.t = Math.random() * 6; this.ph = 'box'; this.wt = 0; this.dir = -1;
    this.img = scene.add.image(x, 0, 'nv_regalo').setScale(0.5).setDepth(4);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.wt -= dt; const b = this.hit.body, dx = pl.x - this.x, g = b.blocked.down || b.touching.down;
    if (this.ph === 'box') { b.setVelocityX(0); if (Math.abs(dx) < 230 && Math.abs(pl.y - this.y) < 150 && !pl.dead) { this.ph = 'shake'; this.wt = 0.6; SFX.charge(); } }
    else if (this.ph === 'shake') { b.setVelocityX(0); this.dir = Math.sign(dx) || this.dir; if (this.wt <= 0) { this.ph = 'jump'; this.wt = 0.3; b.setVelocity(this.dir * 300, -560); SFX.boing(); } }
    else if (this.ph === 'jump') { if (g && this.wt <= 0) { this.ph = 'rest'; this.wt = 1.1; b.setVelocityX(0); this.scene.burst(this.x, GROUND_Y - 6, 6); } }
    else { b.setVelocityX(0); if (this.wt <= 0) { this.ph = Math.abs(dx) < 260 ? 'shake' : 'box'; this.wt = 0.5; } }
    const open = this.ph === 'jump' || this.ph === 'rest' || (this.ph === 'shake' && this.wt < 0.25);
    this.img.setTexture(open ? 'nv_regalo_open' : 'nv_regalo').setPosition(this.x + (this.ph === 'shake' ? Math.sin(this.t * 60) * 3 : 0), this.y + 6).setFlipX(this.dir > 0); this.tint(this.img);
  }
}

// Lengua (nivel 27): sale de un agujero del suelo, avisa, se estira y ¡te quita una vida si la tocas!
export class Lengua extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 80, 60, 150, 2); this.t = Math.random() * 6; this.ph = 'hide'; this.wt = 1 + Math.random() * 1.5; this.ext = 0;
    this.img = scene.add.image(x, GROUND_Y + 12, 'lb_lengua').setOrigin(0.5, 1).setScale(0.55).setDepth(4); this.hit.body.enable = false;
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.wt -= dt; const dx = Math.abs(pl.x - this.x), b = this.hit.body;
    if (this.ph === 'hide') { this.ext = Math.max(0, this.ext - dt * 4); if (this.wt <= 0 && dx < 260 && !pl.dead) { this.ph = 'tele'; this.wt = 0.5; } else if (this.wt <= 0) this.wt = 0.4; }
    else if (this.ph === 'tele') { this.ext = 0.18 + Math.sin(this.t * 40) * 0.04; if (this.wt <= 0) { this.ph = 'out'; this.wt = 1.1; SFX.pop(); b.enable = true; } }
    else if (this.ph === 'out') { this.ext = Math.min(1, this.ext + dt * 6); if (this.wt <= 0) { this.ph = 'hide'; this.wt = 1.6 + Math.random(); b.enable = false; } }
    this.hit.setPosition(this.x, GROUND_Y - 6 - 75 * this.ext); if (b.enable) b.updateFromGameObject();
    this.img.setPosition(this.x, GROUND_Y + 12).setScale(0.55, 0.55 * Math.max(0.1, this.ext)).setRotation(this.ph === 'out' ? Math.sin(this.t * 6) * 0.05 : 0); this.img.setVisible(this.ext > 0.02 || true); this.tint(this.img);
  }
}

// ───────────────────────── Nivel 28: Fútbol ─────────────────────────
// Balón: ¡bota muchísimo! Dura unos segundos. Te quita una vida si te toca.
export class Balon extends Enemy {
  constructor(scene, x, y, vx) {
    super(scene, x, y || GROUND_Y - 40, 44, 44, 1); this.vx = vx || (Math.random() < 0.5 ? -1 : 1) * 150; this.life = 11; this.t = 0;
    this.img = scene.add.image(x, this.y, 'balon').setScale(0.5).setDepth(5);
  }
  update(dt) {
    if (this.dead) return;
    this.t += dt; this.life -= dt; this.flash = Math.max(0, this.flash - dt); const b = this.hit.body;
    if (b.blocked.down) b.setVelocityY(-720);
    if (b.blocked.left) this.vx = Math.abs(this.vx); if (b.blocked.right) this.vx = -Math.abs(this.vx);
    b.setVelocityX(this.vx); if (this.life <= 0) return this.die('time');
    this.img.setPosition(this.x, this.y).setRotation(this.t * 5 * Math.sign(this.vx)); this.tint(this.img);
  }
}
// Camiseta: la lanza el Goleador y vuela hacia ti. No quita vida, pero te ATRAPA un momento.
export class Camiseta extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 56, 50, 1); this.hit.body.setAllowGravity(false); this.life = 3.5; this.t = 0; this.set = false;
    this.img = scene.add.image(x, y, 'fb_camiseta').setScale(0.42).setDepth(6);
  }
  update(dt, pl) {
    if (this.dead) return;
    this.t += dt; this.life -= dt; this.flash = Math.max(0, this.flash - dt);
    if (!this.set) { const dx = pl.x - this.x, dy = (pl.y - 20) - this.y, d = Math.hypot(dx, dy) || 1; this.hit.body.setVelocity(dx / d * 260, dy / d * 260); this.set = true; }
    if (this.life <= 0) return this.die('time');
    this.img.setPosition(this.x, this.y).setRotation(this.t * 6); this.tint(this.img);
  }
  onTouch(p) { if (p.invuln > 0 || p.dead) return; p.stun = Math.max(p.stun, 1.2); p.hit.body.setVelocity(0, 0); this.scene.burst(p.x, p.y, 8); this.scene.showBanner('¡Atrapado!', 'La camiseta te ha atrapado un momento'); this.die('touch'); }
}
// Portería: si la tocas, ¡salen 3 balones que te quitan vida!
export class Porteria extends Enemy {
  constructor(scene, x) {
    super(scene, x, GROUND_Y - 60, 140, 110, 99); this.hit.body.setAllowGravity(false).setImmovable(true); this.spiky = true; this.cd = 0; this.t = 0;
    this.img = scene.add.image(x, GROUND_Y + 4, 'fb_porteria').setOrigin(0.5, 1).setScale(0.62).setDepth(3.5);
  }
  takeHit() {}
  update(dt) { this.t += dt; this.cd = Math.max(0, this.cd - dt); this.img.setRotation(this.cd > 4.5 ? Math.sin(this.t * 60) * 0.03 : 0); }
  onTouch(p) {
    if (this.cd > 0 || p.dead) return; this.cd = 5; SFX.crash(); this.scene.burst(this.x, GROUND_Y - 80, 10);
    for (const k of [-1, 0, 1]) this.scene.addEnemy('balon', this.x + k * 30, GROUND_Y - 140, 0, k === 0 ? (Math.random() < 0.5 ? -130 : 130) : k * 170);
    this.scene.showBanner('¡Gol!', 'Salen 3 balones de la portería');
  }
}

export class Boss2 {
  constructor(scene, kind, x, minX, maxX) {
    this.scene = scene; this.kind = kind; this.hp = 4; this.maxHp = 4; this.dead = false; this.active = false; this.vulnerable = false;
    this.minX = minX; this.maxX = maxX; this.x = x; this.h = kind === 'vampiro' ? 200 : 0; this.vy = 0; this.dir = -1; this.phase = 'wait'; this.timer = 0; this.t = 0; this.flash = 0; this.hurtT = 0; this.seeds = []; this.spawnT = 5;
    const c = kind === 'vampiro' ? { n: ['vampiro', 'vampiro_dive', 'vampiro_dizzy'], S: 0.55, bw: 120, bh: 190 } : kind === 'reina' ? { n: ['reina', 'reina_jump', 'reina_dizzy'], S: 0.62, bw: 130, bh: 170 } : kind.startsWith('pegote') ? { n: ['pgb_' + kind.slice(7), 'pgb_' + kind.slice(7) + '_jump', 'pgb_' + kind.slice(7) + '_dizzy'], S: 0.5, bw: 170, bh: 160 } : kind === 'goleador' ? { n: ['goleador', 'goleador_jump', 'goleador_dizzy'], S: 0.45, bw: 170, bh: 230 } : kind === 'lengua' ? { n: ['lengua', 'lengua_jump', 'lengua_dizzy'], S: 0.5, bw: 200, bh: 200 } : kind === 'santa' ? { n: ['santa', 'santa_jump', 'santa_dizzy'], S: 0.5, bw: 170, bh: 210 } : kind === 'impresora' ? { n: ['impresora', 'impresora_jump', 'impresora_dizzy'], S: 0.45, bw: 150, bh: 190 } : kind === 'tetera' ? { n: ['tetera', 'tetera_jump', 'tetera_dizzy'], S: 0.5, bw: 190, bh: 170 } : kind === 'albaricoque' ? { n: ['albaricoque', 'albaricoque_jump', 'albaricoque_dizzy'], S: 0.5, bw: 170, bh: 170 } : kind === 'gorila' ? { n: ['gorila', 'gorila_jump', 'gorila_dizzy'], S: 0.5, bw: 170, bh: 185 } : kind === 'raro' ? { n: ['raro_jefe', 'raro_jefe_jump', 'raro_jefe_dizzy'], S: 0.56, bw: 170, bh: 170 } : kind === 'bacteria' ? { n: ['bact_jefe', 'bact_jefe_jump', 'bact_jefe_dizzy'], S: 0.6, bw: 170, bh: 190 } : kind === 'payaso' ? { n: ['payaso', 'payaso_jump', 'payaso_dizzy'], S: 0.62, bw: 150, bh: 175 } : kind === 'caca' ? { n: ['gran_caca', 'gran_caca_jump', 'gran_caca_dizzy'], S: 0.62, bw: 150, bh: 165 } : kind === 'cangrejo' ? { n: ['cangrejo_rey', 'cangrejo_rey_jump', 'cangrejo_rey_dizzy'], S: 0.62, bw: 150, bh: 150 } : kind === 'enredadera' ? { n: ['enredadera', 'enredadera_swing', 'enredadera_dizzy'], S: 0.7, bw: 110, bh: 230 } : { n: ['piramide', 'piramide_jump', 'piramide_dizzy'], S: 0.62, bw: 150, bh: 170 };
    this.c = c; this.img = scene.add.image(x, GROUND_Y + 8 - this.h, c.n[0]).setOrigin(kind === 'enredadera' ? 0.34 : 0.5, 1).setScale(c.S).setDepth(4);
    if (kind === 'enredadera') { this.zar = scene.add.image(x, GROUND_Y + 8, 'zarcillo').setOrigin(0.5, 1).setScale(0.7).setDepth(4.5).setVisible(false); this.warn = scene.add.graphics().setDepth(3); this.zOn = false; this.tx = x; this.n = 0; }
  }
  contactBox() {
    if (this.kind === 'enredadera') return this.active && !this.dead ? (this.zOn ? new Phaser.Geom.Rectangle(this.tx - 30, GROUND_Y - 240, 60, 240) : this.vulnerable ? null : new Phaser.Geom.Rectangle(this.x - 40, GROUND_Y - 230, 80, 230)) : null;
    return this.active && !this.dead && !this.vulnerable ? new Phaser.Geom.Rectangle(this.x - this.c.bw / 2, GROUND_Y - this.h - this.c.bh, this.c.bw, this.c.bh) : null;
  }
  hurtBox() { if (this.kind === 'enredadera') return new Phaser.Geom.Rectangle(this.x - 10, GROUND_Y - 150, 150, 150); return new Phaser.Geom.Rectangle(this.x - this.c.bw / 2 - 10, GROUND_Y - this.h - this.c.bh - 10, this.c.bw + 20, this.c.bh + 10); }
  start() {
    this.active = true; this.phase = this.kind === 'vampiro' ? 'hover' : 'idle'; this.timer = 1.6;
    this.scene.showBanner(this.kind === 'vampiro' ? '¡El Vampiro!' : this.kind === 'reina' ? '¡La Rata Reina!' : this.kind === 'enredadera' ? '¡La Enredadera!' : this.kind === 'cangrejo' ? '¡El Cangrejo Rey!' : this.kind === 'caca' ? '¡La Gran Caca!' : this.kind === 'payaso' ? '¡El Payaso Gigante!' : this.kind === 'bacteria' ? '¡La Bacteria Gigante!' : this.kind === 'raro' ? '¡El Jefe Raro!' : this.kind === 'gorila' ? '¡El Gorila Gigante!' : this.kind === 'goleador' ? '¡El Goleador Gigante!' : this.kind === 'lengua' ? '¡La Lengua Gigante!' : this.kind === 'santa' ? '¡Papá Noel Gigante!' : this.kind === 'impresora' ? '¡La Impresora 3D!' : this.kind === 'tetera' ? '¡La Tetera Rebuscada!' : this.kind === 'albaricoque' ? '¡El Albaricoque Gigante!' : this.kind.startsWith('pegote') ? '¡Pegote Gigante!' : '¡La Pirámide!', this.kind === 'vampiro' ? '¡Cuando aterrice tras morder, golpéalo!' : this.kind === 'reina' ? '¡Esquiva su salto lunar y golpéala cuando se maree!' : this.kind === 'enredadera' ? '¡Esquiva sus zarcillos y golpéala cuando se desmaye!' : this.kind === 'cangrejo' ? '¡Esquiva sus saltos y golpéalo cuando se maree!' : this.kind === 'caca' ? '¡Esquiva sus saltos y sus pedos verdes, y golpéala cuando se maree!' : this.kind === 'payaso' ? '¡Esquiva sus saltos y sus pelotas, y golpéalo cuando se maree!' : this.kind === 'bacteria' ? '¡Esquiva sus saltos y sus pinchos, y golpéala cuando se maree!' : this.kind === 'raro' ? '¡Esquiva sus saltos y sus bolas raras, y golpéalo cuando se maree!' : this.kind === 'gorila' ? '¡Esquiva sus saltos y sus cocos, y golpéalo cuando se maree!' : this.kind === 'goleador' ? '¡Esquiva sus balones y sus camisetas, y golpéalo cuando se maree!' : this.kind === 'lengua' ? '¡Esquiva sus saltos y sus babas, y golpéala cuando se maree!' : this.kind === 'santa' ? '¡Esquiva sus saltos y sus regalos, y golpéalo cuando se maree!' : this.kind === 'impresora' ? '¡Huye de sus mini impresiones y golpéala cuando se maree!' : this.kind === 'tetera' ? '¡Esquiva sus saltos y sus tazas, y golpéala cuando se maree!' : this.kind === 'albaricoque' ? '¡Esquiva sus saltos y sus huesos, y golpéalo cuando se maree!' : this.kind.startsWith('pegote') ? '¡Esquiva sus saltos y sus gotas, y golpéalo cuando se maree!' : '¡Esquiva su salto y golpéala cuando se maree!'); SFX.bossRoar();
  }
  spawn(type, x) { const lim = type === 'miniprint' ? 6 : 4; if (this.scene.enemies.filter((e) => !e.dead && e.x > this.minX - 200).length < lim) { this.scene.addEnemy(type, x, type === 'minivamp' ? 200 : 0, x - 220, x + 220); if (type === 'miniprint') this.scene.addEnemy(type, x + 70, 0, x - 220, x + 220); } }
  update(dt, pl) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt);
    let tex = 0, sx = 0, sq = 1;
    if (this.active && !this.dead) {
      this.timer -= dt; this.spawnT -= dt; const P = this.phase, face = Math.sign(pl.x - this.x) || this.dir;
      if (this.kind === 'enredadera') {
        this.zOn = false; this.warn.clear(); this.zar.setVisible(false);
        if (P === 'idle') {
          sx = Math.sin(this.t * 2) * 3;
          if (this.spawnT <= 0) { this.spawnT = 5; this.spawn(Math.random() < 0.5 ? 'escarabajo' : 'mariquita', Phaser.Math.Clamp(pl.x + (Math.random() < 0.5 ? -1 : 1) * 260, this.minX, this.maxX)); SFX.seed(); }
          if (this.timer <= 0) { this.phase = 'tele'; this.timer = 0.8; this.tx = pl.x; SFX.charge(); }
        } else if (P === 'tele') {
          tex = 1; sx = Math.sin(this.t * 60) * 3; if (this.timer > 0.3) this.tx += (pl.x - this.tx) * Math.min(1, dt * 3);
          this.warn.fillStyle(0xff3355, 0.4).fillEllipse(this.tx, GROUND_Y - 4, 90, 16);
          if (this.timer <= 0) { this.phase = 'slam'; this.timer = 0.55; this.scene.cameras.main.shake(220, 0.01); SFX.crash(); }
        } else if (P === 'slam') {
          tex = 1; const u = 1 - this.timer / 0.55; this.zar.setVisible(true).setPosition(this.tx, GROUND_Y + 8).setScale(0.7, 0.7 * Math.min(1, u * 5)); this.zOn = u > 0.15 && u < 0.8;
          if (this.timer <= 0) { this.n++; if (this.n % 2 === 0) { this.phase = 'dizzy'; this.timer = 2.8; SFX.crash(); } else { this.phase = 'tele'; this.timer = 0.7; this.tx = pl.x; SFX.charge(); } }
        } else if (P === 'dizzy') { tex = 2; if (this.timer <= 0) { this.phase = 'idle'; this.timer = 1.2; } }
      } else if (this.kind === 'piramide' || this.kind === 'reina' || this.kind === 'cangrejo' || this.kind === 'caca' || this.kind === 'payaso' || this.kind === 'bacteria' || this.kind === 'raro' || this.kind === 'gorila' || this.kind === 'albaricoque' || this.kind === 'tetera' || this.kind === 'impresora' || this.kind === 'santa' || this.kind === 'lengua' || this.kind === 'goleador' || this.kind.startsWith('pegote')) {
        const R = this.kind === 'reina';
        if (P === 'idle') {
          this.dir = face;
          if (this.kind === 'caca' || this.kind === 'raro' || this.kind.startsWith('pegote')) { this.shT = (this.shT ?? 2) - dt; if (this.shT <= 0 && !pl.dead) { this.shT = 3; for (const k of [-1, 0, 1]) this.scene.addProjectile({ type: 'glob', x: this.x + face * 50, y: GROUND_Y - 150, vx: face * (260 + k * 70), vy: -260 + k * 40, g: 500, life: 3 }); SFX.fart(); } }
          if (this.kind === 'bacteria') { this.shT = (this.shT ?? 2) - dt; if (this.shT <= 0 && !pl.dead) { this.shT = 3; for (const k of [-1, 0, 1]) this.scene.addProjectile({ type: 'aguijon', x: this.x + face * 60, y: GROUND_Y - 100, vx: face * 300, vy: k * 90, g: 0, life: 3 }); SFX.seed(); } }
          if (this.kind === 'goleador') { this.shT = (this.shT ?? 2) - dt; if (this.shT <= 0 && !pl.dead) { this.shT = 2.4; this.shN = (this.shN || 0) + 1; if (this.shN % 3 === 0) this.scene.addEnemy('camiseta', this.x + face * 60, GROUND_Y - 150, 0, 0); else if (this.scene.enemies.filter((e) => !e.dead && e.constructor.name === 'Balon').length < 6) this.scene.addEnemy('balon', this.x + face * 60, GROUND_Y - 170, face * (180 + Math.random() * 80), 0); SFX.seed(); } }
          if (this.kind === 'cangrejo' || this.kind === 'payaso' || this.kind === 'gorila' || this.kind === 'albaricoque' || this.kind === 'tetera' || this.kind === 'impresora' || this.kind === 'santa' || this.kind === 'lengua') { this.shT = (this.shT ?? 2) - dt; if (this.shT <= 0 && !pl.dead) { this.shT = 3.4; this.scene.addProjectile({ type: 'bala', x: this.x + face * 60, y: GROUND_Y - 130, vx: face * 320, vy: -140, g: 700, life: 3 }); SFX.seed(); } }
          if (this.spawnT <= 0) { this.spawnT = 5; this.spawn(R ? 'raton' : this.kind === 'cangrejo' ? 'cangrejo' : this.kind === 'caca' ? 'caca' : this.kind === 'payaso' ? 'payasito' : this.kind === 'bacteria' ? 'tipibact' : this.kind === 'raro' ? 'gusano' : this.kind === 'gorila' ? 'culebra' : this.kind === 'albaricoque' ? 'ternera' : this.kind === 'tetera' ? 'sillon' : this.kind === 'impresora' ? 'miniprint' : this.kind === 'santa' ? 'galleta' : this.kind === 'lengua' ? 'tipimalo' : this.kind === 'goleador' ? 'jugador' : this.kind.startsWith('pegote') ? 'pg_' + this.kind.slice(7) : 'escorpion', this.x + face * 110); SFX.seed(); }
          if (this.timer <= 0) { this.phase = 'tele'; this.timer = 0.55; this.tx = pl.x; SFX.charge(); }
        } else if (P === 'tele') { tex = 1; sq = 0.88; sx = Math.sin(this.t * 70) * 3; if (this.timer <= 0) { this.phase = 'jump'; this.vy = R ? 640 : 900; this.vx = Phaser.Math.Clamp((this.tx - this.x) / (R ? 1.4 : 0.9), -520, 520); } }
        else if (P === 'jump') {
          tex = 1; this.vy -= (R ? 900 : 2000) * dt; this.h += this.vy * dt; this.x = Phaser.Math.Clamp(this.x + this.vx * dt, this.minX, this.maxX);
          if (this.h <= 0) { this.h = 0; this.phase = 'dizzy'; this.timer = 2.6; SFX.crash(); this.scene.cameras.main.shake(350, 0.02); this.scene.burst(this.x, GROUND_Y - 20, 18); }
        } else if (P === 'dizzy') { tex = 2; if (this.timer <= 0) { this.phase = 'idle'; this.timer = 1.0; } }
      } else {
        if (P === 'hover') {
          this.h = 200 + Math.sin(this.t * 3) * 14; this.dir = face; this.x = Phaser.Math.Clamp(this.x + face * 130 * dt, this.minX, this.maxX);
          if (this.spawnT <= 0) { this.spawnT = 7; this.spawn('minivamp', this.x); SFX.seed(); }
          if (this.timer <= 0) { this.phase = 'tele'; this.timer = 0.55; this.tx = pl.x; SFX.charge(); }
        } else if (P === 'tele') { tex = 1; sx = Math.sin(this.t * 70) * 3; this.h += 40 * dt; if (this.timer <= 0) { this.phase = 'dive'; this.dirx = Math.sign(this.tx - this.x) || 1; } }
        else if (P === 'dive') {
          tex = 1; const dx = this.tx - this.x, d = Math.hypot(dx, this.h) || 1, sp = 600 * dt;
          this.x = Phaser.Math.Clamp(this.x + dx / d * sp * (Math.abs(dx) > 8 ? 1 : 0), this.minX, this.maxX); this.h = Math.max(0, this.h - this.h / d * sp * 1.2 - 80 * dt);
          if (this.h <= 0) { this.h = 0; this.phase = 'dizzy'; this.timer = 2.6; SFX.crash(); this.scene.cameras.main.shake(300, 0.015); this.scene.burst(this.x, GROUND_Y - 20, 14); }
        } else if (P === 'dizzy') { tex = 2; if (this.timer <= 0) { this.phase = 'rise'; this.timer = 0.9; } }
        else if (P === 'rise') { this.h += 230 * dt; if (this.timer <= 0) { this.phase = 'hover'; this.timer = 2.2; } }
      }
      this.vulnerable = this.phase === 'dizzy';
    }
    if (this.dead) tex = 2;
    this.img.setTexture(this.c.n[tex]).setPosition(this.x + sx, GROUND_Y + 8 - this.h).setScale(this.c.S, this.c.S * sq).setFlipX(this.dir > 0 && this.kind === 'vampiro');
    this.flash > 0 ? this.img.setTintFill(0xffffff) : this.img.clearTint();
    const d = this.scene.dizzy; if (this.vulnerable && !this.dead) { d.clear(); for (let i = 0; i < 4; i++) { const a = this.t * 5 + i * Math.PI / 2; d.fillStyle(0xffe14d, 1).fillCircle(this.x + Math.cos(a) * 56, GROUND_Y - this.c.bh - 24 + Math.sin(a) * 12, 6); } }
  }
  takeHit() {
    if (!this.vulnerable || this.hurtT > 0) return false;
    this.hp--; this.hurtT = 0.9; this.flash = 0.2; SFX.bossHit(); this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.x, GROUND_Y - 100, 14);
    if (this.hp <= 0) { this.die(); return true; }
    this.phase = this.kind === 'vampiro' ? 'rise' : 'idle'; this.timer = this.kind === 'vampiro' ? 0.9 : 1.2; this.vulnerable = false; this.scene.dizzy.clear(); return true;
  }
  die() {
    this.dead = true; this.vulnerable = false; this.scene.dizzy.clear(); if (this.zar) { this.zar.destroy(); this.warn.clear(); this.zOn = false; }
    this.scene.tweens.add({ targets: this.img, alpha: 0, scaleX: this.c.S * 1.4, scaleY: this.c.S * 0.1, duration: 1200 });
    this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.x + Phaser.Math.Between(-70, 70), GROUND_Y - this.h - Phaser.Math.Between(20, 150), 8) });
    this.scene.enemies.forEach((e) => { if (!e.dead && e.takeHit) e.die('boss'); });
    if (this.onDie) this.onDie(); else this.scene.bossDefeated();
  }
}

// Monsieur Gourmet (jefe del nivel 18): concurso de comer. Cae comida francesa: cada bocado le quita fuerza al chef,
// pero te pone barriga. Corre y salta para quemarla, come ensalada para adelgazar, y ¡no llegues al 100%!
export class Gourmet {
  constructor(scene, x, minX, maxX) {
    this.scene = scene; this.hp = 9; this.maxHp = 9; this.dead = false; this.active = false; this.vulnerable = false; this.hurtT = 0; this.seeds = [];
    this.minX = minX; this.maxX = maxX; this.x = maxX - 120; this.t = 0; this.spawnT = 1.5; this.n = 0; this.throwT = 0; this.items = []; this.over = 0;
    this.img = scene.add.image(this.x, GROUND_Y + 8, 'chef').setOrigin(0.5, 1).setScale(0.62).setDepth(4);
  }
  contactBox() { return null; }
  hurtBox() { return new Phaser.Geom.Rectangle(0, 0, 0, 0); }
  takeHit() { return false; }
  start() { this.active = true; this.scene.showBanner('¡Monsieur Gourmet!', '¡Come comida francesa… pero no te pongas gordo!'); }
  update(dt, pl) {
    this.t += dt; this.throwT = Math.max(0, this.throwT - dt);
    const sc = this.scene;
    if (this.active && !this.dead) {
      this.spawnT -= dt;
      if (this.spawnT <= 0) {
        this.spawnT = 1.7; this.n++; this.throwT = 0.35; SFX.seed();
        const salad = pl.fat > 0.55 && this.n % 2 === 0 || this.n % 6 === 0;
        const kind = salad ? 'ensalada' : ['crepe', 'croissant', 'baguette', 'queso_f', 'caracol'][Phaser.Math.Between(0, 4)];
        const x = Phaser.Math.Clamp(pl.x + Phaser.Math.Between(-220, 220), this.minX + 20, this.maxX - 20);
        this.items.push({ kind, x, y: -30, img: sc.add.image(x, -30, kind).setDepth(6).setScale(0.8), life: 5 });
      }
      for (const it of this.items) {
        if (it.dead) continue;
        it.y = Math.min(GROUND_Y - 24, it.y + 120 * dt); if (it.y >= GROUND_Y - 24) it.life -= dt;
        it.img.setPosition(it.x, it.y).setRotation(Math.sin(this.t * 3 + it.x) * 0.2);
        if (it.life <= 0) { it.dead = true; it.img.destroy(); continue; }
        if (!pl.dead && Math.abs(it.x - pl.x) < 38 && Math.abs(it.y - (pl.y + 6)) < 62) {
          it.dead = true; it.img.destroy(); sc.burst(it.x, it.y, 8);
          if (it.kind === 'ensalada') { pl.fat = Math.max(0, pl.fat - 0.3); SFX.boing(); sc.showBanner('¡Ensalada!', 'Adelgazas un poquito'); }
          else {
            this.hp--; pl.fat = Math.min(1, pl.fat + 0.17); SFX.bossHit(); sc.cameras.main.shake(120, 0.005); this.flash = 0.15;
            if (this.hp <= 0) { this.die(); return; }
          }
        }
      }
      this.items = this.items.filter((i) => !i.dead);
      // la barriga se quema corriendo o saltando
      const moving = Math.abs(pl.vx) > 60 || !pl.hit.body.blocked.down;
      pl.fat = Math.max(0, pl.fat - dt * (moving ? 0.075 : 0.012));
      if (pl.fat >= 1 && !pl.dead) { pl.fat = 0.4; sc.showBanner('¡Qué barriga!', 'Estás demasiado lleno'); if (pl.hurt(this.x)) sc.burst(pl.x, pl.y, 8); }
    } else if (pl.fat > 0) pl.fat = Math.max(0, pl.fat - dt * 0.5);
    const tex = this.dead ? 'chef_happy' : this.throwT > 0 ? 'chef_throw' : 'chef';
    this.img.setTexture(tex).setPosition(this.x, GROUND_Y + 8 + Math.abs(Math.sin(this.t * 4)) * -4).setFlipX(true);
    if (this.flash > 0) { this.flash -= dt; this.img.setTintFill(0xffffff); } else this.img.clearTint();
  }
  die() {
    this.dead = true; this.scene.items = this.items; this.items.forEach((i) => i.img.destroy()); this.items = [];
    this.scene.confetti(this.x, GROUND_Y - 120, 30); this.scene.bossDefeated();
  }
}

// Triple jefe (nivel final): tres jefes seguidos, uno tras otro
export class TripleJefe {
  constructor(scene, kinds, x, minX, maxX) {
    this.scene = scene; this.kinds = kinds; this.x0 = x; this.minX = minX; this.maxX = maxX; this.idx = -1; this.cur = null; this.dead = false; this.maxHp = kinds.length * 4; this.seeds = []; this.active = false;
  }
  get hp() { return this.cur ? (this.kinds.length - 1 - this.idx) * 4 + Math.max(0, this.cur.hp) : this.maxHp; }
  get vulnerable() { return !!this.cur && this.cur.vulnerable; }
  get hurtT() { return this.cur ? this.cur.hurtT : 0; }
  get x() { return this.cur ? this.cur.x : this.x0; }
  contactBox() { return this.cur ? this.cur.contactBox() : null; }
  hurtBox() { return this.cur.hurtBox(); }
  takeHit(k) { return this.cur ? this.cur.takeHit(k) : false; }
  next() {
    this.idx++; if (this.idx >= this.kinds.length) { this.dead = true; this.scene.bossDefeated(); return; }
    this.cur = new Boss2(this.scene, this.kinds[this.idx], this.x0, this.minX, this.maxX); this.cur.onDie = () => { this.scene.time.delayedCall(1600, () => this.next()); };
    this.seeds = this.cur.seeds; this.cur.start();
  }
  start() { this.active = true; this.next(); }
  update(dt, pl) { if (this.cur) this.cur.update(dt, pl); }
}

// Ballena (jefe del nivel 11): echa chorros venenosos y, después, abre la boca (¡dientes!) para que la golpees
export class Ballena {
  constructor(scene, x, minX, maxX) {
    this.scene = scene; this.hp = 4; this.maxHp = 4; this.dead = false; this.active = false; this.vulnerable = false; this.home = x + 120; this.x = this.home; this.minX = minX; this.maxX = maxX;
    this.phase = 'wait'; this.timer = 0; this.t = 0; this.flash = 0; this.hurtT = 0; this.seeds = []; this.shot = false;
    this.img = scene.add.image(this.x, GROUND_Y + 14, 'ballena').setOrigin(0.5, 1).setScale(0.68).setDepth(4);
  }
  contactBox() { return this.active && !this.dead ? new Phaser.Geom.Rectangle(this.x - 120, GROUND_Y - 190, 280, 190) : null; }
  hurtBox() { return new Phaser.Geom.Rectangle(this.x - 190, GROUND_Y - 150, 140, 140); }
  start() { this.active = true; this.phase = 'idle'; this.timer = 1.8; this.scene.showBanner('¡La Ballena!', '¡Esquiva el veneno y golpea su boca abierta!'); SFX.bossRoar(); }
  update(dt, pl) {
    this.t += dt; this.flash = Math.max(0, this.flash - dt); this.hurtT = Math.max(0, this.hurtT - dt);
    let tex = 'ballena', bob = Math.sin(this.t * 2) * 5;
    if (this.active && !this.dead) {
      this.timer -= dt;
      if (this.phase === 'idle') { if (this.timer <= 0) { this.phase = 'spray'; this.timer = 1.3; this.shot = false; SFX.charge(); } }
      else if (this.phase === 'spray') {
        bob += Math.sin(this.t * 60) * 2;
        if (this.timer < 0.7 && !this.shot) {
          this.shot = true; SFX.seed();
          for (let k = 0; k < 5; k++) this.scene.addProjectile({ type: 'glob', x: this.x - 20, y: GROUND_Y - 170, vx: -(120 + k * 70), vy: -820 - k * 40, g: 1500, life: 4 });
        }
        if (this.timer <= 0) { this.phase = 'mouth'; this.timer = 3.4; }
      } else if (this.phase === 'mouth') {
        tex = 'ballena_open'; this.x += (Math.max(this.minX + 200, this.home - 110) - this.x) * Math.min(1, dt * 4);
        if (this.timer <= 0) { this.phase = 'idle'; this.timer = 1.6; }
      }
      if (this.phase !== 'mouth') this.x += (this.home - this.x) * Math.min(1, dt * 3);
      this.vulnerable = this.phase === 'mouth';
    }
    if (this.hurtT > 0.4) tex = 'ballena_hurt'; if (this.dead) tex = 'ballena_hurt';
    this.img.setTexture(tex).setPosition(this.x, GROUND_Y + 14 + bob);
    this.flash > 0 ? this.img.setTintFill(0xffffff) : this.img.clearTint();
  }
  takeHit() {
    if (!this.vulnerable || this.hurtT > 0) return false;
    this.hp--; this.hurtT = 0.9; this.flash = 0.2; SFX.bossHit(); this.scene.cameras.main.shake(260, 0.012); this.scene.burst(this.x - 150, GROUND_Y - 80, 14);
    if (this.hp <= 0) { this.dead = true; this.vulnerable = false; this.scene.tweens.add({ targets: this.img, alpha: 0, y: this.img.y + 80, duration: 1400 }); this.scene.time.addEvent({ delay: 120, repeat: 12, callback: () => this.scene.burst(this.x + Phaser.Math.Between(-120, 100), GROUND_Y - Phaser.Math.Between(20, 150), 8) }); this.scene.bossDefeated(); return true; }
    this.phase = 'idle'; this.timer = 1.4; this.vulnerable = false; return true;
  }
}
