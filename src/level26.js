// Nivel 26 – NAVIDAD: muñecos de nieve, renos, elfos, cascanueces, bolas, galletas y regalos trampa. Jefe: Papá Noel Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[550, 340, 128], [900, 300, 128], [1300, 340, 128], [1700, 300, 128], [2100, 340, 128], [2500, 300, 128], [2900, 340, 128], [3300, 300, 128], [3700, 340, 128], [4100, 300, 128], [4500, 340, 128], [4900, 300, 128], [5250, 340, 128]];
export const level26 = {
  id: 26, name: 'Nivel 26', title: 'Navidad', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [103, 104, 105, 106], boss: 'santa', lava: false, sky: false, sun: false, music: 2, navidad: true, nieve: true,
  ground: [[0, 6400]],
  platforms, springs: [1500, 3100, 4700],
  enemies: [
    ['muneco', 750, 0, 650, 900],
    ['regalo', 1000, 0, 0, 0],
    ['reno', 1250, 0, 1150, 1400],
    ['bola', 1550, 230, 1450, 1750],
    ['elfo', 1850, 0, 1750, 2000],
    ['galleta', 2100, 0, 2000, 2250],
    ['regalo', 2350, 0, 0, 0],
    ['cascanueces', 2650, 0, 2550, 2800],
    ['estrellanav', 2900, 230, 2800, 3050],
    ['muneco', 3150, 0, 3050, 3300],
    ['reno', 3400, 0, 3300, 3550],
    ['regalo', 3650, 0, 0, 0],
    ['elfo', 3900, 0, 3800, 4050],
    ['bola', 4150, 230, 4050, 4350],
    ['galleta', 4400, 0, 4300, 4500],
    ['cascanueces', 4600, 0, 4500, 4750],
    ['regalo', 4850, 0, 0, 0],
    ['estrellanav', 5050, 230, 4950, 5150],
    ['muneco', 5250, 0, 5150, 5350],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1400, 2000, 2600, 3200, 3800, 4400, 5000, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Feliz Navidad!\nMuñecos de nieve, renos y elfos'],
    [900, 250, 'Cuidado: ¡hay regalos que muerden!'],
    [5250, 250, 'Papá Noel Gigante te espera…'],
  ],
};
