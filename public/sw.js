/**
 * Minimal, hand-written service worker for gading.dev.
 *
 * - Network first for every same-origin GET: when online the reader always
 *   gets what the server sends, never a cached copy.
 * - Successful responses are copied into the cache as they pass by, so pages
 *   the reader has already visited still open when they go offline.
 * - An uncached navigation while offline gets /offline.html.
 *
 * Bump CACHE_VERSION to drop every old cache on the next activate.
 */
const CACHE_VERSION = 'v1';
const CACHE_PREFIX = 'gading-';
const CACHE_NAME = `${CACHE_PREFIX}pages-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function isCacheable(response) {
  return response && response.ok && response.type === 'basic' && !response.redirected;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const offline = await caches.match(OFFLINE_URL);
      if (offline) return offline;
    }
    throw error;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (request.headers.has('range')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(networkFirst(request));
});
