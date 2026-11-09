import { GROUND_Y } from '../level1.js';
import { LEVELS } from '../levels.js';
import { ZONES } from '../textures.js';
import { Balon, Camiseta, Porteria, Lengua, Regalo, MiniPrint, Espejo, Iman, Mimo, Player, Bacteria, Gordo, Arana, Fuego, Pirana, Bomba, Tropix, Abeja, Torreta, Lavadora, Bloque, Boss, Toro, Pajaro, Fantaslime, Mandibulas, Bolita, Babosa, GranSlime, Champi, Robot, Dron, Oveja, Sirena, Escila, Circe, Polifemo, TacoBot, Escorpion, TropixEsc, PlantaMaceta, Momia, MiniVamp, Gourmet, Empujon, PlantaMano, HigoCaida, TripleJefe, Calabaza, PezLinterna, Boss2, Ballena, CHARS, overlaps } from '../entities.js';
import { addStars } from '../save.js';
import { SFX, unlock, startMusic, toggleMute, isMuted, stopMusic } from '../audio.js';
import { FONT } from './menu.js';

const W = 960, H = 540;

const NOBODY = { x: -99999, y: -99999, dead: true, vx: 0, vy: 0, bottom: -99999, invuln: 99, pigT: 0, macT: 0, slow: 0, stun: 0, onGround: false, bounds() { return new Phaser.Geom.Rectangle(-99999, -99999, 1, 1); } };
export class Game extends Phaser.Scene {
  constructor() { super('Game'); }

  init(data) {
    this.levelIdx = data && data.level != null ? data.level : 0;
    this.charId = (data && data.char) || this.registry.get('char') || 'tipi';
  }

