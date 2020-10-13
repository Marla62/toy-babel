var babel = require('babel-core');

const result = babel.transform('const result = 1+2+6+6+6+6+6+3;', {
  plugins: [
    require('./visitor')
  ]
})
console.log(result.code)