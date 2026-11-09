// Nivel 27 – LENGUAS Y BABAS (idea de los niños): las lenguas y las babas te quitan una vida, y los tipi-topis malos también. Jefe final: la Lengua Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[550, 340, 128], [900, 300, 128], [1300, 340, 128], [1700, 300, 128], [2100, 340, 128], [2500, 300, 128], [2900, 340, 128], [3300, 300, 128], [3700, 340, 128], [4100, 300, 128], [4500, 340, 128], [4900, 300, 128], [5250, 340, 128]];
export const level27 = {
  id: 27, name: 'Nivel 27', title: 'Lenguas y babas', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [107, 108, 109, 110], boss: 'lengua', lava: false, sky: false, sun: false, music: 1, lenguas: true,
  ground: [[0, 6400]],
  platforms, springs: [1500, 3100, 4700],
  enemies: [
    ['lengua', 750, 0, 0, 0],
    ['baba', 1000, 0, 0, 0],
    ['tipimalo', 1250, 0, 1150, 1400],
    ['babosa', 1500, 0, 1400, 1650],
    ['lengua', 1800, 0, 0, 0],
    ['bocavol', 2050, 230, 1950, 2250],
    ['baba', 2300, 0, 0, 0],
    ['lengua', 2550, 0, 0, 0],
    ['tipimalo', 2800, 0, 2700, 2950],
    ['babosa', 3050, 0, 2950, 3200],
    ['baba', 3300, 0, 0, 0],
    ['lengua', 3550, 0, 0, 0],
    ['bocavol', 3800, 230, 3700, 4000],
    ['tipimalo', 4050, 0, 3950, 4200],
    ['baba', 4300, 0, 0, 0],
    ['lengua', 4550, 0, 0, 0],
    ['babosa', 4800, 0, 4700, 4950],
    ['tipimalo', 5050, 0, 4950, 5150],
    ['lengua', 5300, 0, 0, 0],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1400, 2000, 2600, 3200, 3800, 4400, 5000, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Lenguas y babas!\nSi te tocan, pierdes una vida'],
    [900, 250, 'Cuidado con las babas que caen'],
    [5250, 250, 'La Lengua Gigante te espera…'],
  ],
};
