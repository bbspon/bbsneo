import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { LiveService } from "./live.service";
import { CreateLiveDto } from "./dto/create-live.dto";
import { UpdateLiveDto } from "./dto/update-live.dto";
import { JwtAuthGuard } from "../../common/guards/jwt.guard"; // adjust import to your identity/auth module
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller("live")
export class LiveController {
  constructor(private readonly service: LiveService) {}

  @Get()
  list(
    @Query("q") q?: string,
    @Query("category") category?: string,
    @Query("lang") lang?: string,
    @Query("premium") premium?: string,
    @Query("limit", new DefaultValuePipe("24")) limit?: string,
    @Query("page", new DefaultValuePipe("1")) page?: string
  ) {
    return this.service.findAll({ q, category, lang, premium, limit, page });
  }

  @Get(":slug")
  get(@Param("slug") slug: string) {
    return this.service.findOneBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "creator", "manager")
  @Post()
  create(@Body() dto: CreateLiveDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "creator", "manager")
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateLiveDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
