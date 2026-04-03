// Basic service worker for caching static assets

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("csb-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

// Serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
