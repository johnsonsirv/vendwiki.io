const awilix = require('awilix');
const mongoose = require('mongoose');
const { QUERY_TIME_LIMIT } = require('../../constants');

module.exports = async (container) => {
  const logger = container.resolve('logger');
  const { mongodb: mongoConfig } = container.resolve('config');
  const { url } = mongoConfig;

  let mongooseConnection;

  const start = async () => {
    mongooseConnection = await mongoose.createConnection(url, {
      autoCreate: false,
      autoIndex: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongooseConnection.set('maxTimeMS', QUERY_TIME_LIMIT);

    // Register additional plugins
    const addUpdatedAt = (schema) => {
      schema.pre('findOneAndUpdate', function addUpdatedAtPreOnFindOneAndUpdate(next) {
        this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });
        next();
      });

      schema.pre('update', function addUpdatedAtPreOnUpdate(next) {
        this.update({}, { $set: { updatedAt: new Date() } });
        next();
      });
    };

    mongoose.plugin(addUpdatedAt);

    logger.info('mongo database connected');

    return mongooseConnection;
  };

  const stop = async () => {
    await mongooseConnection.close();
  };

  const register = async () => {
    container.register('mongooseConnection', awilix.asValue(mongooseConnection));
  };

  return {
    start,
    stop,
    register,
  };
};
