/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');
const { Types: { ObjectId } } = require('mongoose');

module.exports = Joi.extend(() => ({
  type: 'objectId',
  validate(value, helpers) {
    if (ObjectId.isValid(value)) {
      return value;
    }

    if (!value) {
      return undefined;
    }

    return helpers.error('needs to be a string of 12 bytes or a string of 24 hex characters');
  },
}));
