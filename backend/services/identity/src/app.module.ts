import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    // Load .env globally so process.env.MONGO_URI is available everywhere
    ConfigModule.forRoot({ isGlobal: true }),

    // Strongly enforce Mongo URI presence
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = process.env.MONGO_URI;

        if (!uri) {
          console.error("❌ MONGO_URI is missing in .env file");
          throw new Error(
            "MONGO_URI missing. Please check environment variables."
          );
        }

        console.log("✅ Connecting to MongoDB Atlas host:", new URL(uri).host);

        return {
          uri,
          dbName: "bbsneo_identity",
          autoIndex: true,
        };
      },
    }),

    UsersModule,
  ],
})
export class AppModule {}
