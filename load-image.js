const isString = require('is-funcs/is-string')

module.exports = function(src, cb, ctx) {
  function listener(evt) {
    if (evt.type === 'load') {
      img.removeEventListener('load',  listener, false)
      img.removeEventListener('error', listener, false)
      if (typeof cb === 'function') cb.call(ctx, img)
    }
    else if (evt.type === 'error') img.src = gif
  }
  var gif = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  var img = document.createElement('img')
  img.addEventListener('load',  listener, false)
  img.addEventListener('error', listener, false)
  img.src = isString(src) ? src : gif
  return img
}
