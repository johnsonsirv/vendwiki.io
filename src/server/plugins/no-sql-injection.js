const { checkForSqlInjection } = require('../../utils/security');

module.exports = ({ logger, config }) => ([
  {
    name: 'no-sql-injection',
    version: '0.0.1',
    register: (server) => {
      server.ext('onPreHandler', (req, h) => {
        if (req.params || req.payload || req.query) {
          const requestData = {
            ...req.params,
            ...req.payload,
            ...req.query,
          };

          try {
            checkForSqlInjection(requestData);
          }
          catch (e) {
            // TODO: Log report to a slack or discord channel

            logger.info('no-sql-injection', {
              endpoint: req.route.path,
              requestId: req.info ? req.info.id : undefined,
              accessToken: req.headers ? req.headers.x_access_token : undefined,
              refreshToken: req.headers ? req.headers.x_refresh_token : undefined,
              token: req.headers ? req.headers.token : undefined,
              env: config.env,
            });

            throw e;
          }
        }

        return h.continue;
      });
    },
  },
]);
