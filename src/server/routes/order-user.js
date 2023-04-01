const { buyProduct } = require('../../schemas/controllers/product');

module.exports = ([
  {
    path: '/buy',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Buyer purchase a product',
      validate: buyProduct.validate,
      response: buyProduct.response,
      plugins: {
        logging: false,
      },
    },
    handler: ({ OrderUserController }) => ((request, h) => OrderUserController.createOrder(request, h)),
  },
]);
