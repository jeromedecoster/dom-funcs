const fn = require('../load-image')
const test = require('tape')

test('load-image with ctx', function (t) {

  t.plan(2)
  var el1 = document.querySelector('#test-1')
  var ctx = { a:1 }
  fn('baboon.jpg', function(img) {
    el1.appendChild(img)
    t.deepEqual(img.width, 512)
    t.deepEqual(this.a, 1)
  }, ctx)
})

test('load-image blank image', function (t) {

  var ctx = { a:3 }
  var arr = [undefined, null, 1, '', '  ']
  t.plan(arr.length * 2)

  arr.forEach(function(e) {
    fn(null, function(img) {
      t.deepEqual(img.width, 1)
      t.deepEqual(this.a, 3)
    }, ctx)
  })
})

test('load-image wrong URL rescue with blank image', function (t) {
  t.plan(2)
  var el2 = document.querySelector('#test-2')
  var ctx = { a:5 }
  fn('path-to-nothing', function(img) {
    el2.appendChild(img)
    t.deepEqual(img.width, 1)
    t.deepEqual(this.a, 5)
  }, ctx)
})

test('load-image modify src', function (t) {

  t.plan(4)
  var el3 = document.querySelector('#test-3')
  var ctx = { a:7 }
  var cnt = 0
  fn('baboon.jpg', function(img) {
    cnt++
    el3.appendChild(img)
    t.deepEqual(img.width, 512, 'width == 512')
    t.deepEqual(this.a, 7, 'a == 7')
    img.src = 'baboon-small.jpg'
    setTimeout(function() {
      t.deepEqual(img.width, 256, 'width == 256')
      t.deepEqual(cnt, 1, 'cnt == 1')
    }, 250)
  }, ctx)
})

test('load-image return an image without cb', function (t) {

  t.plan(2)
  var el4 = document.querySelector('#test-4')
  t.deepEqual(el4.getBoundingClientRect().height, 0, 'div.height == 0')
  var img = fn('baboon.jpg')
  el4.appendChild(img)
  setTimeout(function() {
    t.deepEqual(el4.getBoundingClientRect().height, 512, 'div.height == 512')
  }, 250)
})

test('load-image return an image', function (t) {

  t.plan(2)
  var el5 = document.querySelector('#test-5')
  t.deepEqual(el5.getBoundingClientRect().height, 0, 'div.height == 0')
  var img = fn('baboon.jpg', function(img) {
    t.deepEqual(el5.getBoundingClientRect().height, 512, 'div.height == 512')
  })
  el5.appendChild(img)
})
