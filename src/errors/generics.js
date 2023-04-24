const { createGenericErrorType } = require('./utils');

const GENERICS = [
  {
    error: 'BadRequestGenericError',
    statusCode: 400,
  },
  {
    error: 'AuthenticationGenericError',
    statusCode: 401,
  },
  {
    error: 'AuthorizationGenericError',
    statusCode: 403,
  },
  {
    error: 'UncaughtGenericError',
    statusCode: 500,
  },
];

module.exports = (
  GENERICS
    .reduce((acc, message) => ({
      ...acc,
      [message.error]: createGenericErrorType(message.error, message.statusCode),
    }), {})
);
