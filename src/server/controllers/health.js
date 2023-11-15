module.exports = class HealthController {
  constructor({ HealthService }) {
    this.HealthService = HealthService;
  }

  async getHealthCheck(request, h) {
    const { HealthService } = this;

    return HealthService.getHealthCheck(request, h);
  }
};
