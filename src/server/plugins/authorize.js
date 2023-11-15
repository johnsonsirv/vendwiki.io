const { NotAuthorizedToPerformAction } = require('../../errors/types');

module.exports = ({ logger }) => ([
  {
    name: 'authorize',
    dependencies: ['authenticate'],
    version: '0.0.1',
    register: (server) => {
      server.ext('onPreAuth', async (req, h) => {
        const { tokenValidation } = req.route.settings.plugins;
        if (tokenValidation && Array.isArray(tokenValidation.scope)) {
          const { scope } = tokenValidation;
          const { user: { userId, role } } = req.token;

          if (!scope.includes(role)) {
            logger.debug('NotAuthorizedToPerformAction', {
              userId,
              role,
            });

            throw new NotAuthorizedToPerformAction();
          }
        }

        return h.continue;
      });
    },
  },
]);
