/* eslint-disable max-classes-per-file */
const BaseError = require('./base-error');

/**
 * Function generates an abstract class
 * Used to create an error group, that may be extended further to create custom errors.
 *
 * @param klass the name of the error group
 * @param defaultStatusCode the default http status code to use for this type of errors
 * @returns {*}
 */
const createGenericErrorType = (klass, defaultStatusCode = 500) => ({
  [klass]: class extends BaseError {
    constructor(message, code, statusCode) {
      super(message, code, statusCode || defaultStatusCode);

      if (this.constructor.name === klass) {
        throw new TypeError(`${klass} Abstract Class cannot be instantiated directly`);
      }
    }
  },
}[klass]);

/**
 * @param {*} extendKlass a member of error group that extends BaseError
 * @param {*} klass custom class name to be created
 * @param {*} message message for error instance
 * @param {*} code unique code for error instance
 * @param {*} statusCode http status code
 * @returns {*}
 */

const createCustomErrorType = (extendKlass, klass, message, code, statusCode) => ({
  [klass]: class extends extendKlass {
    constructor(...args) {
      super(message, code, statusCode, args);
    }
  },
}[klass]);

module.exports = {
  createGenericErrorType,
  createCustomErrorType,
};
