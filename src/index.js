const bootstrap = require('./bootstrap');
const container = require('./bootstrap/container');
const serverModules = require('./server');
const { server: serverConfig } = require('./config');

(async () => {
  try {
    const { livenessProbePeriodSeconds, livenessProbeFailureThreshold } = serverConfig;
    const { exit, error } = await bootstrap(container, { serverModules });

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      await exit();
    }

    process.on('SIGTERM', () => {
      // eslint-disable-next-line no-console
      console.info('SIGTERM encountered. Graceful shutdown start', new Date().toISOString());

      setTimeout(exit, livenessProbeFailureThreshold * livenessProbePeriodSeconds * 1000);
    });
    process.on('SIGINT', exit);
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    process.exit(0);
  }
})();
