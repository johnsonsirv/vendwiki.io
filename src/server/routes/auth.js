const {
  signup, login,
} = require('../../schemas/controllers/auth');

module.exports = ([
  {
    path: '/users/new',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'User Signup',
      validate: signup.validate,
      response: signup.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ AuthController }) => ((request, h) => AuthController.signup(request, h)),
  },
  {
    path: '/login',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'User Login',
      validate: login.validate,
      response: login.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ AuthController }) => ((request, h) => AuthController.login(request, h)),
  },
]);
