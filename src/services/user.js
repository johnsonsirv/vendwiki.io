module.exports = class UserService {
  constructor({ UserDataAccess }) {
    this.UserDataAccess = UserDataAccess;
  }

  async addUser({ username, password, category }) {
    const { UserDataAccess } = this;

    await UserDataAccess.addUser({ username, password, category });

    return {};
  }

  async addDeposit({ amount }) {
    const { UserDataAccess } = this;

    await UserDataAccess.addDeposit({ amount });

    return {};
  }

  async resetDeposit({ userId }) {
    const { UserDataAccess } = this;

    UserDataAccess.resetDeposit({ userId });

    return {};
  }
};
