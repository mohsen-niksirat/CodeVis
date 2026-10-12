/* CodeVis Service Worker — network-first for navigation, stale-while-revalidate for assets.
 * Cache name auto-versioned; bump CV_VERSION to invalidate old caches on deploy. */
const CV_VERSION = "codevis-45ef672da7";
const CACHE = CV_VERSION;
const CORE = ["./", "./index.html", "./manifest.json", "./icon.svg", "./icon-192.png", "./icon-512.png"];
const ORIGIN = self.location.origin;

/* Install: precache core assets, then activate immediately. */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

/* Activate: evict every cache except the current one. */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Fetch: network-first for navigation; same-origin SWR for everything else.
 * Cross-origin requests (e.g. gif.js CDN) go straight to network, never cached. */
self.addEventListener("fetch", (e) => {
  const req = e.request;

  // Only handle GET and same-origin or navigations
  if (req.method !== "GET") return;

  const isNavigation = req.mode === "navigate";
  const sameOrigin = req.url.startsWith(ORIGIN);

  if (isNavigation) {
    // Network-first: try live, fall back to cached index.html offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put("./index.html", clone));
          }
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  if (!sameOrigin) {
    // Third-party: just pass through, don't cache.
    e.respondWith(fetch(req));
    return;
  }

  // Same-origin asset: stale-while-revalidate.
  e.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() => null);
      return cached || fresh;
    })
  );
});
