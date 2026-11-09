// Nivel 11 – el mar. Mismo formato que level1.js. El agua no mata: flotas sobre ella. hipno: pez linterna te hipnotiza (teclas al revés).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[550, 350, 128], [1000, 320, 128], [1500, 350, 128], [2100, 330, 128], [2600, 350, 128], [3200, 320, 128], [3800, 350, 128], [4300, 330, 128], [4800, 350, 128], [5200, 320, 128]];

export const level11 = {
  id: 11, name: 'Nivel 11', title: 'El mar', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [40, 41, 42, 43], boss: 'ballena', lava: false, sky: false, sun: true, music: 1, agua: true, hipno: true,
  ground: [[0, 6400]],
  platforms, springs: [],
  enemies: [
    ['pezespada', 800, 0, 700, 950],
    ['pezlinterna', 1250, 260, 1100, 1450],
    ['pezespada', 1800, 0, 1700, 1950],
    ['pezlinterna', 2350, 250, 2200, 2500],
    ['pezespada', 2900, 0, 2800, 3050],
    ['pezespada', 3400, 0, 3300, 3550],
    ['pezlinterna', 3800, 260, 3650, 3950],
    ['pezespada', 4400, 0, 4300, 4550],
    ['pezlinterna', 4800, 250, 4650, 4950],
    ['pezespada', 5150, 0, 5050, 5250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 700, 1300, 1900, 2400, 3000, 3600, 4100, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡El mar!\nEl agua no mata: ¡flotas!'],
    [550, 250, 'Los barriles son plataformas'],
    [1250, 140, 'El pez linterna te hipnotiza:\n¡controla tus teclas un rato!'],
    [2900, 300, 'El pez espada lanza su espada'],
    [5250, 250, 'La Ballena te espera…'],
  ],
};
