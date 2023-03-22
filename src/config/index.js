const pkg = require('../../package.json');

const config = {
  env: process.NODE_ENV || 'dev',
  name: pkg.name,
  version: pkg.version,

  server: {
    port: process.env.SERVER_PORT || 8080,
    keepAliveTimeout: process.env.SERVER_KEEP_ALIVE_TIMEOUT || 120000,
    returnFailedValidationInfoError: (process.env.SERVER_RETURN_VALIDATION_INFO_ERROR || 'false').trim().toLowerCase() === 'true',
    livenessProbeFailureThreshold: process.env.LIVENESS_PROBE_FAILURE_THRESHOLD || 2,
    livenessProbePeriodSeconds: process.env.LIVENESS_PROBE_PERIOD_SECONDS || 2,
  },
  cors: {
    enabled: (process.env.CORS_ENABLED || 'true').trim().toLowerCase() === 'true',
    origin: process.env.CORS_ORIGIN || '*',
  },
};

config.log = {
  env: config.env,
  name: config.name,
  version: config.version,
  level: process.env.LOG_LEVEL || 'debug',
};

module.exports = config;