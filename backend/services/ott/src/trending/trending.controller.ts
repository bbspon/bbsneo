import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from "@nestjs/common";
import { TrendingService } from "./trending.service";
import { CreateTrendingDto } from "./dto/create-trending.dto";

@Controller("trending")
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) {}

  @Get()
  getAll(@Query("category") category?: string) {
    if (category) return this.trendingService.findByCategory(category);
    return this.trendingService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTrendingDto) {
    return this.trendingService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: Partial<CreateTrendingDto>) {
    return this.trendingService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.trendingService.remove(id);
  }
}
