// Nivel 8 – dentro de un taco. Mismo formato que level1.js.
// cactos: [x] (si los tocas pierdes una vida) · burritos: [x,y,malo?] (curan una vida… o te la quitan) · portales: [x] (taco-transportante: te lleva a un sitio al azar de tpDest)
// sombreros: [x,y] (escudo 9 s) · nachos: [x,y] (pantalla oscura 8 s)
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [
  [500, 360, 128], [1000, 330, 128], [1700, 350, 128], [2520, 390, 80], [2900, 340, 128], [3600, 340, 128], [4420, 390, 80], [4800, 340, 128], [5200, 330, 128],
];

export const level8 = {
  id: 8, name: 'Nivel 8', title: '¡Dentro del taco!', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [28, 29, 30, 31], boss: 'tipicacto', lava: false, sky: false, sun: false, music: 2, taco: true,
  ground: [[0, 2400], [2640, 4300], [4540, 6400]],
  platforms, springs: [],
  cactos: [800, 1250, 1900, 3150, 3500, 4650, 5150],
  burritos: [[600, 415], [2000, 415], [3000, 415, 1], [4000, 415], [4950, 415, 1]],
  portales: [1500, 3800],
  tpDest: [300, 1800, 3000, 4100, 5000, 5640],
  sombreros: [[1300, 410], [3400, 410], [4800, 410]],
  nachos: [[2200, 415], [4200, 415]],
  enemies: [
    ['tacobot', 1100, 0, 1000, 1200],
    ['tacobot', 2100, 0, 2000, 2300],
    ['tacobot', 3300, 0, 3250, 3450],
    ['tacobot', 3950, 0, 3850, 4150],
    ['tacobot', 4900, 0, 4850, 5050],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 700, 1150, 1400, 2300, 2700, 3250, 3750, 4100, 4700, 5300].map((x) => [x, 410]),
  ],
  checkpoints: [1400, 2300, 3150, 4250, 4900],
  hints: [
    [300, 230, '¡Estás dentro de un taco!\nCuidado con los cactus: pinchan'],
    [1250, 260, '¡Los taco-bots disparan láseres!'],
    [1500, 250, 'Taco-transportante:\n¡te lleva a un sitio al azar!'],
    [2200, 300, 'Los nachos oscurecen\nla pantalla… ¡se ve muy poco!'],
    [3000, 300, 'Los burritos curan…\n¡pero algunos quitan una vida!'],
    [5250, 250, 'Tipi-Cacto te espera…'],
  ],
};
