const { WarlockError } = require('../errors/types');

// Provides room to scale system to distributed architecture
module.exports = class WarlockService {
  constructor({ logger, warlock }) {
    this.logger = logger;
    this.warlock = warlock;
  }

  async critical({
    key, promise, maxAttempts = 1, wait = 1000, ttl = 60000,
  }) {
    const { logger, warlock } = this;

    return new Promise((resolve, reject) => {
      logger.debug('[warlockService] trying a lock', { key });

      warlock.optimistic(key, ttl, maxAttempts, wait, async (error, unlock) => {
        if (error) {
          logger.warn('[WarlockService] critical - failed to acquire lock', {
            key,
            error,
          });

          return reject(new WarlockError());
        }

        // Lock acquired successfully, resolve promise within the lock;
        if (typeof unlock === 'function') {
          logger.debug('[warlockService] lock acquired', { key });

          return resolve(
            promise()
              .then((result) => {
                unlock();
                logger.debug('[warlockService] lock released after resolve', { key });

                return result;
              })
              .catch((e) => {
                unlock();
                logger.debug('[warlockService] locked promise error', { error: e, key });

                throw e;
              }),
          );
        }

        return undefined;
      });
    });
  }
};
