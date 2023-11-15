module.exports = class UserDataAccess {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getUserById({ userId, fields = '-__v' }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOne({ _id: userId })
        .select(fields)
        .lean()
        .exec()
    );
  }

  async getUserByUsername({ username, fields = '-__v' }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOne({ username })
        .select(fields)
        .exec()
    );
  }

  async addUser({ username, password, role }) {
    const { UserModel } = this;

    return (
      UserModel
        .create({
          username,
          password,
          role,
        })
    );
  }

  async updateUser({ username, userId }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOneAndUpdate({
          _id: userId,
        }, {
          $set: {
            username,
          },
        })
        .lean()
        .exec()
    );
  }

  async removeUser({ userId }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOneAndDelete({
          _id: userId,
        })
        .lean()
        .exec()
    );
  }

  async addDeposit({ amount, userId }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOneAndUpdate({
          _id: userId,
        }, {
          $inc: { deposit: +amount },
        })
        .lean()
        .exec()
    );
  }

  async resetDeposit({ userId }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOneAndUpdate({
          _id: userId,
        }, {
          $set: { deposit: 0 },
        })
        .lean()
        .exec()
    );
  }

  async updateBalancePostOrder({ userId, totalPurchaseAmount }) {
    const { UserModel } = this;

    return (
      UserModel
        .findOneAndUpdate(
          { _id: userId },
          {
            $inc: {
              deposit: -totalPurchaseAmount,
            },
          },
        )
        .lean()
        .exec()
    );
  }
};
