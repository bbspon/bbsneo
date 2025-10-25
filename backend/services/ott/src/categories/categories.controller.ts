import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "../common/guards/jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly svc: CategoriesService) {}

  // GET /categories?format=object -> { data: { "Trending Now": [..], ... } }
  @Get()
  async getAll(@Query("format") format?: string) {
    if (format === "object") {
      const data = await this.svc.asObject();
      return { success: true, data };
    }
    const rows = await this.svc.findAll();
    return { success: true, rows };
  }

  // POST /categories (admin/creator only)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "creator", "manager")
  async create(@Body() dto: CreateCategoryDto) {
    const row = await this.svc.create(dto);
    return { success: true, row };
  }

  // PUT /categories/:id
  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "creator", "manager")
  async update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
    const row = await this.svc.update(id, dto);
    return { success: true, row };
  }

  // DELETE /categories/:id
  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "creator", "manager")
  async remove(@Param("id") id: string) {
    await this.svc.remove(id);
    return { success: true };
  }

  // POST /categories/seed (idempotent helper)
  @Post("seed")
  async seed() {
    return this.svc.seedIfEmpty();
  }
}
