module.exports = class OrderUserLogic {
  static getOrderBasket({ productId, quantity, totalPurchaseAmount }) {
    const basket = {
      product: productId,
      count: quantity,
      price: totalPurchaseAmount,
    };

    return { basket };
  }

  static getBalance({ user }) {
    return (
      // user.deposit.reduce((acc, cur) => (acc + cur), 0)
      user.deposit
    );
  }

  static isProductAvailable({ product, quantity }) {
    if (!product) {
      return false;
    }

    if ((product.quantity === 0) || (product.quantity < quantity)) {
      return false;
    }

    return true;
  }

  static isOwnProduct({ product, userId }) {
    return product.seller.toString() === userId.toString();
  }
};
