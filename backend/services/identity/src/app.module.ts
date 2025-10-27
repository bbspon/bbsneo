import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = process.env.MONGO_URI;
        if (!uri)
          throw new Error("MONGO_URI missing. Check environment variables.");
        console.log("[Identity] connecting host =", new URL(uri).host);
        return { uri, dbName: "bbsneo_identity", autoIndex: true };
      },
    }),
    UsersModule,
    HealthModule,
  ],
})
export class AppModule {}
