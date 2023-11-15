// CORS plugin
module.exports = ({ config: { cors } }) => ([
  {
    name: 'cors',
    version: '0.0.1',
    register: (server) => {
      // Modify response object before sending
      server.ext('onPreResponse', (req, h) => {
        let reqHeaderOrigin = req.headers.origin;

        if (!reqHeaderOrigin && req.orig && req.orig.headers) {
          reqHeaderOrigin = req.orig.headers;
        }

        if (!cors.enabled || !reqHeaderOrigin || reqHeaderOrigin === 'null') {
          return h.continue;
        }

        // Only allow headers unless wildcard
        let { origin } = cors;
        if (!origin === '*') {
          origin = origin.includes(reqHeaderOrigin) ? reqHeaderOrigin : '';
        }

        const corsOptions = {
          origin,
          exposeHeaders: ['content-type', 'content-length'],
          methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
          maxAge: 600,
          allowCredentials: 'true',
          headers: [
            'Accept', 'Accept-Language', 'Authorization', 'Content-Type',
            'Access-Control-Allow-Origin', 'x_refresh_token', 'x_access_token',
            'token', 'x-language', 'x-forwarded-for',
          ],
        };

        const res = req.response.isBoom ? req.response.output : req.response;

        res.headers['Access-Control-Allow-Headers'] = corsOptions.headers;
        res.headers['Access-Control-Allow-Origin'] = corsOptions.origin;
        res.headers['Access-Control-Allow-Credentials'] = corsOptions.allowCredentials;

        if (req.method !== 'options') {
          return h.continue;
        }

        // Pre-flight OPTIONS
        return (
          h
            .response('')
            .header('access-control-allow-origin', corsOptions.origin)
            .header('access-control-allow-credentials', corsOptions.allowCredentials)
            .header('access-control-expose-headers', corsOptions.exposeHeaders.join(', '))
            .header('access-control-max-age', corsOptions.maxAge)
            .header('access-control-allow-methods', corsOptions.methods.join(', '))
            .header('access-control-allow-headers', corsOptions.headers.join(', '))
            .code(200)
        );
      });
    },
  },
]);
