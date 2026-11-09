// Nivel 19 – Bacterias (basado en el dibujo de Miguel): tipi-topi bacterias, tropix bacterias que lanzan bacterias, bacterias de pinchos, placas de bacterias; jefe final: la Bacteria Gigante.
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[600, 340, 128], [1050, 300, 128], [1550, 340, 128], [2050, 300, 128], [2550, 340, 128], [3050, 300, 128], [3550, 340, 128], [4050, 300, 128], [4550, 340, 128], [5050, 310, 128]];
export const level19 = {
  id: 19, name: 'Nivel 19', title: 'Bacterias', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [72, 73, 74, 75], boss: 'bacteria', lava: false, sky: false, sun: false, music: 2, bact: true,
  ground: [[0, 6400]],
  platforms, springs: [1350, 3300, 4800],
  enemies: [
    ['tipibact', 800, 0, 700, 950],
    ['tropixbact', 1150, 240, 1000, 1300],
    ['pinchos', 1700, 0, 1600, 1850],
    ['placa', 2000, 0, 1900, 2200],
    ['tipibact', 2300, 0, 2200, 2450],
    ['tropixbact', 2600, 230, 2450, 2750],
    ['pinchos', 2900, 0, 2800, 3050],
    ['placa', 3300, 0, 3200, 3500],
    ['tipibact', 3750, 0, 3650, 3900],
    ['tropixbact', 4100, 240, 3950, 4250],
    ['pinchos', 4500, 0, 4400, 4650],
    ['placa', 4850, 0, 4750, 5050],
    ['tipibact', 5150, 0, 5050, 5300],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 750, 1300, 1900, 2400, 3000, 3500, 4000, 4600, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Dentro de la placa de Petri!\nCuidado con las bacterias'],
    [1750, 250, 'Las bacterias con pinchos los lanzan hacia ti'],
    [5250, 250, 'La Bacteria Gigante te espera…'],
  ],
};
