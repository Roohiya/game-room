require('@babel/register')({
  rootMode: 'upward'
})

module.exports = require('./src/main').default