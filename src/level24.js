// Nivel 24 – REBUSCADO: los malos más rebuscados del mundo (sillones, tostadoras, espejos, imanes, mimos…). Jefe: la Tetera Rebuscada.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[550, 340, 128], [900, 300, 128], [1300, 340, 128], [1700, 300, 128], [2100, 340, 128], [2500, 300, 128], [2900, 340, 128], [3300, 300, 128], [3700, 340, 128], [4100, 300, 128], [4500, 340, 128], [4900, 300, 128], [5250, 340, 128]];
export const level24 = {
  id: 24, name: 'Nivel 24', title: 'Rebuscado', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [95, 96, 97, 98], boss: 'tetera', lava: false, sky: false, sun: true, music: 3, rebus: true,
  ground: [[0, 6400]],
  platforms, springs: [1500, 3100, 4700],
  enemies: [
    ['sillon', 750, 0, 650, 900],
    ['tostadora', 1000, 0, 900, 1100],
    ['espejo', 1250, 0, 1150, 1450],
    ['nubepar', 1550, 230, 1450, 1750],
    ['mimo', 1850, 0, 0, 0],
    ['lampara', 2100, 0, 2000, 2200],
    ['iman', 2350, 250, 0, 0],
    ['pezbici', 2650, 0, 2550, 2800],
    ['cuco', 2900, 0, 2800, 3000],
    ['pulpo', 3150, 230, 3050, 3350],
    ['espejo', 3400, 0, 3300, 3600],
    ['mimo', 3650, 0, 0, 0],
    ['sillon', 3900, 0, 3800, 4050],
    ['iman', 4150, 240, 0, 0],
    ['tostadora', 4400, 0, 4300, 4500],
    ['nubepar', 4600, 230, 4500, 4800],
    ['pezbici', 4850, 0, 4750, 5000],
    ['mimo', 5050, 0, 0, 0],
    ['lampara', 5250, 0, 5150, 5350],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1400, 2000, 2600, 3200, 3800, 4400, 5000, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Rebuscado!\nLos malos más raros del mundo'],
    [1100, 250, 'Los espejos te copian al revés'],
    [2200, 250, 'Los imanes te atraen · los mimos aparecen a tu lado'],
    [5250, 250, 'La Tetera Rebuscada te espera…'],
  ],
};
