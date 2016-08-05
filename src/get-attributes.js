const fn = require('../get-attributes')
const test = require('tape')

test('node-attributes name', function (t) {

  var el1 = document.querySelector('#test-1')
  var el2 = document.querySelector('#test-2')
  var el3 = document.querySelector('#test-3')

  var res1 = {
    src4:    'img4.jpg',
    x4:      -.456,
    x2:      -.456,
    y2:      '',
    y4:      '',
    zIndex4: 1000,
  }
  t.deepEqual(fn(el1, 'image'), res1)
  t.deepEqual(fn(el1, 'noop'),  {})

  t.deepEqual(fn(el2, 'image'), {})

  var res3 = {
    src:    'img.jpg',
    offset: .123,
    x:      -.456,
    y:      '',
    zIndex: 1000,
  }

  t.deepEqual(fn(el3, 'image'), res3)

  var canvas = document.createElement('canvas')
  canvas.setAttribute('image-width', 320)
  canvas.setAttribute('image', 'height(240)')

  t.deepEqual(fn(canvas, 'image'), {width:320, height:240})
  t.end()
})

test('node-attributes data-name', function (t) {

  var el1 = document.querySelector('#test-1')
  var el2 = document.querySelector('#test-2')
  var el3 = document.querySelector('#test-3')

  var res1 = {
    src:     'img.jpg',
    offset:  .1234,
    x:       -.4567,
    y:       '',
    zIndex:  1987,
    no:      false,
    yes:     true,
    src3:    'img3.jpg',
    x3:      -.456789,
    y3:      '',
    zIndex3: 888,
  }

  t.deepEqual(fn(el1, 'data-image'), res1)
  t.deepEqual(fn(el1, 'data-noop'),  {})

  var res2 = {
    offset: .123,
    src:    'img.jpg',
    x:      -.456,
    y:      '',
    no:     false,
    yes:    true,
    zIndex: 1000
  }

  t.deepEqual(fn(el2, 'data-image'), res2)

  t.deepEqual(fn(el3, 'data-image'), {})
  t.end()
})

test('node-attributes math expression', function (t) {

  var el = document.querySelector('#test-4')

  var res = {
    x:      -.3,
    y:      .4,
    z:      Infinity,
    wrong1: '0/0',
    wrong2: '1.2/+-2',
    offset: 3.2
  }
  t.deepEqual(fn(el, 'image'), res)
  t.end()
})

test('node-attributes parse error', function (t) {

  var el1 = document.querySelector('#error-1')
  var el2 = document.querySelector('#error-2')

  t.deepEqual(fn(el1, 'data-image'), {offset:.123})

  var res2 = {
    offset: .123,
    src:    'img.jpg',
    x:      '-.456 y',
    zIndex: 1000
  }

  t.deepEqual(fn(el2, 'data-image'), res2)
  t.deepEqual(fn(el2, ''),           {})
  t.deepEqual(fn(el2, null),         {})
  t.deepEqual(fn(el2, undefined),    {})
  t.deepEqual(fn(el2, 12),           {})

  t.deepEqual(fn('',        'image'), {})
  t.deepEqual(fn(null,      'image'), {})
  t.deepEqual(fn(undefined, 'image'), {})
  t.deepEqual(fn(12,        'image'), {})

  t.deepEqual(fn(document.createComment('a comment'), 'image'), {})
  t.deepEqual(fn(document.createTextNode('a text'), 'image'),   {})
  t.deepEqual(fn(document.createElement('bib'), 'image'),       {})
  t.deepEqual(fn(document.createElement('script'), 'image'),    {})
  t.end()
})
