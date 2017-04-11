const express = require('express')

var app = express()

app.use(express.static(__dirname))

app.get(['/reflect', '/sw-reflect'], (req, res) => {
  console.log(req.url, 'cookie:', req.get('cookie'))
  var result = Object.keys(req.headers).map(k => k + ': ' + req.headers[k]).join('\n')
  res.end(result)
})

app.listen('8081', '0.0.0.0', () => console.log('listening to localhost:8081'))
