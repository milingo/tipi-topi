import { Boot, Menu } from './scenes/menu.js';
import { Select } from './scenes/select.js';
import { Game } from './scenes/game.js';
import { Shop } from './scenes/shop.js';

const config = {
  type: new URLSearchParams(location.search).has('canvas') ? Phaser.CANVAS : Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#7ec8f2',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  physics: { default: 'arcade', arcade: { gravity: { y: 1700 }, debug: new URLSearchParams(location.search).has('debug') } },
  input: { activePointers: 4 },
  scene: [Boot, Menu, Select, Shop, Game],
};
// Carga la fuente opcional assets/fonts/tipi.ttf antes de arrancar (si no existe, se ignora)
const start = () => { window.__game = new Phaser.Game(config); };
const loadFont = document.fonts && document.fonts.load ? Promise.race([document.fonts.load('bold 32px Tipi'), new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
loadFont.catch(() => {}).then(start);

if ('serviceWorker' in navigator && location.protocol.startsWith('http') && location.hostname !== 'localhost') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
