const fs = require('fs')
const path = require('path')
const express = require('express')

var app = express()
var count = 0
app.disable('x-powered-by')

app.get('/sw-update/sw.js', function (req, res) {
  var str = fs
    .readFileSync(path.resolve(__dirname, 'sw-update/sw.js'), {encoding: 'utf8'})
    .replace('VERSION', count)
  res.writeHead(200, {
    'Content-Type': 'application/javascript',
    'Cache-Control': 'max-age=5'
  })
  count++
  console.log('sw-update/sw requested, version', count, 'served at', new Date())
  res.end(str)
})

app.get(['/reflect', '/sw-reflect'], (req, res) => {
  console.log(req.cookies)
  console.log(req.url, 'cookie:', req.get('cookie'))
  var result = Object.keys(req.headers).map(k => k + ': ' + req.headers[k]).join('\n')
  res.end(result)
})

app.use(express.static(__dirname))

app.listen('8081', '0.0.0.0', () => console.log('listening to localhost:8081'))
