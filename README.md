[![npm](https://img.shields.io/npm/v/hapi-water.svg)](https://www.npmjs.com/package/hapi-water)

# Hapi Water
A hapi plugin for [waterline](https://github.com/balderdashy/waterline).  This plugin replicates waterline usage in sails by:
* Allowing you to define waterline models exactly as in sails 
* Use any sails waterline adapter
* Gives you access to your models anywhere in the request cycle through the request toolkit (`h.modelName._`)  

## Usage

```
// Setup
const hapiWater = require('hapi-water')

const options = {
 adapter: require('sails-mysql'),
 adapterType: 'mysql',
 database: {
   name: 'myDb',
   user: 'user',
   password: 'password',
   host: 'localhost'
 },
 modelPath: path.join(__dirname, './models')
}

await server.register({ plugin: hapiWater, options }, { once: true })

// Usage in handler
const pets = await h.models.pet.find()
```

#### Model definition
```
// ./model/Pet.js
module.exports = {
  identity: 'pet',
  datastore: 'default',
  attributes: {
    id: { type: 'number', autoMigrations: { autoIncrement: true, autoCreatedAt: true, autoUpdatedAt: true } },
    name: { type: 'string' },    
  },
  primaryKey: 'id'
}
```

## Options

* adapter: Any of sail's [available adapters](https://next.sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters)
* adapterType: The name of adapter, example: 'mysql', 'sails-disk', etc
* database:
  * name: The database name
  * user: The database user
  * password: The database password (optional)
  * host: The database host
  * port: The database port (optional)
* modelPath: Path to the directory where your models are defined.
