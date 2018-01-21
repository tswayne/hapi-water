const Joi = require('joi');

const schema = Joi.object().keys({
  adapter: Joi.any(),
  adapterType: Joi.string(),
  database: Joi.object().keys({
    name: Joi.string(),
    user: Joi.string(),
    password: Joi.string().optional().allow('').allow(null),
    host: Joi.string(),
    port: Joi.number().integer().optional().allow(null)
  }),
  modelPath: Joi.string()
})

module.exports.validate = (options) => {
  return Joi.validate(options, schema)
}