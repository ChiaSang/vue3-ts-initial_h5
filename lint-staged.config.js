// const micromatch = require('micromatch')

module.exports = {
  '*.{vue,js}': (files) => {
    // console.log('files :>> ', files)
    // from `files` filter those _NOT_ matching `*test.js`
    const match = files.filter((file) => !/public\/static/.test(file))
    // console.log('match', match)
    return `eslint --fix ${match.join(' ')}`
  },
  '*.{vue,css,scss}': (files) => {
    // console.log('files :>> ', files)
    // from `files` filter those _NOT_ matching `*test.js`
    const match = files.filter((file) => !/public\/static/.test(file))
    // console.log('match', match)
    return `stylelint --fix ${match.join(' ')}`
  }
}
