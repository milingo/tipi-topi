// Nivel 1 – coordenadas en píxeles. El suelo está en y = GROUND_Y.
export const GROUND_Y = 470;
export const WORLD_W = 6400;
export const ARENA_X = 5440;      // la cámara se bloquea aquí al entrar al jefe
export const BOSS_X = 6130;
export const ZONE_W = 1800;       // cada 1800 px cambia el mundo (prado → caramelo → noche → atardecer)

const platforms = [ // [x centro, y superior, ancho]
  [700, 370, 160], [1010, 300, 128], [1420, 360, 128], [1700, 290, 128], [2900, 360, 192], [3150, 290, 128],
  [3350, 220, 128], [3700, 350, 160], [3950, 280, 128], [4400, 340, 128], [4800, 350, 160], [5050, 270, 128], [5770, 340, 128],
];
const springs = [1250, 2450, 4250]; // setas saltarinas (x)

export const level1 = {
  id: 1, name: 'Nivel 1', title: 'El prado loco', worldW: WORLD_W, arenaX: ARENA_X, bossX: BOSS_X, goalX: BOSS_X + 110, zoneW: ZONE_W,
  zones: [0, 1, 2, 3], boss: 'planta', lava: false, sun: true, music: 0,
  // [x inicio, x fin] de tramos de suelo (entre ellos, tres agujeros pequeños)
  ground: [[0, 2200], [2330, 4300], [4430, 5300], [5300, 6400]],
  platforms,
  springs,
  // enemigos: [tipo, x, _, a, b]  (bacteria/gordo/fuego: a..b = tramo de patrulla; arana: a..b = altura mín/máx)
  enemies: [
    ['bacteria', 650, 0, 450, 850],
    ['bacteria', 1550, 0, 1350, 1850],
    ['arana', 1950, 0, 200, 320],
    ['gordo', 2800, 0, 2600, 3200],
    ['bacteria', 3350, 0, 3150, 3550],
    ['fuego', 3850, 0, 3650, 4200],
    ['arana', 4650, 0, 200, 320],
    ['gordo', 4950, 0, 4600, 5200],
  ],
  // estrellas: sobre plataformas, por el suelo y en lo alto de las setas saltarinas
  stars: [
    ...platforms.map(([x, y]) => [x, y - 50]),
    ...[300, 340, 1000, 1850, 2100, 2600, 3500, 4000, 4600, 5200].map((x) => [x, 410]),
    ...springs.flatMap((x) => [[x - 40, 120], [x, 90], [x + 40, 120]]),
  ],
  checkpoints: [2400, 4450],
  // carteles de ayuda: [x, y, texto]
  hints: [
    [190, 230, '← →  moverte\n↑  saltar (¡dos veces en el aire!)'],
    [900, 200, 'ESPACIO: golpear con el ojo'],
    [3560, 230, '¡Fuego! No lo pises:\n¡golpéalo con el ojo (ESPACIO)!'],
  ],
};
