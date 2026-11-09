// Nivel 15 – Mundo Pedorro. Mismo formato que level1.js. Cacas, moscas y nubes de pedo. Jefe: la Gran Caca.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 340, 128], [1100, 310, 128], [1650, 340, 128], [2150, 300, 128], [2700, 340, 128], [3200, 310, 128], [3750, 340, 128], [4250, 300, 128], [4750, 340, 128], [5200, 310, 128]];

export const level15 = {
  id: 15, name: 'Nivel 15', title: 'Mundo pedorro', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [56, 57, 58, 59], boss: 'caca', lava: false, sky: false, sun: true, music: 1, pedos: true,
  ground: [[0, 6400]],
  platforms, springs: [[1400, 360], [3500, 360], [4500, 360]],
  enemies: [
    ['caca', 850, 0, 700, 1000],
    ['mosca', 1250, 250, 1100, 1400],
    ['pedonube', 1850, 0, 1750, 1950],
    ['caca', 2400, 0, 2300, 2550],
    ['mosca', 2900, 240, 2750, 3050],
    ['pedonube', 3350, 0, 3250, 3450],
    ['caca', 3900, 0, 3800, 4050],
    ['mosca', 4400, 250, 4250, 4550],
    ['pedonube', 4800, 0, 4700, 4900],
    ['caca', 5150, 0, 5050, 5250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡El Mundo Pedorro!\nCuidado con las cacas'],
    [1250, 140, 'Las moscas escupen pedos verdes'],
    [1850, 250, 'Las nubes de pedo disparan bolas verdes'],
    [5250, 250, 'La Gran Caca te espera…'],
  ],
};
