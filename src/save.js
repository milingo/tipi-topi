// Progreso guardado (estrellas, compras y objetos puestos). Si localStorage falla, se guarda solo en memoria.
const KEY = 'tipitopi.save.v1';
let mem = null;
const blank = () => ({ stars: 0, owned: {}, equip: { hat: null, skin: null, weapon: null, trail: null } });
export function getSave() {
  if (mem) return mem;
  try { const r = localStorage.getItem(KEY); mem = r ? JSON.parse(r) : blank(); } catch (e) { mem = blank(); }
  const b = blank();
  mem.stars = Number(mem.stars) || 0; mem.owned = mem.owned || {}; mem.equip = Object.assign(b.equip, mem.equip || {});
  return mem;
}
export function persist() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* sin almacenamiento: solo memoria */ } }
export function addStars(n) { getSave().stars += n; persist(); }
