module.exports = class OrderUserController {
  constructor({ OrderUserService }) {
    this.OrderUserService = OrderUserService;
  }

  async createOrder(request) {
    const { OrderUserService } = this;

    // const { userId } = request.token;
    const { productId, quantity } = request.payload;

    const { order } = await OrderUserService.buyProduct({ productId, quantity, userId: 123 });

    return { order };
  }
};
