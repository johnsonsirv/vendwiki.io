const { QUERY_TIME_LIMIT } = require('../constants');

module.exports = class ProductDataAccess {
  constructor({ ProductModel }) {
    this.ProductModel = ProductModel;
  }

  async getProducts({ limit, offset }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset)
        .select('-__v')
        .maxTimeMS(QUERY_TIME_LIMIT)
        .lean()
        .exec()
    );
  }

  async getProductById({ productId }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .findById(productId)
        .select()
        .lean()
        .exec()
    );
  }

  // TODO: Ensure index is in place
  async getProductByUserId({ productId, userId }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .find({
          _id: productId,
          seller: userId,
        })
        .select()
        .lean()
        .exec()
    );
  }

  async addProduct({
    productName, cost, quantity, userId,
  }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .create({
          productName,
          cost,
          quantity,
          seller: userId,
        })
    ).toJSON();
  }

  async updateProduct({
    productId, productName, cost, quantity, userId,
  }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .findOneAndUpdate({
          _id: productId,
          seller: userId,
        }, {
          $set: {
            quantity,
            productName,
            cost,
          },
        })
        .lean()
        .exec()
    );
  }

  async removeProduct({ productId, userId }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .findOneAndDelete({
          _id: productId,
          seller: userId,
        })
        .lean()
        .exec()
    );
  }

  async updateStockPostOrder({ productId, quantity }) {
    const { ProductModel } = this;

    return (
      ProductModel
        .findOneAndUpdate(
          { _id: productId },
          {
            $inc: {
              quantity: -quantity,
            },
          },
        )
        .lean()
        .exec()
    );
  }
};
