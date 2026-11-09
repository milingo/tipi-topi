// Nivel 17 – El circo loco. Mismo formato que level1.js. 13 enemigos (payasitos, globos, malabaristas) y jefe: el Payaso Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 340, 128], [1050, 300, 128], [1550, 340, 128], [2050, 300, 128], [2550, 340, 128], [3050, 300, 128], [3550, 340, 128], [4050, 300, 128], [4550, 340, 128], [5050, 310, 128]];

export const level17 = {
  id: 17, name: 'Nivel 17', title: 'El circo loco', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [64, 65, 66, 67], boss: 'payaso', lava: false, sky: false, sun: false, music: 3, circo: true,
  ground: [[0, 6400]],
  platforms, springs: [1350, 3300, 4800],
  enemies: [
    ['payasito', 800, 0, 700, 950],
    ['globo', 1150, 240, 1000, 1300],
    ['malabarista', 1750, 0, 1650, 1850],
    ['payasito', 2200, 0, 2100, 2350],
    ['globo', 2500, 230, 2350, 2650],
    ['payasito', 2800, 0, 2700, 2950],
    ['malabarista', 3350, 0, 3250, 3450],
    ['globo', 3800, 240, 3650, 3950],
    ['payasito', 4150, 0, 4050, 4300],
    ['malabarista', 4600, 0, 4500, 4700],
    ['globo', 4950, 230, 4800, 5100],
    ['payasito', 5150, 0, 5050, 5300],
    ['payasito', 3000, 0, 2900, 3150],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡El circo loco!\nCuidado con los payasos'],
    [1750, 250, 'Los malabaristas lanzan pelotas explosivas'],
    [5250, 250, 'El Payaso Gigante te espera…'],
  ],
};
