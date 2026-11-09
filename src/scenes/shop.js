import { FONT } from './menu.js';
import { CHARS } from '../entities.js';
import { getSave, persist } from '../save.js';
import { CATS, ITEMS, HEAD, byId, skinTint } from '../shop.js';
import { unlock, SFX } from '../audio.js';

const W = 960, H = 540, PER = 4;
const RB = [0xff5d8f, 0xffb347, 0xffe14d, 0x7ed957, 0x4cc9f0, 0xb57bff];
const TRAILC = { trail_chicles: [0xff80d0, 0xff5da8], trail_lagrimas: [0x6ab0ff, 0xa8d8ff], trail_ceniza: [0x707078, 0xa0a0a8], trail_mariposas: [0xff9ad0, 0x9ad8ff, 0xffe27a], trail_alemania: [0x202020, 0xd02a2a, 0xffcc00], trail_portugal: [0x1f9a3a, 0xd02a2a, 0xffcc00], trail_japon: [0xffffff, 0xd02a2a], trail_brasil: [0x1f9a3a, 0xffdd00, 0x2a4ad0], trail_arcoiris2: [0xff4a4a, 0xffee40, 0x4a9aff], trail_pizzas: [0xffcd5a, 0xe14b3b], trail_luciernagas: [0xeeff60, 0xb8ff60], trail_slime: [0x6ae04a, 0x9aff6a], trail_neon2: [0xff40ff, 0x40ffff, 0xffff40], trail_rosas: [0xff6a8a, 0xff9ab0], trail_confeti: RB, trail_arco: RB, trail_burbujas: [0x9be8ff, 0xd8f6ff], trail_fuego: [0xff5a1a, 0xffa02a, 0xffe14d], trail_estrellas: [0xffe14d], trail_espana: [0xc60b1e, 0xffc400], trail_corazones: [0xff5d8f, 0xff9ab8], trail_notas: [0x2b2b44, 0x7a4aff], trail_nieve: [0xffffff, 0xd8f0ff], trail_hojas: [0x5ac85a, 0xe8a030, 0xd86a2a], trail_oro: [0xffe27a, 0xffc830], trail_noche: [0x8a6aff, 0x4a90ff], trail_caca: [0x8a5a2a, 0x6a3a18], trail_lava: [0xff2a0a, 0xff7a1a, 0xffc030], trail_mexico: [0x1f9a3a, 0xffffff, 0xd02a2a], trail_francia: [0x2a4ad0, 0xffffff, 0xd02a2a], trail_italia: [0x1f9a3a, 0xffffff, 0xd02a2a], trail_rayos: [0xffee40, 0xffffff], trail_humo: [0x9a9aa8, 0xc0c0cc], trail_flores: [0xff7eb6, 0xffe14d, 0xffffff], trail_galaxia: [0x7a4aff, 0xff5dc8, 0x4acaff], trail_hielo: [0xc8f0ff, 0x80d0ff], trail_lluvia: [0x6ab0ff], trail_pompas: [0xffffff, 0xd8f0ff], trail_fugaces: [0xffffff, 0xfff0a0], trail_purpurina: [0xffe27a, 0xff9ad0, 0x9ad8ff], trail_gominolas: [0xff5d8f, 0xffb347, 0x7ed957, 0x4cc9f0] };
const cxOf = (i) => 135 + (i % PER) * 230, cyOf = (i) => 160 + Math.floor(i / PER) * 112;

