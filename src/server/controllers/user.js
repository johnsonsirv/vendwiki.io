module.exports = class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async addUser(request) {
    const { UserService } = this;

    const { username, password, role } = request.payload;

    const { user } = await UserService.addUser({ username, password, role });

    return { user };
  }

  async getUser(request) {
    const { UserService } = this;

    const { userId } = request.token;

    const { user } = await UserService.getUser({ userId });

    return { user };
  }

  async updateUser(request) {
    const { UserService } = this;

    const { username } = request.payload;
    const { userId: userParamsId } = request.params;
    const { userId } = request.token;

    const { success } = await UserService.updateUser({ userId, username, userParamsId });

    return { success };
  }

  async removeUser(request) {
    const { UserService } = this;

    const { userId: userParamsId } = request.params;
    const { userId } = request.token;

    const { success } = await UserService.removeUser({ userId, userParamsId });

    return { success };
  }

  async addDeposit(request) {
    const { UserService } = this;

    const { userId } = request.token;
    const { amount } = request.payload;

    const { user } = await UserService.addDeposit({ amount, userId });

    return { user };
  }

  async resetDeposit(request) {
    const { UserService } = this;

    const { userId } = request.token;

    const { user } = await UserService.resetDeposit({ userId });

    return { user };
  }
};
