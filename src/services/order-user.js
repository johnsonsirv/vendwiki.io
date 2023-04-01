const {
  ProductNotFound,
  InsufficientProductStock,
  InsufficientFunds,
  NotAuthorizedToPerformAction,
} = require('../errors/types');
const OrderUserLogic = require('../logic/order-user');

module.exports = class OrderUserService {
  constructor({
    OrderDataAccess, UserService, ProductService, logger,
  }) {
    this.OrderDataAccess = OrderDataAccess;
    this.UserService = UserService;
    this.ProductService = ProductService;

    this.logger = logger;
  }

  async createOrder({ productId, quantity, userId }) {
    const order = await this.privateCreateOrder({ productId, quantity, userId });

    return { order };
  }

  async privateCreateOrder({ productId, quantity, userId }) {
    const {
      OrderDataAccess, UserService, ProductService, logger,
    } = this;

    // TODO: Use warlock

    const { product } = await ProductService.getProduct({ productId });

    if (!product) {
      logger.debug('[privateCreateOrder] createOrder - product not found', {
        productId,
      });

      throw new ProductNotFound();
    }

    if (!OrderUserLogic.isProductAvailable({ product, quantity })) {
      logger.debug('[privateCreateOrder] privateCreateOrder - insufficient product stock', {
        product,
        quantity,
      });

      throw new InsufficientProductStock();
    }

    // TODO: add user to token prevent lookup all the time
    const { user } = await UserService.getUser({ userId });

    // TODO: handle authorization at preHandler
    // Check user has authorized role

    const balanceBeforePurchase = OrderUserLogic.getBalance({ user });
    const totalPurchaseAmount = product.cost * quantity;

    if (balanceBeforePurchase < totalPurchaseAmount) {
      logger.debug('[privateCreateOrder] privateCreateOrder - insufficient funds', {
        product,
        balanceBeforePurchase,
        totalPurchaseAmount,
      });

      throw new InsufficientFunds();
    }

    if (product.seller.toString() === userId) {
      logger.debug('[privateCreateOrder] privateCreateOrder - cannot purchase own product', {
        product,
        user,
      });

      throw new NotAuthorizedToPerformAction();
    }

    const { basket } = OrderUserLogic.getOrderBasket({ productId, quantity, totalPurchaseAmount });

    const order = await OrderDataAccess.createOrder({ userId, basket });

    try {
      await Promise.all([
        ProductService.updateStockPostOrder({ quantity, productId }),
        UserService.updateBalancePostOrder({ totalPurchaseAmount, userId }),
      ]);
    }
    catch (error) {
      logger.debug('[OrderUser] privateCreateOrder - post order error', {
        productId,
        quantity,
        user,
        product,
        balanceBeforePurchase,
        totalPurchaseAmount,
        order,
        error,
      });
    }

    return order;
  }
};
