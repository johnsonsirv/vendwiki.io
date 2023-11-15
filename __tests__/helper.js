const awilix = require('awilix');

const bootstrap = require('../src/bootstrap');
const container = require('../src/bootstrap/container');
const serverModules = require('../src/server');
const { loggerBootstrapMock } = require('./mocks/bootstrap/logger');

const start = async (mckContainer) => {
  mckContainer.register('logger', awilix.asValue(loggerBootstrapMock));

  const { results } = await bootstrap(mckContainer, {}, { serverModules });
  return results;
};

const register = async (mckContainer, name, value) => (
  mckContainer.register(name, awilix.asValue(value))
);

module.exports = {
  start,
  register,
  container,
};
