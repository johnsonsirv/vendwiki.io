const mongoose = require('mongoose');
const { ORDER_PURCHASE_STATUSES } = require('../constants');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Order = new Schema({
  user: { type: ObjectId, ref: 'User' },
  basket: [{
    _id: false,
    product: { type: ObjectId, ref: 'Product' },
    count: { type: Number },
    price: { type: Number },
  }],
  status: { type: Number, default: ORDER_PURCHASE_STATUSES.INCOMPLETE },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = ({ mongooseConnection }) => {
  mongooseConnection.model('Order', Order);
};
