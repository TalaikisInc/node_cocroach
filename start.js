require('@babel/register')({
  presets: ['@babel/preset-env']
})

const dotenv = require('dotenv')
dotenv.config()

require('@babel/polyfill')

module.exports = require('./index.js')
