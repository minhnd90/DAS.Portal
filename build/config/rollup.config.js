'use strict'

const { babel } = require('@rollup/plugin-babel')

const pkg = require('../../package')
const year = new Date().getFullYear()
const banner = `/*!
 * DAS Portal v${pkg.version} (${pkg.homepage})
 * Copyright 2014-${year} ${pkg.author}
 * License: Open source - MIT <https://opensource.org/licenses/MIT>
 */`

module.exports = {
  input: 'build/js/_Portal.js',
  output: {
    banner,
    file: 'dist/js/portal.js',
    format: 'umd',
    globals: {
      jquery: 'jQuery'
    },
    name: 'portal'
  },
  external: ['jquery'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      // Include the helpers in the bundle, at most one copy of each
      babelHelpers: 'bundled'
    })
  ]
}
