const {
  InvalidProduct,
  ProductNotFound,
  NotAuthorizedToPerformAction,
} = require('../errors/types');
const ProductLogic = require('../logic/product');

module.exports = class ProductService {
  constructor({
    logger, ProductDataAccess, UserService,
  }) {
    this.ProductDataAccess = ProductDataAccess;
    this.UserService = UserService;
    this.logger = logger;
  }

  async getProducts({ limit, offset }) {
    const { ProductDataAccess, logger } = this;

    logger.debug('[ProductService] getProducts', { limit, offset });

    const products = await ProductDataAccess.getProducts({ limit, offset });

    return { products };
  }

  async getProduct({ productId }) {
    const { ProductDataAccess, logger } = this;

    logger.debug('[ProductService] getProduct', { productId });

    const product = await ProductDataAccess.getProductById({ productId });

    if (!product) {
      throw new InvalidProduct();
    }

    return { product };
  }

  async addProduct({
    productName, cost, quantity, userId,
  }) {
    const { ProductDataAccess, UserService, logger } = this;

    logger.debug('[ProductService] addProduct', {
      productName,
      cost,
      quantity,
      userId,
    });

    const { user } = await UserService.getUser({ userId });

    if (!ProductLogic.canAddProduct({ user })) {
      throw new NotAuthorizedToPerformAction();
    }

    const product = await ProductDataAccess.addProduct({
      productName, cost, quantity, userId,
    });

    return { product };
  }

  async updateProduct({
    productId, productName, cost, quantity, userId,
  }) {
    const { ProductDataAccess, logger } = this;

    // TODO: double-check the user-role is seller

    const product = await ProductDataAccess.getProductByUserId({ productId, userId });

    if (!product) {
      throw new ProductNotFound();
    }

    logger.debug('[ProductService] updateProduct', {
      productName,
      cost,
      quantity,
      userId,
    });

    await ProductDataAccess.updateProduct({
      productId, productName, cost, quantity, userId,
    });

    return { success: true };
  }

  async removeProduct({ productId, userId }) {
    const { ProductDataAccess, logger } = this;

    // TODO: double-check the user-role is seller

    const product = await ProductDataAccess.getProductByUserId({ productId, userId });

    if (!product) {
      throw new ProductNotFound();
    }

    logger.debug('[ProductService] removeProduct', {
      productId,
      userId,
    });

    // TODO: Prefer soft-delete over permanent delete
    await ProductDataAccess.removeProduct({ productId, userId });

    return { success: true };
  }

  async updateStockPostOrder({ productId, quantity }) {
    const { ProductDataAccess } = this;

    const product = await ProductDataAccess.updateStockPostOrder({ productId, quantity });

    return { product };
  }
};
