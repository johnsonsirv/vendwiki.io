const { getHealthCheck } = require('../../schemas/controllers/health');

module.exports = ([
  {
    path: '/health',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Health status check for the system',
      validate: getHealthCheck.validate,
      response: getHealthCheck.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ HealthController }) => ((request, h) => HealthController.getHealthCheck(request, h)),
  },
]);
