const { BadRequestGenericError } = require('../errors/generics');

module.exports = {
  INVALID_PRODUCT: {
    error: 'InvalidProduct',
    message: 'Invalid Product',
    code: 32401,
    origin: BadRequestGenericError,
  },
};
