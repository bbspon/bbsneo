import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as proxy from 'http-proxy-middleware';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const { createProxyMiddleware } = proxy as any;

  app.use(
    '/v1/identity',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3103',
      changeOrigin: true,
      pathRewrite: { '^/v1/identity': '' },
      ws: true,
      proxyTimeout: 10000,
      timeout: 10000,
    }),
  );

  await app.listen(3101);
  console.log('✅ API Gateway running on port 3101');
}
bootstrap();
