// Nivel 28 – FÚTBOL (idea de los niños): balones que botan muchísimo, porterías que sueltan 3 balones si las tocas, y un marcador de 20 s que suelta 10 balones al llegar a 0. Jefe: el Goleador Gigante (lanza balones y camisetas que te atrapan).
import { GROUND_Y } from './level1.js';
export { GROUND_Y };
const WORLD_W = 6400, ARENA_X = 5440, BOSS_X = 6000;
const platforms = [[550, 340, 128], [900, 300, 128], [1300, 340, 128], [1700, 300, 128], [2100, 340, 128], [2500, 300, 128], [2900, 340, 128], [3300, 300, 128], [3700, 340, 128], [4100, 300, 128], [4500, 340, 128], [4900, 300, 128], [5250, 340, 128]];
export const level28 = {
  id: 28, name: 'Nivel 28', title: 'Fútbol', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: 6250, zoneW: 1600,
  zones: [111, 112, 113, 114], boss: 'goleador', lava: false, sky: false, sun: true, music: 3, futbol: true, marcador: true,
  ground: [[0, 6400]],
  platforms, springs: [1500, 3100, 4700],
  enemies: [
    ['jugador', 750, 0, 650, 900],
    ['porteria', 1050, 0, 0, 0],
    ['hincha', 1300, 0, 1200, 1450],
    ['balon', 1500, 0, 140, 0],
    ['arbitro', 1800, 0, 1700, 1950],
    ['vuvuzela', 2050, 230, 1950, 2250],
    ['porteria', 2350, 0, 0, 0],
    ['jugador', 2600, 0, 2500, 2750],
    ['hincha', 2850, 0, 2750, 3000],
    ['balon', 3050, 0, -140, 0],
    ['porteria', 3350, 0, 0, 0],
    ['arbitro', 3600, 0, 3500, 3750],
    ['vuvuzela', 3850, 230, 3750, 4050],
    ['jugador', 4100, 0, 4000, 4250],
    ['porteria', 4400, 0, 0, 0],
    ['hincha', 4650, 0, 4550, 4800],
    ['balon', 4850, 0, 140, 0],
    ['jugador', 5050, 0, 4950, 5150],
    ['arbitro', 5250, 0, 5150, 5350],
  ],
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 800, 1400, 2000, 2600, 3200, 3800, 4400, 5000, 5400].map((x) => [x, 410]),
  ],
  checkpoints: [1600, 2800, 3900, 4900],
  hints: [
    [300, 230, '¡Fútbol!\nCuando el marcador llega a 0 salen 10 balones'],
    [1000, 250, 'Si tocas una portería, salen 3 balones'],
    [5250, 250, 'El Goleador Gigante te espera…'],
  ],
};
