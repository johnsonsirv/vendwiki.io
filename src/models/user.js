/* eslint-disable func-names */

const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { USER_ROLES } = require('../constants');
const { jwt: { secret, expiresIn } } = require('../config');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String, required: true, trim: true, lowercase: true, minlength: 5, maxlength: 50, unique: true,
  },
  password: {
    type: String, required: true, minlength: 5, maxlength: 1024, select: false,
  },
  role: { type: String, enum: [...(Object.keys(USER_ROLES))], default: USER_ROLES.buyer },
  deposit: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

User.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User.methods.generateAuthToken = function () {
  return (
    Jwt.sign(
      { userId: this._id, role: this.role },
      secret,
      { expiresIn },
    )
  );
};

User.methods.matchPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = ({ mongooseConnection }) => (
  mongooseConnection.model('User', User)
);
