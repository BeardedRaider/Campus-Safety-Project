// -------------------------------------------------------------
// Safe service worker for Vercel + Vite PWAs
// - Avoids caching hashed JS/CSS files (prevents corruption)
// - Updates immediately on new deploys
// - Only caches root-level static files
// -------------------------------------------------------------

const CACHE_NAME = "csb-cache-v2";
const STATIC_ASSETS = ["/", "/index.html"];

// Install: cache minimal static assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for everything except root files
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache root-level static files
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // Everything else: network only (prevents corruption)
  event.respondWith(fetch(event.request));
});
