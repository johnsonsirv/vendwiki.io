const { addUser, addDeposit, resetDeposit } = require('../../schemas/controllers/user');

module.exports = ([
  {
    path: '/user',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Add new user',
      validate: addUser.validate,
      response: addUser.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ UserController }) => ((request, h) => UserController.addUser(request, h)),
  },
  {
    path: '/deposit',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Add deposit',
      validate: addDeposit.validate,
      response: addDeposit.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ UserController }) => ((request, h) => UserController.addDeposit(request, h)),
  },
  {
    path: '/reset',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Reset deposit',
      validate: resetDeposit.validate,
      response: resetDeposit.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ UserController }) => ((request, h) => UserController.resetDeposit(request, h)),
  },
]);
