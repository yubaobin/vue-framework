const fs = require('fs')
const path = require('path')
module.exports = (dir) => {
  let patcher = {}
  function load(path, name) {
    return require(path + (name || ''))
  }
  fs.readdirSync(dir).forEach(function (filename) {
    if (!/\.js$/.test(filename)) {
      return
    }
    let name = path.basename(filename, '.js')
    let _load = load.bind(null, dir, name)
    patcher.__defineGetter__(name, _load)
  })
  return patcher
}
