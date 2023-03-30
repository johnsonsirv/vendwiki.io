const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Product = new Schema({
  productName: { type: String, required: true },
  cost: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  seller: { type: ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = ({ mongooseConnection }) => {
  mongooseConnection.model('Product', Product);
};
