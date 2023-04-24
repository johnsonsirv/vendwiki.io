const Jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = class AuthLogic {
  static verifyToken({ token }) {
    const { jwt: { secret } } = config;

    const { userId, role } = Jwt.verify(token, secret);

    return { userId, role };
  }
};
