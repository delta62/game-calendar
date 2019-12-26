self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                './index.html',
                './app.css',
                './app.bundle.js',
                'https://fonts.googleapis.com/css?family=Titillium+Web:400,700&display=swap'
            ])
        })
    )
})

self.addEventListener('fetch', (e: any) => {
    e.respondWith(
        caches.match(e.request).then(r => {
            return r || fetch(e.request)
        })
    )
})
