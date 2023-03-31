const { createGenericErrorType } = require('./utils');

const GENERICS = [
  {
    error: 'BadRequestGenericError',
    statusCode: 400,
  },
  {
    error: 'AuthorizationGenericError',
    statusCode: 403,
  },
];

module.exports = (
  GENERICS
    .reduce((acc, message) => ({
      ...acc,
      [message.error]: createGenericErrorType(message.error, message.statusCode),
    }), {})
);
