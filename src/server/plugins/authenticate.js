const { MissingToken } = require('../../errors/types');

module.exports = ({ AuthService }) => ([
  {
    name: 'authenticate',
    version: '0.0.1',
    register: (server) => {
      server.ext('onPreAuth', async (req, h) => {
        const { tokenValidation } = req.route.settings.plugins;

        if (tokenValidation && tokenValidation.required) {
          const { optional } = tokenValidation;
          const { token } = req.headers;

          if (token) {
            const { user } = await AuthService.validateToken({ token });
            req.token = {
              user,
              token,
            };
          }
          else if (!optional) {
            throw new MissingToken();
          }
        }

        return h.continue;
      });
    },
  },
]);
