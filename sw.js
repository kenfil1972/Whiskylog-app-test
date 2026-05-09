// WhiskyLog v2.20a
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.registration.unregister())));
self.addEventListener('fetch', e => {});
