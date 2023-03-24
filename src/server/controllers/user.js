module.exports = class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async addUser(request) {
    const { UserService } = this;

    const { username, password, category } = request.payload;

    await UserService.addUser({ username, password, category });

    return {};
  }

  async addDeposit(request) {
    const { UserService } = this;

    // TODO: Grab userId from token header
    const { amount } = request.payload;

    await UserService.addDeposit({ amount });

    return {};
  }

  async resetDeposit(request) {
    const { UserService } = this;

    // TODO: Grab userId from token header
    const { userId } = request.token;

    await UserService.resetDeposit({ userId });

    return {};
  }
};
