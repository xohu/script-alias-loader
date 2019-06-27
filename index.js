const alias = Object.keys(process.VUE_CLI_SERVICE.resolveWebpackConfig().resolve.alias)
const script = /<script[\s\S]*?<\/script>/gi
const img = /([`'"])(?:(?!\1).)*\.(png|jpe?g|gif|webp)\b(?:(?!\1).)*\1/gi
const hasImg = /(?<=<img\s*src=)\s*[`'"]([^`'"]+)[`'"]/gi
const start_end  = /^\s*[`'"]+|[`'"]+\s*$/g
const isAlias = str => alias.some(v => v == str.match(/(?<=^.)[^/]+/g)[0])

module.exports = function(source) {
  return source.replace(script, $1 => $1.replace(img, $$1 => {
      if (hasImg.test($$1)) {
        return $$1.replace(start_end, '`').replace(hasImg, ($$$1, $$$2) => (
          isAlias($$$1) ? `\${require("${$$$2}")}` : $$$1
        ))
      } else {
        return isAlias($$1) ? `require(${$$1})` : $$1
      }
  }))
}