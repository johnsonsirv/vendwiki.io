const {
  InsufficientProductStock,
  InsufficientFunds,
  NotAuthorizedToPerformAction,
  OrderNotCompleted,
} = require('../errors/types');
const OrderUserLogic = require('../logic/order-user');

module.exports = class OrderUserService {
  constructor({
    OrderDataAccess, UserService, ProductService, WarlockService, logger,
  }) {
    this.OrderDataAccess = OrderDataAccess;
    this.UserService = UserService;
    this.ProductService = ProductService;
    this.WarlockService = WarlockService;

    this.logger = logger;
  }

  async createOrder({ productId, quantity, userId }) {
    const order = await this.privateCreateOrder({ productId, quantity, userId });

    if (!order) {
      throw new OrderNotCompleted();
    }

    return { order };
  }

  async privateCreateOrder({ productId, quantity, userId }) {
    const {
      OrderDataAccess, UserService, ProductService, WarlockService, logger,
    } = this;

    const { product } = await ProductService.getProduct({ productId });

    if (!OrderUserLogic.isProductAvailable({ product, quantity })) {
      logger.debug('[privateCreateOrder] privateCreateOrder - insufficient product stock', {
        product,
        quantity,
      });

      throw new InsufficientProductStock();
    }

    const { user } = await UserService.getUser({ userId });

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

    if (OrderUserLogic.isOwnProduct({ product, userId })) {
      logger.debug('[privateCreateOrder] privateCreateOrder - cannot purchase own product', {
        product,
        user,
      });

      throw new NotAuthorizedToPerformAction();
    }

    return WarlockService.critical({
      key: ['order:user:', userId].join(':'),
      maxAttempts: 5,
      promise: async () => {
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
      },
    });
  }
};
