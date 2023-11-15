const Joi = require('../../utils/joi');
// const tokenHeaderModelSchema = require('../models/token-header');

module.exports = {
  buyProduct: {
    validate: {
      // headers: tokenHeaderModelSchema,
      payload: (
        Joi
          .object()
          .keys({
            productId: Joi.objectId().required(),
            quantity: Joi.number().min(1).required(),
          })
      ),
    },
    response: {
      schema: (
        Joi
          .object()
          .keys({
            product: Joi.object(),
            purchaseAmount: Joi.number(),
            balance: Joi.array().items(Joi.number()),
          })
      ),
    },
  },
};
