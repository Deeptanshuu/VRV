self.addEventListener('install', event => {
  // Skip waiting to ensure the new service worker takes control immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // Delete all caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  // Bypass cache and always go to network
  event.respondWith(
    fetch(event.request)
  );
});
