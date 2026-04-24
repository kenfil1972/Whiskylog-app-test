// WhiskyLog v1.33 - service worker disabled for stability
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.registration.unregister()));
