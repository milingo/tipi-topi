// Service worker mínimo: cachea el juego para usarlo sin conexión (PWA).
const CACHE = 'tipi-topi-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async (c) => {
    try { const r = await fetch(e.request); c.put(e.request, r.clone()); return r; }
    catch { return (await c.match(e.request)) || Response.error(); }
  }));
});
