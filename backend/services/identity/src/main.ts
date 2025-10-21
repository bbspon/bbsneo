import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  // Add this:
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // strips unknown fields
      forbidNonWhitelisted: true,    // 400 if unknown fields present
      transform: true,               // auto-transform DTO types
    }),
  );

  // Keep your inline health route if you added it
  const http = app.getHttpAdapter().getInstance();
  http.get('/healthz', (_req: any, res: any) => {
    res.json({ status: 'ok', service: 'identity' });
  });

  const PORT = process.env.PORT || 3103;
  await app.listen(PORT);
  console.log(`✅ Identity service running on port ${PORT}`);
}
bootstrap();
