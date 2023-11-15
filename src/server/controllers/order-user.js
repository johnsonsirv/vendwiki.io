module.exports = class OrderUserController {
  constructor({ OrderUserService }) {
    this.OrderUserService = OrderUserService;
  }

  async createOrder(request) {
    const { OrderUserService } = this;

    const { user: { _id: userId } } = request.token;
    const { productId, quantity } = request.payload;

    const { order } = await OrderUserService.createOrder({ productId, quantity, userId });

    return { order };
  }
};
