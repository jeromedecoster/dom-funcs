const toCamelCase = require('to-funcs/to-camel-case')
const toBoolean = require('to-funcs/to-boolean')
const defined = require('object-funcs/defined')
const isString = require('is-funcs/is-string')
const toNumber = require('to-funcs/to-number')
const merge = require('object-funcs/merge')
const isNode = require('is-funcs/is-node')

module.exports = function(node, name) {
  if (isNode(node, false) === false || isString(name) === false) return {}

  var re = new RegExp('^(' + name + '|' + name + '\-.*)$')

  var obj = {}
  var attr
  var tmp
  var key
  var value

  for (var i = 0, n = node.attributes.length; i < n; i++) {
    attr = node.attributes.item(i)
    if (re.test(attr.name)) {
      if (attr.name === name) {
        tmp = attr.value
      } else {
        key = toCamelCase(attr.name.substr(name.length + 1))
        value = attr.value.trim()
        obj[key] = defined(toNumber(value), toBoolean(value), value)
      }
    }
  }
  return merge(parse(tmp), obj)
}

function parse(str) {
  if (isString(str) === false) return {}

  var obj = {}
  str = str.toLowerCase().trim()
  var c
  var key = ''
  var value = ''
  var inkey = true
  for (var i = 0, n = str.length; i < n; i++) {
    c = str.charAt(i)
    if (c === '(') {
      inkey = false
    } else if (c === ')') {
      inkey = true
      key = toCamelCase(key)
      value = value.trim()
      obj[key] = defined(toNumber(value), toBoolean(value), value)
      key = value = ''
    } else {
      if (inkey) key += c
      else value += c
    }
  }
  return obj
}
