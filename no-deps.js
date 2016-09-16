'use strict'
const pkg = require('./package.json')
pkg.dependencies = pkg.devDependencies = []

const write = require('fs').writeFileSync

write('./package.json', JSON.stringify(pkg, null, 2) + '\n', 'utf8')
console.log('removed dependencies from package.json')
