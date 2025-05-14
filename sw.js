self.addEventListener("install", e => {
   // console.log("Service Worker instalado");
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./index.html", "./style/style.css", "./img/logoPestaña1.jpeg"]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
