/* Friends HUB Party — Service Worker v1.0
   Cache Strategy:
   - Google Fonts & CDN libs: Cache-First (fast loading)
   - HTML shell: Network-First (always get latest features)
   - CSS & JS modules: Cache-First with version hash busting
   - API calls (Gemini, PeerJS signaling): Network-Only (real-time)
*/
const CACHE_NAME = 'fhp-v1';
const CDN_CACHE = 'fhp-cdn-v1';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  './',
  './styles/main.css',
  './styles/responsive.css',
  './manifest.json'
];

// CDN URLs to cache on first use
const CDN_PATTERNS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'unpkg.com'
];

// URLs that must always go to network (no caching)
const NETWORK_ONLY_PATTERNS = [
  'generativelanguage.googleapis.com',
  'peerjs.com',
  '0.peerjs.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME && key !== CDN_CACHE)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Network-only for real-time APIs
  if (NETWORK_ONLY_PATTERNS.some(p => url.includes(p))) {
    return; // let it fall through to network
  }

  // Cache-first for CDN assets (fonts, JS libraries)
  if (CDN_PATTERNS.some(p => url.includes(p))) {
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Network-first for the HTML shell (always get latest)
  if (event.request.mode === 'navigate' || url.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for CSS & JS modules
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
        }
        return response;
      });
    })
  );
});
