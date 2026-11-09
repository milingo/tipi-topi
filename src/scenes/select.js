import { FONT } from './menu.js';
import { CHARS } from '../entities.js';
import { LEVELS } from '../levels.js';
import { unlock, SFX } from '../audio.js';
import { getSave } from '../save.js';

const W = 960, H = 540;
const LV_NAMES = ['Prado', 'Lava', 'Nubes', 'Slime', 'Setas', 'Máq.', 'Odisea', 'Taco', 'Egipto', 'Terror', 'Mar', 'Luna', 'Jardín', 'Isla', 'Pedos', 'Dulce', 'Circo', 'París', 'Bacter.', 'Raro', 'Selva', 'Granja', 'Colores', 'Rebusc.', 'Tecno', 'Navidad', 'Lenguas', 'Fútbol'].map((n, i) => `${i + 1}
${n}`);
const CARDS = [
  { id: 'tipi', text: 'El de siempre. Golpea con el ojo.', tip: 'ESPACIO: ¡ojetazo!' },
  { id: 'abuelo', text: 'Lento, pero… ¡con bastón!', tip: 'ESPACIO: ¡bastonazo!' },
  { id: 'astro', text: 'Del espacio, con casco y antena.', tip: 'ESPACIO: ¡lanza quesos que botan!' },
  { id: 'mariachi', text: 'Con sombrero, bigote y mucha música.', tip: 'ESPACIO: ¡lanza notas musicales!' },
  { id: 'pirata', text: 'Un tipi-topi del mar, con sable.', tip: 'ESPACIO: ¡sablazo!' },
  { id: 'caquita', text: 'Pequeña, marrón y muy graciosa.', tip: 'ESPACIO: ¡caca que hace amigos! · Aire: pedo cohete · 3 saltos' },
  { id: 'cacazilla', text: 'Monstruo de púas… ¡y muy apestoso!', tip: 'ESPACIO: ¡caca que MATA! · En el aire: caca que hace amigos' },
  { id: 'bacteria', text: 'Verde, con pinchos… ¡y un ojo enorme!', tip: 'ESPACIO: ¡escupe pinchos que atraviesan!' },
  { id: 'unicornio', text: 'Un tipi-topi unicornio con melena arcoíris.', tip: 'ESPACIO: ¡lanza tacos que rebotan!' },
  { id: 'ninja', text: 'Rápido y silencioso, con su cinta negra.', tip: 'ESPACIO: ¡lanza espadas!' },
  { id: 'chupa', text: 'Rojo, con una lengua larguísima.', tip: 'ESPACIO: ¡lenguetazo!' },
  { id: 'ojitos', text: 'Cabeza redonda llena de ojitos, con lengua y baba.', tip: 'ESPACIO: ¡lanza ojos con baba alrededor!' },
  { id: 'oso', text: 'Un oso pirado: despeinado, con abejas y un ojo enorme.', tip: 'ESPACIO: ¡lanza tarros de miel que hacen charco!' },
  { id: 'monalisa', text: 'Sonrisa misteriosa… ¡y un marco muy afilado!', tip: 'ESPACIO: ¡lanza su marco, que vuelve!' },
  { id: 'bebe', text: 'Pequeño y rápido. ¡Muerde y se tira pedos!', tip: 'ESPACIO: mordisco · ESPACIO en el aire: ¡pedo cohete!' },
  { id: 'cucurella', text: 'Rizos y puntería.', tip: 'ESPACIO: ¡lanza una paella! · En el aire: ¡chuta un balón!' },
  { id: 'adulto', text: 'Muy elegante y siempre con su café.', tip: 'ESPACIO: ¡lanza el café en arco!' },
  { id: 'adolescente', text: 'No levanta la vista del móvil.', tip: 'ESPACIO: ¡lanza el móvil… y vuelve!' },
  { id: 'perro', text: 'Rápido, baboso y cariñoso.', tip: 'ESPACIO: ¡lametón!' },
  { id: 'gato', text: 'Ágil: ¡salta dos veces en el aire!', tip: 'ESPACIO: ¡arañazo rápido!' },
  { id: 'panda', text: 'Redondo y fuerte.', tip: 'ESPACIO: ¡se hace una bola y embiste!' },
  { id: 'futurista', text: 'Del año 3000, con visor y antena.', tip: 'ESPACIO: ¡rayo láser!' },
  { id: 'slimey', text: 'Blandito, verde y pegajoso.', tip: 'ESPACIO: ¡lanza bolas de slime que botan!' },
  { id: 'cientifico', text: 'Pelo loco y muchas pociones.', tip: 'ESPACIO: ¡lanza una poción que deja un charco!' },
  { id: 'granny', text: 'Dulce… hasta que coge el bolso.', tip: 'ESPACIO: ¡bolsazo!' },
];
const N = CARDS.length, PER = 4, PAGES = Math.ceil(N / PER), CW = 215, CH = 250;
const cx = (i) => 130 + (i % PER) * 233, CY = 195;

