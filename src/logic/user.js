const { ALLOWED_VENDING_AMOUNTS, USER_ROLES } = require('../constants');

module.exports = class UserLogic {
  static checkUserCanAddDeposit({ amount, user }) {
    if (user && user.role === USER_ROLES.buyer) {
      throw new Error('OnlyBuyersCanMakeDeposit');
    }

    if (!ALLOWED_VENDING_AMOUNTS.includes(amount)) {
      throw new Error(`InvalidDepositAmount. Amount should be any of ${ALLOWED_VENDING_AMOUNTS}`);
    }

    if (user && user.deposit.includes(amount)) {
      throw new Error('AmountPreviouslyVended');
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
