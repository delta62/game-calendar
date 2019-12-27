import * as pkg from '../package.json'

self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== pkg.version) {
                    return caches.delete(key)
                }
            }))
        })
        .then(() =>
            caches.open(`v${pkg.version}`).then(cache => {
                return cache.addAll([
                    './index.html',
                    './app.css',
                    './app.bundle.js',
                    'https://fonts.googleapis.com/css?family=Titillium+Web:400,700&display=swap'
                ])
            })
        )
    )
})

self.addEventListener('fetch', (e: any) => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    )
})
