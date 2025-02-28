// ✅ Service Worker Install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("offline-cache").then((cache) => {
            return cache.addAll([
                "/offline.html", // Offline hone par ye page dikhayenge
            ]);
        })
    );
    self.skipWaiting();
});

// ✅ Fetch Event (Offline Mode Handle Karega)
self.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match("/offline.html").then((response) => {
                return response || new Response("No internet connection", { 
                    headers: { "Content-Type": "text/html" }
                });
            })
        );
    }
});
