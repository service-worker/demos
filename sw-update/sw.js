self.addEventListener('install', function (event) {
  self.skipWaiting()
})

self.addEventListener('fetch', function (event) {
  console.log(event.request.url, 'requested')
  if (event.request.url.match(/version/)) {
    event.respondWith(new Response('VERSION'))
  }
})
