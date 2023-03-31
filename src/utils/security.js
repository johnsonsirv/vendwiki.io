const { ValidationError } = require('../errors/types');

const checkForSqlInjection = (params) => {
  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (typeof value === 'object' && value != null) {
      checkForSqlInjection(value);
    }

    if (key.match(/^\$/)) {
      throw new ValidationError('SQL Injection Attempted');
    }
  });
};

module.exports = {
  checkForSqlInjection,
};
