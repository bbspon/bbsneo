import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // If Mongoose connection already exists in your app, keep only one forRoot.
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bbsneo_identity",
      {
        dbName: "bbsneo_identity",
        autoIndex: true,
      }
    ),

    UsersModule,
  ],
})
export class AppModule {}
