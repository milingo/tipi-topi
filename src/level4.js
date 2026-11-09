// Nivel 4 – slime. Mismo formato que level1.js. Enemigos: [tipo, x, y, a, b] (y solo para voladores).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [ // [x centro, y superior, ancho]
  [520, 370, 128], [1150, 330, 128], [2050, 340, 128], [2480, 300, 128], [3300, 340, 128], [3750, 300, 100], [4400, 330, 128], [4900, 320, 128],
  [5700, 320, 140], [6150, 320, 140],
];
const springs = [900, 2750, 4150]; // bloques de slime: salta encima y rebotas
const rejas = [1700, 3600, 4800];  // solo se pasan convertido en slime
const charcos = [1450, 3400, 4600]; // charcos que te vuelven slime ~8 s (antes de cada reja)

export const level4 = {
  id: 4, name: 'Nivel 4', title: 'El pantano slime', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 5960, zoneW: 1600,
  zones: [12, 13, 14, 15], boss: 'slime', lava: false, sky: false, sun: false, music: 3, blockSprings: true,
  ground: [[0, 1950], [2110, 3300], [3460, 6400]],
  platforms, springs, rejas, charcos,
  enemies: [
    ['bolita', 700, 0, 560, 840],
    ['fantaslime', 1250, 330, 1050, 1380],
    ['babosa', 2300, 0, 2150, 2550],
    ['mandibulas', 3000, 0, 0, 0],
    ['fantaslime', 3250, 330, 3050, 3300],
    ['bolita', 3950, 0, 3800, 4050],
    ['mandibulas', 4350, 0, 0, 0],
    ['babosa', 5050, 0, 4950, 5250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 340, 700, 1000, 1550, 2300, 2900, 3500, 4000, 4500, 5100, 5300].map((x) => [x, 410]),
    ...springs.flatMap((x) => [[x - 40, 120], [x, 90], [x + 40, 120]]),
  ],
  checkpoints: [2200, 3900],
  hints: [
    [330, 230, 'El slime es pegajoso…\n¡pero divertido!'],
    [900, 150, 'Salta encima del bloque\npara rebotar muy alto'],
    [1450, 280, '¡Charco! Tócalo y te vuelves slime\nunos segundos'],
    [1700, 120, 'Las rejas solo las pasa el slime'],
    [3000, 240, 'Las mandíbulas avisan\nantes de cerrarse'],
    [5000, 230, 'El Fantaslime gigante te espera…'],
  ],
};
