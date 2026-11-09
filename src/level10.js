// Nivel 10 – Halloween. Mismo formato que level1.js.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 360, 128], [1200, 330, 128], [1900, 350, 128], [2600, 340, 128], [3300, 330, 128], [3900, 350, 128], [4500, 340, 128], [5000, 330, 128]];

export const level10 = {
  id: 10, name: 'Nivel 10', title: 'Halloween', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [36, 37, 38, 39], boss: 'vampiro', lava: false, sky: false, sun: false, music: 7, halloween: true, sangre: true,
  ground: [[0, 6400]],
  platforms, springs: [],
  enemies: [
    ['arana', 800, 0, 650, 950],
    ['minivamp', 1100, 210, 950, 1300],
    ['calabaza', 1500, 0, 1400, 1650],
    ['arana', 2000, 0, 1850, 2150],
    ['tropix_vampiro', 2350, 230, 2200, 2500],
    ['minivamp', 2800, 210, 2650, 2950],
    ['calabaza', 3100, 0, 3000, 3250],
    ['arana', 3500, 0, 3400, 3650],
    ['minivamp', 4000, 210, 3850, 4150],
    ['calabaza', 4400, 0, 4300, 4550],
    ['tropix_vampiro', 4700, 230, 4550, 4850],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 900, 1400, 1700, 2250, 2900, 3600, 4200, 4800, 5300].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3800, 4900],
  hints: [
    [300, 230, '¡Halloween!\nCae sangre del cielo…'],
    [1200, 260, 'Las calabazas te persiguen\ny explotan'],
    [2800, 250, 'Los mini vampiros muerden:\n¡5 segundos de lentitud!'],
    [5250, 250, 'El Vampiro te espera…'],
  ],
};
