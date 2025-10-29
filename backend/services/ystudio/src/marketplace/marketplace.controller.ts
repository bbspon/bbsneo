import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard"; // reuse your existing guard
import { MarketplaceService } from "./marketplace.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";

@Controller("/listings")
export class MarketplaceController {
  constructor(private readonly svc: MarketplaceService) {}

  @Get()
  list(@Query() q: any) {
    return this.svc.findAll(q);
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateListingDto, @Req() req: any) {
    return this.svc.create(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateListingDto) {
    return this.svc.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/favourite")
  fav(@Param("id") id: string, @Req() req: any) {
    return this.svc.toggleFavourite(id, req.user.id);
  }
}
