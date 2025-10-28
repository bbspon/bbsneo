import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { Movie, MovieSchema } from "../movies/movies.schema"; // adjust path

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
