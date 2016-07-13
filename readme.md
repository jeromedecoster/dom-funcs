# dom-funcs

> A very limited subset of dom functions I use every day

## Install

```bash
npm i dom-funcs
```

Package [on npm](https://www.npmjs.com/package/dom-funcs)

## API

* [get-attributes](#getattributesnode-name)

## getAttributes(node, name)

Return serialized attributes data filtered by name

| Argument | Action |
| :------ | :------- |
| **node** | the tested **Html Element** `node` |
| **name** | the searched `name`. Match exact name or names followed by `-` |

Return an object

* keys are transform to camelcase
* values are serialized. Number and Boolean are converted

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

## License

MIT
