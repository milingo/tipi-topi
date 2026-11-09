// Nivel 13 – El jardín. Mismo formato que level1.js. Insectos gigantes y plantas que te convierten en maceta 4 s. Jefe: la Enredadera.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 340, 128], [1050, 310, 128], [1550, 340, 128], [2050, 300, 128], [2550, 340, 128], [3100, 310, 128], [3650, 340, 128], [4150, 300, 128], [4650, 340, 128], [5150, 310, 128]];

export const level13 = {
  id: 13, name: 'Nivel 13', title: 'El jardín', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [48, 49, 50, 51], boss: 'enredadera', lava: false, sky: false, sun: true, music: 2, jardin: true,
  ground: [[0, 6400]],
  platforms, springs: [],
  enemies: [
    ['mariquita', 850, 0, 700, 1000],
    ['planta', 1300, 0, 1250, 1350],
    ['escarabajo', 1800, 0, 1700, 1950],
    ['abeja', 2300, 250, 2150, 2450],
    ['planta', 2800, 0, 2750, 2850],
    ['mariquita', 3300, 0, 3200, 3450],
    ['escarabajo', 3600, 0, 3500, 3750],
    ['planta', 4000, 0, 3950, 4050],
    ['abeja', 4400, 250, 4250, 4550],
    ['escarabajo', 4800, 0, 4700, 4950],
    ['planta', 5250, 0, 5200, 5300],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡El jardín!\nCuidado con los bichos gigantes'],
    [1100, 240, 'Las plantas te convierten en maceta\n4 segundos: no puedes atacar'],
    [5250, 250, 'La Enredadera te espera…'],
  ],
};
