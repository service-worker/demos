var execId = Math.random().toString(36).substr(2, 4)

function log () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('[' + execId + ']')
  console.log.apply(console, args)
}

function error () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('[' + execId + ']')
  console.log.apply(console, args)
}

var logger = {
  log: log,
  error: error
}

if (typeof self === 'object') {
  self.logger = logger
}
if (typeof window === 'object') {
  window.logger = logger
}
