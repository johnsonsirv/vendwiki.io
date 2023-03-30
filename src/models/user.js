const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String, required: true, trim: true, lowercase: true, minlength: 5, maxlength: 50, unique: true,
  },
  password: {
    type: String, required: true, minlength: 5, maxlength: 1024, select: false,
  },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
  deposit: { type: [Number], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = ({ mongooseConnection }) => {
  mongooseConnection.model('User', User);
};
