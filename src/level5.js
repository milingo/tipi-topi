// Nivel 5 – champiñones. No hay suelo: solo se avanza por las setas gigantes. Mismo formato que level1.js.
// giants: [x centro, y de arriba, ancho]; alus: setas alucinógenas [x, y]; springs con [x, y] = trampolines sobre una seta.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const giants = [
  [620, 390, 220], [1000, 350, 200], [1380, 400, 240], [1780, 340, 200], [2130, 380, 220], [2500, 330, 200], [2900, 390, 260],
  [3300, 350, 200], [3650, 400, 240], [4050, 360, 220], [4420, 320, 200], [4800, 390, 240], [5150, 380, 200],
];

export const level5 = {
  id: 5, name: 'Nivel 5', title: 'El bosque de setas', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 5960, zoneW: 1600,
  zones: [16, 17, 18, 19], boss: 'seta', lava: false, sky: false, sun: false, music: 1, noFloor: true,
  ground: [[0, 420], [5300, 6400]],
  platforms: [],
  giants,
  alus: [[2130, 380], [3300, 350], [4420, 320]],
  springs: [[1720, 340], [2440, 330], [3990, 360]],
  enemies: [
    ['champi', 1380, 330, 1290, 1470],
    ['tropix_campeon', 2900, 270, 2760, 3040],
    ['champi', 3650, 340, 3560, 3740],
    ['tropix_campeon', 4800, 270, 4680, 4920],
  ],
  stars: [
    ...giants.map(([x, y]) => [x, y - 60]),
    ...[300, 340].map((x) => [x, 410]),
    ...[[1720, 150], [2440, 140], [3990, 170]].flatMap(([x, y]) => [[x - 40, y + 30], [x, y], [x + 40, y + 30]]),
  ],
  checkpoints: [[2560, 330], [4110, 360]],
  hints: [
    [300, 300, 'No hay suelo:\n¡solo se avanza por las setas gigantes!'],
    [1000, 230, 'Las setas moradas te dan\nalucinaciones… ¡no las pises!'],
    [1720, 150, 'Trampolín'],
    [5000, 270, 'El Champiñón Rey te espera…'],
  ],
};
