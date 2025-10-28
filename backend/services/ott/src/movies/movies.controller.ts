import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./movies.schema";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async list(@Query() query: any) {
    const data = await this.moviesService.findAll(query);
    return { success: true, data };
  }

  @Get(":id")
  async getOne(@Param("id") id: string) {
    const movie = await this.moviesService.findOne(id);
    return movie
      ? { success: true, data: movie }
      : { success: false, message: "Not found" };
  }

  @Post()
  async create(@Body() body: Partial<Movie>) {
    const doc = await this.moviesService.create(body);
    return { success: true, data: doc };
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: Partial<Movie>) {
    const doc = await this.moviesService.update(id, body);
    return { success: true, data: doc };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.moviesService.remove(id);
    return { success: true };
  }
}
