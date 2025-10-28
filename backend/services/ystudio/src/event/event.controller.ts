import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { EventService } from "./event.service";

@Controller("api/events")
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
  async create(@Body() body: any) {
    return this.eventService.create(body);
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
