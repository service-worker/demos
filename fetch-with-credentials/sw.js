self.addEventListener('install', function (event) {
  self.skipWaiting()
})

self.addEventListener('fetch', function (event) {
  if (event.request.url.match(/sw-reflect/)) {
    event.respondWith(fetch(event.request))
  }
})
