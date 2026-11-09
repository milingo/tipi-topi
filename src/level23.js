// Nivel 23 – COLORES (un mundo de cada color del arcoíris): 26 pegotes de colores y TRES jefes seguidos (Pegote rojo, verde y violeta).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[500, 340, 128], [850, 300, 128], [1250, 340, 128], [1650, 300, 128], [2050, 340, 128], [2450, 300, 128], [2850, 340, 128], [3250, 300, 128], [3650, 340, 128], [4050, 300, 128], [4450, 340, 128], [4850, 300, 128], [5200, 340, 128]];
// pegotes de colores: cada uno del color de su mundo (andan, vuelan o disparan)
const COLS = ['rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta', 'rosa'], KIND = ['pg', 'pgv', 'pgt', 'pg', 'pg', 'pgv', 'pgt'];
const enemies = Array.from({ length: 26 }, (_, i) => { const x = 700 + i * 180, k = KIND[i % 7], c = COLS[Math.min(6, Math.floor(x / 915))]; return [k + '_' + c, x, k === 'pgv' ? 240 : 0, x - 110, x + 110]; });
export const level23 = {
  id: 23, name: 'Nivel 23', title: 'Colores', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 915,
  zones: [88, 89, 90, 91, 92, 93, 94], boss: 'triple', lava: false, sky: false, sun: true, music: 3, colores: true,
  ground: [[0, 6400]],
  platforms, springs: [1050, 2250, 3450, 4650],
  enemies,
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 700, 1100, 1500, 1900, 2300, 2700, 3100, 3500, 3900, 4300, 4700, 5100, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1500, 2700, 3900, 5000],
  hints: [
    [300, 230, '¡COLORES!\nUn mundo de cada color… y 26 pegotes de colores'],
    [2600, 250, '¡Ya queda poco! ¡Y al final, TRES jefes!'],
    [5250, 250, 'Tres Pegotes Gigantes te esperan…'],
  ],
};
