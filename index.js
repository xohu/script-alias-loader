const alias = Object.keys(process.VUE_CLI_SERVICE.resolveWebpackConfig().resolve.alias)
const script = /<script[\s\S]*?<\/script>/gi
const content = /([`'"])(?:(?!\1).)*\.(png|jpe?g|gif|webp)\b(?:(?!\1).)*\1/gi
const img = /(?<=<img\s*src=)\s*([`'"])([^`'"]+)\1/gi
const isAlias = str => alias.some(v => v == str.match(/(?<=^.)[^/]+/g)[0])

module.exports = source => (
  source.replace(script, $1 => $1.replace(content, ($$1, $$2) => {
      if (img.test($$1)) {
        return $$1.replace(img, $$$1 => (
          isAlias($$$1) ? `${$$2} + require(${$$$1}) + ${$$2}` : $$$1
        ))
      } else {
        return isAlias($$1) ? `require(${$$1})` : $$1
      }
  }))
)