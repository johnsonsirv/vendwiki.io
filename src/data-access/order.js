const { ORDER_PURCHASE_STATUSES } = require('../constants');

module.exports = class OrderDataAccess {
  constructor({ OrderModel }) {
    this.OrderModel = OrderModel;
  }

  async createOrder({ userId, basket }) {
    const { OrderModel } = this;

    return (
      OrderModel
        .create({
          user: userId,
          basket,
          status: ORDER_PURCHASE_STATUSES.COMPLETE,
        })
    ).toObject();
  }
};
