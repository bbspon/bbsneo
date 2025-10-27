import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3104;
  await app.listen(port);
  console.log(`[OTT] Movies service running on port ${port}`);
}
bootstrap();
