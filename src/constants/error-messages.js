const { BadRequestGenericError, AuthorizationGenericError, UncaughtGenericError } = require('../errors/generics');

module.exports = {
  INVALID_PRODUCT: {
    error: 'InvalidProduct',
    message: 'Invalid Product',
    code: 32401,
    origin: BadRequestGenericError,
  },
  PRODUCT_NOT_FOUND: {
    error: 'ProductNotFound',
    message: 'Product Not Found',
    code: 32402,
    origin: BadRequestGenericError,
  },
  INVALID_DEPOSIT_AMOUNT: {
    error: 'InvalidDepositAmount',
    message: 'Invalid Deposit Amount',
    code: 32403,
    origin: BadRequestGenericError,
  },
  USER_NOT_FOUND: {
    error: 'UserNotFound',
    message: 'User Not Found',
    code: 32404,
    origin: BadRequestGenericError,
  },
  USER_ALREADY_EXISTS: {
    error: 'UserAlreadyExists',
    message: 'User Already Exists',
    code: 32405,
    origin: BadRequestGenericError,
  },
  INSUFFICIENT_PRODUCT_STOCK: {
    parent: BadRequestGenericError,
    error: 'InsufficientProductStock',
    message: 'Insufficient product stock',
    code: 32406,
  },
  INSUFFICIENT_FUNDS: {
    parent: BadRequestGenericError,
    error: 'InsufficientFunds',
    message: 'Insufficient Funds',
    code: 32406,
  },
  NOT_AUTHORIZED_TO_PERFORM_ACTION: {
    error: 'NotAuthorizedToPerformAction',
    message: 'Not Authorized to perform action',
    code: -43000,
    origin: AuthorizationGenericError,
  },
  UNKNOWN: {
    error: 'UnknownError',
    message: 'Unknown Error',
    code: -41000,
  },
  VALIDATION: {
    error: 'ValidationError',
    code: -42000,
  },
  WARLOCK_ERROR: {
    error: 'WarlockError',
    message: 'Warlock Error',
    code: -43000,
    origin: UncaughtGenericError,
  },
};
