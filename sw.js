// WhiskyLog v1.70 - cache kill during development
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.registration.unregister())
));
self.addEventListener('fetch', e => {});
