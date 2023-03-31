const awilix = require('awilix');
const Hapi = require('@hapi/hapi');
const { formatNameWithGroup } = require('../bootstrap/utils');
const { getRequestIdFromRequest } = require('./utils');

module.exports = async (container) => {
  const { server: serverConfig, cors: { enabled: isCorsEnabled, origin: corsOrigin } } = container.resolve('config');
  const { port, keepAliveTimeout, returnFailedValidationInfoError } = serverConfig;

  const logger = container.resolve('logger');

  // Load controllers
  container
    .loadModules(
      ['./controllers/*.js'],
      {
        cwd: __dirname,
        formatName: formatNameWithGroup('Controller'),
      },
    );

  // Load plugins used by HapiServer
  container
    .loadModules(
      ['./plugins/*.js'],
      {
        cwd: __dirname,
        formatName: formatNameWithGroup('Plugin'),
      },
    );

  // Resolve routes
  const routes = (
    awilix
      .listModules(
        ['./routes/*.js'],
        {
          cwd: __dirname,
        },
      )
      .map((file) => file.path)
      .map(require)
      .reduce((acc, route) => [...acc, ...route], [])
  );

  const hapiServerPlugins = (
    awilix
      .listModules(
        ['./plugins/*.js'],
        {
          cwd: __dirname,
        },
      )
      .map((file) => file.name)
      .map(formatNameWithGroup('Plugin'))
      .map(container.resolve)
  );

  const cors = isCorsEnabled ? { origin: corsOrigin.split(',') } : false;
  // Create Hapi server
  const serverOptions = {
    port,
    debug: { request: ['error'] },
    ...(returnFailedValidationInfoError
      ? {
        routes: {
          cors,
          validate: {
            // customize the validation for request payload
            failAction: async (_, __, err) => {
              throw err;
            },
          },
        },
      }
      : { routes: { cors } }),
  };

  const server = Hapi.server(serverOptions);
  server.listener.keepAliveTimeout = keepAliveTimeout;

  // register plugins
  await Promise.all(
    hapiServerPlugins
      .map((plugin) => server.register(plugin)),
  );

  // Register routes iteratively
  await server.route(
    routes.map((route) => ({
      ...route,
      // a custom handler function for each route
      handler: async (request, h) => {
        const scoped = container.createScope();

        const requestId = getRequestIdFromRequest(request);

        container.register('requestId', awilix.asValue(requestId));
        scoped.register('requestId', awilix.asValue(requestId));

        // add more context like requestId to the logger for each route
        const scopedLogger = logger.child({ requestId });

        scoped.register('logger', awilix.asValue(scopedLogger));
        scoped.register('handler', awilix.asFunction(route.handler));

        return scoped.resolve('handler')(request, h);
      },
    })),
  );

  const start = async () => {
    await server.start();

    logger.info('Server started', { port });
  };

  const stop = async () => {
    server.stop();
  };

  const register = async () => {
    container.register('server', awilix.asValue(server));
  };

  // Public interface for managing server
  return {
    start,
    stop,
    register,
  };
};
