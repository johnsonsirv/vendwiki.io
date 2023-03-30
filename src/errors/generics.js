const { createGenericErrorType } = require('./utils');

const GENERICS = [
  {
    error: 'BadRequestGenericError',
    statusCode: 400,
  },
];

module.exports = (
  GENERICS
    .reduce((acc, message) => ({
      ...acc,
      [message.error]: createGenericErrorType(message.error, message.statusCode),
    }), {})
);
