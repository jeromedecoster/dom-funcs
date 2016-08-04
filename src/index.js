var name = document.body.attributes[0].name
if (name === 'get-attributes') require('./get-attributes')
else if (name === 'load-image') require('./load-image')
else console.warn('Unknown name attribute:', name)
