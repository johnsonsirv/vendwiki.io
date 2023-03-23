const Joi = require('../../utils/joi');

module.exports = {
  getHealthCheck: {
    response: {
      schema: (
        Joi
          .object()
          .keys({
            time: Joi.date().timestamp(),
            status: Joi.string(),
          })
          .label('Health Check Response Schema')
      ),
    },
    validate: {},
  },
};
