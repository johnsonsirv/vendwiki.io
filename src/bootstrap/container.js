const awilix = require('awilix');
const config = require('../config');
const logger = require('../logger');
const { formatNameWithGroup } = require('./utils');

const container = awilix.createContainer();

container.register('config', awilix.asValue(config));
container.register('logger', awilix.asFunction(logger));

// Dynamically Load Services
container
  .loadModules(
    ['../services/*.js'],
    {
      cwd: __dirname,
      formatName: formatNameWithGroup('Service'),
    },
  );

// Dynamically Load Models
container
  .loadModules(
    ['../models/*.js'],
    {
      cwd: __dirname,
      formatName: formatNameWithGroup('Model'),
      resolverOptions: {
        lifetime: awilix.Lifetime.SINGLETON,
      },
    },
  );

// Dynamically Load Data Access classes
container
  .loadModules(
    ['../data-access/*.js'],
    {
      cwd: __dirname,
      formatName: formatNameWithGroup('DataAccess'),
      resolverOptions: {
        lifetime: awilix.Lifetime.SINGLETON,
      },
    },
  );

module.exports = container;
