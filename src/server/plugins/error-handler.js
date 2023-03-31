const { getRequestIdFromRequest } = require('../utils');
const ERROR_MESSAGES = require('../../constants/error-messages');
const BaseError = require('../../errors/base-error');

// Add support to send error to APM like Sentry
const sendToAPM = (res) => res;

const createErrorResponseFromBaseError = (err) => {
  const errorName = err.constructor.name;
  const { message, code } = err;

  return {
    error: errorName,
    message,
    code,
  };
};

const createJoiErrorResponse = (err) => {
  const { code, error } = ERROR_MESSAGES.VALIDATION;
  const {
    message,
    details,
    output: { payload: { validation: { source } = {} } = {} } = {},
  } = err;

  return {
    code,
    error,
    message,
    source,
    details,
  };
};

const createUnknownResponseError = () => {
  const { error, message, code } = ERROR_MESSAGES.UNKNOWN;

  return {
    error,
    message,
    code,
  };
};

const generateResponseErrorOutput = (e) => {
  if (e instanceof BaseError) {
    return createErrorResponseFromBaseError(e);
  }

  if (e && e.isJoi) {
    return createJoiErrorResponse(e);
  }

  return createUnknownResponseError();
};

module.exports = ({ logger }) => ([
  {
    name: 'error-handler',
    version: '0.0.1',
    register: (server) => {
      server.ext('onPreResponse', (req, h) => {
        const { response: res } = req;

        if (res instanceof Error) {
          sendToAPM(res); // Report to sentry;

          res.output.payload = generateResponseErrorOutput(res);
          res.output.statusCode = res.statusCode || 500;

          const { method, path } = req;
          const requestId = getRequestIdFromRequest(req);

          logger.error({
            method,
            path,
            requestId,
            message: res.message || ERROR_MESSAGES.UNKNOWN.message,
            ...res,
          });
        }

        return h.continue;
      });
    },
  },
]);
