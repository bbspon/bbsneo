import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Trending, TrendingSchema } from "./trending/trending.schema";
import { TrendingController } from "./trending/trending.controller";
import { TrendingService } from "./trending/trending.service";
import { ReelsModule } from "./reels/reels.module";
import { MoviesModule } from "./movies/movies.module";
import { CategoriesModule } from "./categories/categories.module";
import { LiveModule } from "./live/schemas/live.module";
import { HomeModule } from "./home/home.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DBNAME || "bbsneo_ott",
      autoIndex: true,
    }),
    // ✅ Feature & domain modules
    MongooseModule.forFeature([
      { name: Trending.name, schema: TrendingSchema },
    ]),
    ReelsModule,
    MoviesModule,
    CategoriesModule,
    LiveModule,
    HomeModule,
  ],
  controllers: [TrendingController],
  providers: [TrendingService],
})
export class AppModule {}
