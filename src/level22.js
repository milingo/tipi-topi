// Nivel 22 – La granja: corderos que dan balidos (ondas de sonido), terneras y higos chungos que caen. Jefe: el Albaricoque Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[600, 340, 128], [1050, 300, 128], [1550, 340, 128], [2050, 300, 128], [2550, 340, 128], [3050, 300, 128], [3550, 340, 128], [4050, 300, 128], [4550, 340, 128], [5050, 310, 128]];
export const level22 = {
  id: 22, name: 'Nivel 22', title: 'La granja', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [84, 85, 86, 87], boss: 'albaricoque', lava: false, sky: false, sun: true, music: 0, granja: true,
  ground: [[0, 6400]],
  platforms, springs: [1350, 3300, 4800],
  enemies: [
    ['cordero', 800, 0, 700, 950],
    ['higo', 1200, 0, 0, 0],
    ['ternera', 1700, 0, 1600, 1850],
    ['higo', 2000, 0, 0, 0],
    ['cordero', 2300, 0, 2200, 2450],
    ['higo', 2700, 0, 0, 0],
    ['ternera', 3000, 0, 2900, 3150],
    ['cordero', 3400, 0, 3300, 3550],
    ['higo', 3750, 0, 0, 0],
    ['ternera', 4100, 0, 4000, 4250],
    ['higo', 4450, 0, 0, 0],
    ['cordero', 4700, 0, 4600, 4850],
    ['higo', 5000, 0, 0, 0],
    ['ternera', 5200, 0, 5100, 5350],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡La granja!\nCorderos que balan y terneras'],
    [1000, 250, 'Cuidado con los higos que caen'],
    [5250, 250, 'El Albaricoque Gigante te espera…'],
  ],
};
