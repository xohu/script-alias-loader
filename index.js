const script = /<script[\s\S]*?<\/script>/gi
const content = /([`'"])(?:(?!\1).)*\.(png|jpe?g|gif|webp)\b(?:(?!\1).)*\1/gi
const img = /(?<=<img\s*src=)\s*([`'"])([^`'"]+)\1/gi

module.exports = function(source) {    
    const alias = this.query.alias || []
    const isAlias = str => alias.some(v => v == str.match(/(?<=^.)[^/]+/g)[0])
    
    return source.replace(script, $1 => $1.replace(content, ($$1, $$2) => {
        if (img.test($$1)) {
            return $$1.replace(img, $$$1 => (
            isAlias($$$1) ? `${$$2} + require(${$$$1}) + ${$$2}` : $$$1
            ))
        } else {
            return isAlias($$1) ? `require(${$$1})` : $$1
        }
    }))
}