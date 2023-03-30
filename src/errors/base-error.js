// Abstract Base class used to create GenericError Classes

module.exports = class BaseError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);

    if (this.constructor === BaseError) {
      throw new TypeError('BaseError Abstract Class cannot be instantiated directly');
    }

    this.code = code;
    this.statusCode = statusCode;
  }
};
