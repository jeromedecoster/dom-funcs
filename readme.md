# dom-funcs

> A very limited subset of dom functions I use every day

## Install

```bash
npm i dom-funcs
```

Package [on npm](https://www.npmjs.com/package/dom-funcs)

## API

* [get-attributes](#getattributesnode-name)
* [load-image](#loadimagesrc-cb-ctx)

## getAttributes(node, name)

Return serialized attributes data filtered by name

| Argument | Action |
| :------ | :------- |
| **node** | the tested **Html Element** `node` |
| **name** | the searched `name`. Match exact name or names followed by `-` |

Return an object

* keys are transform to camelcase
* values are serialized. Number and Boolean are converted
* values can be simple **Math expression** – [see toNumber](https://github.com/jeromedecoster/to-funcs#tonumberdata-fallback)

```html
<div id="ref1" image-src="img.jpg" image-offset="250" image-z-index="1000" image-enabled="true" foo="bar"></div>
```

```js
const getAttributes = require('dom-funcs/get-attributes')

// {src:'img.jpg', offset:250, zIndex:1000, enabled:true}
getAttributes(document.querySelector('#ref1'), 'image')
```

Get `dataset` values

```html
<div id="ref2" data-ref-src="bg.jpg" data-ref-width="320" data-ref-z-index="10" data-foo="bar"></div>
```

```js
const getAttributes = require('dom-funcs/get-attributes')

// {src:'bg.jpg', width:320, zIndex:10}
getAttributes(document.querySelector('#ref2'), 'data-ref')
```

Parse inner datas

```html
<div id="ref3" image-src="img.jpg" image="offset(250) z-index(1000) enabled(true)" foo="bar"></div>
```

```js
const getAttributes = require('dom-funcs/get-attributes')

// {src:'img.jpg', offset:250, zIndex:1000, enabled:true}
getAttributes(document.querySelector('#ref3'), 'image')
```

Using math expression

```html
<div id="ref4" image="x(-.1 + -.2) y(100/250)"></div>
```

```js
const getAttributes = require('dom-funcs/get-attributes')

// {x:-.3, y:.4}
getAttributes(document.querySelector('#ref4'), 'image')
```

## loadImage(src, [cb], [ctx])

Create an image, execute a callback when the loading is done. Fallback with the famous transparent 1x1 gif

| Argument | Action |
| :------ | :------- |
| **src** | the source of the image |
| **cb** | optional callback. Called once the loading is done with the image as first argument |
| **ctx** | optional context of `this`, default to global |

Return the created image

```js
const load = require('dom-funcs/load-image')

function onload(img) {
  // the image `width`
  img.width
}

var el = load('img.jpg', onload)
document.body.appendChild(el)
```

If the image doesn't exists, the returned image is a transparent 1x1 gif

```js
const load = require('dom-funcs/load-image')

function onload(img) {
  // 1
  img.width
}

var el = load('path-to-nothing.jpg', onload)
document.body.appendChild(el)
```

## Thanks

Mainly forked / inspired on
- [load-img](https://github.com/mattdesl/load-img)

## License

MIT
