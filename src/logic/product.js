const { USER_ROLES } = require('../constants');

module.exports = class ProductLogic {
  static canAddProduct({ user }) {
    return (user && user.role === USER_ROLES.seller);
  }
};
