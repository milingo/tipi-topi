// Nivel 20 – Mundo raro (basado en el dibujo de Miguel): gusanos, serpiente, oruga, pájaro raro, peludos y columnas rojas que te empujan. Jefe: el Jefe Raro (anillos).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[600, 340, 128], [1050, 300, 128], [1550, 340, 128], [2050, 300, 128], [2550, 340, 128], [3050, 300, 128], [3550, 340, 128], [4050, 300, 128], [4550, 340, 128], [5050, 310, 128]];
export const level20 = {
  id: 20, name: 'Nivel 20', title: 'Mundo raro', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [76, 77, 78, 79], boss: 'raro', lava: false, sky: false, sun: false, music: 3, raro: true,
  ground: [[0, 6400]],
  platforms, springs: [1350, 3300, 4800],
  enemies: [
    ['gusano', 800, 0, 700, 950],
    ['pajaroraro', 1150, 240, 1000, 1300],
    ['empujon', 1500, 0, 0, 0],
    ['serpiente', 1750, 0, 1650, 1850],
    ['oruga', 2200, 0, 2100, 2350],
    ['peludo', 2450, 0, 2350, 2600],
    ['pajaroraro', 2700, 230, 2550, 2850],
    ['empujon', 3000, 0, 0, 0],
    ['gusano', 3350, 0, 3250, 3450],
    ['serpiente', 3800, 0, 3700, 3950],
    ['peludo', 4150, 0, 4050, 4300],
    ['empujon', 4400, 0, 0, 0],
    ['oruga', 4650, 0, 4550, 4800],
    ['pajaroraro', 4950, 230, 4800, 5100],
    ['gusano', 5200, 0, 5100, 5300],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Un mundo muy raro!\nCuidado con los bichos torcidos'],
    [1350, 250, 'Las columnas rojas no se pueden matar:\n¡te empujan!'],
    [5250, 250, 'El Jefe Raro te espera…'],
  ],
};
