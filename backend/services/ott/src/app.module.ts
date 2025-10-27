import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Trending, TrendingSchema } from "./trending/trending.schema";
import { TrendingController } from "./trending/trending.controller";
import { TrendingService } from "./trending/trending.service";
import { ReelsModule } from "./reels/reels.module";
import { MoviesModule } from "./movies/movies.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    // ✅ Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // ✅ Async MongoDB connection using env variable
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = process.env.MONGO_URI;
        if (!uri)
          throw new Error("MONGO_URI missing. Check environment variables.");

        // Optional log for clarity
        console.log("[OTT] connecting host =", new URL(uri).host);

        return {
          uri,
          dbName: "bbsneo_ott", // You can customize this DB name
          autoIndex: true, // Optional: helpful for dev
        };
      },
    }),

    // ✅ Feature & domain modules
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
