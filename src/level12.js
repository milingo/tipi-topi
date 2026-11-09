// Nivel 12 – Luna de queso. Mismo formato que level1.js. lowg: poca gravedad (saltos largos y flotantes).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 340, 128], [1050, 300, 128], [1500, 330, 128], [2000, 290, 128], [2500, 330, 128], [3050, 300, 128], [3600, 330, 128], [4100, 290, 128], [4600, 330, 128], [5100, 300, 128]];

export const level12 = {
  id: 12, name: 'Nivel 12', title: 'Luna de queso', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [44, 45, 46, 47], boss: 'reina', lava: false, sky: false, sun: false, music: 3, lowg: true, luna: true,
  ground: [[0, 6400]],
  platforms, springs: [],
  enemies: [
    ['raton', 850, 0, 700, 1000],
    ['ovni', 1250, 250, 1100, 1450],
    ['raton', 1800, 0, 1700, 1950],
    ['ovni', 2300, 240, 2150, 2450],
    ['raton', 2800, 0, 2700, 2950],
    ['raton', 3350, 0, 3250, 3450],
    ['ovni', 3800, 250, 3650, 3950],
    ['raton', 4350, 0, 4250, 4500],
    ['ovni', 4800, 240, 4650, 4950],
    ['raton', 5150, 0, 5050, 5250],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡La Luna de queso!\nAquí pesas poco: ¡saltas flotando!'],
    [850, 260, 'Los ratones se comen el queso…\n¡y a ti!'],
    [1250, 140, 'Los ovnis escupen pegotes'],
    [5250, 250, 'La Rata Reina te espera…'],
  ],
};
