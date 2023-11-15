const logger = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  verbose: jest.fn(),
  debug: jest.fn(),
  silly: jest.fn(),
};

logger.child = () => logger;

module.exports.loggerBootstrapMock = logger;
