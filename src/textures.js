// Texturas dibujadas por código: mundo colorido y raro, por zonas.
let seed = 11;
const rr = (a, b) => { seed = (seed * 16807) % 2147483647; return a + (seed / 2147483647) * (b - a); };
const INK = '#2b2b44';

export const ZONES = [
  { name: 'prado', skyTop: '#6ec6ff', skyBot: '#fff3c4', hf: ['#a6e3a1', '#6bb55b'], hn: ['#6fcf4f', '#3f9a33'], grass: ['#6fcf4f', '#58b83c', '#2f6b25'], dirt: ['#a9743f', '#5a3214'], plat: ['#ff8fa3', '#f2b14c'], dots: ['#ffe14d', '#ff7eb6', '#7be0ff'] },
  { name: 'caramelo', skyTop: '#ff8fd0', skyBot: '#fff0b8', hf: ['#ffc2ee', '#e07ac0'], hn: ['#c9a0ff', '#8f5fd8'], grass: ['#ff7eb6', '#e8559a', '#9a1f62'], dirt: ['#d9a066', '#6a3a1a'], plat: ['#7be0ff', '#ffd35a'], dots: ['#ffffff', '#7be0ff', '#ffe14d', '#9be564'] },
  { name: 'noche', skyTop: '#2a1566', skyBot: '#b97bff', hf: ['#5a3bb5', '#8a66e8'], hn: ['#2ea3b0', '#46d3c8'], grass: ['#43e6c4', '#1fb59a', '#0b6b5a'], dirt: ['#3b2a66', '#1c1238'], plat: ['#ffe14d', '#a35cff'], dots: ['#43e6c4', '#ff7eb6', '#ffe14d'], stars: true },
  { name: 'atardecer', skyTop: '#ff6a5a', skyBot: '#ffe9a0', hf: ['#ffa56a', '#e0643a'], hn: ['#d9507a', '#a02f5a'], grass: ['#ffd14d', '#e0a72a', '#8a5a00'], dirt: ['#b35a3a', '#5a2414'], plat: ['#ff5a7a', '#ffb347'], dots: ['#ffffff', '#ffe14d', '#ff5a7a'] },
  // ── nivel 2: lava ──
  { name: 'volcán', lava: true, skyTop: '#3a0f45', skyBot: '#ff8a3d', hf: ['#6a2548', '#ff7a2a'], hn: ['#3f1636', '#ff5a2a'], rock: ['#6b4458', '#2c1830', '#ff9a2a'], plat: ['#ff9a2a', '#43263f'], dots: ['#ffb347', '#ff5a3a', '#ffe14d'] },
  { name: 'río de lava', lava: true, skyTop: '#5a0f35', skyBot: '#ffa23d', hf: ['#7a2750', '#ffa02a'], hn: ['#4a1a3c', '#ff6a2a'], rock: ['#7a4a5a', '#341c34', '#ffb02a'], plat: ['#ffcf4a', '#4a2540'], dots: ['#ffe14d', '#ff7a3a', '#ffffff'] },
  { name: 'cueva roja', lava: true, skyTop: '#1c0a33', skyBot: '#d9402e', hf: ['#4a1f66', '#ff4a5a'], hn: ['#2b1048', '#c8326a'], rock: ['#5a3a6a', '#26143a', '#ff5a8a'], plat: ['#ff6a8a', '#37204f'], dots: ['#ff7eb6', '#ffb347', '#ffffff'] },
  { name: 'forja', lava: true, skyTop: '#2a0606', skyBot: '#ffbe2e', hf: ['#6a2a1a', '#ffc02a'], hn: ['#401410', '#ff7a1a'], rock: ['#744a3a', '#2e1612', '#ffd02a'], plat: ['#ffd02a', '#4a2418'], dots: ['#ffe14d', '#ff5a1a', '#ffffff'] },
  // ── nivel 3: nubes ──
  { name: 'cielo', cloud: true, skyTop: '#3d9bff', skyBot: '#d8f3ff', hf: ['#ffffff', '#cfe6ff'], hn: ['#f2f8ff', '#bcd9ff'], cl: ['#ffffff', '#d6e8ff', '#8fb8ea'], dots: ['#ffffff'] },
  { name: 'tormenta', cloud: true, skyTop: '#4a4f86', skyBot: '#c9c4e8', hf: ['#a2a4cc', '#8486b4'], hn: ['#bcbcdc', '#9596c0'], cl: ['#e6e6f6', '#b8b8dc', '#7a7ca8'], dots: ['#ffffff'] },
  { name: 'atardecer alto', cloud: true, skyTop: '#ff7aa8', skyBot: '#ffe4b0', hf: ['#ffd6e0', '#ffa0bc'], hn: ['#fff0e2', '#ffc4aa'], cl: ['#fff6ee', '#ffd2c0', '#e8908c'], dots: ['#ffffff'] },
  { name: 'estrellas', cloud: true, stars: true, skyTop: '#10145a', skyBot: '#7a6ad8', hf: ['#5c5cba', '#8c8cea'], hn: ['#7c76d2', '#aaa2f2'], cl: ['#eae6ff', '#bcb4f0', '#7a70c8'], dots: ['#ffffff'] },

  // ── nivel 4: slime (usa el mismo dibujo de suelo que el prado, con colores pegajosos) ──
  { name: 'pantano', slime: true, skyTop: '#3a2370', skyBot: '#a8ee74', hf: ['#7a4fb8', '#5a3a96'], hn: ['#4fb86a', '#2e8a4a'], grass: ['#9cf05a', '#7ad43a', '#2f6b25'], dirt: ['#7a4a8a', '#3e2250'], plat: ['#9cf05a', '#5a8f3a'], dots: ['#c4ff7a', '#ff7eb6', '#ffffff'] },
  { name: 'cueva viscosa', slime: true, skyTop: '#0e2a3a', skyBot: '#4fd8a0', hf: ['#1f6a6a', '#2f8a7a'], hn: ['#2a4a7a', '#3a64a0'], grass: ['#7af0a8', '#4ed48a', '#1a6a4a'], dirt: ['#2e5a6a', '#142c3c'], plat: ['#7af0a8', '#2f7a68'], dots: ['#c4ffe0', '#ffe14d', '#ffffff'] },
  { name: 'laboratorio', slime: true, skyTop: '#4a1f6a', skyBot: '#ff9ad8', hf: ['#a85ad0', '#8a3eb8'], hn: ['#d86ab8', '#b04898'], grass: ['#b4f45a', '#8ed43a', '#3a6a1a'], dirt: ['#8a4a9a', '#4a2058'], plat: ['#ff9ad8', '#8a3eb8'], dots: ['#e0ff7a', '#ffffff', '#7be0ff'] },
  { name: 'gran charco', slime: true, skyTop: '#1a1650', skyBot: '#74e8a8', hf: ['#3a5ab8', '#2a3a96'], hn: ['#3ab88a', '#2a8a66'], grass: ['#a4ff7a', '#7ad45a', '#2a6a2a'], dirt: ['#4a3a8a', '#221a50'], plat: ['#a4ff7a', '#4a8a4a'], dots: ['#d4ff9a', '#ffffff', '#ff7eb6'] },

  // ── nivel 5: champiñones (sin suelo; solo el inicio y la arena usan estos suelos) ──
  { name: 'bosque rosa', hongos: true, skyTop: '#6a3fb8', skyBot: '#ffb8e0', hf: ['#c88ae8', '#a060d0'], hn: ['#ff9ac8', '#e070a8'], grass: ['#ff8fb8', '#e8609a', '#8a2f62'], dirt: ['#7a4a8a', '#3e2250'], plat: ['#ff8fb8', '#8a3a6a'], dots: ['#ffe14d', '#ffffff', '#7be0ff'] },
  { name: 'bosque azul', hongos: true, skyTop: '#2a3a9a', skyBot: '#9ad8ff', hf: ['#6a8ae8', '#4a68c8'], hn: ['#7ad0e8', '#4aa8c8'], grass: ['#8ef0e0', '#4ed4c0', '#1a6a6a'], dirt: ['#4a5a9a', '#222a60'], plat: ['#8ef0e0', '#3a5a9a'], dots: ['#ffffff', '#ff7eb6', '#ffe14d'] },
  { name: 'bosque dorado', hongos: true, skyTop: '#c0407a', skyBot: '#ffe0a0', hf: ['#ffb070', '#e88050'], hn: ['#ffd070', '#e0a040'], grass: ['#ffe070', '#e8b840', '#8a5a10'], dirt: ['#a8603a', '#52281a'], plat: ['#ffe070', '#a85a2a'], dots: ['#ffffff', '#ff5a7a', '#7be0ff'] },
  { name: 'bosque oscuro', hongos: true, skyTop: '#1a0a4a', skyBot: '#a870e8', hf: ['#6a3ab8', '#8a5ae0'], hn: ['#a04ad0', '#c070f0'], grass: ['#d090ff', '#a860e0', '#4a1a7a'], dirt: ['#5a3a8a', '#24124a'], plat: ['#d090ff', '#4a2a7a'], dots: ['#ffe14d', '#ffffff', '#ff7eb6'] },
  // ── nivel 6: máquinas (futurista) ──
  { name: 'ciudad neón', tech: true, skyTop: '#0b0b40', skyBot: '#7a3ad8', hf: ['#2a2a7a', '#5a4ae0'], hn: ['#161a52', '#3a8aff'], grass: ['#5ae8ff', '#2ab8e0', '#0a4a7a'], dirt: ['#2c3a6a', '#141c3a'], plat: ['#5ae8ff', '#2a3a7a'], dots: ['#ff4a9a', '#ffe14d', '#5ae8ff'] },
  { name: 'fábrica', tech: true, skyTop: '#081a3a', skyBot: '#20b8d8', hf: ['#1f4a7a', '#3a8ac8'], hn: ['#10284f', '#2a6ab0'], grass: ['#ffe14d', '#e8b820', '#6a4a00'], dirt: ['#2a3a5a', '#121c34'], plat: ['#ffe14d', '#2a3a6a'], dots: ['#5ae8ff', '#ff4a9a', '#ffffff'] },
  { name: 'laboratorio', tech: true, skyTop: '#240a4a', skyBot: '#ff5aa8', hf: ['#6a2a9a', '#b04ac8'], hn: ['#3a1470', '#8a3ab8'], grass: ['#ff7ad0', '#e04aa8', '#6a1a5a'], dirt: ['#3a2a6a', '#1a1038'], plat: ['#ff7ad0', '#3a2a7a'], dots: ['#5ae8ff', '#ffe14d', '#ffffff'] },
  { name: 'núcleo', tech: true, skyTop: '#04041c', skyBot: '#2a5aff', hf: ['#1a2a8a', '#3a6aff'], hn: ['#0c1458', '#2a4ae0'], grass: ['#8aff7a', '#4ad84a', '#146a2a'], dirt: ['#202a5a', '#0e1230'], plat: ['#8aff7a', '#202a6a'], dots: ['#ffffff', '#5ae8ff', '#ff4a9a'] },
  // ── nivel 7: la Odisea ──
  { name: 'puerto', skyTop: '#58c8ff', skyBot: '#ffeeb8', hf: ['#a8e0e8', '#6cb8c8'], hn: ['#7cc8d8', '#3c98b8'], grass: ['#ffe6a0', '#f2c870', '#9a7a30'], dirt: ['#e0b878', '#8a5a2a'], plat: ['#ffffff', '#7ab8e8'], dots: ['#ffffff', '#ff7eb6', '#7be0ff'] },
  { name: 'mar abierto', skyTop: '#2a8ae0', skyBot: '#bff2ff', hf: ['#7ad0f0', '#3a98d8'], hn: ['#3a9ad8', '#1a68b0'], grass: ['#6ee0d8', '#34b8b8', '#146a78'], dirt: ['#2a5a9a', '#12306a'], plat: ['#fff4c0', '#e8a050'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'isla de Circe', skyTop: '#6a2aa8', skyBot: '#ff9ad8', hf: ['#b070e0', '#e890d8'], hn: ['#7a3ab8', '#a860d8'], grass: ['#a0f08a', '#5ccb5a', '#1f6a30'], dirt: ['#5a3a7a', '#2a1a44'], plat: ['#ff9ad8', '#7a3ab8'], dots: ['#ffe14d', '#ff7eb6', '#c8a0ff'] },
  { name: 'cueva del cíclope', skyTop: '#2a1a3a', skyBot: '#a05a3a', hf: ['#5a3a4a', '#8a5a4a'], hn: ['#3a2434', '#6a4040'], grass: ['#d0a060', '#a07a40', '#5a3a1a'], dirt: ['#5a3a2a', '#2a1810'], plat: ['#d0a060', '#5a3a2a'], dots: ['#ffb347', '#ff7a3a', '#ffe14d'] },
  // ── nivel 8: dentro del taco ──
  { name: 'tortilla', skyTop: '#ffb347', skyBot: '#fff0b8', hf: ['#ffd98a', '#e8a850'], hn: ['#f0b860', '#c88a30'], grass: ['#ffe08a', '#f0c050', '#a07020'], dirt: ['#d49a50', '#8a5a20'], plat: ['#ff7a5a', '#ffe08a'], dots: ['#ff4a4a', '#6ed05a', '#ffffff'] },
  { name: 'lechuga', skyTop: '#7ed957', skyBot: '#f0ffc0', hf: ['#b8f090', '#6cc84a'], hn: ['#8ae060', '#3aa030'], grass: ['#9be564', '#5cc03c', '#2a7a20'], dirt: ['#c89050', '#6a4018'], plat: ['#ff5a5a', '#9be564'], dots: ['#ffffff', '#ffe14d', '#ff7a5a'] },
  { name: 'salsa', skyTop: '#d02a3a', skyBot: '#ffb070', hf: ['#ff7a5a', '#e0402a'], hn: ['#e0503a', '#a02020'], grass: ['#ff8a5a', '#e0502a', '#7a1a10'], dirt: ['#8a2a20', '#40100c'], plat: ['#ffd24d', '#c03020'], dots: ['#6ed05a', '#ffe14d', '#ffffff'] },
  { name: 'queso', skyTop: '#ffd23a', skyBot: '#fff7c0', hf: ['#ffe680', '#f0b820'], hn: ['#f8cc40', '#d89a10'], grass: ['#ffe14d', '#f0b820', '#8a6000'], dirt: ['#e0a020', '#8a5a10'], plat: ['#ffffff', '#f0b820'], dots: ['#ff7a3a', '#6ed05a', '#ffffff'] },
  // ── nivel 9: Egipto ──
  { name: 'desierto', skyTop: '#ffb347', skyBot: '#fff0c0', hf: ['#ffd98a', '#e8a850'], hn: ['#f0b860', '#c88a30'], grass: ['#ffe29a', '#f0c060', '#a07828'], dirt: ['#d8a860', '#8a5a28'], plat: ['#e8c070', '#8a5a28'], dots: ['#ffffff', '#ffd23a', '#c8a050'] },
  { name: 'pirámides', skyTop: '#ff8a5a', skyBot: '#ffe8a0', hf: ['#f0a060', '#c87030'], hn: ['#d88848', '#a05820'], grass: ['#f0c070', '#d09840', '#7a5018'], dirt: ['#c08848', '#6a4018'], plat: ['#ffd24d', '#a06a20'], dots: ['#ffffff', '#ff7a5a', '#ffe14d'] },
  { name: 'oasis', skyTop: '#4cc9f0', skyBot: '#fff4c0', hf: ['#a8e8a0', '#6cc870'], hn: ['#78d070', '#3a9a48'], grass: ['#8ae070', '#4ab850', '#1f6a30'], dirt: ['#d8b070', '#7a5a28'], plat: ['#4cc9f0', '#ffe29a'], dots: ['#ffffff', '#4cc9f0', '#ff7eb6'] },
  { name: 'tumba', skyTop: '#2a1a4a', skyBot: '#d0903a', hf: ['#6a4a5a', '#a0704a'], hn: ['#3a2a44', '#7a5040'], grass: ['#d8b060', '#a88038', '#5a3a10'], dirt: ['#5a3a2a', '#2a1810'], plat: ['#ffd24d', '#5a3a2a'], dots: ['#ffd23a', '#4cc9f0', '#ff4a6a'] },
  // ── nivel 10: Halloween ──
  { name: 'cementerio', skyTop: '#1a0a3a', skyBot: '#8a3a8a', hf: ['#4a2a6a', '#7a4a9a'], hn: ['#2a1450', '#5a3a80'], grass: ['#7a5aa0', '#5a3a80', '#2a1450'], dirt: ['#3a2a4a', '#1a1028'], plat: ['#ff8a2a', '#3a2a4a'], dots: ['#ff8a2a', '#ffffff', '#b57bff'] },
  { name: 'bosque oscuro', skyTop: '#0a1a2a', skyBot: '#3a5a4a', hf: ['#2a4a4a', '#4a7a60'], hn: ['#142a2a', '#2a5040'], grass: ['#4a7a50', '#2e5a38', '#10281a'], dirt: ['#2a2a22', '#12120c'], plat: ['#ff8a2a', '#2a2a22'], dots: ['#ff8a2a', '#9be564', '#ffffff'] },
  { name: 'calabazar', skyTop: '#3a0a2a', skyBot: '#ff8a2a', hf: ['#a03a3a', '#e07a2a'], hn: ['#6a1a2a', '#b04a2a'], grass: ['#e08a2a', '#b05a1a', '#5a2a0a'], dirt: ['#4a2a1a', '#1a0e08'], plat: ['#9be564', '#4a2a1a'], dots: ['#ffe14d', '#ff8a2a', '#ffffff'] },
  { name: 'castillo', skyTop: '#10082a', skyBot: '#a02a4a', hf: ['#3a2a5a', '#6a3a7a'], hn: ['#1c1038', '#4a2a60'], grass: ['#8a8aa8', '#60608a', '#2a2a48'], dirt: ['#3a3a52', '#1a1a2a'], plat: ['#c8284a', '#2a2a48'], dots: ['#ff4a6a', '#ffffff', '#ffd23a'] },
  // ── nivel 11: agua ──
  { name: 'orilla', skyTop: '#58c8ff', skyBot: '#e8fbff', hf: ['#a8e0f0', '#6cc0e0'], hn: ['#7cd0f0', '#3ca0d8'], grass: ['#6ee0f0', '#34b8d8', '#146a98'], dirt: ['#2a7ab8', '#124a88'], plat: ['#ffc83a', '#a06a10'], dots: ['#ffffff', '#ffd23a', '#ff7eb6'] },
  { name: 'mar abierto', skyTop: '#2a8ae0', skyBot: '#bff2ff', hf: ['#7ad0f0', '#3a98d8'], hn: ['#3a9ad8', '#1a68b0'], grass: ['#6ee0d8', '#34b8b8', '#146a78'], dirt: ['#2a5a9a', '#12306a'], plat: ['#ffc83a', '#a06a10'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'atardecer en el mar', skyTop: '#7a4ac8', skyBot: '#ffb08a', hf: ['#c890e0', '#e87aa0'], hn: ['#8a5ad0', '#c85a90'], grass: ['#6ee0f0', '#34a8d8', '#144a88'], dirt: ['#2a4a9a', '#12206a'], plat: ['#ffc83a', '#a06a10'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'abismo', skyTop: '#04102a', skyBot: '#1a4a8a', hf: ['#1a3a7a', '#2a5aa8'], hn: ['#0a1c4a', '#1a3a80'], grass: ['#4ac8e0', '#2a98c0', '#0a4a7a'], dirt: ['#12306a', '#081838'], plat: ['#ffc83a', '#a06a10'], dots: ['#9be8ff', '#ffe14d', '#ffffff'] },
  // ── nivel 12: Luna de queso ──
  { name: 'luna de queso', stars: true, skyTop: '#070a2a', skyBot: '#3a2a7a', hf: ['#4a3a8a', '#7a62c8'], hn: ['#2a2260', '#4a3a98'], grass: ['#ffe26a', '#e8b830', '#8a5a10'], dirt: ['#d49a24', '#7a4c0c'], plat: ['#ffd24d', '#a06a10'], dots: ['#ffffff', '#ffe14d', '#9be8ff'] },
  { name: 'crater', stars: true, skyTop: '#0a0a30', skyBot: '#6a2a8a', hf: ['#5a2a8a', '#9a5ac8'], hn: ['#321a68', '#6a3aa8'], grass: ['#ffd84a', '#e0a020', '#7a4a08'], dirt: ['#c8901c', '#6a400a'], plat: ['#ffd24d', '#a06a10'], dots: ['#ffffff', '#ff7eb6', '#9be8ff'] },
  { name: 'tierra lejana', stars: true, skyTop: '#04122a', skyBot: '#1a6a8a', hf: ['#1a5a8a', '#3a98c8'], hn: ['#0c2a5a', '#1a5a98'], grass: ['#fff07a', '#ecc030', '#8a5e10'], dirt: ['#d8a02c', '#7a4e10'], plat: ['#ffd24d', '#a06a10'], dots: ['#9be8ff', '#ffffff', '#9be564'] },
  { name: 'cueva ratonil', stars: true, skyTop: '#140a2a', skyBot: '#8a2a4a', hf: ['#6a2a5a', '#a04a7a'], hn: ['#3a1448', '#6a2a68'], grass: ['#ffcf3a', '#d89818', '#6a3a06'], dirt: ['#b87a18', '#5a320a'], plat: ['#ff9eb6', '#a03a5a'], dots: ['#ffe14d', '#ff7eb6', '#ffffff'] },
  // ── nivel 13: jardín ──
  { name: 'jardin', skyTop: '#5ad0ff', skyBot: '#f2ffd8', hf: ['#a8e890', '#6cc860'], hn: ['#7ad868', '#3ca83c'], grass: ['#7be85a', '#3cb83a', '#1a6a1e'], dirt: ['#8a5a30', '#4a2c14'], plat: ['#ff9eb6', '#a03a5a'], dots: ['#ff7eb6', '#ffe14d', '#ffffff'] },
  { name: 'huerto', skyTop: '#7ad0ff', skyBot: '#fff4c8', hf: ['#b8e070', '#80c040'], hn: ['#8ad050', '#4ea030'], grass: ['#9ae85a', '#58b83a', '#2a6a1e'], dirt: ['#946034', '#4e3016'], plat: ['#ffd24d', '#a06a10'], dots: ['#ff8a3a', '#ffe14d', '#9be564'] },
  { name: 'invernadero', skyTop: '#a8f0e0', skyBot: '#e8fff4', hf: ['#78d8b0', '#40b890'], hn: ['#50c898', '#2a9870'], grass: ['#58e8a0', '#2ab878', '#106a48'], dirt: ['#7a5a3a', '#3e2a18'], plat: ['#ff9eb6', '#a03a5a'], dots: ['#ffffff', '#c59bff', '#ffe14d'] },
  { name: 'jardin al atardecer', skyTop: '#ff9a5a', skyBot: '#ffe8a0', hf: ['#e0b060', '#c88a3a'], hn: ['#a0c050', '#60983a'], grass: ['#a8e050', '#64b030', '#2e681a'], dirt: ['#7a4a28', '#3a2010'], plat: ['#ff9eb6', '#a03a5a'], dots: ['#ff7eb6', '#ffe14d', '#ffffff'] },
  // ── nivel 14: isla pirata ──
  { name: 'playa', skyTop: '#4ac8ff', skyBot: '#fff0c8', hf: ['#7ad8e8', '#40b0d8'], hn: ['#58c8d8', '#2a98c0'], grass: ['#ffe9a0', '#e8c870', '#a07a30'], dirt: ['#d8a860', '#8a5a28'], plat: ['#a0643a', '#4a2a14'], dots: ['#ff7eb6', '#ffe14d', '#ffffff'] },
  { name: 'selva', skyTop: '#58d8c0', skyBot: '#e8ffd0', hf: ['#58c870', '#2a9a50'], hn: ['#3ab060', '#1a7a3a'], grass: ['#f6dc88', '#d8b058', '#8a6420'], dirt: ['#c8964a', '#7a4e1e'], plat: ['#a0643a', '#4a2a14'], dots: ['#ff4a6a', '#ffe14d', '#9be564'] },
  { name: 'cueva del tesoro', stars: true, skyTop: '#0a1228', skyBot: '#3a4a7a', hf: ['#3a4a7a', '#5a70a8'], hn: ['#1a2650', '#34488a'], grass: ['#e8d49a', '#c0a060', '#6a4e1a'], dirt: ['#7a5a32', '#3a2810'], plat: ['#ffd24d', '#a06a10'], dots: ['#ffd23a', '#ff7eb6', '#9be8ff'] },
  { name: 'puerto pirata', skyTop: '#ff8a5a', skyBot: '#ffe0a0', hf: ['#e07a7a', '#c05a8a'], hn: ['#a04a7a', '#703a7a'], grass: ['#f0d08a', '#d0a458', '#80581c'], dirt: ['#b08040', '#5e3c14'], plat: ['#a0643a', '#4a2a14'], dots: ['#ffe14d', '#ff7eb6', '#ffffff'] },
  // ── nivel 15: mundo pedorro ──
  { name: 'pradera apestosa', skyTop: '#a8d860', skyBot: '#f4f0a0', hf: ['#a8b860', '#80983c'], hn: ['#889c48', '#5c7a2c'], grass: ['#a0c840', '#6a9a24', '#3a5a10'], dirt: ['#7a4a26', '#3e220e'], plat: ['#b87a3a', '#5a3414'], dots: ['#9be564', '#ffe14d', '#c8883a'] },
  { name: 'pantano verde', skyTop: '#6ab850', skyBot: '#d8f08a', hf: ['#58a048', '#3a7a30'], hn: ['#448a38', '#2a6a28'], grass: ['#78d048', '#44a030', '#1e5a14'], dirt: ['#62401e', '#30200c'], plat: ['#b87a3a', '#5a3414'], dots: ['#c8ff7a', '#ffe14d', '#9be564'] },
  { name: 'cloaca', skyTop: '#2a3a28', skyBot: '#6a8a40', hf: ['#4a5a30', '#6a7a40'], hn: ['#2e3a20', '#4a5a30'], grass: ['#8ab048', '#587a30', '#2a4010'], dirt: ['#4a3018', '#241608'], plat: ['#b87a3a', '#5a3414'], dots: ['#c8ff7a', '#9be564', '#ffe14d'] },
  { name: 'volcan de gases', skyTop: '#4a3a6a', skyBot: '#b8d860', hf: ['#6a5a8a', '#8a7aaa'], hn: ['#4a3a6a', '#6a5a8a'], grass: ['#b0d048', '#789a2c', '#3a5210'], dirt: ['#5a3a22', '#2c1a0c'], plat: ['#b87a3a', '#5a3414'], dots: ['#c8ff7a', '#ffffff', '#ffe14d'] },
  // ── nivel 16: Dulcelandia ──
  { name: 'campo de caramelos', skyTop: '#ff9ed8', skyBot: '#fff0fa', hf: ['#ffc0e8', '#ff90d0'], hn: ['#ffa0d8', '#ff70c0'], grass: ['#ff8ac8', '#ff5aa8', '#a02a70'], dirt: ['#a8603a', '#5a3018'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ffe14d', '#7ad8ff'] },
  { name: 'rio de chocolate', skyTop: '#ffb878', skyBot: '#fff4d8', hf: ['#d8a878', '#b87848'], hn: ['#a87040', '#7a4828'], grass: ['#a8683a', '#7a4222', '#3a1c0a'], dirt: ['#5a3018', '#2a1408'], plat: ['#ff9eb6', '#a03a5a'], dots: ['#ffffff', '#ff7eb6', '#ffe14d'] },
  { name: 'montana de nata', skyTop: '#a8e8ff', skyBot: '#ffffff', hf: ['#f0f8ff', '#c8e0f8'], hn: ['#ffffff', '#d8e8ff'], grass: ['#ffffff', '#e0ecff', '#9ab4d8'], dirt: ['#ffd8e8', '#e8a0c0'], plat: ['#ff7eb6', '#a02a70'], dots: ['#ff4a6a', '#7ad8ff', '#ffe14d'] },
  { name: 'castillo de tarta', skyTop: '#c88aff', skyBot: '#ffd8f0', hf: ['#e0a8f0', '#b878d8'], hn: ['#c890e8', '#9a5ac0'], grass: ['#ffe9a8', '#e8c070', '#a07a30'], dirt: ['#f0a8c8', '#c0709a'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ff7eb6', '#ffe14d'] },
  // ── nivel 17: circo ──
  { name: 'entrada del circo', skyTop: '#ff7a8a', skyBot: '#ffe8a8', hf: ['#ffb0a0', '#ff8a8a'], hn: ['#ff8a7a', '#e85a6a'], grass: ['#ffd84a', '#e8a820', '#8a5a10'], dirt: ['#c0402a', '#6a1a10'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'pista central', skyTop: '#a85aff', skyBot: '#ffd0f0', hf: ['#c890f0', '#9a5ad8'], hn: ['#a870e8', '#7a3ac0'], grass: ['#ff5a6a', '#d83a4a', '#7a1a28'], dirt: ['#e8c040', '#8a6a10'], plat: ['#ffd24d', '#a06a10'], dots: ['#ffffff', '#ffe14d', '#7ad8ff'] },
  { name: 'trapecios', skyTop: '#2a1a6a', skyBot: '#ff9ad0', hf: ['#6a3a9a', '#a85ac8'], hn: ['#4a2a80', '#7a3aa8'], grass: ['#7ad8ff', '#3aa0d8', '#1a5a8a'], dirt: ['#4a2a6a', '#24103a'], plat: ['#ffd24d', '#a06a10'], dots: ['#ffe14d', '#ff7eb6', '#ffffff'] },
  { name: 'gran final', skyTop: '#ff4a6a', skyBot: '#ffe14d', hf: ['#ff9a6a', '#e86a4a'], hn: ['#e85a5a', '#b83a4a'], grass: ['#ffe14d', '#e8b020', '#8a5a10'], dirt: ['#a02a3a', '#4a0e1a'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ff7eb6', '#7ad8ff'] },
  // ── nivel 18: París ──
  { name: 'calle parisina', skyTop: '#9ad8ff', skyBot: '#fff0d8', hf: ['#d8d0e8', '#b8a8d0'], hn: ['#e8d8c8', '#c8b098'], grass: ['#8ad870', '#4aa84a', '#2a6a2a'], dirt: ['#d8c8a8', '#a89070'], plat: ['#e8d8c0', '#9a8060'], dots: ['#ffffff', '#ff7eb6', '#ffe14d'] },
  { name: 'jardines de la torre', skyTop: '#ffc8a0', skyBot: '#fff4d0', hf: ['#c8b8d8', '#a898c0'], hn: ['#d8c8b8', '#b8a088'], grass: ['#a0e070', '#58b040', '#2a6a20'], dirt: ['#c8b898', '#907858'], plat: ['#6a6a8a', '#3a3a5a'], dots: ['#ff4a6a', '#ffe14d', '#ffffff'] },
  { name: 'orillas del Sena', skyTop: '#7ac0ff', skyBot: '#d8f0ff', hf: ['#a8c0e0', '#8098c8'], hn: ['#b8c8d8', '#90a8c0'], grass: ['#a8d878', '#60a850', '#306a30'], dirt: ['#b8b098', '#807860'], plat: ['#a8704a', '#603818'], dots: ['#ffffff', '#7ad8ff', '#ffe14d'] },
  { name: 'café del chef', skyTop: '#ff9ac0', skyBot: '#ffe8c8', hf: ['#e8b0c8', '#c888a8'], hn: ['#e8c0b0', '#c89888'], grass: ['#ffe8a8', '#e8c070', '#a07a30'], dirt: ['#d89070', '#904a38'], plat: ['#ff7eb6', '#a02a70'], dots: ['#ffffff', '#ff7eb6', '#ffe14d'] },
  // ── nivel 19: bacterias ──
  { name: 'placa de petri', skyTop: '#c8f0d8', skyBot: '#f4ffe8', hf: ['#a8d8b8', '#80b898'], hn: ['#90c8a8', '#68a888'], grass: ['#7ae0a0', '#38b070', '#1a6a40'], dirt: ['#d8e8a8', '#a0b868'], plat: ['#d8eaf0', '#7aa0b8'], dots: ['#ffffff', '#7ad8ff', '#ffe14d'] },
  { name: 'cultivo verde', skyTop: '#a0e8b0', skyBot: '#e8ffd8', hf: ['#70c890', '#48a870'], hn: ['#58b880', '#389860'], grass: ['#60d890', '#28a060', '#106a38'], dirt: ['#a8c878', '#688840'], plat: ['#c8e0f0', '#6a98b8'], dots: ['#ffffff', '#ff7eb6', '#c8ff7a'] },
  { name: 'microscopio', skyTop: '#2a3a6a', skyBot: '#7ad8c0', hf: ['#3a6a8a', '#58a0a8'], hn: ['#2a5a78', '#488898'], grass: ['#80f0b0', '#38c080', '#1a7a4a'], dirt: ['#2a4a5a', '#10242e'], plat: ['#a8e8f0', '#4a98b0'], dots: ['#c8ff7a', '#7ad8ff', '#ffffff'] },
  { name: 'nido del jefe', skyTop: '#3a8a5a', skyBot: '#d8ff98', hf: ['#58b070', '#389858'], hn: ['#489860', '#287848'], grass: ['#a0ff90', '#50c050', '#1a7a28'], dirt: ['#587a38', '#2a4018'], plat: ['#e8f4a8', '#8aa83a'], dots: ['#ffffff', '#ffe14d', '#c8ff7a'] },
  // ── nivel 20: mundo raro ──
  { name: 'colinas raras', skyTop: '#ffb0e8', skyBot: '#fff0a8', hf: ['#c898f0', '#9868d8'], hn: ['#b078e8', '#7a48c8'], grass: ['#ff9ad0', '#e05aa0', '#8a2a60'], dirt: ['#a07ae8', '#5a3aa0'], plat: ['#7ae8d0', '#2a9a8a'], dots: ['#ffffff', '#ffe14d', '#7ad8ff'] },
  { name: 'bosque de gusanos', skyTop: '#7ae8c8', skyBot: '#ffe8f8', hf: ['#58c8a8', '#389888'], hn: ['#48b898', '#2a8878'], grass: ['#ffb060', '#e07820', '#8a4208'], dirt: ['#c8708a', '#782a48'], plat: ['#e8b0ff', '#9a58c8'], dots: ['#ffffff', '#ff7eb6', '#c8ff7a'] },
  { name: 'cueva torcida', skyTop: '#3a1a6a', skyBot: '#c870e8', hf: ['#6a3a9a', '#a858c8'], hn: ['#4a2a80', '#7a3aa8'], grass: ['#7affc0', '#30c088', '#157a50'], dirt: ['#4a2a6a', '#24103a'], plat: ['#ffd24d', '#a06a10'], dots: ['#ffe14d', '#ff7eb6', '#7ad8ff'] },
  { name: 'guarida del jefe raro', skyTop: '#ff7ac8', skyBot: '#a8f0ff', hf: ['#e888d8', '#b858b8'], hn: ['#d868c8', '#a038a0'], grass: ['#ffe14d', '#e0a820', '#8a5a08'], dirt: ['#8a3a9a', '#3a1048'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ff7eb6', '#7ad8ff'] },
  // ── nivel 21: selva ──
  { name: 'entrada de la selva', skyTop: '#8ae0a0', skyBot: '#f4ffc8', hf: ['#58b868', '#388848'], hn: ['#48a858', '#2a7a3a'], grass: ['#7ae060', '#3aa838', '#1a6a20'], dirt: ['#a07848', '#583a1a'], plat: ['#b88a50', '#6a4a20'], dots: ['#ff7eb6', '#ffe14d', '#ffffff'] },
  { name: 'lianas', skyTop: '#58c888', skyBot: '#d8ffc0', hf: ['#38a058', '#287840'], hn: ['#2a9048', '#1a6a30'], grass: ['#58d858', '#28a030', '#106a18'], dirt: ['#8a6a3a', '#4a3010'], plat: ['#c89860', '#7a5428'], dots: ['#ffe14d', '#ff7eb6', '#7ad8ff'] },
  { name: 'río de la selva', skyTop: '#48b8a0', skyBot: '#c8f8e0', hf: ['#309880', '#207868'], hn: ['#288870', '#186858'], grass: ['#68e870', '#30b048', '#147028'], dirt: ['#7a6a48', '#3a2e18'], plat: ['#a0784a', '#5a3a18'], dots: ['#ffffff', '#7ad8ff', '#ffe14d'] },
  { name: 'guarida del gorila', skyTop: '#2a7a4a', skyBot: '#ffe8a0', hf: ['#287848', '#185a34'], hn: ['#206a3c', '#124a28'], grass: ['#90e050', '#58a828', '#2a6a10'], dirt: ['#6a4a2a', '#2e1a08'], plat: ['#d8a860', '#8a5a20'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  // ── nivel 22: granja ──
  { name: 'pradera de la granja', skyTop: '#9ad8ff', skyBot: '#f4ffe0', hf: ['#a8d878', '#78b858'], hn: ['#90c868', '#60a048'], grass: ['#8ae060', '#48b030', '#1f7020'], dirt: ['#b88a58', '#6a4620'], plat: ['#e8c070', '#a0702a'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'corral', skyTop: '#ffd8a0', skyBot: '#fff8e0', hf: ['#e8c898', '#c8a070'], hn: ['#d8b888', '#b89060'], grass: ['#f0d870', '#c8a830', '#7a6410'], dirt: ['#a07040', '#583a18'], plat: ['#c8884a', '#7a4a1a'], dots: ['#ffffff', '#ff7eb6', '#7ad8ff'] },
  { name: 'huerto de higueras', skyTop: '#c8b0ff', skyBot: '#ffe8f8', hf: ['#a888d0', '#8868b0'], hn: ['#9878c0', '#785aa0'], grass: ['#78d870', '#389838', '#1a5a20'], dirt: ['#8a6a58', '#4a3028'], plat: ['#e8b0ff', '#9a58c8'], dots: ['#ffffff', '#ff7eb6', '#c8ff7a'] },
  { name: 'campo del albaricoque', skyTop: '#ffb070', skyBot: '#fff0c0', hf: ['#f0a878', '#d08858'], hn: ['#e09868', '#c07848'], grass: ['#a0e060', '#58b028', '#2a6a10'], dirt: ['#c88850', '#7a4a20'], plat: ['#ffe9a8', '#c08a30'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  // ── nivel 23: colores (un mundo de cada color del arcoíris) ──
  { name: 'mundo rojo', skyTop: '#ff6a6a', skyBot: '#ffd0d0', hf: ['#ff9a9a', '#e86a6a'], hn: ['#ff7a7a', '#d84a4a'], grass: ['#ff4a4a', '#c01818', '#6a0808'], dirt: ['#c83030', '#6a1010'], plat: ['#ffe14d', '#b08a10'], dots: ['#ffffff', '#ffe14d', '#ff9ad0'] },
  { name: 'mundo naranja', skyTop: '#ff9a3a', skyBot: '#ffe0b8', hf: ['#ffbc7a', '#e8923a'], hn: ['#ffa44a', '#d8782a'], grass: ['#ff9a20', '#d86a08', '#7a3408'], dirt: ['#d8782a', '#7a3a10'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ff6a6a', '#ffe14d'] },
  { name: 'mundo amarillo', skyTop: '#ffe84a', skyBot: '#fffbd0', hf: ['#fff09a', '#e8d048'], hn: ['#ffe86a', '#d8c030'], grass: ['#ffe020', '#d8b808', '#7a6a08'], dirt: ['#d8b840', '#7a6410'], plat: ['#9a6aff', '#5a2ac0'], dots: ['#ffffff', '#ff9a3a', '#7ad8ff'] },
  { name: 'mundo verde', skyTop: '#5ae06a', skyBot: '#d8ffd8', hf: ['#8aef9a', '#48b858'], hn: ['#6ae07a', '#38a048'], grass: ['#3ad048', '#1a9028', '#0a501a'], dirt: ['#389048', '#14461e'], plat: ['#ff7eb6', '#b02a70'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'mundo azul', skyTop: '#4aaaff', skyBot: '#d0ecff', hf: ['#8ac8ff', '#4a90e0'], hn: ['#6ab4ff', '#3a78c8'], grass: ['#3a9aff', '#1a62c8', '#0a3278'], dirt: ['#2a62b0', '#0e2e66'], plat: ['#ffe14d', '#b08a10'], dots: ['#ffffff', '#7affd8', '#ffe14d'] },
  { name: 'mundo violeta', skyTop: '#9a5aff', skyBot: '#e8d8ff', hf: ['#c0a0ff', '#8a5ad8'], hn: ['#aa80ff', '#7a42c8'], grass: ['#9a4aff', '#6a1ac8', '#38087a'], dirt: ['#6a3ab0', '#2e1068'], plat: ['#7affc0', '#20a070'], dots: ['#ffffff', '#ff9ad0', '#ffe14d'] },
  { name: 'mundo rosa', skyTop: '#ff7ac8', skyBot: '#ffe0f4', hf: ['#ffa8dc', '#e870b0'], hn: ['#ff8ccc', '#d8509c'], grass: ['#ff6ac0', '#d82a90', '#7a0a50'], dirt: ['#d8509c', '#7a1e58'], plat: ['#7ad8ff', '#2a88c0'], dots: ['#ffffff', '#ffe14d', '#9a5aff'] },
  // ── nivel 24: rebuscado ──
  { name: 'sala de los espejos', skyTop: '#c8b8ff', skyBot: '#fff0ff', hf: ['#d8c8f8', '#b8a0e8'], hn: ['#c0a8f0', '#9878d0'], grass: ['#a8e0ff', '#4a78c8', '#1a3070'], dirt: ['#6a50a0', '#2a1850'], plat: ['#ffe8a0', '#a8782a'], dots: ['#ffffff', '#ffe14d', '#ff9ad0'] },
  { name: 'cocina loca', skyTop: '#ffd8a8', skyBot: '#fff8e8', hf: ['#f8d8b8', '#e8b890'], hn: ['#f0c8a0', '#d09870'], grass: ['#ffa8a8', '#c85a5a', '#7a2020'], dirt: ['#c86a4a', '#6a2a18'], plat: ['#a8e0ff', '#4a88b8'], dots: ['#ffffff', '#ffe14d', '#7ad8ff'] },
  { name: 'biblioteca flotante', skyTop: '#a8d8e8', skyBot: '#f4ffff', hf: ['#b8e0d8', '#88c0b8'], hn: ['#a0d0c8', '#68a8a0'], grass: ['#a0f0c0', '#38986a', '#1a5a38'], dirt: ['#5a8a68', '#1f4a38'], plat: ['#ffd070', '#a07020'], dots: ['#ffffff', '#ffe14d', '#ff7eb6'] },
  { name: 'tejado del reloj', skyTop: '#ffc8e8', skyBot: '#fff0f8', hf: ['#f8c0d8', '#e898b8'], hn: ['#f0a8c8', '#d070a0'], grass: ['#ffe070', '#b08a10', '#6a4a08'], dirt: ['#d05a8a', '#6a1a40'], plat: ['#a0e8ff', '#2a88b8'], dots: ['#ffffff', '#ffe14d', '#9a5aff'] },
  // ── nivel 25: tecnología ──
  { name: 'laboratorio', skyTop: '#9ad8ff', skyBot: '#f0ffff', hf: ['#b8e8f8', '#88c8e8'], hn: ['#a0d8f0', '#68b0d8'], grass: ['#8af0f0', '#28a8c8', '#106078'], dirt: ['#5a7a98', '#1f3248'], plat: ['#e8f0ff', '#6a80a8'], dots: ['#ffffff', '#7affd8', '#ff7eb6'] },
  { name: 'oficina de cables', skyTop: '#d8d8f0', skyBot: '#fffff0', hf: ['#d0d0e8', '#a8a8c8'], hn: ['#c0c0dc', '#9090b4'], grass: ['#f0e070', '#b09820', '#6a5808'], dirt: ['#6a6a88', '#2a2a40'], plat: ['#ffb870', '#b06820'], dots: ['#ffffff', '#ff7e7e', '#7ad8ff'] },
  { name: 'ciudad neón', skyTop: '#2a1a5a', skyBot: '#ff7ad8', hf: ['#6a3aa8', '#4a2a88'], hn: ['#5a2a98', '#3a1a78'], grass: ['#40ffd0', '#10a890', '#085048'], dirt: ['#3a2a6a', '#120a30'], plat: ['#ff7ad8', '#a82a88'], dots: ['#40ffd0', '#ffee40', '#ff7ad8'], stars: true },
  { name: 'sala de servidores', skyTop: '#1a2a4a', skyBot: '#5a8ac8', hf: ['#3a5a88', '#2a4468'], hn: ['#2a4a78', '#1a3458'], grass: ['#70ff90', '#20a850', '#085020'], dirt: ['#2a3a58', '#0a1228'], plat: ['#70d8ff', '#2a78a8'], dots: ['#70ff90', '#ffee40', '#70d8ff'], stars: true },
  // ── nivel 26: Navidad ──
  { name: 'bosque nevado', skyTop: '#9ac8f0', skyBot: '#f4faff', hf: ['#dcecf8', '#b8d4ec'], hn: ['#cce0f4', '#a0c0e0'], grass: ['#ffffff', '#c8dcf0', '#8aa8c8'], dirt: ['#8a6a50', '#4a3424'], plat: ['#ff6a6a', '#a82030'], dots: ['#ffffff', '#c8e8ff', '#ffe14d'] },
  { name: 'pueblo navideño', skyTop: '#3a3a8a', skyBot: '#ffc8a0', hf: ['#a8b8e0', '#8898c8'], hn: ['#98a8d8', '#7888b8'], grass: ['#f4f8ff', '#b8c8e8', '#7a8cb0'], dirt: ['#7a5a48', '#3a2418'], plat: ['#6adf8a', '#208040'], dots: ['#ffe14d', '#ff7e7e', '#7affb0'], stars: true },
  { name: 'fábrica de juguetes', skyTop: '#ffd0c8', skyBot: '#fff8e8', hf: ['#f0c8c0', '#d8a098'], hn: ['#e8b8b0', '#c89088'], grass: ['#7ad88a', '#30a050', '#106030'], dirt: ['#a85a58', '#582828'], plat: ['#ffe14d', '#b08a10'], dots: ['#ff6a6a', '#ffe14d', '#6ab0ff'] },
  { name: 'Polo Norte', skyTop: '#0a1a4a', skyBot: '#5adfc8', hf: ['#6a98d8', '#4a78b8'], hn: ['#5a88c8', '#3a68a8'], grass: ['#e8fcff', '#98d8f0', '#4a98c0'], dirt: ['#4a5a88', '#1a2248'], plat: ['#ff9ad0', '#a83a88'], dots: ['#ffffff', '#5affc8', '#ff9ad0'], stars: true },
  // ── nivel 27: lenguas y babas ──
  { name: 'boca rosa', skyTop: '#ffb8d0', skyBot: '#fff0f6', hf: ['#ffc8dc', '#f098b8'], hn: ['#ffb0cc', '#e07aa0'], grass: ['#ff7aa8', '#c83878', '#7a1840'], dirt: ['#d85a80', '#701a3a'], plat: ['#fff8e8', '#c8b898'], dots: ['#ffffff', '#ffe14d', '#9aff7a'] },
  { name: 'pantano de baba', skyTop: '#c8f0a8', skyBot: '#f4ffe8', hf: ['#b8e898', '#88c868'], hn: ['#a8d888', '#68b048'], grass: ['#b8ff70', '#58b820', '#286808'], dirt: ['#6aa040', '#244a10'], plat: ['#e8ffb0', '#88a830'], dots: ['#ffffff', '#ffff70', '#ff9ad0'] },
  { name: 'campo de lenguas', skyTop: '#ff9ac0', skyBot: '#ffe0ec', hf: ['#f08ab0', '#d06090'], hn: ['#e87aa0', '#c05080'], grass: ['#ff5a90', '#b81858', '#6a0830'], dirt: ['#c03868', '#5a1028'], plat: ['#ffd0e0', '#c06088'], dots: ['#ffffff', '#ffe14d', '#7affd0'] },
  { name: 'la gran garganta', skyTop: '#3a1030', skyBot: '#c03070', hf: ['#802050', '#601040'], hn: ['#701848', '#500838'], grass: ['#ff80b0', '#c02870', '#701040'], dirt: ['#601030', '#280818'], plat: ['#ffb0d0', '#a03868'], dots: ['#ffffff', '#ff9ad0', '#9aff7a'], stars: true },
  // ── nivel 28: fútbol ──
  { name: 'césped', skyTop: '#8ad0ff', skyBot: '#f0fff0', hf: ['#a8e0a8', '#78c078'], hn: ['#90d890', '#58b058'], grass: ['#78e060', '#38a030', '#186010'], dirt: ['#7aa850', '#2a4a18'], plat: ['#ffffff', '#b0b8c8'], dots: ['#ffffff', '#ffe14d', '#ff7e7e'] },
  { name: 'tribuna', skyTop: '#7ac0f0', skyBot: '#e8f4ff', hf: ['#c8d0e0', '#98a0c0'], hn: ['#b8c0d8', '#8890b0'], grass: ['#68d858', '#30a028', '#146010'], dirt: ['#8a9ab8', '#2a3248'], plat: ['#ff6a6a', '#a82030'], dots: ['#ffffff', '#ffe14d', '#6ab0ff'] },
  { name: 'vestuarios', skyTop: '#d8e8f8', skyBot: '#ffffff', hf: ['#c0d0e8', '#90a8c8'], hn: ['#b0c4e0', '#8098b8'], grass: ['#78c8f0', '#2888c0', '#104870'], dirt: ['#6a88b0', '#223048'], plat: ['#ffe14d', '#b08a10'], dots: ['#ffffff', '#ff7e7e', '#7affb0'] },
  { name: 'noche de estadio', skyTop: '#101a4a', skyBot: '#4a68c0', hf: ['#3a58a0', '#284080'], hn: ['#2a4890', '#1a3070'], grass: ['#58e870', '#20a040', '#086020'], dirt: ['#3a5a48', '#102018'], plat: ['#ffffff', '#8898b8'], dots: ['#ffffff', '#ffe14d', '#7ad8ff'], stars: true },
];
function canvas(scene, key, w, h, draw) {
  const t = scene.textures.createCanvas(key, w, h);
  const c = t.getContext();
  draw(c, w, h);
  t.refresh();
}
function wob(c, x1, y1, x2, y2, j = 1.2, seg = 6) {
  c.beginPath(); c.moveTo(x1, y1);
  const n = Math.max(2, Math.floor(Math.hypot(x2 - x1, y2 - y1) / seg));
  for (let i = 1; i <= n; i++) c.lineTo(x1 + (x2 - x1) * i / n + rr(-j, j), y1 + (y2 - y1) * i / n + rr(-j, j));
  c.stroke();
}
function eye(c, x, y, rx, ry, pupil = 0.45) {
  c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = Math.max(2, rx * 0.16);
  c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.fill(); c.stroke();
  c.fillStyle = INK; c.beginPath(); c.ellipse(x + rx * 0.08, y + ry * 0.12, rx * pupil, ry * pupil * 1.25, 0, 0, 7); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(x - rx * 0.12, y - ry * 0.12, Math.max(1.5, rx * 0.14), 0, 7); c.fill();
}
function blob(c, pts, fill, line = INK, lw = 4) {
  c.fillStyle = fill; c.strokeStyle = line; c.lineWidth = lw; c.lineJoin = 'round';
  c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.fill(); c.stroke();
}

export function makeTextures(scene) {
  canvas(scene, 'px', 4, 4, (c) => { c.fillStyle = '#fff'; c.fillRect(0, 0, 4, 4); });
  canvas(scene, 'oscuro', 1600, 1000, (c, w, h) => { c.fillStyle = 'rgba(14,4,34,0.96)'; c.fillRect(0, 0, w, h); const g = c.createRadialGradient(w / 2, h / 2, 90, w / 2, h / 2, 270); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.globalCompositeOperation = 'destination-out'; c.fillStyle = g; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over'; });
  canvas(scene, 'agua_suelo', 64, 80, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#4cc9f0'); g.addColorStop(1, '#1a5aa8'); c.fillStyle = g; c.fillRect(0, 0, w, h); c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); for (let x = 0; x <= w; x += 4) { const y = 8 + Math.sin(x / w * Math.PI * 2) * 4; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.strokeStyle = 'rgba(255,255,255,0.3)'; c.lineWidth = 3; c.beginPath(); for (let x = 0; x <= w; x += 4) { const y = 34 + Math.sin(x / w * Math.PI * 2 + 2) * 4; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); });
  // suelo de nubes (nivel 3): solo nubes, sin tierra
  canvas(scene, 'nube_suelo', 128, 80, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#cfe6ff');
    c.fillStyle = g; c.strokeStyle = '#a9cdf0'; c.lineWidth = 3;
    const blob = (x, y, r) => { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.stroke(); };
    for (const x of [0, 42, 86, 128]) blob(x, 24 + (x % 2 ? 2 : 0), 24);
    for (const x of [20, 64, 108]) blob(x, 60, 18);
    c.fillStyle = g; c.fillRect(0, 26, w, 34);
    for (const x of [0, 42, 86, 128]) { c.fillStyle = '#fff'; c.beginPath(); c.arc(x, 24 + (x % 2 ? 2 : 0), 21, 0, 7); c.fill(); }
    for (const x of [20, 64, 108]) { c.fillStyle = '#e4f1ff'; c.beginPath(); c.arc(x, 60, 15, 0, 7); c.fill(); }
  });
  // nube gigante (nivel 3): plataforma como las setas gigantes; la superficie está a 26 px del borde superior
  canvas(scene, 'nube_gigante', 400, 150, (c, w, h) => {
    const g = c.createLinearGradient(0, 20, 0, 140); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#cfe6ff');
    const blobs = [[60, 70, 44], [130, 52, 46], [205, 44, 50], [280, 52, 46], [345, 70, 44], [100, 96, 44], [200, 100, 52], [300, 96, 44]];
    c.fillStyle = '#a9cdf0'; for (const [x, y, r] of blobs) { c.beginPath(); c.arc(x, y + 20, r + 4, 0, 7); c.fill(); }
    c.fillStyle = g; for (const [x, y, r] of blobs) { c.beginPath(); c.arc(x, y + 20, r, 0, 7); c.fill(); }
    c.fillStyle = g; c.fillRect(70, 62, 260, 60);
    c.fillStyle = '#ffb8d0'; for (const x of [140, 260]) { c.beginPath(); c.ellipse(x, 98, 14, 8, 0, 0, 7); c.fill(); }
    c.fillStyle = '#fff'; c.strokeStyle = '#2b2b44'; c.lineWidth = 5; c.beginPath(); c.ellipse(200, 82, 18, 22, 0, 0, 7); c.fill(); c.stroke();
    c.fillStyle = '#2b2b44'; c.beginPath(); c.ellipse(202, 86, 9, 12, 0, 0, 7); c.fill();
    c.beginPath(); c.moveTo(184, 114); c.quadraticCurveTo(200, 128, 216, 114); c.stroke();
  });
  canvas(scene, 'olas', 64, 48, (c, w, h) => { c.fillStyle = '#2a8ad0'; c.fillRect(0, 0, w, h); c.fillStyle = '#46aef0'; c.fillRect(0, 0, w, 16); c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); for (let x = 0; x <= w; x += 4) { const y = 9 + Math.sin(x / w * Math.PI * 2) * 4; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); });

  ZONES.forEach((z, i) => {
    // cielo
    canvas(scene, 'sky' + i, 8, 540, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, z.skyTop); g.addColorStop(1, z.skyBot);
      c.fillStyle = g; c.fillRect(0, 0, w, h);
    });
    if (z.stars) canvas(scene, 'stars' + i, 960, 400, (c) => {
      for (let k = 0; k < 90; k++) { c.fillStyle = `rgba(255,255,255,${rr(0.4, 1)})`; c.beginPath(); c.arc(rr(0, 960), rr(0, 400), rr(0.8, 2.6), 0, 7); c.fill(); }
    });
    // colinas
    const hills = (key, col, amp, f, ph, base) => canvas(scene, key, 960, 260, (c, w, h) => {
      const y = (x) => base - Math.sin((x / w) * Math.PI * 2 * f + ph) * amp - Math.sin((x / w) * Math.PI * 4 * f + ph * 2) * amp * .3;
      c.fillStyle = col[0]; c.beginPath(); c.moveTo(0, h); for (let x = 0; x <= w; x += 8) c.lineTo(x, y(x)); c.lineTo(w, h); c.closePath(); c.fill();
      c.strokeStyle = col[1]; c.lineWidth = 5; c.lineJoin = 'round'; c.beginPath(); for (let x = 0; x <= w; x += 8) (x ? c.lineTo(x, y(x)) : c.moveTo(x, y(x))); c.stroke();
      // lunares / rayas locas
      c.fillStyle = col[1] + '55';
      for (let k = 0; k < 7; k++) { const x = rr(20, 940); c.beginPath(); c.arc(x, y(x) + rr(30, 80), rr(8, 18), 0, 7); c.fill(); }
    });
    // volcanes: siluetas con cráter brillante (se repite sin costuras)
    const peaks = (key, col, n, hmin, hmax, base) => canvas(scene, key, 960, 260, (c, w, h) => {
      const xs = [];
      for (let k = 0; k < n; k++) xs.push([(k + 0.5) * w / n + rr(-30, 30), rr(hmin, hmax), rr(70, 110)]);
      c.fillStyle = col[0]; c.beginPath(); c.moveTo(0, h); c.lineTo(0, base);
      xs.forEach(([x, hh, wd]) => { c.lineTo(x - wd, base); c.lineTo(x - wd * 0.2, base - hh); c.lineTo(x + wd * 0.2, base - hh); c.lineTo(x + wd, base); });
      c.lineTo(w, base); c.lineTo(w, h); c.closePath(); c.fill();
      xs.forEach(([x, hh, wd]) => {
        c.fillStyle = col[1]; c.beginPath(); c.ellipse(x, base - hh + 1, wd * 0.24, 6, 0, 0, 7); c.fill();
        c.strokeStyle = col[1]; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, base - hh + 4); c.lineTo(x + rr(-14, 14), base - hh * 0.55); c.lineTo(x + rr(-20, 20), base - hh * 0.2); c.stroke();
      });
    });
    // montones de nubes (se repiten sin costuras)
    const puffs = (key, col, base, rmin, rmax) => canvas(scene, key, 960, 260, (c, w, h) => {
      const cs = []; for (let x = 0; x < w; x += rr(40, 80)) cs.push([x, base + rr(-14, 14), rr(rmin, rmax)]);
      c.fillStyle = col[1]; cs.forEach(([x, y, r]) => [-w, 0, w].forEach((o) => { c.beginPath(); c.arc(x + o, y + 6, r, 0, 7); c.fill(); }));
      c.fillStyle = col[0]; cs.forEach(([x, y, r]) => [-w, 0, w].forEach((o) => { c.beginPath(); c.arc(x + o, y, r, 0, 7); c.fill(); }));
      c.fillStyle = col[0]; c.fillRect(0, base + 20, w, h);
    });
    // ciudad futurista: siluetas de edificios con ventanas
    const skyline = (key, col, minH, maxH, wmin, wmax, base) => canvas(scene, key, 960, 260, (c, w, h) => {
      let x = -10;
      while (x < w) {
        const bw = rr(wmin, wmax), bh = rr(minH, maxH);
        c.fillStyle = col[0]; c.fillRect(x, base - bh, bw, h);
        c.fillStyle = col[1] + 'cc';
        for (let wy = base - bh + 10; wy < base - 8; wy += 16) for (let wx = x + 6; wx < x + bw - 8; wx += 14) if (Math.random() < 0.45) c.fillRect(wx, wy, 6, 8);
        c.fillStyle = col[1]; c.fillRect(x, base - bh, bw, 3);
        if (Math.random() < 0.3) { c.fillRect(x + bw / 2 - 1, base - bh - 20, 3, 20); c.beginPath(); c.arc(x + bw / 2, base - bh - 22, 4, 0, 7); c.fill(); }
        x += bw + rr(2, 10);
      }
    });
    if (z.tech) { skyline('hf' + i, z.hf, 70, 150, 40, 80, 215); skyline('hn' + i, z.hn, 40, 100, 50, 100, 240); }
    else if (z.lava) { peaks('hf' + i, z.hf, 4, 90, 150, 215); peaks('hn' + i, z.hn, 3, 60, 100, 235); }
    else if (z.cloud) { puffs('hf' + i, z.hf, 170, 38, 70); puffs('hn' + i, z.hn, 215, 30, 52); }
    else {
      hills('hf' + i, z.hf, 38, 2, 0.5 + i, 150);
      hills('hn' + i, z.hn, 30, 3, 2.0 + i, 190);
    }
    // suelo 64x80
    if (z.lava) canvas(scene, 'ground' + i, 64, 80, (c, w, h) => {
      c.fillStyle = z.rock[1]; c.fillRect(0, 0, w, h);
      c.fillStyle = z.rock[0]; c.fillRect(0, 0, w, 22);
      c.beginPath(); c.moveTo(0, 20); for (let x = 0; x <= w; x += 16) c.quadraticCurveTo(x + 8, 40, x + 16, 20); c.lineTo(w, 0); c.lineTo(0, 0); c.closePath(); c.fill();
      c.strokeStyle = INK; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 21); for (let x = 0; x <= w; x += 16) c.quadraticCurveTo(x + 8, 41, x + 16, 21); c.stroke();
      c.strokeStyle = z.rock[2]; c.lineWidth = 3; c.beginPath(); c.moveTo(10, 44); c.lineTo(22, 54); c.lineTo(18, 68); c.moveTo(44, 38); c.lineTo(38, 52); c.lineTo(52, 66); c.stroke();
      c.fillStyle = z.rock[2] + '88'; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(rr(6, 58), rr(46, 74), rr(2, 4), 0, 7); c.fill(); }
      c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 2; wob(c, 2, 6, w - 2, 6, 1, 6);
    });
    else if (z.cloud) canvas(scene, 'ground' + i, 64, 80, (c, w, h) => {
      c.fillStyle = z.cl[1]; c.fillRect(0, 0, w, h);
      c.fillStyle = z.cl[0]; c.fillRect(0, 0, w, 28);
      for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(8 + k * 16, 28, 11, 0, 7); c.fill(); }
      c.strokeStyle = z.cl[2]; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 28); for (let k = 0; k < 4; k++) c.arc(8 + k * 16, 28, 8, Math.PI, 0, true); c.stroke();
      c.fillStyle = z.cl[2] + '55'; for (let k = 0; k < 5; k++) { c.beginPath(); c.ellipse(rr(6, 58), rr(44, 74), rr(5, 9), rr(3, 5), 0, 0, 7); c.fill(); }
      c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 2; wob(c, 2, 8, w - 2, 8, 1, 6);
    });
    else canvas(scene, 'ground' + i, 64, 80, (c, w, h) => {
      c.fillStyle = z.dirt[0]; c.fillRect(0, 0, w, h);
      c.fillStyle = z.dirt[1] + '66';
      for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(rr(4, 60), rr(30, 74), rr(2, 4), 0, 7); c.fill(); }
      for (let k = 0; k < 4; k++) { c.fillStyle = z.dots[k % z.dots.length]; c.beginPath(); c.ellipse(rr(6, 58), rr(34, 72), 4, 2.4, rr(0, 3), 0, 7); c.fill(); }
      c.fillStyle = z.grass[0]; c.fillRect(0, 0, w, 20);
      c.fillStyle = z.grass[1];
      c.beginPath(); c.moveTo(0, 18);
      for (let x = 0; x <= w; x += 16) { c.quadraticCurveTo(x + 8, 40, x + 16, 18); }
      c.lineTo(w, 0); c.lineTo(0, 0); c.closePath(); c.fill();
      c.strokeStyle = z.grass[2]; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 19);
      for (let x = 0; x <= w; x += 16) c.quadraticCurveTo(x + 8, 40, x + 16, 19); c.stroke();
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2; wob(c, 2, 6, w - 2, 6, 1, 6);
    });
    // plataforma 64x28
    canvas(scene, 'plat' + i, 64, 28, z.cloud ? (c, w, h) => {
      c.fillStyle = z.cl[1]; c.fillRect(0, 14, w, 14);
      c.fillStyle = z.cl[0]; c.fillRect(0, 8, w, 16);
      for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(8 + k * 16, 10, 9, 0, 7); c.fill(); }
      c.strokeStyle = z.cl[2]; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 22); c.lineTo(w, 22); c.stroke();
      c.beginPath(); for (let k = 0; k < 4; k++) { c.moveTo(k * 16 - 1, 10); c.arc(8 + k * 16, 10, 9, Math.PI, 0); } c.stroke();
    } : (c, w, h) => {
      c.fillStyle = z.plat[1]; c.fillRect(0, 0, w, h);
      c.fillStyle = z.plat[0]; c.fillRect(0, 0, w, 10);
      c.fillStyle = 'rgba(255,255,255,.35)'; for (let x = 4; x < w; x += 16) c.fillRect(x, 3, 8, 3);
      c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(0, 0, w, h);
      c.lineWidth = 2; c.strokeStyle = INK + '88'; c.beginPath(); c.moveTo(32, 10); c.lineTo(32, h); c.stroke();
    });
  });

  // lava (se repite en horizontal) y bola de fuego del jefe
  canvas(scene, 'lava', 128, 110, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffd23a'); g.addColorStop(0.25, '#ff8a1f'); g.addColorStop(1, '#b8200f');
    const top = (x) => 16 + Math.sin(x / w * Math.PI * 4) * 5;
    c.fillStyle = g; c.beginPath(); c.moveTo(0, h); c.lineTo(0, top(0)); for (let x = 0; x <= w; x += 4) c.lineTo(x, top(x)); c.lineTo(w, h); c.closePath(); c.fill();
    c.strokeStyle = '#fff3a0'; c.lineWidth = 4; c.lineJoin = 'round'; c.beginPath(); for (let x = 0; x <= w; x += 4) (x ? c.lineTo(x, top(x)) : c.moveTo(x, top(x))); c.stroke();
    c.fillStyle = 'rgba(255,240,150,.7)'; [[22, 46, 9], [74, 62, 12], [108, 40, 7], [50, 84, 8]].forEach(([x, y, r]) => { c.beginPath(); c.ellipse(x, y, r, r * 0.6, 0, 0, 7); c.fill(); });
  });
  canvas(scene, 'ember', 46, 58, (c) => {
    c.fillStyle = '#ff8a1f'; c.strokeStyle = '#7a1a0a'; c.lineWidth = 4; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(23, 2); c.quadraticCurveTo(46, 30, 40, 40); c.quadraticCurveTo(34, 56, 23, 56); c.quadraticCurveTo(10, 56, 6, 40); c.quadraticCurveTo(2, 28, 23, 2); c.fill(); c.stroke();
    c.fillStyle = '#ffd23a'; c.beginPath(); c.ellipse(23, 40, 11, 12, 0, 0, 7); c.fill();
    eye(c, 23, 38, 7, 9, 0.5);
  });

  canvas(scene, 'star', 40, 40, (c) => {
    c.translate(20, 21); c.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? 9 : 18; c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); }
    c.closePath(); c.fillStyle = '#ffd93b'; c.fill(); c.lineWidth = 3.5; c.strokeStyle = INK; c.lineJoin = 'round'; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(-4, -5, 3, 0, 7); c.fill();
  });
  canvas(scene, 'seed', 26, 26, (c) => {
    c.fillStyle = '#7ed957'; c.beginPath(); c.arc(13, 13, 10, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#d6ff9e'; c.beginPath(); c.arc(9, 9, 3, 0, 7); c.fill();
  });
  canvas(scene, 'spark', 16, 16, (c) => {
    const g = c.createRadialGradient(8, 8, 0, 8, 8, 8); g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, 16, 16);
  });
  canvas(scene, 'heart', 28, 26, (c) => { c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(14, 24); c.bezierCurveTo(-4, 12, 4, -2, 14, 8); c.bezierCurveTo(24, -2, 32, 12, 14, 24); c.fill(); });
  canvas(scene, 'bub', 28, 28, (c) => {
    c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 3; c.fillStyle = 'rgba(255,255,255,.18)';
    c.beginPath(); c.arc(14, 14, 11, 0, 7); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.arc(10, 9, 3, 0, 7); c.fill();
  });
  canvas(scene, 'cloud', 220, 90, (c) => {
    c.fillStyle = '#fff'; c.strokeStyle = 'rgba(43,43,68,.35)'; c.lineWidth = 4;
    const bumps = [[50, 58, 30], [90, 42, 38], [135, 46, 36], [170, 60, 28], [110, 64, 30]];
    c.beginPath(); bumps.forEach(([x, y, r]) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, 7); }); c.fill();
    c.fillRect(30, 58, 160, 30);
    c.fillStyle = 'rgba(255,170,200,.5)'; c.beginPath(); c.ellipse(70, 66, 9, 5, 0, 0, 7); c.ellipse(150, 66, 9, 5, 0, 0, 7); c.fill();
    c.fillStyle = INK; c.beginPath(); c.arc(92, 62, 3.5, 0, 7); c.arc(128, 62, 3.5, 0, 7); c.fill();
    c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(110, 64, 9, 0.2, Math.PI - 0.2); c.stroke();
  });

  // ── banderas
  const flag = (key, col) => canvas(scene, key, 90, 170, (c) => {
    c.strokeStyle = INK; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(14, 166); c.lineTo(14, 8); c.stroke();
    c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(14, 166); c.lineTo(14, 8); c.stroke();
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(16, 12); c.lineTo(84, 34); c.lineTo(16, 72); c.closePath(); c.fill(); c.stroke();
    eye(c, 38, 43, 11, 14);
  });
  flag('flag_off', '#c9c9dd'); flag('flag_on', '#ff6b8b'); flag('goal', '#ffd93b');

  // ── decoración rara
  canvas(scene, 'flower', 34, 50, (c) => {
    c.strokeStyle = '#2f8a3a'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(17, 48); c.quadraticCurveTo(10, 32, 17, 20); c.stroke();
    c.fillStyle = '#ff7eb6'; c.strokeStyle = INK; c.lineWidth = 2.5;
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; c.beginPath(); c.arc(17 + Math.cos(a) * 8, 14 + Math.sin(a) * 8, 6, 0, 7); c.fill(); c.stroke(); }
    eye(c, 17, 14, 7, 8, 0.5);
  });
  canvas(scene, 'lolly', 90, 170, (c) => {
    c.strokeStyle = INK; c.lineWidth = 11; c.lineCap = 'round'; c.beginPath(); c.moveTo(45, 166); c.lineTo(45, 80); c.stroke();
    c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.moveTo(45, 166); c.lineTo(45, 80); c.stroke();
    c.fillStyle = '#ff6bb0'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.arc(45, 46, 38, 0, 7); c.fill(); c.stroke();
    c.strokeStyle = '#fff'; c.lineWidth = 7; c.beginPath();
    for (let a = 0; a < 18; a += 0.15) { const r = 3 + a * 2; const x = 45 + Math.cos(a) * r, y = 46 + Math.sin(a) * r; a ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  });
  canvas(scene, 'cane', 56, 120, (c) => {
    const path = () => { c.beginPath(); c.moveTo(14, 116); c.lineTo(14, 36); c.arc(30, 36, 16, Math.PI, 0); c.lineTo(46, 52); };
    c.lineCap = 'round'; c.lineJoin = 'round'; path(); c.strokeStyle = INK; c.lineWidth = 17; c.stroke();
    path(); c.strokeStyle = '#fff'; c.lineWidth = 10; c.stroke();
    path(); c.strokeStyle = '#ff4d6d'; c.lineWidth = 10; c.setLineDash([9, 13]); c.lineCap = 'butt'; c.stroke(); c.setLineDash([]);
  });
  canvas(scene, 'mush', 120, 150, (c) => {
    c.fillStyle = '#fff3d6'; c.strokeStyle = INK; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(42, 148); c.quadraticCurveTo(48, 100, 44, 70); c.lineTo(76, 70); c.quadraticCurveTo(72, 100, 78, 148); c.closePath(); c.fill(); c.stroke();
    eye(c, 60, 104, 11, 14);
    c.fillStyle = '#b36bff'; c.beginPath(); c.moveTo(6, 74); c.quadraticCurveTo(60, -20, 114, 74); c.quadraticCurveTo(60, 88, 6, 74); c.fill(); c.stroke();
    c.fillStyle = '#fff'; [[40, 40, 10], [70, 28, 8], [84, 52, 9], [56, 62, 6]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); });
  });
  canvas(scene, 'crystal', 70, 100, (c) => {
    blob(c, [[35, 4], [58, 50], [46, 96], [24, 96], [12, 50]], '#69e6ff');
    blob(c, [[35, 4], [58, 50], [35, 60]], '#b8f6ff', INK, 3);
    blob(c, [[12, 50], [35, 60], [24, 96]], '#3bb8d8', INK, 3);
    c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.ellipse(28, 30, 3, 8, 0.3, 0, 7); c.fill();
  });
  canvas(scene, 'cactus', 76, 120, (c) => {
    c.fillStyle = '#6fd66b'; c.strokeStyle = INK; c.lineWidth = 5; c.lineJoin = 'round'; c.lineCap = 'round';
    const rr_ = (x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); c.stroke(); };
    rr_(8, 36, 16, 40, 8); rr_(52, 24, 16, 44, 8); rr_(8, 66, 56, 14, 7); rr_(24, 6, 28, 112, 14);
    eye(c, 38, 48, 11, 14);
  });
  canvas(scene, 'rock', 80, 84, (c) => {
    blob(c, [[6, 82], [14, 40], [34, 12], [58, 20], [72, 52], [76, 82]], '#6b4458', INK, 5);
    c.strokeStyle = '#ff9a2a'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(20, 80); c.lineTo(24, 66); c.moveTo(60, 80); c.lineTo(56, 68); c.stroke();
    eye(c, 42, 44, 12, 15);
  });
  canvas(scene, 'fireflower', 44, 66, (c) => {
    c.strokeStyle = '#7a3a2a'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(22, 64); c.quadraticCurveTo(14, 46, 22, 30); c.stroke();
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.55; blob(c, [[22, 26], [22 + Math.cos(a - .3) * 14, 26 + Math.sin(a - .3) * 14], [22 + Math.cos(a) * 26, 26 + Math.sin(a) * 26], [22 + Math.cos(a + .3) * 14, 26 + Math.sin(a + .3) * 14]], i % 2 ? '#ffd23a' : '#ff7a1f', '#7a1a0a', 2.5); }
    eye(c, 22, 30, 7, 8, 0.5);
  });
  canvas(scene, 'obsidian', 70, 100, (c) => {
    blob(c, [[35, 4], [58, 50], [46, 96], [24, 96], [12, 50]], '#3a2a55');
    blob(c, [[35, 4], [58, 50], [35, 60]], '#6a5a95', INK, 3);
    blob(c, [[12, 50], [35, 60], [24, 96]], '#241838', INK, 3);
    c.fillStyle = 'rgba(255,170,90,.85)'; c.beginPath(); c.ellipse(28, 30, 3, 8, 0.3, 0, 7); c.fill();
  });
  canvas(scene, 'spring', 100, 64, (c) => {
    c.fillStyle = '#fff3d6'; c.strokeStyle = INK; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.roundRect(34, 34, 32, 28, 8); c.fill(); c.stroke();
    c.fillStyle = '#ff5fa2'; c.beginPath(); c.moveTo(6, 40); c.quadraticCurveTo(50, -14, 94, 40); c.quadraticCurveTo(50, 52, 6, 40); c.fill(); c.stroke();
    c.fillStyle = '#fff'; [[30, 28, 6], [52, 14, 6], [72, 28, 6]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); });
  });
  canvas(scene, 'skyeye', 76, 50, (c) => {
    c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 3;
    [[12, 24, -0.6], [64, 24, 0.6]].forEach(([x, y, r]) => { c.beginPath(); c.ellipse(x, y, 13, 7, r, 0, 7); c.fill(); c.stroke(); });
    eye(c, 38, 26, 17, 17, 0.5);
  });
  canvas(scene, 'sunface', 150, 150, (c) => {
    c.fillStyle = '#ffd93b'; c.strokeStyle = INK; c.lineWidth = 5; c.lineJoin = 'round';
    for (let i = 0; i < 14; i++) { const a = i * Math.PI * 2 / 14; c.beginPath(); c.moveTo(75 + Math.cos(a - .13) * 52, 75 + Math.sin(a - .13) * 52); c.lineTo(75 + Math.cos(a) * 72, 75 + Math.sin(a) * 72); c.lineTo(75 + Math.cos(a + .13) * 52, 75 + Math.sin(a + .13) * 52); c.fill(); c.stroke(); }
    c.fillStyle = '#ffe96b'; c.beginPath(); c.arc(75, 75, 48, 0, 7); c.fill(); c.stroke();
    eye(c, 75, 72, 24, 30, 0.5);
    c.fillStyle = 'rgba(255,120,140,.6)'; c.beginPath(); c.ellipse(40, 92, 9, 6, 0, 0, 7); c.ellipse(110, 92, 9, 6, 0, 0, 7); c.fill();
  });
}
