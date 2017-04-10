const http = require('http')
const fs = require('fs')
const path = require('path')

var count = 0

var server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      fs.createReadStream(path.resolve(__dirname, 'index.html')).pipe(res)
      console.log('/ requested')
      break
    case '/sw.js':
      var str = fs
        .readFileSync(path.resolve(__dirname, 'sw.js'), {encoding: 'utf8'})
        .replace('VERSION', count)
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'max-age=10'
      })
      res.end(str)
      console.log('/sw requested, version', count, 'served at', new Date())
      count++
      break
    default:
      res.statusCode = 404
      res.end()
  }
})

server.listen('8081', '0.0.0.0', () => console.log('listening to localhost:8081'))
