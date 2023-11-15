const Joi = require('../../utils/joi');

module.exports = {
  signup: {
    validate: {
      payload: (
        Joi
          .object()
          .keys({
            username: Joi.string().min(4).max(50).required(),
            password: Joi.string().min(4).max(15).required(),
            role: Joi.string().valid('seller', 'buyer'),
          })
      ),
    },
    response: {
      schema: Joi
        .object()
        .keys({ token: Joi.string() }),
    },
  },
  login: {
    validate: {
      payload: (
        Joi
          .object()
          .keys({
            username: Joi.string().min(4).max(50).required(),
            password: Joi.string().min(4).max(15).required(),
          })
      ),
    },
    response: {
      schema: Joi
        .object()
        .keys({ token: Joi.string() }),
    },
  },
};
