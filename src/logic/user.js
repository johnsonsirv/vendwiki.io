const { ALLOWED_VENDING_AMOUNTS, USER_ROLES } = require('../constants');
const {
  InvalidDepositAmount,
  NotAuthorizedToPerformAction,
} = require('../errors/types');

module.exports = class UserLogic {
  static checkDeposit({ amount, user }) {
    if (user && user.role === USER_ROLES.buyer) {
      throw new NotAuthorizedToPerformAction();
    }

    if (!ALLOWED_VENDING_AMOUNTS.includes(amount)) {
      throw new InvalidDepositAmount(
        `InvalidDepositAmount. Amount should be any of ${ALLOWED_VENDING_AMOUNTS}`,
      );
    }

    return true;
  }

  static canRemoveUserAccount({ userParamsId, userId }) {
    return userParamsId.toString() === userId.toString();
  }

  static canUpdateUserAccount({ userParamsId, userId }) {
    return userParamsId.toString() === userId.toString();
  }
};
