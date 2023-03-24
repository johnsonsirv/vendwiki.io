const Joi = require('../../utils/joi');
const tokenHeaderModelSchema = require('../models/token-header');
const UserResponseModelSchema = require('../models/user');
const { ALLOWED_VENDING_AMOUNTS } = require('../../constants');

module.exports = {
  addUser: {
    validate: {
      payload: (
        Joi
          .object()
          .keys({
            username: Joi.string().required(),
            password: Joi.string().min(4).required(),
            category: Joi.string().valid(['seller', 'buyer']),
          })
      ),
    },
    response: {
      schema: UserResponseModelSchema,
    },
  },
  addDeposit: {
    validate: {
      // headers: tokenHeaderModelSchema,
      payload: (
        Joi
          .object()
          .keys({
            amount: Joi.number().valid(ALLOWED_VENDING_AMOUNTS).required(),
          })
      ),
    },
    response: {
      schema: UserResponseModelSchema,
    },
  },
  resetDeposit: {
    validate: {
      headers: tokenHeaderModelSchema,
      // payload: (
      //   Joi
      //     .object()
      //     .keys({
      //       userId: Joi.objectId().required(),
      //     })
      // ),
    },
    response: {
      schema: UserResponseModelSchema,
    },
  },
};
