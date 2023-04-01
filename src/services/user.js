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
    const { UserDataAccess, logger } = this;

    logger.debug('[UserService] addUser', {});

    const userExists = await UserDataAccess.getUserByUsername({ username });

    if (userExists) {
      throw new UserAlreadyExists();
    }

    // const hashedPassword = AuthService.getHashedPassword({ password });

    const user = await UserDataAccess.addUser({ username, hashedPassword: password, role });

    // TODO: consider returning token
    return { user };
  }

  async getUser({ userId }) {
    const { UserDataAccess, logger } = this;

    const user = await UserDataAccess.getUserById({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    logger.debug('[UserService] getUser', { userId });

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

    // This is updating own account
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

    let user = await UserDataAccess.getUserById({ userId });

    if (UserLogic.checkDeposit({ amount, user })) {
      logger.debug('[UserService] addDeposit', {
        userId,
        amount,
      });

      user = await UserDataAccess.addDeposit({ amount, userId });
    }

    return { user };
  }

  async resetDeposit({ userId }) {
    const { UserDataAccess, logger } = this;

    logger.debug('[UserService] addDeposit', { userId });

    const user = await UserDataAccess.resetDeposit({ userId });

    return { user };
  }

  async updateBalancePostOrder({ totalPurchaseAmount }) {
    const { UserDataAccess } = this;

    const user = await UserDataAccess.updateBalancePostOrder({ totalPurchaseAmount });

    return { user };
  }
};