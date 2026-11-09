// Nivel 25 – TECNOLOGÍA: móviles, portátiles, routers, altavoces, ratones, cámaras, robots y drones. Jefe: la Impresora 3D, que imprime mini impresiones que van a por ti.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[550, 340, 128], [900, 300, 128], [1300, 340, 128], [1700, 300, 128], [2100, 340, 128], [2500, 300, 128], [2900, 340, 128], [3300, 300, 128], [3700, 340, 128], [4100, 300, 128], [4500, 340, 128], [4900, 300, 128], [5250, 340, 128]];
export const level25 = {
  id: 25, name: 'Nivel 25', title: 'Tecnología', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [99, 100, 101, 102], boss: 'impresora', lava: false, sky: false, sun: false, music: 3, tecno: true,
  ground: [[0, 6400]],
  platforms, springs: [1500, 3100, 4700],
  enemies: [
    ['movil_t', 750, 0, 650, 900],
    ['router', 1000, 0, 900, 1100],
    ['ratonpc', 1250, 0, 1150, 1400],
    ['camara', 1550, 230, 1450, 1750],
    ['portatil', 1850, 0, 1750, 2000],
    ['altavoz', 2100, 0, 2000, 2200],
    ['robot', 2400, 0, 2300, 2550],
    ['cdvolador', 2650, 230, 2550, 2850],
    ['movil_t', 2900, 0, 2800, 3050],
    ['dron', 3150, 240, 3050, 3350],
    ['router', 3400, 0, 3300, 3500],
    ['ratonpc', 3650, 0, 3550, 3800],
    ['portatil', 3900, 0, 3800, 4050],
    ['camara', 4150, 230, 4050, 4350],
    ['altavoz', 4400, 0, 4300, 4500],
    ['robot', 4600, 0, 4500, 4750],
    ['cdvolador', 4850, 230, 4750, 5050],
    ['movil_t', 5050, 0, 4950, 5150],
    ['dron', 5250, 240, 5150, 5400],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1400, 2000, 2600, 3200, 3800, 4400, 5000, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Tecnología!\nMóviles, routers y robots'],
    [1100, 250, 'Los routers lanzan rayos wifi'],
    [5250, 250, 'La Impresora 3D te espera…'],
  ],
};
