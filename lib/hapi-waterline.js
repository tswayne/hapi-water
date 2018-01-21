const Waterline = require('waterline');
const waterline = new Waterline();
const util = require('util')
const fs = require('fs')
const readdir = util.promisify(fs.readdir)
const initialize = util.promisify(waterline.initialize)
const waterlineConfig = require('./waterline-config')
const schema = require('./schema')

module.exports = plugin = {
  name: 'hapi-water',
  register: async function (server, options) {
    const result = schema.validate(options)
    if (result.error) {
      throw new Error(`hapi-water config invalid: ${result.error}`)
    }
    const config =  waterlineConfig(options)

    const modelDir = options.modelPath
    const files = await readdir(modelDir)
    const modelsNames = files.filter(file => !fs.statSync(`${modelDir}/${file}`).isDirectory())
    modelsNames.forEach(modelName => {
      const model = require(`${modelDir}/${modelName}`)
      const wm = Waterline.Collection.extend(model)
      waterline.registerModel(wm)
    })
    const ontology = await initialize(config)
    server.decorate('toolkit', 'models', ontology.collections)
  }
}