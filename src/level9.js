// Nivel 9 – Egipto. Mismo formato que level1.js. rubies/diamantes: [x,y] · langostas: cada 20 s los enemigos se esconden y cambian de sitio (tpDest)
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;

const platforms = [[600, 360, 128], [1100, 330, 128], [1700, 350, 128], [2400, 340, 128], [3100, 330, 128], [3500, 350, 128], [4200, 340, 128], [4700, 330, 128], [5100, 340, 128]];

export const level9 = {
  id: 9, name: 'Nivel 9', title: 'Egipto', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [32, 33, 34, 35], boss: 'piramide', lava: false, sky: false, sun: true, music: 6, egipto: true, langostas: true,
  ground: [[0, 6400]],
  platforms, springs: [],
  rubies: [[900, 415], [2300, 415], [3900, 415]],
  diamantes: [[1700, 300], [3500, 300]],
  tpDest: [300, 1200, 2000, 2800, 3600, 4400, 5000],
  enemies: [
    ['escorpion', 700, 0, 550, 850],
    ['momia', 1500, 0, 1400, 1650],
    ['esctropix', 1250, 230, 1100, 1450],
    ['escorpion', 1950, 0, 1800, 2100],
    ['esctropix', 2700, 230, 2550, 2850],
    ['momia', 3000, 0, 2900, 3150],
    ['escorpion', 3300, 0, 3200, 3400],
    ['esctropix', 4100, 230, 3950, 4300],
    ['escorpion', 4500, 0, 4350, 4650],
    ['momia', 4850, 0, 4780, 4950],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1000, 1400, 2200, 2350, 2900, 3700, 4000, 4400, 5300].map((x) => [x, 410]),
  ],
  checkpoints: [1500, 2600, 3700, 4800],
  hints: [
    [300, 230, '¡Egipto!\nCada 20 segundos llegan las langostas…'],
    [900, 300, 'Un rubí… ¡cuidado!\nte lleva atrás y te quita una vida'],
    [1700, 230, 'El diamante cura una vida,\npero salen 3 escorpiones'],
    [1500, 150, 'La tipi-momia te enrolla\ny lanza escorpiones'],
    [5250, 250, 'La Pirámide te espera…'],
  ],
};
