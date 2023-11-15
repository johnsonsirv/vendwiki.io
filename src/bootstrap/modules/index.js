const mongooseBootstrapModule = require('./mongoose');
const warlockBootstrapModule = require('./warlock');

// Helper modules like rabbitMQ will be exported from here
module.exports = {
  mongooseBootstrapModule,
  warlockBootstrapModule,
};
