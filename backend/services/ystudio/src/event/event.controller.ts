import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { Types } from "mongoose";
import { EventService } from "./event.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAll() {
    const events = await this.eventService.getAll();
    return { items: events };
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.eventService.getById(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: any, @Req() req: any) {
    // Try to read possible user id keys
    const rawId =
      req.user?.id ||
      req.user?._id ||
      req.user?.userId ||
      req.user?.sub ||
      null;

    // Log once during debug to confirm what your JWT contains
    console.log("[YStudio] req.user received:", req.user);

    // ✅ Validate before creating ObjectId
    let createdBy: Types.ObjectId;
    if (rawId && Types.ObjectId.isValid(String(rawId))) {
      createdBy = new Types.ObjectId(String(rawId));
    } else {
      // fallback (system user)
      const fallbackId =
        process.env.DEFAULT_USER_ID || "000000000000000000000001";
      createdBy = new Types.ObjectId(fallbackId);
    }

    return this.eventService.create({ ...body, createdBy });
  }
  @Put(":id")
  async update(@Param("id") id: string, @Body() body: any) {
    return this.eventService.update(id, body);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.eventService.delete(id);
  }

  @Post(":id/rsvp")
  async rsvp(@Param("id") id: string, @Body("userId") userId: string) {
    return this.eventService.rsvp(id, userId);
  }
}
