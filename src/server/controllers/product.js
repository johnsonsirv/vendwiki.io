module.exports = class ProductController {
  constructor({ ProductService }) {
    this.ProductService = ProductService;
  }

  async getProducts(request) {
    const { ProductService } = this;

    // TODO: Retrieve some fields
    const { fields } = request.query;

    await ProductService.getProducts({ fields });

    return {};
  }

  async getProduct(request) {
    const { ProductService } = this;

    const { productId } = request.params;

    await ProductService.getProduct({ productId });

    return {};
  }

  async addProduct(request) {
    const { ProductService } = this;

    const { userId } = request.token;
    const { productName, cost, quantity } = request.payload;

    await ProductService.addProduct({
      productName, cost, quantity, userId,
    });

    return {};
  }

  async updateProduct(request) {
    const { ProductService } = this;

    const { productId } = request.params;
    const { productName, cost, quantity } = request.payload;

    await ProductService.updateProduct({
      productId, productName, cost, quantity,
    });

    return {};
  }

  async removeProduct(request) {
    const { ProductService } = this;

    const { productId } = request.params;

    // TODO: Prefer soft-delete over permanent delete
    await ProductService.removeProduct({ productId });

    return {};
  }
};
