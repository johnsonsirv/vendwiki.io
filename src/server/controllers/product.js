module.exports = class ProductController {
  constructor({ ProductService }) {
    this.ProductService = ProductService;
  }

  async getProducts(request) {
    const { ProductService } = this;

    const { limit, offset } = request.query;

    const { products } = await ProductService.getProducts({ limit, offset });

    // Do some formatting to return array
    return products;
  }

  async getProduct(request) {
    const { ProductService } = this;

    const { productId } = request.params;

    const { product } = await ProductService.getProduct({ productId });

    // add output formatting here
    return { product };
  }

  async addProduct(request) {
    const { ProductService } = this;

    const { userId } = request.token;
    const { productName, cost, quantity } = request.payload;

    const product = await ProductService.addProduct({
      productName, cost, quantity, userId,
    });

    return { product };
  }

  async updateProduct(request) {
    const { ProductService } = this;

    const { userId } = request.token;
    const { productId } = request.params;
    const { productName, cost, quantity } = request.payload;

    const { success } = await ProductService.updateProduct({
      productId, productName, cost, quantity, userId,
    });

    return { success };
  }

  async removeProduct(request) {
    const { ProductService } = this;

    const { userId } = request.token;
    const { productId } = request.params;

    const { success } = await ProductService.removeProduct({ productId, userId });

    return { success };
  }
};
