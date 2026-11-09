// Nivel 14 – La isla del tesoro. Mismo formato que level1.js. Cangrejos, loros, cañones piratas. Jefe: el Cangrejo Rey.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 340, 128], [1100, 310, 128], [1600, 340, 128], [2100, 300, 128], [2650, 340, 128], [3150, 310, 128], [3700, 340, 128], [4200, 300, 128], [4700, 340, 128], [5200, 310, 128]];

export const level14 = {
  id: 14, name: 'Nivel 14', title: 'La isla del tesoro', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [52, 53, 54, 55], boss: 'cangrejo', lava: false, sky: false, sun: true, music: 4, isla: true,
  ground: [[0, 6400]],
  platforms, springs: [],
  enemies: [
    ['cangrejo', 850, 0, 700, 1000],
    ['loro', 1300, 250, 1150, 1450],
    ['canonpirata', 1850, 0, 1750, 1950],
    ['cangrejo', 2400, 0, 2300, 2550],
    ['loro', 2900, 240, 2750, 3050],
    ['canonpirata', 3350, 0, 3250, 3450],
    ['cangrejo', 3900, 0, 3800, 4050],
    ['loro', 4400, 250, 4250, 4550],
    ['canonpirata', 4750, 0, 4650, 4850],
    ['cangrejo', 5150, 0, 5050, 5250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡La isla del tesoro!\nCuidado con los cangrejos'],
    [1850, 250, 'Los cañones piratas disparan bolas'],
    [5250, 250, 'El Cangrejo Rey te espera…'],
  ],
};
