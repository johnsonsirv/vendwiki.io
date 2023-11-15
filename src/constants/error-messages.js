const {
  BadRequestGenericError,
  AuthorizationGenericError,
  UncaughtGenericError,
  AuthenticationGenericError,
} = require('../errors/generics');

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
  USER_SIGNUP_FAILED: {
    error: 'UserSignupFailed',
    message: 'User Signup Failed',
    code: 32405,
    origin: BadRequestGenericError,
  },
  USER_LOGIN_FAILED: {
    error: 'UserLoginFailed',
    message: 'User Login Failed - Invalid username or password',
    code: 32406,
    origin: BadRequestGenericError,
  },
  USER_ALREADY_EXISTS: {
    error: 'UserAlreadyExists',
    message: 'User Already Exists. Login to continue',
    code: 32407,
    origin: BadRequestGenericError,
  },
  INSUFFICIENT_PRODUCT_STOCK: {
    error: 'InsufficientProductStock',
    message: 'Insufficient product stock',
    code: 32408,
    origin: BadRequestGenericError,
  },
  INSUFFICIENT_FUNDS: {
    error: 'InsufficientFunds',
    message: 'Insufficient Funds',
    code: 32409,
    origin: BadRequestGenericError,
  },
  ORDER_NOT_CREATED: {
    error: 'OrderNotCompleted',
    message: 'Order not be completed',
    code: 32409,
    origin: BadRequestGenericError,
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
  INVALID_TOKEN: {
    error: 'InvalidToken',
    message: 'Invalid Token',
    code: -4400,
    origin: AuthenticationGenericError,
  },
  MISSING_TOKEN: {
    error: 'MissingToken',
    message: 'Missing Authentication Token',
    code: -4500,
    origin: UncaughtGenericError,
  },
  EXPIRED_TOKEN: {
    error: 'ExpiredToken',
    message: 'Expired Token. Login again',
    code: -4600,
    origin: AuthenticationGenericError,
  },
  AUTH_TOKEN_GENERATION_FAILED: {
    error: 'AuthTokenGenerationFailed',
    message: 'Auth TokenGeneration Failed',
    code: -4700,
    origin: AuthenticationGenericError,
  },
};
