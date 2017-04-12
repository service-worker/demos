self.addEventListener('install', function (event) {
  console.log('service worker installed')
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  console.log('service worker activated')
})