  create() {
    const q = new URLSearchParams(location.search);
    const L = this.L = LEVELS[this.levelIdx];
    const WORLD_W = L.worldW, ARENA_X = L.arenaX, BOSS_X = L.bossX, ZONE_W = L.zoneW;
    stopMusic(); startMusic(L.music);
    this.score = 0; this.kills = 0; this.state = 'play'; this.arena = false; this.checkpointX = 100; this.checkpointY = GROUND_Y; this.t = 0; this.halu = null;
    this.physics.world.setBounds(0, -400, WORLD_W, H + 1000);
    this.physics.world.setBoundsCollision(true, true, false, false);

    // fondo por zonas (se funde de una a otra al avanzar)
    this.skies = L.zones.map((zi, i) => this.add.image(0, 0, 'sky' + zi).setOrigin(0).setDisplaySize(W, H).setScrollFactor(0).setDepth(-10 + i * 0.01));
    this.starZone = L.zones.findIndex((zi) => ZONES[zi].stars);
    this.starLayer = this.starZone >= 0 ? this.add.image(0, 0, 'stars' + L.zones[this.starZone]).setOrigin(0).setScrollFactor(0).setDepth(-9.5).setAlpha(0) : null;
    this.sun = L.sun ? this.add.image(800, 110, 'sunface').setScrollFactor(0).setDepth(-9.4).setScale(0.8) : null;
    if (this.sun) this.tweens.add({ targets: this.sun, angle: 360, duration: 40000, repeat: -1 });
    this.clouds = [];
    for (let i = 0; i < (L.luna ? 0 : 12); i++) {
      const c = this.add.image(i * 300 + Phaser.Math.Between(0, 200), Phaser.Math.Between(30, 230), 'cloud').setScale(Phaser.Math.FloatBetween(0.6, 1.2)).setScrollFactor(0.25).setDepth(-9)
        .setTint(Phaser.Utils.Array.GetRandom(L.lava ? [0x8a5a6a, 0x6a3a58, 0x9a6a66] : [0xffffff, 0xffffff, 0xffe3f3, 0xe3f6ff, 0xfff4cc]));
      if (L.tech) c.setTint(Phaser.Utils.Array.GetRandom([0x4a4aa8, 0x6a3aa0, 0x3a5ab8]));
      this.clouds.push(c);
    }
    // ojos voladores (parallax)
    this.skyEyes = [];
    for (let i = 0; i < 14; i++) {
      const e = this.add.image(i * 480 + Phaser.Math.Between(0, 300), Phaser.Math.Between(50, 260), 'skyeye').setScrollFactor(0.45).setDepth(-8.8).setScale(Phaser.Math.FloatBetween(0.6, 1)).setAlpha(0.95);
      if (L.lava) e.setTint(0xffb070);
      e.baseY = e.y; e.ph = Math.random() * 6;
      this.skyEyes.push(e);
    }
    this.hillsFar = L.zones.map((zi, i) => this.add.tileSprite(0, H - 260, W, 260, 'hf' + zi).setOrigin(0).setScrollFactor(0).setDepth(-8 + i * 0.01));
    this.hillsNear = L.zones.map((zi, i) => this.add.tileSprite(0, H - 215, W, 260, 'hn' + zi).setOrigin(0).setScrollFactor(0).setDepth(-7 + i * 0.01));
    // burbujas flotantes
    this.bubbles = this.add.particles(0, 0, 'bub', { x: { min: 0, max: W }, y: H + 20, lifespan: 7000, speedY: { min: -60, max: -25 }, speedX: { min: -12, max: 12 }, scale: { min: 0.5, max: 1.3 }, alpha: { start: 0.8, end: 0 }, frequency: 500, ...(L.lava ? { tint: [0xff8a2a, 0xffd23a, 0xff5a1a] } : {}) }).setScrollFactor(0).setDepth(-6.5);

    // el vacío de los agujeros
    this.lavaTiles = [];
    if (L.lava) {
      for (let k = 0; k < L.ground.length - 1; k++) {
        const a = L.ground[k][1], b = L.ground[k + 1][0];
        if (b > a) this.lavaTiles.push(this.add.tileSprite((a + b) / 2, GROUND_Y + 67, b - a, 110, 'lava').setDepth(5));
      }
    } else if (!L.sky && !L.noFloor) this.add.rectangle(WORLD_W / 2, GROUND_Y + 35, WORLD_W, 70, L.sea ? 0x1d6fa8 : 0x2f2350).setDepth(-6);
    this.seaTiles = [];
    if (L.sea || L.sena) for (let k = 0; k < L.ground.length - 1; k++) {
      const a = L.ground[k][1], b = L.ground[k + 1][0];
      if (b > a) this.seaTiles.push(this.add.tileSprite((a + b) / 2, GROUND_Y + 50, b - a, 96, 'olas').setDepth(5));
    }

    // suelo y plataformas (cada zona tiene su aspecto)
    const zoneOf = (x) => Math.min(L.zones.length - 1, Math.floor(x / ZONE_W)), zt = (x) => L.zones[zoneOf(x)];
    this.groundGroup = this.physics.add.staticGroup();
    this.platGroup = this.physics.add.staticGroup();
    for (const [a, b] of L.ground) {
      // se corta en trozos para poder cambiar de textura de zona
      let x0 = a;
      while (x0 < b) {
        const zi = zoneOf(x0), x1 = Math.min(b, (zi + 1) * ZONE_W);
        const t = this.add.tileSprite((x0 + x1) / 2, GROUND_Y + 40, x1 - x0, 80, L.agua ? 'agua_suelo' : L.sky ? 'nube_suelo' : 'ground' + L.zones[zi]).setDepth(2);
        if (L.agua) (this.waterTiles = this.waterTiles || []).push(t);
        this.physics.add.existing(t, true); this.groundGroup.add(t); x0 = x1;
      }
    }
    for (const [x, y, w] of L.platforms) {
      const t = this.add.tileSprite(x, y + 14, w, 28, 'plat' + zt(x)).setDepth(2);
      this.physics.add.existing(t, true); this.platGroup.add(t);
    }

    // torre Eiffel de fondo y barcos del Sena
    if (L.paris) this.add.image(2480, GROUND_Y + 30, 'torre_eiffel').setOrigin(0.5, 1).setScale(0.95).setDepth(-3);
    this.boats = (L.boats || []).map(([cx, amp, spd, ph]) => {
      const img = this.add.image(cx, GROUND_Y - 46, 'barco').setOrigin(0.5, 0).setScale(0.8).setDepth(6);
      const r = this.add.rectangle(cx, GROUND_Y + 6, 150, 20, 0x000000, 0); this.physics.add.existing(r, false); r.body.setAllowGravity(false).setImmovable(true);
      return { cx, amp, spd, ph, img, r, dx: 0, lx: cx };
    });
    // setas gigantes: son las plataformas (sin suelo)
    for (const [x, y, w] of (L.giants || [])) {
      const k = w / 400;
      this.add.image(x, y - 26 * k, L.sky ? 'nube_gigante' : 'seta_gigante').setOrigin(0.5, 0).setScale(k).setDepth(2);
      const r = this.add.rectangle(x, y + 13, w * 0.84, 26, 0x000000, 0); this.physics.add.existing(r, true); this.platGroup.add(r);
    }
    this.alus = (L.alus || []).map(([x, y]) => ({ x, y, img: this.add.image(x, y + 2, 'seta_alu').setOrigin(0.5, 1).setScale(0.5).setDepth(3), t: 0 }));
    // decoración rara a lo largo del suelo
    const decor = L.futbol ? [['fb_banderin', 'fb_cono', 'fb_banderin', 'fb_cono'], ['fb_cono', 'fb_banderin', 'fb_cono', 'fb_banderin'], ['fb_banderin', 'fb_cono', 'fb_cono', 'fb_banderin'], ['fb_cono', 'fb_banderin', 'fb_banderin', 'fb_cono']] : L.lenguas ? [['lb_diente', 'mush', 'lolly', 'lb_diente'], ['mush', 'lb_diente', 'flower', 'lolly'], ['lb_diente', 'lolly', 'lb_diente', 'mush'], ['flower', 'lb_diente', 'mush', 'lb_diente']] : L.navidad ? [['nv_arbol', 'nv_baston', 'nv_arbol', 'nv_baston'], ['nv_baston', 'nv_arbol', 'nv_baston', 'crystal'], ['nv_arbol', 'nv_baston', 'crystal', 'nv_arbol'], ['crystal', 'nv_arbol', 'nv_baston', 'nv_arbol']] : L.tecno ? [['crystal', 'mush', 'crystal', 'lolly'], ['lolly', 'crystal', 'flower', 'crystal'], ['crystal', 'lolly', 'crystal', 'mush'], ['flower', 'crystal', 'lolly', 'crystal']] : L.rebus ? [['lolly', 'crystal', 'mush', 'flower'], ['crystal', 'flower', 'lolly', 'mush'], ['mush', 'lolly', 'flower', 'crystal'], ['flower', 'mush', 'crystal', 'lolly']] : L.colores ? [['lolly', 'flower', 'crystal', 'mush'], ['flower', 'mush', 'lolly', 'crystal'], ['lolly', 'crystal', 'flower', 'mush'], ['mush', 'flower', 'lolly', 'crystal'], ['crystal', 'lolly', 'mush', 'flower'], ['flower', 'crystal', 'lolly', 'mush'], ['lolly', 'mush', 'crystal', 'flower']] : L.granja ? [['flower', 'mush', 'flower', 'lolly'], ['mush', 'flower', 'lolly', 'flower'], ['flower', 'lolly', 'mush', 'flower'], ['lolly', 'flower', 'mush', 'flower']] : L.selva ? [['palmera', 'flower', 'mush', 'palmera'], ['flower', 'palmera', 'lolly', 'mush'], ['palmera', 'mush', 'flower', 'palmera'], ['mush', 'palmera', 'flower', 'lolly']] : L.raro ? [['lolly', 'mush', 'crystal', 'flower'], ['mush', 'crystal', 'lolly', 'lolly'], ['crystal', 'flower', 'mush', 'lolly'], ['lolly', 'crystal', 'flower', 'mush']] : L.bact ? [['mush', 'crystal', 'mush', 'lolly'], ['crystal', 'mush', 'flower', 'mush'], ['mush', 'lolly', 'crystal', 'mush'], ['crystal', 'mush', 'crystal', 'flower']] : L.paris ? [['flower', 'lolly', 'flower', 'mush'], ['flower', 'flower', 'lolly', 'crystal'], ['lolly', 'flower', 'mush', 'flower'], ['flower', 'lolly', 'crystal', 'flower']] : L.circo ? [['lolly', 'flower', 'crystal', 'lolly'], ['flower', 'lolly', 'mush', 'crystal'], ['lolly', 'crystal', 'lolly', 'flower'], ['crystal', 'lolly', 'flower', 'mush']] : L.dulce ? [['lolly', 'flower', 'lolly', 'crystal'], ['lolly', 'lolly', 'flower', 'mush'], ['flower', 'lolly', 'crystal', 'lolly'], ['lolly', 'crystal', 'lolly', 'flower']] : L.pedos ? [['mush', 'rock', 'mush', 'crystal'], ['mush', 'mush', 'rock', 'lolly'], ['rock', 'mush', 'crystal', 'mush'], ['mush', 'rock', 'mush', 'fireflower']] : L.isla ? [['palmera', 'rock', 'palmera', 'crystal'], ['palmera', 'palmera', 'rock', 'lolly'], ['rock', 'crystal', 'palmera', 'rock'], ['palmera', 'rock', 'crystal', 'palmera']] : L.jardin ? [['flower', 'mush', 'flower', 'lolly'], ['flower', 'flower', 'lolly', 'mush'], ['mush', 'flower', 'lolly', 'flower'], ['lolly', 'flower', 'mush', 'flower']] : L.luna ? [['crystal', 'rock', 'mush', 'crystal'], ['rock', 'crystal', 'lolly', 'rock'], ['crystal', 'mush', 'rock', 'crystal'], ['rock', 'lolly', 'crystal', 'mush']] : L.egipto ? [['palmera', 'cactus', 'rock', 'palmera'], ['cactus', 'columna', 'rock', 'palmera'], ['palmera', 'rock', 'cactus', 'crystal'], ['columna', 'rock', 'obsidian', 'cactus']] : L.halloween ? [['lapida', 'obsidian', 'lapida', 'mush'], ['lapida', 'fireflower', 'obsidian', 'lapida'], ['mush', 'lapida', 'fireflower', 'obsidian'], ['lapida', 'obsidian', 'lapida', 'crystal']] : L.agua ? [['flower', 'crystal', 'flower', 'lolly'], ['crystal', 'lolly', 'crystal', 'flower'], ['crystal', 'mush', 'crystal', 'lolly'], ['crystal', 'crystal', 'mush', 'lolly']] : L.taco ? [['cactus', 'flower', 'mush', 'cactus'], ['flower', 'mush', 'flower', 'lolly'], ['mush', 'crystal', 'fireflower', 'mush'], ['lolly', 'flower', 'cactus', 'flower']] : L.sea ? [['columna', 'olivo', 'flower', 'olivo'], ['olivo', 'flower', 'columna', 'olivo'], ['olivo', 'columna', 'flower', 'flower'], ['columna', 'mush', 'olivo', 'crystal']] : L.tech ? [['antena', 'engranaje', 'crystal', 'antena'], ['engranaje', 'antena', 'engranaje', 'crystal'], ['crystal', 'antena', 'engranaje', 'antena'], ['antena', 'crystal', 'engranaje', 'engranaje']] : L.blockSprings ? [['mush', 'crystal', 'mush', 'flower'], ['lolly', 'mush', 'crystal', 'flower'], ['mush', 'lolly', 'mush', 'crystal'], ['crystal', 'flower', 'mush', 'lolly']] : L.sky ? [['nube_feliz', 'nube_feliz'], ['nube_feliz', 'nube_feliz'], ['nube_feliz', 'nube_feliz'], ['nube_feliz', 'nube_feliz']] : L.lava
      ? [['rock', 'fireflower', 'obsidian', 'rock'], ['fireflower', 'rock', 'obsidian', 'fireflower'], ['obsidian', 'rock', 'obsidian', 'fireflower'], ['rock', 'fireflower', 'rock', 'obsidian']]
      : [['flower', 'flower', 'lolly', 'flower'], ['lolly', 'cane', 'cane', 'flower'], ['mush', 'crystal', 'mush', 'crystal'], ['cactus', 'cactus', 'crystal', 'flower']];
    let seedx = 40;
    while (seedx < WORLD_W - 100) {
      seedx += Phaser.Math.Between(120, 260);
      if (!L.ground.some(([a, b]) => seedx > a + 40 && seedx < b - 40) || (seedx > ARENA_X - 100 && seedx < ARENA_X + 140)) continue;
      const k = Phaser.Utils.Array.GetRandom(decor[zoneOf(seedx)]);
      const im = this.add.image(seedx, GROUND_Y + 6, k).setOrigin(0.5, 1).setDepth(Phaser.Math.Between(0, 1) ? 1 : 3).setScale(Phaser.Math.FloatBetween(0.8, 1.15) * (k === 'nube_feliz' ? 0.42 : k === 'columna' ? 0.8 : 1));
      if (k === 'flower' || k === 'mush' || k === 'cactus' || k === 'fireflower' || k === 'nube_feliz') this.tweens.add({ targets: im, angle: { from: -3, to: 3 }, duration: Phaser.Math.Between(900, 1600), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      if (im.depth === 3) im.setAlpha(0.95);
    }
    for (const [x, y, txt] of L.hints) this.add.text(x, y, txt, { fontFamily: FONT, fontStyle: 'bold', fontStyle: 'bold', fontSize: 22, color: '#2b2b44', align: 'center', stroke: '#fff', strokeThickness: 6 }).setOrigin(0.5).setDepth(1);

    // setas saltarinas
    this.springs = L.springs.map((sp0) => {
      if (Array.isArray(sp0)) { // trampolín sobre una seta gigante
        const [x, y] = sp0, img = this.add.image(x, y + 2, L.sky ? 'nube_enfadada' : 'spring').setOrigin(0.5, 1).setScale(L.sky ? 0.45 : 0.9).setDepth(3);
        const top = y + 2 - (L.sky ? 172 * 0.45 - 8 : 64 * 0.9 - 8), r = this.add.rectangle(x, top + 10, 80, 20, 0x000000, 0); this.physics.add.existing(r, true); this.platGroup.add(r);
        return { x, img, cd: 0, top };
      }
      const x = sp0;
      const img = this.add.image(x, GROUND_Y + 4, L.blockSprings ? 'slimebloque' : L.sky ? 'nube_enfadada' : 'spring').setOrigin(0.5, 1).setDepth(3);
      if (L.sky || L.blockSprings) {
        img.setScale(L.blockSprings ? 0.5 : 0.45);
        const top = GROUND_Y + 4 - (L.blockSprings ? 190 * 0.5 - 4 : 172 * 0.45 - 8), r = this.add.rectangle(x, top + 10, 80, 20, 0x000000, 0);
        this.physics.add.existing(r, true); this.platGroup.add(r);
        return { x, img, cd: 0, top };
      }
      return { x, img, cd: 0 };
    });

    // checkpoints
    this.flags = L.checkpoints.map((c) => { const [x, y] = Array.isArray(c) ? c : [c, GROUND_Y]; return ({ x, y, img: this.add.image(x, y + 10, 'flag_off').setOrigin(0.15, 1).setScale(0.75).setDepth(1), on: false }); });

    // estrellas
    this.stars = L.stars.map(([x, y]) => {
      const img = this.add.image(x, y, 'star').setDepth(3);
      this.tweens.add({ targets: img, y: y - 6, angle: { from: -8, to: 8 }, duration: 700 + Math.random() * 300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      return { img, x, y, got: false };
    });

    // partículas y capas de efectos
    this.dizzy = this.add.graphics().setDepth(9);
    this.particles = this.add.particles(0, 0, 'spark', { emitting: false, lifespan: 550, speed: { min: 80, max: 280 }, scale: { start: 1.3, end: 0 }, gravityY: 500 }).setDepth(8);
    this.conf = this.add.particles(0, 0, 'px', { emitting: false, lifespan: 900, speed: { min: 60, max: 300 }, angle: { min: 180, max: 360 }, scale: { start: 2.4, end: 1 }, rotate: { min: 0, max: 360 }, gravityY: 600, tint: [0xff6b8b, 0xffe14d, 0x6bd7ff, 0x9be564, 0xc59bff] }).setDepth(8);

    this.gasEm = this.add.particles(0, 0, 'bub', { emitting: false, lifespan: 800, speed: { min: 10, max: 60 }, scale: { start: 0.9, end: 2.2 }, alpha: { start: 0.75, end: 0 }, tint: [0x9be564, 0xc4ff7a, 0x7acb4a] }).setDepth(8);

    // jugador
    this.player = new Player(this, 100, GROUND_Y - 70, this.charId);
    this.physics.add.collider(this.player.hit, this.groundGroup);
    this.physics.add.collider(this.player.hit, this.platGroup, null, (p, plat) => p.body.velocity.y >= 0 && p.body.bottom <= plat.body.top + 18);

    for (const b of this.boats) this.physics.add.collider(this.player.hit, b.r, null, (p, plat) => p.body.velocity.y >= 0 && p.body.bottom <= plat.body.top + 18);
    // enemigos
    this.enemies = [];
    for (const [type, x, y3, a, b] of L.enemies) this.addEnemy(type, x, y3, a, b);
    // bloques rompibles y aire tóxico
    this.blocks = (L.blocks || []).map((x) => { const bl = new Bloque(this, x); this.physics.add.collider(this.player.hit, bl.hit); return bl; });
    this.toxic = (L.toxic || []).map(([x, w]) => {
      const k = w / 140, h = 190 * k, img = this.add.image(x, GROUND_Y + 2, 'toxico').setOrigin(0.5, 1).setScale(k).setDepth(3).setAlpha(0.92);
      this.tweens.add({ targets: img, scaleY: { from: k, to: k * 1.06 }, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.time.addEvent({ delay: 450, loop: true, callback: () => this.gas(x + Phaser.Math.Between(-w / 2, w / 2), GROUND_Y - Phaser.Math.Between(10, h), 1) });
      return new Phaser.Geom.Rectangle(x - w / 2 + 14, GROUND_Y - h + 12, w - 28, h - 12);
    });
    this.projectiles = [];
    // rejas (solo las pasa el slime) y charcos
    this.rejas = (L.rejas || []).map((x) => {
      const img = this.add.image(x, GROUND_Y + 2, 'reja').setOrigin(0.5, 1).setScale(1.45).setDepth(3.4);
      const r = this.add.rectangle(x, GROUND_Y - 160, 44, 340, 0x000000, 0); this.physics.add.existing(r, true);
      this.physics.add.collider(this.player.hit, r, null, () => !(this.player.slimeT > 0));
      return { x, img };
    });
    this.charcos = [];
    (L.charcos || []).forEach((x) => this.addCharco(x, false));
    // máquinas: puertas, cables y placas de presión
    this.puertas = (L.puertas || []).map((x) => {
      const img = this.add.image(x, GROUND_Y + 2, 'puerta').setOrigin(0.5, 1).setDepth(3.4);
      const r = this.add.rectangle(x, GROUND_Y - 170, 60, 340, 0x000000, 0); this.physics.add.existing(r, true);
      this.physics.add.collider(this.player.hit, r); return { x, img };
    });
    this.cableG = this.add.graphics().setDepth(1.6); this.sparkG = this.add.graphics().setDepth(9);
    this.cables = (L.cables || []).map((c) => {
      const pts = [c.a, ...c.via, c.b].map(([x, y]) => ({ x, y })); let len = 0; const seg = [];
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); seg.push(l); len += l; }
      this.cableG.lineStyle(14, 0x2b2b44, 1).beginPath().moveTo(pts[0].x, pts[0].y); pts.slice(1).forEach((q) => this.cableG.lineTo(q.x, q.y)); this.cableG.strokePath();
      this.cableG.lineStyle(6, 0x50e6ff, 1).beginPath().moveTo(pts[0].x, pts[0].y); pts.slice(1).forEach((q) => this.cableG.lineTo(q.x, q.y)); this.cableG.strokePath();
      for (const q of [c.a, c.b]) this.add.image(q[0], GROUND_Y + 2, 'cable_end').setOrigin(0.5, 1).setScale(0.8).setDepth(3.5);
      return { pts, seg, len, ends: [c.a, c.b] };
    });
    this.ride = null; this.rideCd = 0;
    this.placas = (L.placas || []).map(([x, tx, tw]) => ({ x, tx, tw, img: this.add.image(x, GROUND_Y + 2, 'placa').setOrigin(0.5, 1).setScale(0.8).setDepth(3), state: 'idle', t: 0 }));
    this.trapG = this.add.graphics().setDepth(8);
    // odisea: remolinos de Caribdis, cera y estaca
    this.whirls = (L.caribdis || []).map(([x, w]) => {
      const img = this.add.image(x, GROUND_Y + 14, 'caribdis').setScale(w / 300, 0.9).setDepth(5.2);
      return { x, w, r: w / 2 + 130, img };
    });
    this.whirlG = this.add.graphics().setDepth(5.3);
    this.ceras = (L.ceras || []).map(([x, y]) => {
      const img = this.add.image(x, y, 'cera').setScale(0.6).setDepth(3);
      this.tweens.add({ targets: img, y: y - 8, angle: { from: -6, to: 6 }, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      return { x, y, img, got: false };
    });
    this.estacaItem = L.estaca ? (() => {
      const [x, y] = L.estaca, img = this.add.image(x, y, 'estaca').setScale(0.45).setDepth(3);
      this.tweens.add({ targets: img, y: y - 10, angle: { from: -4, to: 4 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      return { x, y, img, got: false };
    })() : null;
    this.odBar = this.add.graphics().setScrollFactor(0).setDepth(50);
    // taco: cactus, burritos, portales, sombreros y nachos
    this.cactos = (L.cactos || []).map((x) => ({ x, img: this.add.image(x, GROUND_Y + 4, 'cactus_h').setOrigin(0.5, 1).setScale(0.72).setDepth(3.2) }));
    const item = (key, sc, arr) => (arr || []).map(([x, y, bad]) => {
      const img = this.add.image(x, y, key).setScale(sc).setDepth(3);
      this.tweens.add({ targets: img, y: y - 8, angle: { from: -6, to: 6 }, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      return { x, y, img, bad, got: false };
    });
    this.burritos = item('burrito', 0.5, L.burritos); this.sombreros = item('sombrero', 0.42, L.sombreros); this.nachosI = item('nachos', 0.42, L.nachos);
    this.portales = (L.portales || []).map((x) => ({ x, cd: 0, img: this.add.image(x, GROUND_Y + 4, 'portal').setOrigin(0.5, 1).setScale(0.62).setDepth(3.2) }));
    this.dark = L.taco ? this.add.image(W / 2, H / 2, 'oscuro').setScrollFactor(0).setDepth(45).setVisible(false) : null; this.darkT = 0;
    this.tBar = this.add.graphics().setScrollFactor(0).setDepth(50);
    // egipto: gemas y langostas · halloween: lluvia de sangre
    this.rubies = item('rubi', 0.5, L.rubies); this.diamantes = item('diamante', 0.5, L.diamantes);
    this.langT = 0; this.swarm = 0; this.langEm = L.langostas ? this.add.particles(0, 0, 'langosta', { emitting: false, x: { min: 0, max: W }, y: { min: 0, max: H }, lifespan: 700, speedX: { min: 300, max: 700 }, speedY: { min: -40, max: 40 }, scale: { min: 0.7, max: 1.4 }, frequency: 12, rotate: { min: -20, max: 20 } }).setScrollFactor(0).setDepth(46) : null;
    if (L.nieve) this.add.particles(0, 0, 'px', { x: { min: 0, max: W + 100 }, y: -20, lifespan: 5000, speedY: { min: 50, max: 120 }, speedX: { min: -40, max: 10 }, scale: { min: 1.2, max: 3 }, alpha: 0.9, frequency: 45 }).setScrollFactor(0).setDepth(44);
    if (L.sangre) this.add.particles(0, 0, 'gota', { x: { min: 0, max: W }, y: -20, lifespan: 1100, speedY: { min: 520, max: 760 }, speedX: -40, scale: { min: 0.8, max: 1.4 }, alpha: 0.85, frequency: 25 }).setScrollFactor(0).setDepth(44);
    this.haluBar = this.add.graphics().setScrollFactor(0).setDepth(50);
    this.slimeBar = this.add.graphics().setScrollFactor(0).setDepth(50);
    // jefe y arena
    this.boss = L.boss === 'triple' ? new TripleJefe(this, ['pegote_rojo', 'pegote_verde', 'pegote_violeta'], BOSS_X, ARENA_X + 90, WORLD_W - 90) : L.boss === 'piramide' || L.boss === 'vampiro' || L.boss === 'reina' || L.boss === 'enredadera' || L.boss === 'cangrejo' || L.boss === 'caca' || L.boss === 'payaso' || L.boss === 'bacteria' || L.boss === 'raro' || L.boss === 'gorila' || L.boss === 'albaricoque' || L.boss === 'tetera' || L.boss === 'impresora' || L.boss === 'santa' || L.boss === 'lengua' || L.boss === 'goleador' ? new Boss2(this, L.boss, BOSS_X, ARENA_X + 90, WORLD_W - 90) : L.boss === 'gourmet' ? new Gourmet(this, BOSS_X, ARENA_X + 90, WORLD_W - 90) : L.boss === 'ballena' ? new Ballena(this, BOSS_X, ARENA_X + 70, WORLD_W - 60) : L.boss === 'tarta' ? new Toro(this, BOSS_X, ARENA_X + 70, WORLD_W - 60, { n: 'tarta', c: 'tarta_charge', d: 'tarta_dizzy', S: 0.66, bw: 130, bh: 185, title: '¡Tarta Gigante!', sub: '¡Esquiva su embestida y golpéala cuando se maree!' }) : L.boss === 'tipicacto' ? new Toro(this, BOSS_X, ARENA_X + 70, WORLD_W - 60, { n: 'tipicacto', c: 'tipicacto_charge', d: 'tipicacto_dizzy', S: 0.62, bw: 110, bh: 205, tint: 0x9be564, title: '¡Tipi-Cacto!', sub: '¡Esquiva su embestida y golpéalo cuando se maree!' }) : L.boss === 'polifemo' ? new Polifemo(this, BOSS_X, ARENA_X + 70, WORLD_W - 60) : L.boss === 'robot' ? new Toro(this, BOSS_X, ARENA_X + 70, WORLD_W - 60, { n: 'mega_robot', c: 'mega_robot_charge', d: 'mega_robot_dizzy', S: 1.0, bw: 130, bh: 215, tint: 0x66e6ff, title: '¡Robot Gigante!', sub: '¡Esquiva su embestida y golpéalo cuando se sobrecaliente!' }) : L.boss === 'seta' ? new Toro(this, BOSS_X, ARENA_X + 70, WORLD_W - 60, { n: 'seta_rey', c: 'seta_rey_charge', d: 'seta_rey_dizzy', S: 1.0, bw: 110, bh: 205, spore: true, title: '¡Champiñón Rey!', sub: '¡Esquiva sus cabezazos y golpéalo cuando se maree!' }) : L.boss === 'slime' ? new GranSlime(this, BOSS_X, ARENA_X + 70, WORLD_W - 60) : L.boss === 'toro' ? new Toro(this, BOSS_X, ARENA_X + 70, WORLD_W - 60) : L.boss === 'pajaro' ? new Pajaro(this, BOSS_X, ARENA_X + 130, WORLD_W - 130) : new Boss(this, BOSS_X);
    if (this.boss.potBody) this.physics.add.collider(this.player.hit, this.boss.potBody);
    this.arenaWall = this.add.rectangle(ARENA_X - 20, 200, 40, 800, 0x000000, 0); this.physics.add.existing(this.arenaWall, true); this.arenaWall.body.enable = false;
    this.physics.add.collider(this.player.hit, this.arenaWall);
    this.goal = null;

    // cámara
    const cam = this.cameras.main;
    cam.setBounds(0, 0, WORLD_W, H); cam.startFollow(this.player.hit, true, 0.12, 0.12); cam.setFollowOffset(-60, 50);
    cam.fadeIn(350);

    this.makeInput(); this.makeHud();
    this.input.keyboard.on('keydown-M', () => { unlock(); toggleMute(); this.muteTxt.setText(isMuted() ? 'sonido: no (M)' : 'sonido: sí (M)'); });
    this.input.keyboard.on('keydown-F', () => (this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()));
    this.input.keyboard.on('keydown-R', () => this.restart());
    this.time.delayedCall(450, () => this.showBanner(L.title, L.name));
    if (q.has('boss')) { this.player.hit.setPosition(ARENA_X + 170, 380); this.cameras.main.scrollX = ARENA_X; }
    if (q.has('at')) { this.player.hit.setPosition(Number(q.get('at')), 300); this.cameras.main.scrollX = Number(q.get('at')) - 300; }
  }

  // ───────── entrada: teclado + botones en pantalla ─────────
  makeInput() {
    const k = this.input.keyboard;
    this.keys = k.addKeys({ left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', up: 'UP', w: 'W', space: 'SPACE', x: 'X', z: 'Z', j: 'J', shift: 'SHIFT' });
    this.btn = { left: false, right: false, jump: false, atk: false };
    this.btnPrev = { jump: false, atk: false };
    this.input.addPointer(3);
    const mk = (x, y, r, key, draw) => {
      const g = this.add.graphics().setScrollFactor(0).setDepth(50).setAlpha(0.45);
      const z = this.add.circle(x, y, r, 0xffffff, 0.001).setScrollFactor(0).setDepth(51).setInteractive();
      const render = () => { g.clear().fillStyle(0xffffff, this.btn[key] ? 0.85 : 0.5).fillCircle(x, y, r).lineStyle(4, 0x2b2b44, 0.8).strokeCircle(x, y, r); draw(g, x, y, r); };
      render();
      const set = (v) => () => { this.btn[key] = v; render(); unlock(); };
      z.on('pointerdown', set(true)); z.on('pointerup', set(false)); z.on('pointerout', set(false)); z.on('pointerover', (p) => { if (p.isDown) { this.btn[key] = true; render(); } });
    };
    const tri = (dx, dy) => (g, x, y, r) => { g.fillStyle(0x2b2b44, 1).fillTriangle(x + dx * r * 0.45, y + dy * r * 0.45, x - dx * r * 0.3 + dy * r * 0.4, y - dy * r * 0.3 + dx * r * 0.4, x - dx * r * 0.3 - dy * r * 0.4, y - dy * r * 0.3 - dx * r * 0.4); };
    mk(80, 465, 48, 'left', tri(-1, 0)); mk(190, 465, 48, 'right', tri(1, 0));
    mk(870, 455, 58, 'jump', tri(0, -1));
    mk(745, 480, 42, 'atk', (g, x, y, r) => { g.fillStyle(0xffffff, 1).fillEllipse(x, y, r * 1.3, r * 1.0).lineStyle(3, 0x2b2b44, 1).strokeEllipse(x, y, r * 1.3, r * 1.0).fillStyle(0x2b2b44, 1).fillEllipse(x, y, r * 0.35, r * 0.6); });
    this.add.text(745, 428, 'ojo', { fontFamily: FONT, fontStyle: 'bold', fontSize: 16, color: '#2b2b44' }).setOrigin(0.5).setScrollFactor(0).setDepth(52).setAlpha(0.7);
  }
  readInput() {
    const k = this.keys, b = this.btn;
    const jumpHeld = k.up.isDown || k.w.isDown || b.jump;
    const atk = k.space.isDown || k.x.isDown || k.z.isDown || k.j.isDown || k.shift.isDown || b.atk;
    const inp = {
      left: k.left.isDown || k.a.isDown || b.left, right: k.right.isDown || k.d.isDown || b.right,
      jumpHeld, jumpPressed: jumpHeld && !this.prevJump, attackPressed: atk && !this.prevAtk,
    };
    this.prevJump = jumpHeld; this.prevAtk = atk;
    if (this.halu && (this.halu.kind === 'invert' || this.halu.kind === 'flip')) [inp.left, inp.right] = [inp.right, inp.left];
    return inp;
  }

  makeEnemy(type, x, y3, a, b) {
      const pg = /^(pg|pgv|pgt)_/.exec(type); if (pg) return pg[1] === 'pg' ? new Escorpion(this, x, a, b, type, 0.55) : pg[1] === 'pgv' ? new TropixEsc(this, x, y3, a, b, type, 0.34) : new TacoBot(this, x, a, b, type, 'glob', 0.5);
      return type === 'balon' ? new Balon(this, x, y3, a) : type === 'camiseta' ? new Camiseta(this, x, y3) : type === 'porteria' ? new Porteria(this, x) : type === 'jugador' ? new Escorpion(this, x, a, b, 'fb_jugador', 0.5) : type === 'arbitro' ? new TacoBot(this, x, a, b, 'fb_arbitro', 'bala', 0.5) : type === 'hincha' ? new Escorpion(this, x, a, b, 'fb_hincha', 0.5) : type === 'vuvuzela' ? new TropixEsc(this, x, y3, a, b, 'fb_vuvuzela', 0.36) : type === 'lengua' ? new Lengua(this, x) : type === 'baba' ? new HigoCaida(this, x, 'lb_baba') : type === 'babosa' ? new Escorpion(this, x, a, b, 'lb_babosa', 0.5) : type === 'tipimalo' ? new Escorpion(this, x, a, b, 'lb_tipimalo', 0.45) : type === 'bocavol' ? new TropixEsc(this, x, y3, a, b, 'lb_bocavol', 0.4) : type === 'muneco' ? new Escorpion(this, x, a, b, 'nv_muneco', 0.5) : type === 'reno' ? new Escorpion(this, x, a, b, 'nv_reno', 0.5) : type === 'galleta' ? new Escorpion(this, x, a, b, 'nv_galleta', 0.45) : type === 'elfo' ? new TacoBot(this, x, a, b, 'nv_elfo', 'bala', 0.5) : type === 'cascanueces' ? new TacoBot(this, x, a, b, 'nv_cascanueces', 'rafaga', 0.45) : type === 'bola' ? new TropixEsc(this, x, y3, a, b, 'nv_bola', 0.34) : type === 'estrellanav' ? new TropixEsc(this, x, y3, a, b, 'nv_estrella', 0.34) : type === 'regalo' ? new Regalo(this, x) : type === 'movil_t' ? new Escorpion(this, x, a, b, 'tc_movil', 0.5) : type === 'portatil' ? new Escorpion(this, x, a, b, 'tc_portatil', 0.5) : type === 'ratonpc' ? new Escorpion(this, x, a, b, 'tc_raton', 0.5) : type === 'router' ? new TacoBot(this, x, a, b, 'tc_router', 'rayo', 0.5) : type === 'altavoz' ? new TacoBot(this, x, a, b, 'tc_altavoz', 'rafaga', 0.45) : type === 'cdvolador' ? new TropixEsc(this, x, y3, a, b, 'tc_cd', 0.34) : type === 'camara' ? new TropixEsc(this, x, y3, a, b, 'tc_camara', 0.36) : type === 'miniprint' ? new MiniPrint(this, x) : type === 'sillon' ? new Escorpion(this, x, a, b, 'rb_sillon', 0.55) : type === 'tostadora' ? new TacoBot(this, x, a, b, 'rb_tostadora', 'bala', 0.5) : type === 'lampara' ? new TacoBot(this, x, a, b, 'rb_lampara', 'rayo', 0.5) : type === 'cuco' ? new TacoBot(this, x, a, b, 'rb_cuco', 'rafaga', 0.5) : type === 'pezbici' ? new Escorpion(this, x, a, b, 'rb_pezbici', 0.5) : type === 'nubepar' ? new TropixEsc(this, x, y3, a, b, 'rb_nube', 0.38) : type === 'pulpo' ? new TropixEsc(this, x, y3, a, b, 'rb_pulpo', 0.36) : type === 'espejo' ? new Espejo(this, x, a, b) : type === 'iman' ? new Iman(this, x, y3 || 0) : type === 'mimo' ? new Mimo(this, x) : type === 'cordero' ? new TacoBot(this, x, a, b, 'cordero', 'rafaga', 0.5) : type === 'ternera' ? new Escorpion(this, x, a, b, 'ternera', 0.55) : type === 'higo' ? new HigoCaida(this, x) : type === 'culebra' ? new Escorpion(this, x, a, b, 'culebra', 0.55) : type === 'tigre' ? new Escorpion(this, x, a, b, 'tigre', 0.55) : type === 'plantamano' ? new PlantaMano(this, x) : type === 'gusano' ? new Escorpion(this, x, a, b, 'gusano', 0.6) : type === 'serpiente' ? new TacoBot(this, x, a, b, 'serpiente', 'glob', 0.5) : type === 'oruga' ? new Escorpion(this, x, a, b, 'oruga', 0.6) : type === 'pajaroraro' ? new TropixEsc(this, x, y3, a, b, 'pajaro_raro', 0.3) : type === 'peludo' ? new Escorpion(this, x, a, b, 'peludo', 0.6) : type === 'empujon' ? new Empujon(this, x) : type === 'tipibact' ? new Escorpion(this, x, a, b, 'bact_tipi', 0.6) : type === 'tropixbact' ? new TropixEsc(this, x, y3, a, b, 'bact_tropix', 0.36) : type === 'pinchos' ? new TacoBot(this, x, a, b, 'bact_pinchos', 'aguijon', 0.5) : type === 'placa' ? new Escorpion(this, x, a + 100, b - 100, 'placa', 0.7) : type === 'turista' ? new TacoBot(this, x, a, b, 'turista', 'rayo', 0.5) : type === 'mimo' ? new Escorpion(this, x, a, b, 'mimo', 0.6) : type === 'paloma' ? new TropixEsc(this, x, y3, a, b, 'paloma', 0.3) : type === 'escorpion' ? new Escorpion(this, x, a, b) : type === 'payasito' ? new Escorpion(this, x, a, b, 'payasito', 0.55) : type === 'globo' ? new TropixEsc(this, x, y3, a, b, 'globo', 0.3) : type === 'malabarista' ? new TacoBot(this, x, a, b, 'malabarista', 'bala', 0.5) : type === 'gominola' ? new Escorpion(this, x, a, b, 'gominola', 0.55) : type === 'helado' ? new TacoBot(this, x, a, b, 'helado', 'glob', 0.5) : type === 'bombon' ? new TropixEsc(this, x, y3, a, b, 'bombon', 0.3) : type === 'caca' ? new Escorpion(this, x, a, b, 'caca', 0.6) : type === 'mosca' ? new TropixEsc(this, x, y3, a, b, 'mosca', 0.3) : type === 'pedonube' ? new TacoBot(this, x, a, b, 'pedo_nube', 'glob', 0.45) : type === 'cangrejo' ? new Escorpion(this, x, a, b, 'cangrejo', 0.6) : type === 'loro' ? new TropixEsc(this, x, y3, a, b, 'loro', 0.3) : type === 'canonpirata' ? new TacoBot(this, x, a, b, 'canon_pirata', 'bala', 0.5) : type === 'escarabajo' ? new Escorpion(this, x, a, b, 'escarabajo', 0.62) : type === 'mariquita' ? new Escorpion(this, x, a, b, 'mariquita', 0.6) : type === 'planta' ? new PlantaMaceta(this, x, a, b) : type === 'raton' ? new Escorpion(this, x, a, b, 'raton', 0.55) : type === 'ovni' ? new TropixEsc(this, x, y3, a, b, 'ovni', 0.36) : type === 'esctropix' ? new TropixEsc(this, x, y3, a, b) : type === 'momia' ? new Momia(this, x, a, b) : type === 'minivamp' ? new MiniVamp(this, x, y3, a, b) : type === 'calabaza' ? new Calabaza(this, x, a, b) : type === 'pezespada' ? new TacoBot(this, x, a, b, 'pez_espada', 'espada', 0.45) : type === 'pezlinterna' ? new PezLinterna(this, x, y3, a, b) : type === 'bacteria' ? new Bacteria(this, x, a, b) : type === 'gordo' ? new Gordo(this, x, a, b)
        : type === 'arana' ? new Arana(this, x, a, b) : type === 'bomba' ? new Bomba(this, x, a, b)
          : type === 'pirana' ? new Pirana(this, x, a) : type.startsWith('tropix') ? new Tropix(this, x, y3, a, b, type.slice(7) || 'normal')
            : type === 'fantaslime' ? new Fantaslime(this, x, y3, a, b) : type === 'mandibulas' ? new Mandibulas(this, x) : type === 'bolita' ? new Bolita(this, x, a, b) : type === 'babosa' ? new Babosa(this, x, a, b) : type === 'champi' ? new Champi(this, x, y3, a, b) : type === 'robot' ? new Robot(this, x, a, b) : type === 'oveja' ? new Oveja(this, x, a, b) : type === 'tacobot' ? new TacoBot(this, x, a, b) : type === 'sirena' ? new Sirena(this, x, y3, a, b) : type === 'escila' ? new Escila(this, x) : type === 'circe' ? new Circe(this, x, a, b) : type === 'dron' ? new Dron(this, x, y3, a, b)
            : type === 'abeja' ? new Abeja(this, x, y3, a, b) : type === 'torreta' ? new Torreta(this, x) : type === 'lavadora' ? new Lavadora(this, x, a, b)
              : new Fuego(this, x, a, b);
  }
  addEnemy(type, x, y3, a, b) {
    const e = this.makeEnemy(type, x, y3, a, b); if (!e) return null;
    if (e.hit.body.allowGravity) this.physics.add.collider(e.hit, this.groundGroup);
    if (e.onPlat) this.physics.add.collider(e.hit, this.platGroup, null, (en, plat) => en.body.velocity.y >= 0 && en.body.bottom <= plat.body.top + 18);
    this.enemies.push(e); return e;
  }
  // ───────── alucinaciones (nivel de setas) ─────────
  hallucinate(kind, title, sub, dur = 7) {
    const cam = this.cameras.main;
    if (this.halu) { this.halu.t = Math.max(this.halu.t, dur); return; }
    kind = kind || Phaser.Utils.Array.GetRandom(['invert', 'flip', 'left']);
    this.halu = { kind, t: dur }; this.haluMax = dur;
    const msg = { invert: ['¡Alucinación!', 'Las teclas están al revés'], flip: ['¡Alucinación!', 'El mundo está boca abajo'], left: ['¡Alucinación!', 'Ahora hay que avanzar hacia la izquierda'] }[kind];
    this.showBanner(title || msg[0], sub || msg[1]); SFX.splat(); this.confetti(this.player.x, this.player.y, 20);
    if (kind !== 'invert') { this.tweens.add({ targets: cam, rotation: Math.PI, duration: 500, ease: 'Sine.easeInOut' }); cam.setFollowOffset(60, -50); }
  }
  endHalu() {
    const cam = this.cameras.main; this.halu = null;
    this.tweens.add({ targets: cam, rotation: 0, duration: 500, ease: 'Sine.easeInOut' }); cam.setFollowOffset(-60, 50);
  }
  updateHalu(dt) {
    const p = this.player, g = this.haluBar.clear();
    for (const a of this.alus) {
      if (a.t > 0) { a.t -= dt; if (a.t <= 0) { a.img.setVisible(true).setScale(0.5); } continue; }
      if (Math.abs(a.x - p.x) < 34 && p.bottom > a.y - 70 && p.bottom < a.y + 14) { a.t = 8; a.img.setVisible(false); this.hallucinate(); }
    }
    this.alus.forEach((a) => { if (a.t <= 0) a.img.setAngle(Math.sin(this.t * 3 + a.x) * 4); });
    if (this.halu) {
      this.halu.t -= dt;
      g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 124, 170, 18, 9); g.fillStyle(0xc084f5, 1).fillRoundedRect(27, 127, 164 * Math.max(0, this.halu.t) / (this.haluMax || 7), 12, 6);
      if (this.halu.t <= 0) this.endHalu();
    }
  }

  // ───────── HUD ─────────
  makeHud() {
    this.hearts = [0, 1, 2, 3, 4].map((i) => this.add.image(30 + i * 38, 32, CHARS[this.charId].key + '_normal').setScale(24 / this.textures.get(CHARS[this.charId].key + '_normal').getSourceImage().width).setScrollFactor(0).setDepth(50));
    this.add.image(34, 80, 'star').setScrollFactor(0).setDepth(50).setScale(0.8);
    this.scoreTxt = this.add.text(62, 80, '0', { fontFamily: FONT, fontStyle: 'bold', fontSize: 28, color: '#fff', stroke: '#2b2b44', strokeThickness: 6 }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(50);
    this.stakeIcon = this.add.image(238, 34, 'estaca').setScale(0.2).setRotation(0.6).setScrollFactor(0).setDepth(50).setVisible(false);
    this.muteTxt = this.add.text(W - 14, 14, isMuted() ? 'sonido: no (M)' : 'sonido: sí (M)', { fontFamily: FONT, fontStyle: 'bold', fontSize: 16, color: '#2b2b44' }).setOrigin(1, 0).setScrollFactor(0).setDepth(50);
    this.bossBar = this.add.graphics().setScrollFactor(0).setDepth(50).setVisible(false);
    this.banner = this.add.text(W / 2, 150, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 64, color: '#fff7c2', stroke: '#2b2b44', strokeThickness: 12, align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(60).setAlpha(0);
    this.sub = this.add.text(W / 2, 215, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 26, color: '#fff', stroke: '#2b2b44', strokeThickness: 6 }).setOrigin(0.5).setScrollFactor(0).setDepth(60).setAlpha(0);
  }
  showBanner(t, s = '') {
    this.banner.setText(t).setAlpha(1).setScale(0.5); this.sub.setText(s).setAlpha(1);
    this.tweens.add({ targets: this.banner, scale: 1, duration: 350, ease: 'Back.easeOut' });
    this.tweens.add({ targets: [this.banner, this.sub], alpha: 0, delay: 2200, duration: 500 });
  }
  refreshHud() {
    this.hearts.forEach((h, i) => h.setAlpha(i < this.player.hp ? 1 : 0.18));
    this.scoreTxt.setText(`${this.score} / ${this.stars.length}`);
    this.stakeIcon.setVisible(!!this.player.estaca);
    const g = this.bossBar.clear();
    if (this.arena && !this.boss.dead) {
      this.bossBar.setVisible(true);
      g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(W / 2 - 150, 22, 300, 24, 12);
      g.fillStyle(0x7ed957, 1).fillRoundedRect(W / 2 - 146, 26, 292 * this.boss.hp / this.boss.maxHp, 16, 8);
      if (this.L.boss === 'gourmet') { const f = this.player.fat; g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(W / 2 - 110, 52, 220, 20, 10); g.fillStyle(f > 0.75 ? 0xff3b3b : f > 0.5 ? 0xffa23b : 0xffd24d, 1).fillRoundedRect(W / 2 - 106, 56, 212 * f, 12, 6); if (!this.barrTxt) this.barrTxt = this.add.text(W / 2 + 118, 62, 'barriga', { fontFamily: FONT, fontStyle: 'bold', fontSize: 14, color: '#fff', stroke: '#2b2b44', strokeThickness: 4 }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(51); }
    }
  }

  // ───────── efectos ─────────
  burst(x, y, n = 8) { this.particles.emitParticleAt(x, y, n); this.conf.emitParticleAt(x, y, Math.ceil(n / 2)); }
  confetti(x, y, n = 14) { this.conf.emitParticleAt(x, y, n); }
  dust(x, y) { this.particles.emitParticleAt(x, y, 3); }
  gas(x, y, n = 6) { this.gasEm.emitParticleAt(x, y, n); }
  explosion(x, y, k = 1) {
    SFX.boom(); this.cameras.main.shake(300 * k, 0.018 * k); this.burst(x, y, Math.round(26 * k));
    const star = this.add.image(x, y, 'explosion').setDepth(9).setScale(0.3 * k).setAngle(Phaser.Math.Between(0, 30));
    this.tweens.add({ targets: star, scale: 0.85 * k, angle: star.angle + 25, alpha: 0, duration: 420, ease: 'Cubic.easeOut', onComplete: () => star.destroy() });
  }

  // ───────── proyectiles (aguijones, balas explosivas, ráfagas de aire) y peligros del nivel 3 ─────────
  addProjectile(o) {
    const key = { aguijon: 'aguijon', bala: 'bala', rafaga: 'rafaga', glob: 'glob', rayo: 'rayo', espada: 'espada', polen: 'polen' }[o.type];
    o.img = this.add.image(o.x, o.y, key).setDepth(8);
    if (o.type === 'aguijon') o.img.setScale(0.7);
    if (o.type === 'espada') o.img.setScale(0.6);
    if (o.type === 'bala') o.img.setScale(0.6);
    if (o.type === 'glob') o.img.setScale(0.7);
    if (o.type === 'rafaga') o.img.setScale(o.high ? 0.5 : 0.65).setAlpha(0.85).setFlipX(o.vx < 0);
    this.projectiles.push(o);
  }
  addCharco(x, drop) {
    const img = this.add.image(x, drop ? GROUND_Y - 120 : GROUND_Y + 2, 'charco').setOrigin(0.5, 1).setScale(drop ? 0.2 : 0.55).setDepth(3.5);
    if (drop) this.tweens.add({ targets: img, y: GROUND_Y + 2, scale: 0.55, duration: 320, ease: 'Bounce.easeOut' });
    else this.tweens.add({ targets: img, scaleY: { from: 0.5, to: 0.6 }, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.charcos.push({ x, img, got: false });
  }
  updateSlime(dt) {
    const p = this.player;
    for (const c of this.charcos) if (!c.got && Math.abs(c.x - p.x) < 52 && p.bottom > GROUND_Y - 70) {
      c.got = true; p.slimeT = 8; SFX.splat(); SFX.star(); this.gas(p.x, p.y, 14); this.confetti(c.x, GROUND_Y - 30, 14);
      this.tweens.add({ targets: c.img, alpha: 0, scaleY: 0.05, duration: 250, onComplete: () => c.img.destroy() });
    }
    this.rejas.forEach((r) => r.img.setAlpha(p.slimeT > 0 ? 0.55 : 1));
    const g = this.slimeBar.clear();
    if (p.slimeT > 0) {
      g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 100, 170, 18, 9); g.fillStyle(0x8ee850, 1).fillRoundedRect(27, 103, 164 * p.slimeT / 8, 12, 6);
      if (Math.random() < 0.3) this.gas(p.x + Phaser.Math.Between(-18, 18), p.bottom - 8, 1);
    }
  }
  updateMachines(dt) {
    const p = this.player, cam = this.cameras.main;
    // cables: al tocar un extremo te conviertes en electricidad y viajas por el cable
    this.rideCd = Math.max(0, this.rideCd - dt);
    const sg = this.sparkG.clear();
    if (this.ride) {
      const r = this.ride, c = r.cable; r.d += 640 * dt; const total = c.len; let d = Math.min(r.d, total); if (r.dir < 0) d = total - d;
      let acc = 0, px = c.pts[0].x, py = c.pts[0].y;
      for (let i = 0; i < c.seg.length; i++) { if (d <= acc + c.seg[i] || i === c.seg.length - 1) { const u = (d - acc) / c.seg[i]; px = c.pts[i].x + (c.pts[i + 1].x - c.pts[i].x) * u; py = c.pts[i].y + (c.pts[i + 1].y - c.pts[i].y) * u; break; } acc += c.seg[i]; }
      p.hit.setPosition(px, py); p.invuln = Math.max(p.invuln, 0.3);
      sg.fillStyle(0x50e6ff, 0.9).fillCircle(px, py, 15).fillStyle(0xffffff, 1).fillCircle(px, py, 8);
      sg.lineStyle(4, 0xffffff, 0.9); for (let i = 0; i < 5; i++) { const a = Math.random() * 6.28, l = 18 + Math.random() * 14; sg.beginPath().moveTo(px, py).lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l).strokePath(); }
      if (Math.random() < 0.6) this.particles.emitParticleAt(px, py, 1);
      if (r.d >= total) {
        this.ride = null; this.rideCd = 0.8; const b = p.hit.body; b.enable = true; py = Math.min(py, GROUND_Y - 60); b.reset(px, py); p.hit.setPosition(px, py);
        p.body.setVisible(true); p.legs.setVisible(true); if (p.cane) p.cane.setVisible(true); SFX.star(); this.burst(px, py, 10); p.setExpr('angry', 0.4);
      }
    } else if (this.rideCd <= 0 && !p.dead) {
      for (const c of this.cables) for (let k = 0; k < 2; k++) {
        const e = c.ends[k];
        if (Math.abs(p.x - e[0]) < 38 && p.bottom > GROUND_Y - 60) {
          this.ride = { cable: c, dir: k === 0 ? 1 : -1, d: 0 }; p.hit.body.enable = false; p.body.setVisible(false); p.legs.setVisible(false); if (p.cane) p.cane.setVisible(false);
          SFX.charge(); this.burst(p.x, p.y, 12); break;
        }
      }
    }
    // placas de presión y trampas láser
    const tg = this.trapG.clear();
    for (const pl of this.placas) {
      const on = p.onGround && Math.abs(p.x - pl.x) < 62 && p.bottom > GROUND_Y - 24 && !this.ride;
      pl.t -= dt;
      if (pl.state === 'idle' && on) { pl.state = 'warn'; pl.t = 0.9; pl.img.setTexture('placa_on'); SFX.fuse(); }
      else if (pl.state === 'warn') {
        tg.fillStyle(0xff3a5a, 0.18 + 0.15 * Math.sin(this.t * 30)).fillRect(pl.tx - pl.tw / 2, 80, pl.tw, GROUND_Y - 80);
        if (pl.t <= 0) { pl.state = 'fire'; pl.t = 1.8; SFX.charge(); cam.shake(200, 0.006); }
      } else if (pl.state === 'fire') {
        for (let bx = pl.tx - pl.tw / 2 + 20; bx <= pl.tx + pl.tw / 2 - 10; bx += 44) {
          tg.lineStyle(14, 0xff3a5a, 0.5).beginPath().moveTo(bx, 60).lineTo(bx, GROUND_Y).strokePath().lineStyle(5, 0xffffff, 1).beginPath().moveTo(bx, 60).lineTo(bx, GROUND_Y).strokePath();
          if (Math.abs(p.x - bx) < 20 && !this.ride && p.hurt(bx)) this.burst(p.x, p.y, 6);
        }
        if (pl.t <= 0) { pl.state = 'cool'; pl.t = 1.2; }
      } else if (pl.state === 'cool' && pl.t <= 0) { pl.state = 'idle'; pl.img.setTexture('placa'); }
    }
  }
  updateGemas(dt) {
    const p = this.player, cam = this.cameras.main;
    for (const o of this.rubies) if (!o.got && Math.abs(o.x - p.x) < 44 && Math.abs(o.y - p.y) < 90) {
      o.got = true; this.tweens.add({ targets: o.img, y: o.y - 40, alpha: 0, duration: 300, onComplete: () => o.img.destroy() });
      p.hurt(o.x); SFX.hurt(); this.showBanner('¡Rubí maldito!', 'Te lleva atrás y te quita una vida');
      p.hit.setPosition(this.checkpointX, this.checkpointY - 100); p.hit.body.setVelocity(0, 0); cam.scrollX = Math.max(0, this.checkpointX - 300); this.burst(p.x, p.y, 12);
    }
    for (const o of this.diamantes) if (!o.got && Math.abs(o.x - p.x) < 44 && Math.abs(o.y - p.y) < 90) {
      o.got = true; this.tweens.add({ targets: o.img, y: o.y - 40, alpha: 0, duration: 300, onComplete: () => o.img.destroy() });
      p.hp = Math.min(p.maxHp, p.hp + 1); SFX.checkpoint(); this.confetti(o.x, o.y, 16); this.showBanner('¡Diamante!', '+1 vida… ¡pero salen 3 escorpiones!');
      for (let k = -1; k <= 1; k++) { const x = o.x + k * 90, e = this.addEnemy('escorpion', x, 0, x - 150, x + 150); if (e) e.hit.body.setVelocity(k * 120, -280); }
    }
  }
  updateLangostas(dt) {
    if (this.arena) { if (this.langEm) this.langEm.stop(); return; }
    this.langT += dt;
    if (this.swarm <= 0 && this.langT >= 20) {
      this.langT = 0; this.swarm = 1.8; this.langEm.start(); SFX.charge(); this.showBanner('¡Langostas!', 'Los enemigos se esconden y cambian de sitio');
      for (const e of this.enemies) if (!e.dead && !e.custom) { e.safe = 2; e.setVis(false); }
    } else if (this.swarm > 0) {
      this.swarm -= dt;
      if (this.swarm <= 0) {
        this.langEm.stop(); const p = this.player, opts = (this.L.tpDest || []);
        for (const e of this.enemies) if (!e.dead && !e.custom) {
          const far = opts.filter((x) => Math.abs(x - p.x) > 400 && x < this.L.arenaX - 100); if (far.length) e.teleport(Phaser.Utils.Array.GetRandom(far) + Phaser.Math.Between(-60, 60));
          e.setVis(true); e.safe = 0.6;
        }
      }
    }
  }
  updateTaco(dt) {
    const p = this.player, cam = this.cameras.main, g = this.tBar.clear();
    for (const c of this.cactos) if (Math.abs(c.x - p.x) < 38 && p.bottom > GROUND_Y - 118 && p.hurt(c.x)) this.burst(p.x, p.y, 6);
    const near = (o, dy = 90) => !o.got && Math.abs(o.x - p.x) < 44 && Math.abs(o.y - p.y) < dy;
    const take = (o) => { o.got = true; this.tweens.add({ targets: o.img, y: o.y - 40, alpha: 0, duration: 300, onComplete: () => o.img.destroy() }); };
    for (const o of this.burritos) if (near(o)) {
      take(o);
      if (o.bad) { SFX.hurt(); this.showBanner('¡Burrito picante!', 'Este te quita una vida…'); p.hurt(o.x); }
      else { p.hp = Math.min(p.maxHp, p.hp + 1); SFX.checkpoint(); this.confetti(o.x, o.y, 16); this.showBanner('¡Burrito!', '+1 vida'); }
    }
    for (const o of this.sombreros) if (near(o)) { take(o); p.shield = 9; SFX.checkpoint(); this.showBanner('¡Sombrero mexicano!', 'Escudo: nadie te quita vida durante 9 s'); }
    for (const o of this.nachosI) if (near(o)) { take(o); this.darkT = 8; SFX.splat(); this.showBanner('¡Nachos!', 'Se ve muy poco durante 8 s'); }
    for (const t of this.portales) {
      t.cd = Math.max(0, t.cd - dt);
      if (t.cd <= 0 && !this.ride && Math.abs(t.x - p.x) < 50 && p.bottom > GROUND_Y - 30) {
        const opts = this.L.tpDest.filter((x) => Math.abs(x - p.x) > 400), x = Phaser.Utils.Array.GetRandom(opts);
        t.cd = 2; this.portales.forEach((q) => { q.cd = Math.max(q.cd, 2); }); SFX.charge(); this.burst(p.x, p.y, 14);
        p.hit.setPosition(x, GROUND_Y - 80); p.hit.body.setVelocity(0, 0); p.invuln = Math.max(p.invuln, 1);
        cam.scrollX = Phaser.Math.Clamp(x - 300, 0, this.L.worldW - W); this.burst(x, p.y, 14); this.showBanner('¡Teletransporte!', 'Has aparecido en otro sitio…');
      }
    }
    if (this.darkT > 0) { this.darkT -= dt; this.dark.setVisible(true).setPosition(p.x - cam.scrollX, p.y - cam.scrollY); g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 148, 170, 18, 9); g.fillStyle(0xb57bff, 1).fillRoundedRect(27, 151, 164 * this.darkT / 8, 12, 6); } else this.dark.setVisible(false);
    if (p.shield > 0) { g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 124, 170, 18, 9); g.fillStyle(0xffd23a, 1).fillRoundedRect(27, 127, 164 * p.shield / 9, 12, 6); }
  }
  updateOdisea(dt) {
    const p = this.player, g = this.odBar.clear(), wg = this.whirlG.clear();
    for (const c of this.ceras) if (!c.got && Math.abs(c.x - p.x) < 44 && Math.abs(c.y - p.y) < 90) {
      c.got = true; p.cera = 25; SFX.star(); this.confetti(c.x, c.y, 14); this.showBanner('¡Cera en los oídos!', 'Las sirenas no te harán daño (25 s)');
      this.tweens.add({ targets: c.img, y: c.y - 40, alpha: 0, duration: 300, onComplete: () => c.img.destroy() });
    }
    const e = this.estacaItem;
    if (e && !e.got && Math.abs(e.x - p.x) < 55 && Math.abs(e.y - p.y) < 100) {
      e.got = true; p.estaca = true; SFX.checkpoint(); this.confetti(e.x, e.y, 24); this.showBanner('¡Estaca de madera!', 'Con ella podrás herir a Polifemo');
      this.tweens.add({ targets: e.img, alpha: 0, scale: 1, duration: 300, onComplete: () => e.img.destroy() });
    }
    // Caribdis: el remolino te arrastra hacia el centro
    for (const w of this.whirls) {
      const dx = w.x - p.x;
      if (Math.abs(dx) < w.r && p.bottom > GROUND_Y - 190 && !this.ride) p.hit.body.velocity.x += Math.sign(dx) * 1500 * (1 - Math.abs(dx) / w.r) * dt;
      w.img.setScale(w.w / 300 * (1 + Math.sin(this.t * 4) * 0.04), 0.9);
      for (let i = 0; i < 4; i++) { const a = this.t * 3 + i * 1.57, rr = w.w * (0.18 + 0.1 * i); wg.lineStyle(4, 0xffffff, 0.35).beginPath().arc(w.x, GROUND_Y + 16, rr, a, a + 1.6, false).strokePath(); }
      if (Math.random() < 0.3) this.particles.emitParticleAt(w.x + Phaser.Math.Between(-w.w / 2, w.w / 2), GROUND_Y + 8, 1);
    }
    if (p.cera > 0) { g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 124, 170, 18, 9); g.fillStyle(0xffd23a, 1).fillRoundedRect(27, 127, 164 * p.cera / 25, 12, 6); }
    if (p.macT > 0) { g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 172, 170, 18, 9); g.fillStyle(0xd0703a, 1).fillRoundedRect(27, 175, 164 * p.macT / 4, 12, 6); }
    if (p.pigT > 0) { g.fillStyle(0x2b2b44, 0.8).fillRoundedRect(24, 148, 170, 18, 9); g.fillStyle(0xff7eb6, 1).fillRoundedRect(27, 151, 164 * p.pigT / 4, 12, 6); }
    // sin estaca no se puede entrar en la cueva de Polifemo
    if (this.L.estaca && !p.estaca && !this.arena && p.x > this.L.arenaX - 30) {
      p.hit.setX(this.L.arenaX - 30); p.hit.body.setVelocityX(0);
      if (!this.bannerCd || this.t > this.bannerCd) { this.bannerCd = this.t + 4; this.showBanner('Te falta algo…', '¡Busca la estaca de madera!'); }
    }
  }
  // Marcador (idea de los niños): cuenta atrás de 20 s; al llegar a 0 ¡salen 10 balones de golpe!
  updateMarcador(dt) {
    if (!this.L.marcador) return;
    if (!this.mk) {
      const bg = this.add.graphics().setScrollFactor(0).setDepth(60); bg.fillStyle(0x23232e, 0.92).fillRoundedRect(W / 2 - 80, 8, 160, 54, 10); bg.lineStyle(3, 0x888899, 1).strokeRoundedRect(W / 2 - 80, 8, 160, 54, 10);
      this.mk = { t: 20, bg, txt: this.add.text(W / 2, 40, '20', { fontFamily: 'monospace', fontStyle: 'bold', fontSize: 40, color: '#40ff60' }).setOrigin(0.5).setScrollFactor(0).setDepth(61), lab: this.add.text(W / 2, 14, 'MARCADOR', { fontFamily: 'monospace', fontStyle: 'bold', fontSize: 11, color: '#aaaabb' }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(61) };
    }
    const m = this.mk, boss = this.boss && this.boss.active, p = this.player;
    if (boss || p.dead || this.state !== 'play') { m.txt.setText('--').setColor('#556655'); return; }
    m.t -= dt; const s = Math.max(0, Math.ceil(m.t)); m.txt.setText(String(s).padStart(2, '0')).setColor(s <= 5 && Math.floor(m.t * 4) % 2 ? '#ff4040' : '#40ff60');
    if (m.t <= 0) {
      m.t = 20; SFX.boom(); this.cameras.main.shake(250, 0.01); const cam = this.cameras.main, sx = cam.scrollX;
      for (let i = 0; i < 10; i++) { const x = sx + 60 + (W - 120) * (i / 9); this.addEnemy('balon', x, 30, (i % 2 ? 1 : -1) * (90 + Math.random() * 170)); }
      this.showBanner('¡Se acabó el tiempo!', '¡10 balones!');
    }
  }
  updateExtras(dt) {
    this.updateMarcador(dt);
    if (this.puertas) this.updateMachines(dt);
    if (this.L.rejas) this.updateSlime(dt);
    if (this.L.alus || this.L.hipno) this.updateHalu(dt);
    if (this.L.langostas) this.updateLangostas(dt);
    if (this.L.rubies || this.L.diamantes) this.updateGemas(dt);
    if (this.L.sea) this.updateOdisea(dt);
    if (this.L.taco) this.updateTaco(dt);
    const p = this.player, pc = { x: p.x, y: p.y };
    for (const o of this.projectiles) {
      o.life -= dt; o.vy += (o.g || 0) * dt; o.x += o.vx * dt; o.y += o.vy * dt; o.img.setPosition(o.x, o.y);
      const d = Phaser.Math.Distance.Between(o.x, o.y, pc.x, pc.y);
      if (o.type === 'aguijon') {
        o.img.setRotation(Math.atan2(o.vy, o.vx));
        if (d < 30 && !p.dead) { if (p.hurt(o.x)) this.burst(p.x, p.y, 5); o.dead = true; }
        if (o.y > GROUND_Y - 4) o.dead = true;
      } else if (o.type === 'rayo' || o.type === 'espada') {
        o.img.setRotation(Math.atan2(o.vy, o.vx));
        if (d < 28 && !p.dead) { if (p.hurt(o.x)) this.burst(p.x, p.y, 5); o.dead = true; }
        if (o.y > GROUND_Y - 4) o.dead = true;
      } else if (o.type === 'glob') {
        o.img.rotation += dt * 6;
        if (d < 32 && !p.dead) { if (p.hurt(o.x)) this.burst(p.x, p.y, 5); o.dead = true; }
        if (o.y > GROUND_Y - 8) { o.dead = true; this.gas(o.x, GROUND_Y - 10, 4); }
      } else if (o.type === 'polen') {
        o.img.rotation += dt * 5;
        if (d < 32 && !p.dead && p.pot()) o.dead = true;
        if (o.y > GROUND_Y - 8) { o.dead = true; this.burst(o.x, GROUND_Y - 10, 4); }
      } else if (o.type === 'bala') {
        o.img.rotation += dt * 8;
        if (o.y > GROUND_Y - 12 || d < 40 || o.life <= 0) {
          o.dead = true; this.explosion(o.x, o.y, 0.6);
          if (Phaser.Math.Distance.Between(o.x, o.y, pc.x, pc.y) < 95) p.hurt(o.x);
        }
      } else if (o.type === 'rafaga') {
        if (Math.abs(o.x - p.x) < 50 && Math.abs(o.y - (p.y + 8)) < 62 && !p.dead && p.hurt(o.x - Math.sign(o.vx) * 10)) this.burst(p.x, p.y, 5);
        if (o.x < this.L.arenaX - 40 || o.x > this.L.worldW + 40) o.dead = true;
      }
      if (o.life <= 0) o.dead = true;
    }
    this.projectiles = this.projectiles.filter((o) => { if (o.dead) o.img.destroy(); return !o.dead; });
    this.blocks.forEach((b) => b.update(p));
    const pb = p.bounds();
    for (const r of this.toxic) if (overlaps(pb, r) && p.hurt(r.x + r.width / 2)) { this.burst(p.x, p.y, 6); this.gas(p.x, p.y, 6); }
  }

  // ───────── bucle ─────────
  update(_, dtMs) {
    const dt = Math.min(dtMs / 1000, 0.05); this.t += dt;
    const p = this.player, cam = this.cameras.main;
    // parallax
    this.hillsFar.forEach((h) => (h.tilePositionX = cam.scrollX * 0.15)); this.hillsNear.forEach((h) => (h.tilePositionX = cam.scrollX * 0.35));
    this.updateZone(cam.scrollX + W / 2, dt);
    this.lavaTiles.forEach((t) => (t.tilePositionX = this.t * 40)); this.seaTiles.forEach((t) => (t.tilePositionX = this.t * 30)); (this.waterTiles || []).forEach((t) => (t.tilePositionX = this.t * 24));

    if (this.state === 'play' || this.state === 'bossdead') {
      const inp = this.ride ? { left: false, right: false, jumpHeld: false, jumpPressed: false, attackPressed: false } : this.readInput();
      this.updateBoats(dt);
      p.update(dt, inp);
      if (!this.ride) this.checkWorld(dt);
      this.updateEnemies(dt);
      this.updateExtras(dt);
      this.boss.update(dt, p);
      this.checkBoss();
      this.refreshHud();
      if (p.dead && this.state === 'play') this.lose();
    } else {
      p.update(dt, { left: false, right: false, jumpHeld: false, jumpPressed: false, attackPressed: false });
      this.enemies.forEach((e) => e.update(dt, p)); this.boss.update(dt, p);
    }
  }

  updateZone(cx, dt) {
    const L = this.L, n = L.zones.length;
    const pos = Phaser.Math.Clamp((cx - L.zoneW / 2) / L.zoneW, 0, n - 1), lo = Math.floor(pos), f = pos - lo;
    const smooth = f * f * (3 - 2 * f);
    const set = (arr) => arr.forEach((o, i) => o.setAlpha(i === lo ? 1 : i === lo + 1 ? smooth : 0));
    set(this.skies); set(this.hillsFar); set(this.hillsNear);
    if (L.sky && L.noFloor) { this.hillsNear.forEach((o) => o.setAlpha(0)); this.hillsFar.forEach((o) => o.setAlpha(o.alpha * 0.3)); } // cielo abierto: sin 'suelo' de fondo
    this.skies[lo].setAlpha(1);
    if (this.starLayer) { const sz = this.starZone; this.starLayer.setAlpha(Phaser.Math.Clamp(lo === sz - 1 ? smooth : lo === sz ? 1 - smooth * 0.9 : 0, 0, 1)); }
    if (this.sun) this.sun.setAlpha(lo === 0 ? 1 - smooth : 0);
    this.skyEyes.forEach((e) => { e.ph += dt * 2; e.y = e.baseY + Math.sin(e.ph) * 14; e.setScale(e.scaleX, 0.6 + 0.4 * Math.abs(Math.cos(e.ph * 0.35 + e.baseY)) ** 0.2 + 0.0); });
  }

  updateBoats(dt) {
    const p = this.player;
    for (const b of this.boats) {
      const nx = b.cx + Math.sin(this.t * b.spd + b.ph) * b.amp; b.dx = nx - b.lx; b.lx = nx;
      b.r.body.setVelocityX(b.dx / Math.max(dt, 0.001)); b.img.x = b.r.x;
      if ((p.hit.body.blocked.down || p.hit.body.touching.down) && Math.abs(p.bottom - (b.r.y - 10)) < 12 && Math.abs(p.x - b.r.x) < 80) p.hit.x += b.dx;
    }
  }

  checkWorld(dt) {
    const p = this.player, ARENA_X = this.L.arenaX;
    // caída a un agujero (o a la lava): vuelves al último punto de control, sin perder vida
    if (this.L.lava ? p.bottom > GROUND_Y + 62 : p.y > H + 160) {
      if (this.L.lava) { SFX.splash(); this.burst(p.x, GROUND_Y + 40, 14); }
      p.reset(this.arena ? ARENA_X + 140 : this.checkpointX, this.arena ? 300 : this.checkpointY - 160); p.setExpr('sad', 1); SFX.boing();
    }
    // setas saltarinas
    for (const sp of this.springs) {
      sp.cd = Math.max(0, sp.cd - dt);
      if (sp.cd <= 0 && Math.abs(p.x - sp.x) < (sp.top ? 44 : 46) && (sp.top ? p.onGround && Math.abs(p.bottom - sp.top) < 10 : p.bottom > GROUND_Y - 20 && p.bottom < GROUND_Y + 30 && p.vy >= 0)) {
        sp.cd = 0.4; if (this.L.sky) { p.slow = 1.6; this.confetti(sp.x, GROUND_Y - 30, 10); } p.hit.body.setVelocityY(this.L.sky ? -900 : -1010); p.cutOK = false; p.airJumps = 0; p.sx = 0.7; p.sy = 1.4; SFX.boing(); this.confetti(sp.x, GROUND_Y - 30, 18);
        this.tweens.add({ targets: sp.img, scaleY: { from: 0.5 * sp.img.scaleY, to: sp.img.scaleY }, scaleX: { from: 1.3 * sp.img.scaleX, to: sp.img.scaleX }, duration: 350, ease: 'Back.easeOut' });
      }
    }
    // estrellas
    const pb = p.bounds();
    for (const s of this.stars) if (!s.got && Math.abs(s.x - p.x) < 60 && Math.abs(s.y - p.y) < 90 && Phaser.Geom.Intersects.RectangleToRectangle(pb, new Phaser.Geom.Rectangle(s.x - 18, s.y - 18, 36, 36))) {
      s.got = true; this.score++; addStars(1); SFX.star(); this.burst(s.x, s.y, 6);
      this.tweens.add({ targets: s.img, y: s.y - 40, alpha: 0, scale: 1.6, duration: 300, onComplete: () => s.img.destroy() });
    }
    // checkpoints
    for (const f of this.flags) if (!f.on && p.x > f.x) { f.on = true; f.img.setTexture('flag_on'); this.checkpointX = f.x; this.checkpointY = f.y; SFX.checkpoint(); this.confetti(f.x + 30, f.y - 100, 24); }
    // entrada al jefe
    if (!this.arena && p.x > ARENA_X + 140) {
      this.arena = true; this.arenaWall.body.enable = true;
      this.cameras.main.setBounds(ARENA_X, 0, W, H); this.cameras.main.stopFollow(); this.cameras.main.pan(ARENA_X + W / 2, H / 2, 500, 'Sine.easeInOut', true);
      this.time.delayedCall(700, () => this.boss.start());
    }
    // meta
    if (this.goal && Math.abs(p.x - this.goal.x) < 60 && this.state === 'bossdead') this.win();
  }

  // ───────── amigos (la caca de Caquita convierte a los malos en amigos) ─────────
  makeFriend(e) {
    if (e.dead || e.friend) return; e.friend = true; e.safe = 0; this.burst(e.x, e.y, 10); this.confetti(e.x, e.y, 14); SFX.boing();
    this.friendCount = (this.friendCount || 0) + 1; this.showBanner('¡Nuevo amigo!', `Amigos: ${this.friendCount}`);
  }
  friendStep(e, p, dt) {
    const dx = p.x - e.x;
    // el amigo busca al malo más cercano y lo ataca; si no hay, sigue al jugador
    let foe = null, best = 460;
    for (const o of this.enemies) { if (o === e || o.dead || o.friend) continue; const d = Math.abs(o.x - e.x); if (d < best && Math.abs(o.y - e.y) < 260) { best = d; foe = o; } }
    const tx = foe ? foe.x : p.x, w = foe ? 70 : 140;
    if (e.a != null) { e.a = tx - w; e.b = tx + w; if (e.px != null) e.px += Math.sign(tx - e.px) * (foe ? 3 : 2); if (e.py != null && foe && e.y0 != null) e.y0 += Math.sign(foe.y - e.y0) * 1.5; }
    e.fcd = Math.max(0, (e.fcd || 0) - dt);
    if (foe && e.fcd <= 0 && Math.abs(foe.x - e.x) < 85 && Math.abs(foe.y - e.y) < 95) { foe.takeHit('bump', e.x); e.fcd = 0.7; this.burst(foe.x, foe.y, 6); SFX.bump(); }
    if (Math.abs(dx) > 700 && e.teleport) e.teleport(p.x - Math.sign(dx || 1) * -120);
    const g = this.friendG, x = e.x, y = e.y - (e.hit.body.height / 2) - 22 + Math.sin(this.t * 4 + x) * 3;
    g.fillStyle(0xff4d88, 1).fillCircle(x - 6, y - 3, 7).fillCircle(x + 6, y - 3, 7).fillTriangle(x - 13, y, x + 13, y, x, y + 14);
  }
  updateEnemies(dt) {
    const p = this.player, strikes = p.strikes();
    if (!this.friendG) this.friendG = this.add.graphics().setDepth(9);
    this.friendG.clear();
    for (const e of this.enemies) {
      e.update(dt, e.friend ? NOBODY : p);
      if (e.friend) { this.friendStep(e, p, dt); continue; }
      if (e.dead || e.custom) continue;
      e.safe = Math.max(0, (e.safe || 0) - dt);
      const eb = e.bounds(), pb = p.bounds();
      let struck = false;
      let friendHit = false;
      let killHit = false;
      for (const st of strikes) if (!st.hits.has(e) && overlaps(st.rect, eb)) { st.hits.add(e); struck = true; if (st.friend) friendHit = true; if (st.kill) killHit = true; }
      if (struck && friendHit) { this.makeFriend(e); continue; }
      if (struck && killHit) { e.hp = 1; }
      if (struck) { e.takeHit('bump', p.x); if (!e.dead && e.hit.body.allowGravity) e.hit.body.setVelocityY(-200); continue; }
      const inStrike = strikes.some((st) => overlaps(st.rect, eb));
      const hurtBox = new Phaser.Geom.Rectangle(eb.x + 8, eb.y + 8, eb.width - 16, eb.height - 12);
      if (!inStrike && overlaps(pb, e.safe > 0 ? new Phaser.Geom.Rectangle(0, 0, 0, 0) : hurtBox)) {
        const stomp = p.vy > 40 && p.bottom < eb.y + eb.height * 0.55;
        if (stomp && !e.spiky) { e.takeHit('stomp', p.x); SFX.stomp(); p.bounce(p.jumpHeld !== false); }
        else if (e.siren && p.cera > 0) { /* con cera no oyes el canto */ }
        else if (e.onTouch) e.onTouch(p);
        else if (p.hurt(e.x)) { this.burst(p.x, p.y, 6); if (e.halu) this.hallucinate(); }
      }
    }
    // proyectiles del jefe (semillas / bolas de fuego)
    for (const s of this.boss.seeds) if (!s.dead && s.harm !== false && Phaser.Math.Distance.Between(s.x, s.y, p.x, p.y - 10) < (s.r || 52) && Math.abs(s.y - p.y) < 70) {
      s.dead = true; if (p.hurt(s.x)) this.burst(s.x, s.y, 6);
    }
  }

  checkBoss() {
    const b = this.boss, p = this.player;
    if (!this.arena || b.dead) return;
    const cb = b.contactBox();
    if (cb && !(b.hurtT > 0) && overlaps(p.bounds(), cb) && p.hurt(b.x ?? b.px)) this.burst(p.x, p.y, 6);
    if (!b.vulnerable) return;
    const hb = b.hurtBox();
    for (const st of p.strikes()) if (!st.hits.has(b) && overlaps(st.rect, hb)) { st.hits.add(b); if (b.takeHit('strike')) p.invuln = Math.max(p.invuln, 1.2); }
    if (!b.dead && b.vulnerable && overlaps(p.bounds(), hb) && p.vy > 40 && b.takeHit('stomp')) { p.bounce(true); p.invuln = Math.max(p.invuln, 1.2); }
  }

  bossDefeated() {
    this.state = 'bossdead'; SFX.win();
    this.time.delayedCall(1400, () => {
      this.goal = { x: this.L.goalX };
      const f = this.add.image(this.goal.x, GROUND_Y + 10, 'goal').setOrigin(0.15, 1).setDepth(1).setScale(0);
      this.tweens.add({ targets: f, scale: 1, duration: 500, ease: 'Back.easeOut' });
      this.showBanner('¡Lo lograste!', 'Corre hasta la bandera');
    });
  }

  // ───────── fin de partida ─────────
  win() {
    this.state = 'end'; this.player.hit.body.setVelocity(0, 0); stopMusic(); SFX.win();
    const last = this.levelIdx >= LEVELS.length - 1, stats = `Estrellas: ${this.score}/${this.stars.length}   ·   Enemigos: ${this.kills}`;
    for (let i = 0; i < 5; i++) this.time.delayedCall(i * 160, () => this.confetti(this.cameras.main.scrollX + Phaser.Math.Between(200, 760), 120, 20));
    if (last) this.panel('¡Has ganado!', `${stats}\nESPACIO o toca para elegir personaje`, () => { stopMusic(); this.scene.start('Select'); });
    else this.panel(`¡${this.L.name} superado!`, `${stats}\nESPACIO o toca: ¡siguiente nivel!`, () => this.scene.start('Game', { level: this.levelIdx + 1, char: this.charId }));
  }
  lose() {
    this.state = 'end'; stopMusic(); SFX.lose();
    this.panel('¡Oh no!', 'Los tipi-topis se han cansado…\nESPACIO o toca para volver a intentarlo', () => this.restart(), true);
  }
  panel(title, text, next, change) {
    this.add.rectangle(W / 2, H / 2, W, H, 0x2b2b44, 0.55).setScrollFactor(0).setDepth(70);
    this.add.text(W / 2, 190, title, { fontFamily: FONT, fontStyle: 'bold', fontSize: 72, color: '#fff7c2', stroke: '#2b2b44', strokeThickness: 12 }).setOrigin(0.5).setScrollFactor(0).setDepth(71);
    this.add.text(W / 2, 320, text, { fontFamily: FONT, fontStyle: 'bold', fontSize: 28, color: '#fff', stroke: '#2b2b44', strokeThickness: 6, align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(71);
    let bx = null;
    if (change) {
      const g = this.add.graphics().setScrollFactor(0).setDepth(71);
      g.fillStyle(0xfff7c2, 1).fillRoundedRect(W / 2 - 170, 392, 340, 56, 28).lineStyle(5, 0xff5d8f, 1).strokeRoundedRect(W / 2 - 170, 392, 340, 56, 28);
      this.add.text(W / 2, 420, 'Cambiar personaje (C)', { fontFamily: FONT, fontStyle: 'bold', fontSize: 26, color: '#2b2b44' }).setOrigin(0.5).setScrollFactor(0).setDepth(72);
      bx = new Phaser.Geom.Rectangle(W / 2 - 170, 392, 340, 56);
    }
    this.time.delayedCall(900, () => {
      let done = false; const go = () => { if (!done) { done = true; next(); } };
      const swap = () => { if (!done) { done = true; this.registry.set('level', this.levelIdx); this.registry.set('char', this.charId); stopMusic(); this.scene.start('Select'); } };
      this.input.keyboard.once('keydown-SPACE', go);
      if (change) this.input.keyboard.once('keydown-C', swap);
      this.input.on('pointerdown', (ptr) => { if (bx && bx.contains(ptr.x, ptr.y)) swap(); else go(); });
    });
  }
  restart() { this.scene.restart({ level: this.levelIdx, char: this.charId }); }
}
