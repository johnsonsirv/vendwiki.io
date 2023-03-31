const Joi = require('../../utils/joi');
// const tokenHeaderModelSchema = require('../models/token-header');
const UserResponseModelSchema = require('../models/user');
const { ALLOWED_VENDING_AMOUNTS } = require('../../constants');

module.exports = {
  addUser: {
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
      schema: UserResponseModelSchema,
    },
  },
  getUser: {
    validate: {
      // headers: tokenHeaderModelSchema,
      params: (
        Joi
          .object()
          .keys({
            userId: Joi.objectId().required(),
          })
      ),
    },
    response: {
      schema: UserResponseModelSchema,
    },
  },
  updateUser: {
    validate: {
      // headers: tokenHeaderModelSchema,
      params: (
        Joi
          .object()
          .keys({
            userId: Joi.objectId().required(),
          })
      ),
      payload: (
        Joi
          .object()
          .keys({
            username: Joi.string().required(),
          })
      ),
    },
    response: {
      schema: (
        Joi
          .object()
          .keys({
            success: Joi.boolean(),
          })
      ),
    },
  },
  removeUser: {
    validate: {
      // headers: tokenHeaderModelSchema,
      params: (
        Joi
          .object()
          .keys({
            userId: Joi.objectId().required(),
          })
      ),
    },
    response: {
      schema: (
        Joi
          .object()
          .keys({
            success: Joi.boolean(),
          })
      ),
    },
  },
  addDeposit: {
    validate: {
      // headers: tokenHeaderModelSchema,
      payload: (
        Joi
          .object()
          .keys({
            amount: Joi.number().valid(...ALLOWED_VENDING_AMOUNTS).required(),
          })
      ),
    },
    response: {
      schema: UserResponseModelSchema,
    },
  },
  resetDeposit: {
    validate: {
      // headers: tokenHeaderModelSchema,
    },
    response: {
      schema: UserResponseModelSchema,
    },
  },
};
