import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { YStudioModule } from "./ystudio/ystudio.module";
import { EventModule } from "./event/event.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Independent MongoDB connection for Y-Studio
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DBNAME || "bbsneo_ystudio",
      autoIndex: true,
    }),

    YStudioModule,
    EventModule,
  ],
})
export class AppModule {}
