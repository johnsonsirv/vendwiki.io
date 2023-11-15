const Joi = require('../../utils/joi');
const tokenHeaderModelSchema = require('../models/token-header');
const ProductResponseModelSchema = require('../models/product');
const { PRODUCT_COST_MULTIPLE } = require('../../constants');

module.exports = {
  getProducts: {
    validate: {
      headers: tokenHeaderModelSchema,
      query: (
        Joi
          .object()
          .keys({
            limit: Joi.number(),
            offset: Joi.number(),
          })
      ),
    },
    response: {
      schema: Joi.array().items(ProductResponseModelSchema),
    },
  },
  getProduct: {
    validate: {
      headers: tokenHeaderModelSchema,
      params: (
        Joi
          .object()
          .keys({
            productId: Joi.string().required(),
          })
      ),
    },
    response: {
      schema: ProductResponseModelSchema,
    },
  },
  addProduct: {
    validate: {
      headers: tokenHeaderModelSchema,
      payload: (
        Joi
          .object()
          .keys({
            productName: Joi.string().required(),
            cost: Joi.number().multiple(PRODUCT_COST_MULTIPLE).required(),
            quantity: Joi.number().min(1).required(),
          })
      ),
    },
    response: {
      schema: ProductResponseModelSchema,
    },
  },
  updateProduct: {
    validate: {
      headers: tokenHeaderModelSchema,
      params: (
        Joi
          .object()
          .keys({
            productId: Joi.string().required(),
          })
      ),
      payload: (
        Joi
          .object()
          .keys({
            productName: Joi.string().required(),
            cost: Joi.number().min(5).multiple(PRODUCT_COST_MULTIPLE).required(),
            quantity: Joi.number().min(1).required(),
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
  removeProduct: {
    validate: {
      headers: tokenHeaderModelSchema,
      params: (
        Joi
          .object()
          .keys({
            productId: Joi.string().required(),
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
  buyProduct: {
    validate: {
      headers: tokenHeaderModelSchema,
      payload: (
        Joi
          .object()
          .keys({
            productId: Joi.string().required(),
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
