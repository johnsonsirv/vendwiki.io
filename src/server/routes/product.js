const {
  getProducts, getProduct, addProduct, updateProduct, removeProduct,
} = require('../../schemas/controllers/product');

module.exports = ([
  {
    path: '/products',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Retrieve list of products',
      validate: getProducts.validate,
      response: getProducts.response,
      plugins: {
        logging: false,
        tokenValidation: {
          required: true,
          optional: false,
          scope: false,
        },
      },
    },
    handler: ({ ProductController }) => ((request, h) => ProductController.getProducts(request, h)),
  },
  {
    path: '/products/{productId}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Get product details',
      validate: getProduct.validate,
      response: getProduct.response,
      plugins: {
        logging: false,
        tokenValidation: {
          required: true,
          optional: false,
          scope: false,
        },
      },
    },
    handler: ({ ProductController }) => ((request, h) => ProductController.getProduct(request, h)),
  },
  {
    path: '/products',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Seller add new product',
      validate: addProduct.validate,
      response: addProduct.response,
      plugins: {
        logging: false,
        tokenValidation: {
          required: true,
          optional: false,
          scope: ['seller'],
        },
      },
    },
    handler: ({ ProductController }) => ((request, h) => ProductController.addProduct(request, h)),
  },
  {
    path: '/products/{productId}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Seller update their product',
      validate: updateProduct.validate,
      response: updateProduct.response,
      plugins: {
        logging: false,
        tokenValidation: {
          required: true,
          optional: false,
          scope: ['seller'],
        },
      },
    },
    handler: ({ ProductController }) => ((request, h) => ProductController.updateProduct(request, h)),
  },
  {
    path: '/products/{productId}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Seller remove their product',
      validate: removeProduct.validate,
      response: removeProduct.response,
      plugins: {
        logging: false,
        tokenValidation: {
          required: true,
          optional: false,
          scope: ['seller'],
        },
      },
    },
    handler: ({ ProductController }) => ((request, h) => ProductController.removeProduct(request, h)),
  },
]);
