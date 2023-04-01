const mongoose = require('mongoose');
const { USER_ROLES } = require('../constants');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String, required: true, trim: true, lowercase: true, minlength: 5, maxlength: 50, unique: true,
  },
  password: {
    type: String, required: true, minlength: 5, maxlength: 1024, select: false,
  },
  role: { type: String, enum: [Object.keys(USER_ROLES)], default: USER_ROLES.buyer },
  deposit: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = ({ mongooseConnection }) => {
  mongooseConnection.model('User', User);
};
