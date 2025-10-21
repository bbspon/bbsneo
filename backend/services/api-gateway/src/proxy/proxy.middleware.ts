import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

/**
 * Map service name -> local target
 */
const map: Record<string, string> = {
  identity: 'http://localhost:3102',
  ott: 'http://localhost:3103',
  messenger: 'http://localhost:3104',
  social: 'http://localhost:3105',
  wallet: 'http://localhost:3106',
  'revenue-cms': 'http://localhost:3107',
  moderation: 'http://localhost:3108',
  'search-rec': 'http://localhost:3109',
  admin: 'http://localhost:3110',
};

function normalizePath(req: Request): string {
  // Prefer originalUrl when present (Express/Nest)
  const url = (req as any).originalUrl || req.url || '';
  // Remove querystring and trailing slashes
  const noQuery = url.split('?')[0] || '';
  return noQuery.replace(/\/+$/, '');
}

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const path = normalizePath(req); // e.g. "/v1/identity" or "/v1/identity/profile"
    // Match "/v1/<service>" at the start
    const match = path.match(/^\/v1\/([^/]+)/);
    if (match) {
      const service = match[1];               // e.g. "identity"
      const target = map[service];
      if (target) {
        const proxy = createProxyMiddleware(({
          target,
          changeOrigin: true,
          // Strip the prefix "/v1/<service>" so "/" hits the service root
          pathRewrite: {
            [`^/v1/${service}`]: '',
          },
          onProxyReq: (proxyReq: any) => {
            // Optional: keep-alive can help in dev
            proxyReq.setHeader('Connection', 'keep-alive');
          },
        } as any));
        return proxy(req, res, next);
      }
    }
    return res.status(404).json({ error: 'Route not found' });
  }
}