export class Shop extends Phaser.Scene {
  constructor() { super('Shop'); }
  create() {
    this.sv = getSave(); this.cat = 0; this.sel = 0; this.page = 0; this.t = 0; this.msg = '';
    this.charId = this.registry.get('char') || 'tipi';
    this.add.image(0, 0, 'sky0').setOrigin(0).setDisplaySize(W, H);
    this.add.image(0, H - 260, 'hf0').setOrigin(0); this.add.image(0, H - 230, 'hn0').setOrigin(0);
    this.add.text(W / 2, 30, 'Tienda de estrellas', { fontFamily: FONT, fontStyle: 'bold', fontSize: 40, color: '#fff7c2', stroke: '#2b2b44', strokeThickness: 8 }).setOrigin(0.5).setDepth(5);
    this.add.image(790, 32, 'star').setScale(1).setDepth(5);
    this.bal = this.add.text(820, 32, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 34, color: '#fff', stroke: '#2b2b44', strokeThickness: 7 }).setOrigin(0, 0.5).setDepth(5);
    // pestañas
    this.tabs = CATS.map((c, i) => {
      const x = 150 + i * 220, g = this.add.graphics().setDepth(2), tx = this.add.text(x, 84, c.name, { fontFamily: FONT, fontStyle: 'bold', fontSize: 22, color: '#2b2b44' }).setOrigin(0.5).setDepth(3);
      const z = this.add.rectangle(x, 84, 190, 44, 0xffffff, 0.001).setInteractive().setDepth(10);
      z.on('pointerdown', () => { unlock(); this.setCat(i); });
      return { x, g, tx };
    });
    // casillas
    this.slots = [];
    for (let i = 0; i < 12; i++) {
      const s = { i, x: cxOf(i), y: cyOf(i), g: this.add.graphics().setDepth(2), obj: [] };
      s.name = this.add.text(s.x, s.y + 22, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 20, color: '#2b2b44' }).setOrigin(0.5).setDepth(4);
      s.price = this.add.text(s.x + 10, s.y + 42, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 20, color: '#2b2b44' }).setOrigin(0.5).setDepth(4);
      s.star = this.add.image(s.x - 34, s.y + 42, 'star').setScale(0.5).setDepth(4);
      s.icon = this.add.image(s.x, s.y - 14, 'star').setDepth(4);
      s.extra = this.add.graphics().setDepth(4);
      s.z = this.add.rectangle(s.x, s.y, 210, 104, 0xffffff, 0.001).setInteractive().setDepth(10);
      s.z.on('pointerdown', () => { unlock(); const g = this.page * 12 + i; if (this.sel === g) this.act(); else { this.sel = g; SFX.click(); } });
      s.z.on('pointerover', () => { const g = this.page * 12 + i; if (this.sel !== g) this.sel = g; });
      this.slots.push(s);
    }
    // vista previa
    this.pg = this.add.graphics().setDepth(2);
    this.pBody = this.add.image(90, 478, CHARS[this.charId].key + '_normal').setScale(0.2).setDepth(5);
    this.pLegs = this.add.graphics().setDepth(4);
    this.pHat = this.add.image(0, 0, 'star').setVisible(false).setDepth(6); this.pWpn = this.add.image(0, 0, 'star').setVisible(false).setDepth(6);
    this.info = this.add.text(480, 462, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 22, color: '#fff', stroke: '#2b2b44', strokeThickness: 6, align: 'center' }).setOrigin(0.5).setDepth(5);
    this.hint = this.add.text(480, 515, '← → ↑ ↓ elegir    Q E  pestaña    ESPACIO comprar / poner / quitar    ESC volver', { fontFamily: FONT, fontStyle: 'bold', fontSize: 16, color: '#fff', stroke: '#2b2b44', strokeThickness: 5 }).setOrigin(0.5).setDepth(5);
    const back = this.add.rectangle(880, 478, 140, 44, 0xffffff, 0.001).setInteractive().setDepth(10);
    this.backG = this.add.graphics().setDepth(2); this.backT = this.add.text(880, 478, 'Volver', { fontFamily: FONT, fontStyle: 'bold', fontSize: 24, color: '#2b2b44' }).setOrigin(0.5).setDepth(3);
    back.on('pointerdown', () => this.leave());
    const k = this.input.keyboard, mv = (d) => { const n = this.items().length; if (n) { this.sel = Phaser.Math.Clamp(this.sel + d, 0, n - 1); SFX.click(); const pg = Math.floor(this.sel / 12); if (pg !== this.page) { this.page = pg; this.refresh(); } } };
    k.on('keydown-LEFT', () => mv(-1)); k.on('keydown-RIGHT', () => mv(1)); k.on('keydown-UP', () => mv(-PER)); k.on('keydown-DOWN', () => mv(PER));
    k.on('keydown-A', () => mv(-1)); k.on('keydown-D', () => mv(1)); k.on('keydown-W', () => mv(-PER)); k.on('keydown-S', () => mv(PER));
    k.on('keydown-Q', () => this.setCat((this.cat + CATS.length - 1) % CATS.length)); k.on('keydown-E', () => this.setCat((this.cat + 1) % CATS.length));
    k.on('keydown-SPACE', () => this.act()); k.on('keydown-ENTER', () => this.act());
    k.on('keydown-ESC', () => this.leave()); k.on('keydown-B', () => this.leave());
    this.cameras.main.fadeIn(250); this.refresh();
  }
  items() { return ITEMS.filter((i) => i.cat === CATS[this.cat].id); }
  setCat(i) { this.cat = i; this.sel = 0; this.page = 0; SFX.click(); this.refresh(); }
  leave() { SFX.click(); this.scene.start('Select'); }
  act() {
    const it = this.items()[this.sel]; if (!it) return;
    const sv = this.sv, owned = !!sv.owned[it.id];
    if (!owned) {
      if (sv.stars < it.price) { SFX.hurt(); this.msg = `Te faltan ${it.price - sv.stars} estrellas`; this.msgT = 2; this.cameras.main.shake(120, 0.004); return; }
      sv.stars -= it.price; sv.owned[it.id] = true; sv.equip[it.cat] = it.id; SFX.checkpoint(); this.msg = `¡${it.name} es tuyo!`; this.msgT = 2;
    } else sv.equip[it.cat] = sv.equip[it.cat] === it.id ? null : it.id;
    if (owned) SFX.star();
    persist(); this.refresh();
  }
  refresh() {
    const sv = this.sv, all = this.items(), items = all.slice(this.page * 12, this.page * 12 + 12), np = Math.ceil(all.length / 12);
    this.bal.setText(String(sv.stars)); if (!this.pgTxt) this.pgTxt = this.add.text(880, 446, '', { fontFamily: FONT, fontStyle: 'bold', fontSize: 15, color: '#fff', stroke: '#2b2b44', strokeThickness: 5 }).setOrigin(0.5).setDepth(5); this.pgTxt.setText(np > 1 ? `página ${this.page + 1}/${np}  (↑ ↓)` : '');
    this.slots.forEach((s) => {
      const it = items[s.i], vis = !!it;
      [s.name, s.price, s.star, s.icon, s.extra, s.g].forEach((o) => o.setVisible(vis)); s.z.input.enabled = vis; s.it = it;
      if (!vis) return;
      s.name.setText(it.name);
      const owned = !!sv.owned[it.id], on = sv.equip[it.cat] === it.id;
      s.star.setVisible(!owned); s.price.setText(owned ? (on ? 'PUESTO' : '¡Tuyo!') : String(it.price)).setX(owned ? s.x : s.x + 10).setColor(owned ? (on ? '#1f9a3a' : '#2b2b44') : sv.stars >= it.price ? '#2b2b44' : '#d03a4a');
      s.extra.clear(); s.icon.clearTint().setAngle(0).setAlpha(1);
      if (it.cat === 'hat' || it.cat === 'weapon') { s.icon.setTexture(it.img); const sc = 54 / Math.max(s.icon.width, s.icon.height); s.icon.setScale(sc).setPosition(s.x, s.y - 14); if (it.cat === 'weapon') s.icon.setAngle(it.id === 'arma_abanico' ? 0 : 35); }
      else if (it.cat === 'skin') { s.icon.setTexture(CHARS[this.charId].key + '_normal').setScale(0.15).setPosition(s.x, s.y - 14); }
      else { s.icon.setVisible(false); s.extra.fillStyle(0x2b2b44, 0.9).fillRoundedRect(s.x - 36, s.y - 38, 72, 40, 12); for (let n = 0; n < 6; n++) s.extra.fillStyle(TRAILC[it.id] ? TRAILC[it.id][n % TRAILC[it.id].length] : 0xffe14d, 1).fillCircle(s.x - 26 + n * 10 + (n % 2) * 2, s.y - 26 + (n % 3) * 9, it.id === 'trail_confeti' ? 4 : 3 + (n % 2)); }
    });
    this.drawPreview();
  }
  drawPreview() {
    const sv = this.sv, C = CHARS[this.charId], b = this.pBody, eq = sv.equip, hat = eq.hat && byId(eq.hat), wp = eq.weapon && byId(eq.weapon), sk = eq.skin && byId(eq.skin);
    b.setPosition(90, 468).setScale(0.2);
    this.skin = sk ? sk.tint : null; this.skin ? b.setTint(skinTint(this.skin, this.t)) : b.clearTint();
    const hd = HEAD[C.key] || [-0.42, 0, 0.95], ax = b.x + hd[1] * b.displayWidth, ay = b.y + hd[0] * b.displayHeight, bw = hd[2] * b.displayWidth;
    this.pHat.setVisible(!!hat); if (hat) this.pHat.setTexture(hat.img).setOrigin(0.5, hat.oy).setPosition(ax, ay + 2 + (hat.dy || 0) * b.displayHeight).setScale(hat.k * bw / this.pHat.width);
    this.pWpn.setVisible(!!wp); if (wp) this.pWpn.setTexture(wp.img).setOrigin(0.5, 0.94).setScale((wp.ws || 0.4) * 0.75).setPosition(b.x + 40, b.y + 40).setRotation(0.35);
    this.pLegs.clear().lineStyle(C.legW * 0.7, 0x2b2b44, 1);
    for (let l = 0; l < 2; l++) { const hx = b.x + (l ? 10 : -10), by = b.y + b.displayHeight * 0.5 - 12; this.pLegs.beginPath().moveTo(hx, by).lineTo(hx, by + 28).strokePath().fillStyle(0x2b2b44, 1).fillCircle(hx, by + 28, 4); }
  }
  update(_, dt) {
    this.t += dt / 1000; this.msgT = Math.max(0, (this.msgT || 0) - dt / 1000);
    this.tabs.forEach((c, i) => { const on = i === this.cat; c.g.clear().fillStyle(on ? 0xfff7c2 : 0xffffff, on ? 0.98 : 0.75).fillRoundedRect(c.x - 95, 62, 190, 44, 20).lineStyle(on ? 6 : 3, on ? 0xff5d8f : 0x2b2b44, 1).strokeRoundedRect(c.x - 95, 62, 190, 44, 20); c.tx.setScale(on ? 1.08 : 1); });
    const sv = this.sv;
    this.slots.forEach((s) => {
      if (!s.it) return;
      const on = this.page * 12 + s.i === this.sel, eq = sv.equip[s.it.cat] === s.it.id, g = s.g.clear(), x0 = s.x - 105, y0 = s.y - 52;
      g.fillStyle(0x2b2b44, 0.25).fillRoundedRect(x0 + 4, y0 + 6, 210, 104, 20);
      g.fillStyle(eq ? 0xd8ffd0 : on ? 0xfff7c2 : 0xffffff, on ? 0.97 : 0.82).fillRoundedRect(x0, y0, 210, 104, 20);
      g.lineStyle(on ? 7 : 3, on ? 0xff5d8f : eq ? 0x1f9a3a : 0x2b2b44, 1).strokeRoundedRect(x0, y0, 210, 104, 20);
      if (s.it.cat === 'skin') { const t = s.it.tint; s.icon.setTint(skinTint(t, this.t)); }
      if (on) s.icon.y = s.y - 14 - Math.abs(Math.sin(this.t * 7)) * 4; else s.icon.y = s.y - 14;
    });
    if (typeof this.skin === 'string') this.pBody.setTint(skinTint(this.skin, this.t));
    const it = this.items()[this.sel];
    this.info.setText(this.msgT > 0 ? this.msg : it ? (it.desc ? it.desc : it.cat === 'hat' ? 'Un gorro para tu tipi-topi' : it.cat === 'skin' ? 'Cambia el color de tu tipi-topi' : it.cat === 'trail' ? 'Deja una estela al correr' : '') : '').setColor(this.msgT > 0 ? '#fff7c2' : '#ffffff');
    this.backG.clear().fillStyle(0xffffff, 0.85).fillRoundedRect(810, 456, 140, 44, 20).lineStyle(3, 0x2b2b44, 1).strokeRoundedRect(810, 456, 140, 44, 20);
  }
}
