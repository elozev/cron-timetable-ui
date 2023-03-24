import { createProxyMiddleware } from 'http-proxy-middleware';
import config from'config';
// Just a proxy for the graphql server


const cronTimetableServiceProxy = createProxyMiddleware({
  target: config.cronTimetableService,
  changeOrigin: true,
  logLevel: 'info',
  pathRewrite: {
    '^/api': '', // remove /api from path
  },
  onProxyReq: (proxyReq, req) => {
    if (req.body && req.header('Content-Type') === 'application/json') {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
});

export default cronTimetableServiceProxy;
