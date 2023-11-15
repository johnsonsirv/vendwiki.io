const helper = require('../helper');

describe('GET /health', () => {
  let server;
  const { start, container } = helper;

  beforeAll(async () => {
    await start(container);

    server = container.resolve('server');
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should show status & time', async () => {
    const { payload, statusCode } = await server.inject({
      url: '/health',
      method: 'GET',
    });

    expect(statusCode).toBe(200);
    expect(payload).toBeDefined();
    const payloadObject = JSON.parse(payload);

    expect(payloadObject).toHaveProperty('status', 'OK');
    expect(payloadObject).toHaveProperty('time');
  });
});
