importScripts('../utils/logger.js')

var logger = self.logger

self.addEventListener('install', () => logger.log('install triggered'))

self.addEventListener('activate', () => logger.log('activate triggered'))

self.addEventListener('fetch', function (event) {
  logger.log('fetch triggered, url:', event.request.url)
  if (event.request.url.match(/unsplash/)) {
    var url = event.request.url.replace('unsplash.it/', 'unsplash.it/g/')
    event.respondWith(fetch(url))
  }
})
