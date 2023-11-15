module.exports = {
  ALLOWED_VENDING_AMOUNTS: [5, 10, 20, 50, 100],
  PRODUCT_COST_MULTIPLE: 5,
  QUERY_TIME_LIMIT: 20000,
  USER_ROLES: {
    buyer: 'buyer',
    seller: 'seller',
  },
  // can be scaled to track history of order
  ORDER_PURCHASE_STATUSES: {
    INCOMPLETE: 100,
    COMPLETE: 900,
    CANCELED: 1200,
  },
};
