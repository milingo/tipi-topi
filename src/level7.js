// Nivel 7 – la Odisea. Mismo formato que level1.js.
// caribdis: [x centro, ancho del hueco] · ceras: [x,y] (protegen de las sirenas) · estaca: [x,y] (única arma contra Polifemo)
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [ // [x centro, y superior, ancho]
  [900, 350, 128], [1500, 340, 128], [2070, 385, 96], [2480, 350, 128], [3150, 340, 128], [3450, 330, 110], [4160, 385, 96], [4650, 340, 128], [5050, 330, 128],
];

export const level7 = {
  id: 7, name: 'Nivel 7', title: 'La Odisea', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [24, 25, 26, 27], boss: 'polifemo', lava: false, sky: false, sun: true, music: 5, sea: true,
  ground: [[0, 1920], [2220, 4010], [4310, 6400]],
  platforms, springs: [],
  caribdis: [[2070, 300], [4160, 300]],
  ceras: [[450, 415], [2400, 415], [3350, 415]],
  estaca: [5230, 400],
  enemies: [
    ['sirena', 780, 215, 600, 1000],
    ['oveja', 1450, 0, 1350, 1560],
    ['sirena', 1250, 200, 1100, 1500],
    ['sirena', 1700, 230, 1560, 1850],
    ['escila', 2800, 0, 0, 0],
    ['sirena', 3450, 210, 3300, 3600],
    ['circe', 3800, 0, 3650, 3950],
    ['sirena', 4500, 220, 4380, 4760],
    ['oveja', 4600, 0, 4450, 4700],
    ['oveja', 5000, 0, 4900, 5200],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 650, 1150, 1300, 1750, 2350, 2600, 2650, 3300, 3550, 3900, 4450, 4800, 5400].map((x) => [x, 410]),
    [2700, 330], [2800, 300], [2900, 330],
  ],
  checkpoints: [1800, 2420, 3250, 3950, 4900],
  hints: [
    [300, 230, '¡La Odisea!\nTipi-Topi quiere volver a casa…'],
    [450, 330, '¡Coge la cera!\nTapa tus oídos del canto de las sirenas'],
    [1860, 250, '¡Caribdis!\nEl remolino te arrastra: ¡salta rápido!'],
    [2800, 120, 'Escila tiene 12 cabezas…\n¡pasa rápido! (puedes golpearlas)'],
    [3650, 230, '¡Circe tiene 10 vidas!\nSi la tocas te convierte en cerdo'],
    [5230, 270, '¡Una estaca de madera!\nPolifemo te espera…'],
  ],
};
