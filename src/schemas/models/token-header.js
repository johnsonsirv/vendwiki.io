const Joi = require('../../utils/joi');

module.exports = (
  Joi
    .object()
    .keys({
      token: Joi.string().required(),
      x_access_token: Joi.string(),
      x_refresh_token: Joi.string(),
      'x-language': Joi.string(),
      'accept-language': Joi.string(),
      'x-forwarded-for': Joi.string(),
    })
    .with('x_refresh_token', 'x_access_token')
    .with('x_access_token', 'x_refresh_token')
    .options({ stripUnknown: true })
);
