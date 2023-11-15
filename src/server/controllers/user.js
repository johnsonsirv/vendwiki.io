module.exports = class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async getUser(request) {
    const { UserService } = this;

    const { userId } = request.params;

    const { user } = await UserService.getUser({ userId });

    return { user };
  }

  async updateUser(request) {
    const { UserService } = this;

    const { username } = request.payload;
    const { userId: userParamsId } = request.params;
    const { user: { _id: userId } } = request.token;

    const { success } = await UserService.updateUser({ userId, username, userParamsId });

    return { success };
  }

  async removeUser(request) {
    const { UserService } = this;

    const { userId: userParamsId } = request.params;
    const { user: { _id: userId } } = request.token;

    const { success } = await UserService.removeUser({ userId, userParamsId });

    return { success };
  }

  async addDeposit(request) {
    const { UserService } = this;

    const { user: { _id: userId } } = request.token;
    const { amount } = request.payload;

    const { success } = await UserService.addDeposit({ amount, userId });

    return { success };
  }

  async resetDeposit(request) {
    const { UserService } = this;

    const { user: { _id: userId } } = request.token;

    const { success } = await UserService.resetDeposit({ userId });

    return { success };
  }
};
