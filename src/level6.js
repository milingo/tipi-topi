// Nivel 6 – máquinas (futurista). Mismo formato que level1.js.
// puertas: [x] muros que no se pueden saltar · cables: entras por un extremo (a) y sales por el otro (b), pasando por "via" · placas: [x placa, x trampa, ancho trampa]
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [ // [x centro, y superior, ancho]
  [500, 360, 128], [1250, 330, 128], [2000, 350, 128], [2800, 320, 128], [3550, 340, 100], [4650, 330, 128], [5100, 330, 128],
];

export const level6 = {
  id: 6, name: 'Nivel 6', title: 'La fábrica de máquinas', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 5960, zoneW: 1600,
  zones: [20, 21, 22, 23], boss: 'robot', lava: false, sky: false, sun: false, music: 4, tech: true,
  ground: [[0, 1700], [1840, 3050], [3190, 6400]],
  platforms, springs: [],
  puertas: [1000, 2450, 4300],
  cables: [
    { a: [840, GROUND_Y - 30], via: [[840, 130], [1160, 130]], b: [1160, GROUND_Y - 30] },
    { a: [2290, GROUND_Y - 30], via: [[2290, 130], [2610, 130]], b: [2610, GROUND_Y - 30] },
    { a: [4140, GROUND_Y - 30], via: [[4140, 130], [4460, 130]], b: [4460, GROUND_Y - 30] },
  ],
  placas: [[3300, 3500, 200], [4700, 4900, 200]],
  enemies: [
    ['robot', 600, 0, 450, 780],
    ['dron', 1350, 240, 1250, 1500],
    ['robot', 2000, 0, 1900, 2200],
    ['dron', 2800, 230, 2700, 2950],
    ['robot', 3700, 0, 3620, 3780],
    ['dron', 3950, 240, 3850, 4050],
    ['robot', 5000, 0, 4950, 5250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 700, 1400, 1550, 2150, 2900, 3400, 3900, 4600, 5200].map((x) => [x, 410]),
    ...[840, 1000, 1160, 2290, 2450, 2610, 4140, 4300, 4460].map((x) => [x, 90]),
  ],
  checkpoints: [1760, 3110, 4650],
  hints: [
    [330, 230, 'Máquinas…\n¡bip bip!'],
    [900, 160, '¡Una puerta! Toca el extremo del cable:\nte conviertes en electricidad y viajas por él'],
    [3300, 250, 'La placa de presión activa\nuna trampa láser. ¡Cuidado!'],
    [5000, 230, 'El Robot Gigante te espera…'],
  ],
};
