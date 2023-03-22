module.exports = async (container, modules) => {
  let error;
  const results = {};
  const stopHandlers = [];

  await Promise.all(
    Object
      .entries(modules)
      .map(async ([key, resolver]) => {
        try {
          const { start, stop, register } = await resolver(container);
          results[key] = await start();

          if (register && typeof register === 'function') {
            await register(results[key]);
          }

          stopHandlers.push(stop);
        }
        catch (e) {
          error = e;
        }
      }),
  );

  const exit = async () => {
    await Promise.all(
      stopHandlers
        .map((stopHandler) => stopHandler()),
    );

    // eslint-disable-next-line no-console
    console.info('Successful graceful shutdown', new Date().toISOString());

    process.exit(0);
  };

  return {
    error,
    results,
    exit,
  };
};
