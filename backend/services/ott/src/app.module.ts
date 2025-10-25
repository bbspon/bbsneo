import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Trending, TrendingSchema } from "./trending/trending.schema";
import { TrendingController } from "./trending/trending.controller";
import { TrendingService } from "./trending/trending.service";
import { ReelsModule } from "./reels/reels.module"; 
import {MoviesModule} from "./movies/movies.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/bbs_neo"),
    MongooseModule.forFeature([
      { name: Trending.name, schema: TrendingSchema },
    ]),
    ReelsModule,
    MoviesModule,
    CategoriesModule,
  ],
  controllers: [TrendingController],
  providers: [TrendingService],
})
export class AppModule {}
