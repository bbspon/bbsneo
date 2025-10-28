import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { YStudioService } from "./ystudio.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Controller("api/ystudio/videos")
export class YStudioController {
  constructor(private readonly svc: YStudioService) {}

  @Get()
  list(
    @Query("q") q?: string,
    @Query("category") category?: string,
    @Query("visibility") visibility?: string,
    @Query("limit") limit?: string,
    @Query("page") page?: string
  ) {
    return this.svc.list({
      q,
      category,
      visibility,
      limit: limit ? Number(limit) : 20,
      page: page ? Number(page) : 1,
    });
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findById(id);
  }

  @Post()
  create(@Body() dto: CreateVideoDto) {
    // If you have auth, pull user id from req.user here
    return this.svc.create(dto /*, req.user.id */);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateVideoDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }

  @Post(":id/view")
  addView(@Param("id") id: string) {
    return this.svc.incrementView(id);
  }

  @Post(":id/like")
  addLike(@Param("id") id: string) {
    return this.svc.incrementLike(id);
  }
}
