const CACHE_NAME = "static-v1";

const archivosACachear = [
  "./",
  "./index.html",

  // Páginas internas
  "./Pages/FloridaxAlderetes.html",
  "./Pages/alderetes&alternativa-florida.html",
  "./Pages/posseIda.html",
  "./Pages/posseVuelta.html",
  "./Pages/ralosIda.html",
  "./Pages/ralosVuelta.html",

  // Estilos
  "./style/style.css",

  // Manifest e íconos
  "./manifest.json",
  "./img/logoPestaña1.jpeg",
  "./img/logoPestaña.jpeg",
  "./img/logoNav.jpeg",

  // JS
  "./Js/florida-Alternativa.js",
  "./Js/alderetes&alternativa-florida.js",
  "./Js/posseIda.js",
  "./Js/posseVuelta.js",
  "./Js/ralosIda.js",
  "./Js/ralosVuelta.js",
  "./Js/horarios.json",

  // Bootstrap CDN fallback (opcional, si querés guardarlo)
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(archivosACachear);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => cachedResponse); 
    })
  );
});

