// Nivel 18 – París. Turistas, mimos y palomas; escaleras de la Torre Eiffel; barcos por el Sena; jefe: Monsieur Gourmet (¡no te pongas gordo!).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const stairs = [[1990, 410, 120], [2120, 350, 120], [2250, 290, 120], [2380, 230, 120], [2510, 170, 120], [2640, 230, 120], [2770, 290, 120], [2900, 350, 120], [3030, 410, 120]];
const platforms = [[600, 350, 128], [1100, 320, 128], [1500, 350, 128], ...stairs, [3350, 330, 128], [4000, 400, 90], [4950, 330, 128], [5200, 300, 128]];

export const level18 = {
  id: 18, name: 'Nivel 18', title: 'París', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [68, 69, 70, 71], boss: 'gourmet', lava: false, sky: false, sun: true, music: 1, paris: true, sena: true,
  ground: [[0, 1850], [3050, 3700], [4650, 6400]],
  boats: [[3880, 60, 1.1, 0], [4175, 60, 1.1, 2.1], [4470, 60, 1.1, 4.2]],
  platforms, springs: [1300, 3250, 5000],
  enemies: [
    ['turista', 800, 0, 700, 950],
    ['paloma', 1150, 240, 1000, 1300],
    ['mimo', 1650, 0, 1550, 1750],
    ['turista', 2000, 0, 1990, 2100],
    ['paloma', 2500, 120, 2350, 2700],
    ['turista', 3150, 0, 3080, 3300],
    ['mimo', 3450, 0, 3350, 3600],
    ['paloma', 4180, 250, 3950, 4450],
    ['turista', 4800, 0, 4700, 4950],
    ['mimo', 5050, 0, 4950, 5200],
    ['paloma', 5250, 240, 5100, 5350],
    ['turista', 3300, 0, 3150, 3450],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1300, 1800, 3200, 3600, 4800, 5400].map((x) => [x, 410]),
    ...[3880, 4175, 4470].map((x) => [x, 400]),
  ],
  checkpoints: [1600, 3100, 4700],
  hints: [
    [300, 230, '¡Bienvenido a París!\nCuidado con los turistas y sus flashes'],
    [1750, 250, '¡Sube las escaleras de la Torre Eiffel!'],
    [3400, 250, '¡Salta a los barcos del Sena!'],
    [5250, 250, 'Monsieur Gourmet te espera…\n¡Come, pero sin ponerte gordo!'],
  ],
};
