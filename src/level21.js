// Nivel 21 – La selva: culebras, tigres y plantas que dan manotazos y te tiran atrás. Jefe: el Gorila Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[600, 340, 128], [1050, 300, 128], [1550, 340, 128], [2050, 300, 128], [2550, 340, 128], [3050, 300, 128], [3550, 340, 128], [4050, 300, 128], [4550, 340, 128], [5050, 310, 128]];
export const level21 = {
  id: 21, name: 'Nivel 21', title: 'La selva', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [80, 81, 82, 83], boss: 'gorila', lava: false, sky: false, sun: true, music: 1, selva: true,
  ground: [[0, 6400]],
  platforms, springs: [1350, 3300, 4800],
  enemies: [
    ['culebra', 800, 0, 700, 950],
    ['plantamano', 1250, 0, 0, 0],
    ['tigre', 1700, 0, 1600, 1850],
    ['culebra', 2000, 0, 1900, 2150],
    ['plantamano', 2300, 0, 0, 0],
    ['tigre', 2700, 0, 2600, 2850],
    ['plantamano', 3000, 0, 0, 0],
    ['culebra', 3400, 0, 3300, 3550],
    ['tigre', 3800, 0, 3700, 3950],
    ['plantamano', 4200, 0, 0, 0],
    ['culebra', 4500, 0, 4400, 4650],
    ['tigre', 4850, 0, 4750, 5000],
    ['plantamano', 5150, 0, 0, 0],
    ['culebra', 3150, 0, 3050, 3250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡La selva!\nCuidado con culebras y tigres'],
    [1050, 250, 'Las plantas dan manotazos que te tiran atrás'],
    [5250, 250, 'El Gorila Gigante te espera…'],
  ],
};
