const waterlineCore = require('waterline-standalone-core')

module.exports = plugin = {
  name: 'hapi-water',
  register: async function (server, options) {
    const models = await waterlineCore(options)
    server.decorate('toolkit', 'models', models)
  }
}