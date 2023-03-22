module.exports = class HealthService {
  // eslint-disable-next-line class-methods-use-this
  async getHealthCheck() {
    return { status: 'OK', time: Date.now() };
  }
};
