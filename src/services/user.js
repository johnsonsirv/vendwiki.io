const UserLogic = require('../logic/user');
const {
  UserNotFound,
  NotAuthorizedToPerformAction,
  UserAlreadyExists,
} = require('../errors/types');

module.exports = class UserService {
  constructor({ UserDataAccess, logger }) {
    this.UserDataAccess = UserDataAccess;
    this.logger = logger;
  }

  async addUser({ username, password, role }) {
    const { UserDataAccess } = this;

    const userExists = await UserDataAccess.getUserByUsername({ username });

    if (userExists) {
      throw new UserAlreadyExists();
    }

    const user = await UserDataAccess.addUser({ username, password, role });

    return { user };
  }

  async getUser({ userId, fields }) {
    const { UserDataAccess, logger } = this;

    const user = await UserDataAccess.getUserById({ userId, fields });

    if (!user) {
      throw new UserNotFound();
    }

    logger.debug('[UserService] getUser', { userId });

    return { user };
  }

  async getUserByUsername({ username, fields }) {
    const { UserDataAccess } = this;

    const user = await UserDataAccess.getUserByUsername({ username, fields });

    return { user };
  }

  async updateUser({ username, userId, userParamsId }) {
    const { UserDataAccess, logger } = this;

    if (!UserLogic.canUpdateUserAccount({ userId, userParamsId })) {
      throw new NotAuthorizedToPerformAction();
    }

    const user = await UserDataAccess.getUserById({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    logger.debug('[UserService] updateUser', { userId, username });

    await UserDataAccess.updateUser({ userId, username });

    return { success: true };
  }

  async removeUser({ userId, userParamsId }) {
    const { UserDataAccess, logger } = this;

    if (!UserLogic.canRemoveUserAccount({ userId, userParamsId })) {
      throw new NotAuthorizedToPerformAction();
    }

    const user = await UserDataAccess.getUserById({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    logger.debug('[UserService] removeUser', { userId });

    // This is deleting own account
    await UserDataAccess.removeUser({ userId });

    return { success: true };
  }

  async addDeposit({ amount, userId }) {
    const { UserDataAccess, logger } = this;

    const user = await UserDataAccess.getUserById({ userId });

    if (UserLogic.checkDeposit({ amount, user })) {
      logger.debug('[UserService] addDeposit', {
        userId,
        amount,
      });

      await UserDataAccess.addDeposit({ amount, userId });
    }

    return { success: true };
  }

  async resetDeposit({ userId }) {
    const { UserDataAccess, logger } = this;

    logger.debug('[UserService] resetDeposit', { userId });

    await UserDataAccess.resetDeposit({ userId });

    return { success: true };
  }

  async updateBalancePostOrder({ totalPurchaseAmount }) {
    const { UserDataAccess } = this;

    const user = await UserDataAccess.updateBalancePostOrder({ totalPurchaseAmount });

    return { user };
  }
};
