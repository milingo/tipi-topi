// Nivel 2 – lava. Mismo formato que level1.js.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6240;

const platforms = [ // [x centro, y superior, ancho]
  [500, 370, 128], [1000, 320, 128], [1450, 350, 128], [1900, 290, 128], [2350, 350, 128], [2850, 300, 160],
  [3250, 350, 128], [3650, 300, 128], [4150, 350, 128], [4550, 300, 128], [4900, 360, 128],
  [5700, 300, 140], [6150, 300, 140], // plataformas de la arena (por encima de la cabeza del toro)
];
const springs = [2380, 3500, 4480];

export const level2 = {
  id: 2, name: 'Nivel 2', title: 'La lava loca', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6000, zoneW: 1600,
  zones: [4, 5, 6, 7], boss: 'toro', lava: true, sun: false, music: 1,
  // tres agujeros de lava (cada uno con su piraña)
  ground: [[0, 1150], [1290, 2500], [2640, 3900], [4040, 6400]],
  platforms,
  springs,
  // [tipo, x, _, a, b]: bomba/fuego patrullan de a a b; piraña: x = centro del agujero, a = retraso en segundos
  enemies: [
    ['bomba', 650, 0, 450, 900],
    ['pirana', 1220, 0, 0, 0],
    ['fuego', 1800, 0, 1600, 2050],
    ['bomba', 2150, 0, 1950, 2400],
    ['pirana', 2570, 0, 0, 0],
    ['pirana', 2570, 0, 1.1, 0],
    ['bomba', 3100, 0, 2900, 3400],
    ['fuego', 3550, 0, 3350, 3800],
    ['pirana', 3970, 0, 0.5, 0],
    ['bomba', 4400, 0, 4200, 4650],
    ['fuego', 4800, 0, 4650, 5200],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 340, 800, 1700, 2200, 2800, 3300, 4300, 5000, 5200].map((x) => [x, 410]),
    ...[1220, 2570, 3970].map((x) => [x, 400]),
    ...springs.flatMap((x) => [[x - 40, 120], [x, 90], [x + 40, 120]]),
  ],
  checkpoints: [2700, 4100],
  hints: [
    [330, 230, '¡Bombas con patas!\nGolpéalas o corre antes de que exploten'],
    [1000, 200, '¡Pirañas de lava!\nPasa cuando se escondan'],
    [4950, 230, 'El toro ígneo te espera…'],
  ],
};
