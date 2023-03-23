const checkForSqlInjection = (params) => {
  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (typeof value === 'object' && value != null) {
      checkForSqlInjection(value);
    }

    if (key.match(/^\$/)) {
      // TODO: Handle error in a generic way
      throw new Error('Error: SQL Injection Attempt');
    }
  });
};

module.exports = {
  checkForSqlInjection,
};
