const awilix = require('awilix');
const redis = require('redis');
const Warlock = require('node-redis-warlock');

module.exports = async (container) => {
  const logger = container.resolve('logger');
  const { redis: { url: redisUrl } } = container.resolve('config');

  let redisClient;
  let warlock;

  const start = async () => {
    redisClient = redis.createClient(redisUrl);
    warlock = Warlock(redisClient);

    logger.info('warlock connected');

    return warlock;
  };

  const stop = async () => {
    redisClient.quit();

    logger.info('warlock disconnected');
  };

  const register = async () => {
    container.register('warlock', awilix.asValue(warlock));
  };

  return {
    start,
    stop,
    register,
  };
};
