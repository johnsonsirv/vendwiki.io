module.exports = class ProductService {
  constructor({ ProductDataAccess }) {
    this.ProductDataAccess = ProductDataAccess;
  }

  async getProducts({ fields }) {
    const { ProductDataAccess } = this;

    await ProductDataAccess.getProducts({ fields });

    return {};
  }

  async getProduct({ productId }) {
    const { ProductDataAccess } = this;

    await ProductDataAccess.getProduct({ productId });

    return {};
  }

  async addProduct({
    productName, cost, quantity, userId,
  }) {
    const { ProductDataAccess } = this;

    await ProductDataAccess.addProduct({
      productName, cost, quantity, userId,
    });

    return {};
  }

  async updateProduct({
    productId, productName, cost, quantity,
  }) {
    const { ProductDataAccess } = this;

    await ProductDataAccess.updateProduct({
      productId, productName, cost, quantity,
    });

    return {};
  }

  async removeProduct({ productId }) {
    const { ProductDataAccess } = this;

    await ProductDataAccess.removeProduct({ productId });

    return {};
  }
};
