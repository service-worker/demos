self.addEventListener('install', () => {
  console.log('install triggered')
  self.skipWaiting()
})

self.addEventListener('activate', () => console.log('activate triggered'))

self.addEventListener('fetch', function (event) {
  var url = event.request.url
  var options = {}
  var match

  if (!/data\.js/.test(url) && !/author\.js/.test(url)) {
    return
  }

  if ((match = /mode=([\w-]+)/.exec(event.request.url))) {
    options.mode = match[1]
  }

  event.respondWith(fetch(url, options).then(res => {
    return cache(res, url).then(res => read(res, url))
  }).catch(e => {
    return new Response('cb("' + e.stack.replace(/\n/g, ' ') + ', checkout the console")')
  }))

  function read (res, url) {
    if (/read=true/.test(event.request.url)) {
      return res.text()
        .then(text => text.replace('harttle', 'MODIFIED, NOT harttle ANYMORE!'))
        .then(text => new Response(text || 'cb("Cannot read response")'))
    }
    return res
  }

  function cache (res, url) {
    if (/clone=true/.test(url)) {
      return Promise.resolve(res.clone())
    }
    if (/save=true/.test(url)) {
      return caches.open('tmp-key').then(cache => {
        cache.put(event.request, res.clone())
      }).then(cache => {
        return res
      })
    }
    return Promise.resolve(res)
  }
})
