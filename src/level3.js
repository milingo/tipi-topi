// Nivel 3 – nubes. No hay suelo: solo se avanza por las nubes gigantes (como el nivel de las setas). Mismo formato que level1.js.
// giants: [x centro, y de arriba, ancho]; springs con [x, y] = nubes enfadadas (trampolín) sobre una nube gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const giants = [
  [620, 390, 220], [1000, 340, 200], [1380, 390, 240], [1780, 330, 200], [2130, 380, 220], [2500, 330, 200], [2900, 390, 260],
  [3300, 340, 200], [3650, 390, 240], [4050, 350, 220], [4420, 320, 200], [4800, 380, 240], [5150, 370, 200],
];

export const level3 = {
  id: 3, name: 'Nivel 3', title: 'Las nubes locas', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 5960, zoneW: 1600,
  zones: [8, 9, 10, 11], boss: 'pajaro', lava: false, sky: true, sun: true, music: 2, noFloor: true,
  ground: [[0, 420], [5300, 6400]],
  platforms: [],
  giants,
  springs: [[1730, 330], [2450, 330], [4370, 320], [960, 340]], // nubes enfadadas
  enemies: [
    ['tropix', 1200, 300, 1100, 1300],
    ['abeja', 2000, 170, 1850, 2150],
    ['tropix', 2700, 290, 2550, 2800],
    ['tropix_listo', 3480, 300, 3350, 3600],
    ['tropix_fuerte', 4230, 290, 4100, 4350],
    ['tropix_vampiro', 5000, 250, 4850, 5250],
  ],
  stars: [
    ...giants.map(([x, y]) => [x, y - 60]),
    ...[300, 340].map((x) => [x, 410]),
    ...[[1730, 150], [2450, 140], [4370, 150], [960, 160]].flatMap(([x, y]) => [[x - 40, y + 30], [x, y], [x + 40, y + 30]]),
  ],
  checkpoints: [[2500, 330], [4050, 350]],
  hints: [
    [300, 300, 'No hay suelo:\n¡solo se avanza por las nubes gigantes!'],
    [960, 170, 'Nube enfadada: salta encima.\n¡Te lanza arriba, pero te ralentiza!'],
    [5000, 270, 'El Tipi-Topi pájaro te espera…'],
  ],
};
