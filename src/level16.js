// Nivel 16 – Dulcelandia. Mismo formato que level1.js. 13 enemigos (gominolas, helados, bombones) y jefe: la Tarta Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 340, 128], [1050, 310, 128], [1500, 340, 128], [2000, 300, 128], [2500, 340, 128], [3000, 310, 128], [3500, 340, 128], [4000, 300, 128], [4500, 340, 128], [5000, 310, 128]];

export const level16 = {
  id: 16, name: 'Nivel 16', title: 'Dulcelandia', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [60, 61, 62, 63], boss: 'tarta', lava: false, sky: false, sun: true, music: 0, dulce: true,
  ground: [[0, 6400]],
  platforms, springs: [1300, 3200, 4700],
  enemies: [
    ['gominola', 800, 0, 700, 950],
    ['bombon', 1150, 250, 1000, 1300],
    ['helado', 1700, 0, 1600, 1800],
    ['gominola', 2150, 0, 2050, 2300],
    ['gominola', 2450, 0, 2350, 2600],
    ['bombon', 2800, 240, 2650, 2950],
    ['helado', 3350, 0, 3250, 3450],
    ['gominola', 3750, 0, 3650, 3900],
    ['bombon', 4150, 250, 4000, 4300],
    ['helado', 4600, 0, 4500, 4700],
    ['gominola', 4950, 0, 4850, 5100],
    ['bombon', 5200, 240, 5050, 5350],
    ['gominola', 3000, 0, 2900, 3150],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Dulcelandia!\nCuidado con los dulces malvados'],
    [1700, 250, 'Los helados disparan bolas de nata'],
    [5250, 250, 'La Tarta Gigante te espera…'],
  ],
};
