module.exports = class ProductDataAccess {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getUserById({ userId, fields = '-__v' }) {
    const { UserModel } = this;

    return (
      UserModel
        .findById(userId)
        .select(fields)
        .lean()
        .exec()
    );
  }

  async addUser({ username, hashedPassword, role }) {
    const { UserModel } = this;

    return (
      UserModel
        .create({
          username,
          password: hashedPassword,
          role,
        })
    ).toObject();
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
          userId,
        })
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
          $push: { deposit: amount },
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
          $set: { deposit: [] },
        })
        .lean()
        .exec()
    );
  }
};
