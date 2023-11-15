const MESSAGES = require('../constants/error-messages');
const { createCustomErrorType } = require('./utils');

module.exports = (
  Object.values(MESSAGES)
    .filter((msg) => msg.origin)
    .reduce((acc, msg) => ({
      ...acc,
      [msg.error]: createCustomErrorType(msg.origin, msg.error, msg.message, msg.code),
    }), {})
);
