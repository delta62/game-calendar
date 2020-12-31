self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key === '42') {
              return caches.delete(key)
            }
          })
        )
      })
      .then(() =>
        caches.open(`v${42}`).then((cache) => {
          return cache.addAll([
            "./index.html",
            "./app.css",
            "./app.bundle.js",
            "https://fonts.googleapis.com/css?family=Titillium+Web:400,700&display=swap",
          ])
        })
      )
  )
})

self.addEventListener("fetch", (e: any) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)))
})