export class Select extends Phaser.Scene {
  constructor() { super('Select'); }
  create() {
    this.sel = Math.max(0, CARDS.findIndex((c) => c.id === (this.registry.get('char') || 'tipi')));
    this.ready = false; this.t = 0; this.done = false;
    this.lvl = Phaser.Math.Clamp(this.registry.get('level') ?? Math.max(0, Number(new URLSearchParams(location.search).get('level') || 1) - 1), 0, LEVELS.length - 1);
    this.add.image(0, 0, 'sky1').setOrigin(0).setDisplaySize(W, H);
    this.add.image(0, H - 260, 'hf1').setOrigin(0); this.add.image(0, H - 230, 'hn1').setOrigin(0);
    for (let i = 0; i < 3; i++) {
      const c = this.add.image(Phaser.Math.Between(0, W), Phaser.Math.Between(20, 90), 'cloud').setScale(Phaser.Math.FloatBetween(0.5, 0.9));
      this.tweens.add({ targets: c, x: c.x + 100, duration: Phaser.Math.Between(9000, 14000), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    this.add.text(W / 2, 30, 'Elige tu tipi-topi', { fontFamily: FONT, fontStyle: 'bold', fontSize: 40, color: '#fff7c2', stroke: '#2b2b44', strokeThickness: 8 }).setOrigin(0.5);

    this.add.image(34, 34, 'star').setDepth(5);
    this.add.text(58, 34, String(getSave().stars), { fontFamily: FONT, fontStyle: 'bold', fontSize: 30, color: '#fff', stroke: '#2b2b44', strokeThickness: 7 }).setOrigin(0, 0.5).setDepth(5);
    const sg = this.add.graphics().setDepth(4); sg.fillStyle(0xfff7c2, 1).fillRoundedRect(778, 12, 166, 44, 22).lineStyle(4, 0xff5d8f, 1).strokeRoundedRect(778, 12, 166, 44, 22);
    this.add.text(861, 34, 'Tienda (T)', { fontFamily: FONT, fontStyle: 'bold', fontSize: 24, color: '#2b2b44' }).setOrigin(0.5).setDepth(5);
    const sz = this.add.rectangle(861, 34, 166, 44, 0xffffff, 0.001).setInteractive().setDepth(10); sz.on('pointerdown', () => { if (this.ready) this.shop(); });
    this.cards = CARDS.map((cd, i) => {
      const x = cx(i), y = CY, ch = CHARS[cd.id];
      const c = { cd, ch, x, y, g: this.add.graphics().setDepth(1) };
      c.img = this.add.image(x, y - 40, ch.key + '_normal').setScale(0.3).setDepth(3);
      c.legs = this.add.graphics().setDepth(2);
      c.tool = cd.id === 'abuelo' ? this.add.image(x + 56, y - 10, 'baston').setScale(0.5).setDepth(4) : cd.id === 'granny' ? this.add.image(x + 56, y - 10, 'bolso').setScale(0.42).setDepth(4) : cd.id === 'pirata' ? this.add.image(x + 56, y - 10, 'sable').setScale(0.5).setDepth(4) : null;
      c.name = this.add.text(x, y + 100, ch.name, { fontFamily: FONT, fontStyle: 'bold', fontSize: 28, color: '#2b2b44' }).setOrigin(0.5).setDepth(3);
      c.z = this.add.rectangle(x, y, CW, CH, 0xffffff, 0.001).setInteractive().setDepth(10);
      c.z.on('pointerdown', () => { if (!this.ready) return; unlock(); if (this.sel === i) this.confirm(); else this.choose(i); });
      c.z.on('pointerover', () => { if (this.ready && this.sel !== i) this.choose(i); });
      return c;
    });
    this.desc = this.add.text(W / 2, 398, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 21, color: '#fff', stroke: '#2b2b44', strokeThickness: 6, align: 'center' }).setOrigin(0.5).setDepth(3);
    // páginas
    this.pageG = this.add.graphics().setDepth(3);
    const arrow = (x, d) => { const z = this.add.rectangle(x, 346, 70, 44, 0xffffff, 0.001).setInteractive().setDepth(10); z.on('pointerdown', () => { if (this.ready) this.pageStep(d); }); };
    arrow(360, -1); arrow(600, 1);
    // selector de nivel
    this.add.text(28, 474, 'Nivel:', { fontFamily: FONT, fontStyle: 'bold', fontSize: 14, color: '#fff', stroke: '#2b2b44', strokeThickness: 5 }).setOrigin(0.5).setDepth(3);
    this.chips = LV_NAMES.slice(0, LEVELS.length).map((nm, i) => {
      const x = 60 + i * 31.2, g = this.add.graphics().setDepth(2);
      const tx = this.add.text(x, 474, nm, { fontFamily: FONT, fontStyle: 'bold', fontSize: 8, color: '#2b2b44', align: 'center' }).setOrigin(0.5).setDepth(3);
      const z = this.add.rectangle(x, 474, 31, 46, 0xffffff, 0.001).setInteractive().setDepth(10);
      z.on('pointerdown', () => { if (this.ready) { this.lvl = i; unlock(); SFX.click(); } });
      return { x, g, tx };
    });
    this.hint = this.add.text(W / 2, 521, '← →  personaje    Q E  página    ↑ ↓  nivel    T  tienda    ESPACIO o toca otra vez: ¡jugar!', { fontFamily: FONT, fontStyle: 'bold', fontSize: 16, color: '#fff', stroke: '#2b2b44', strokeThickness: 5 }).setOrigin(0.5);
    this.tweens.add({ targets: this.hint, alpha: 0.5, duration: 700, yoyo: true, repeat: -1 });

    const k = this.input.keyboard, L = () => this.ready && this.choose((this.sel + N - 1) % N), R = () => this.ready && this.choose((this.sel + 1) % N);
    k.on('keydown-LEFT', L); k.on('keydown-A', L); k.on('keydown-RIGHT', R); k.on('keydown-D', R);
    k.on('keydown-Q', () => this.ready && this.pageStep(-1)); k.on('keydown-E', () => this.ready && this.pageStep(1));
    k.on('keydown-PAGEUP', () => this.ready && this.pageStep(-1)); k.on('keydown-PAGEDOWN', () => this.ready && this.pageStep(1));
    k.on('keydown-UP', () => this.ready && this.lvlStep(-1)); k.on('keydown-W', () => this.ready && this.lvlStep(-1));
    k.on('keydown-DOWN', () => this.ready && this.lvlStep(1)); k.on('keydown-S', () => this.ready && this.lvlStep(1));
    k.on('keydown-T', () => this.ready && this.shop());
    k.on('keydown-SPACE', () => this.ready && this.confirm()); k.on('keydown-ENTER', () => this.ready && this.confirm());
    this.time.delayedCall(350, () => { this.ready = true; });
    this.cameras.main.fadeIn(250);
  }
  get page() { return Math.floor(this.sel / PER); }
  pageStep(d) { this.sel = ((this.page + d + PAGES) % PAGES) * PER; unlock(); SFX.click(); }
  lvlStep(d) { this.lvl = (this.lvl + d + LEVELS.length) % LEVELS.length; unlock(); SFX.click(); }
  shop() { if (this.done) return; this.done = true; this.registry.set('char', CARDS[this.sel].id); this.registry.set('level', this.lvl); unlock(); SFX.click(); this.scene.start('Shop'); }
  choose(i) { this.sel = i; unlock(); SFX.click(); }
  confirm() {
    if (this.done) return; this.done = true;
    const id = CARDS[this.sel].id; this.registry.set('char', id); this.registry.set('level', this.lvl); unlock(); SFX.checkpoint();
    this.tweens.add({ targets: this.cards[this.sel].img, scale: 0.42, angle: 360, duration: 350 });
    this.cameras.main.fadeOut(450);
    this.time.delayedCall(480, () => this.scene.start('Game', { level: this.lvl, char: id }));
  }
  update(_, dt) {
    this.t += dt / 1000;
    this.desc.setText(CARDS[this.sel].text + '\n' + CARDS[this.sel].tip);
    this.cards.forEach((c, i) => {
      const vis = Math.floor(i / PER) === this.page;
      [c.g, c.img, c.legs, c.name, c.tool].forEach((o) => o && o.setVisible(vis)); c.z.input.enabled = vis;
      if (!vis) return;
      const on = i === this.sel, bob = on ? Math.abs(Math.sin(this.t * 7)) * 8 : 0, sc = on ? 0.31 : 0.275;
      const g = c.g.clear(), x0 = c.x - CW / 2, y0 = c.y - CH / 2;
      g.fillStyle(0x2b2b44, 0.25).fillRoundedRect(x0 + 4, y0 + 6, CW, CH, 26);
      g.fillStyle(on ? 0xfff7c2 : 0xffffff, on ? 0.97 : 0.8).fillRoundedRect(x0, y0, CW, CH, 26);
      g.lineStyle(on ? 7 : 3, on ? 0xff5d8f : 0x2b2b44, 1).strokeRoundedRect(x0, y0, CW, CH, 26);
      c.img.setPosition(c.x, c.y - 42 - bob).setScale(sc);
      c.img.setTexture(c.ch.key + (on && Math.floor(this.t * 0.9 + i) % 3 === 0 && (this.t * 10) % 1 > 0.5 ? '_closed' : '_normal'));
      const baseY = c.y - 42 + c.img.displayHeight * 0.5 - 28;
      c.legs.clear().lineStyle(c.ch.legW, 0x2b2b44, 1);
      for (let l = 0; l < 2; l++) {
        const hx = c.x + (l ? 16 : -16), fx = hx + (on ? Math.sin(this.t * 9 + l * 3) * 7 : 0), fy = baseY + 38 - (on ? Math.max(0, Math.cos(this.t * 9 + l * 3)) * 7 : 0);
        c.legs.beginPath().moveTo(hx, baseY - bob).lineTo(fx, fy).strokePath().fillStyle(0x2b2b44, 1).fillCircle(fx, fy, 6);
      }
      if (c.tool) c.tool.setPosition(c.x + 62, baseY + 6 - bob * 0.3).setRotation(on ? Math.sin(this.t * 4) * 0.12 : 0);
      c.name.setScale(on ? 1.1 : 1);
    });
    // indicador de páginas
    const pg = this.pageG.clear();
    pg.fillStyle(0xffffff, 0.9).fillTriangle(372, 346, 392, 334, 392, 358).fillTriangle(588, 346, 568, 334, 568, 358);
    pg.lineStyle(3, 0x2b2b44, 1).strokeTriangle(372, 346, 392, 334, 392, 358).strokeTriangle(588, 346, 568, 334, 568, 358);
    for (let i = 0; i < PAGES; i++) { const x = 480 + (i - (PAGES - 1) / 2) * 26; pg.fillStyle(i === this.page ? 0xff5d8f : 0xffffff, 1).fillCircle(x, 346, 8).lineStyle(3, 0x2b2b44, 1).strokeCircle(x, 346, 8); }
    this.chips.forEach((c, i) => {
      const on = i === this.lvl;
      c.g.clear().fillStyle(on ? 0xfff7c2 : 0xffffff, on ? 0.98 : 0.75).fillRoundedRect(c.x - 18.5, 451, 37, 46, 18).lineStyle(on ? 6 : 3, on ? 0xff5d8f : 0x2b2b44, 1).strokeRoundedRect(c.x - 18.5, 451, 37, 46, 18);
      c.tx.setScale(on ? 1.08 : 1);
    });
  }
}
