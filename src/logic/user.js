const { ALLOWED_VENDING_AMOUNTS, USER_ROLES } = require('../constants');
const {
  InvalidDepositAmount,
  NotAuthorizedToPerformAction,
} = require('../errors/types');

module.exports = class UserLogic {
  static checkUserCanAddDeposit({ amount, user }) {
    if (user && user.role === USER_ROLES.buyer) {
      throw new NotAuthorizedToPerformAction();
    }

    if (!ALLOWED_VENDING_AMOUNTS.includes(amount)) {
      throw new InvalidDepositAmount(
        `InvalidDepositAmount. Amount should be any of ${ALLOWED_VENDING_AMOUNTS}`,
      );
    }

    // TODO: check this business logic again
    if (user && user.deposit.includes(amount)) {
      throw new InvalidDepositAmount(
        `AmountPreviouslyVended. ${amount} already exists in your wallet`,
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
