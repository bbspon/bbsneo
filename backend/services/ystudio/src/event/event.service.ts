import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Event } from "./schemas/event.schema";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>
  ) {}

  async getAll() {
    return this.eventModel.find().sort({ startDateTime: 1 }).exec();
  }

  async getById(id: string) {
    return this.eventModel.findById(id).exec();
  }

  async create(data: any) {
    const created = new this.eventModel(data);
    return created.save();
  }

  async update(id: string, data: any) {
    return this.eventModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.eventModel.findByIdAndDelete(id).exec();
  }

  async rsvp(id: string, userId: string) {
    return this.eventModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { rsvpList: userId }, $inc: { attendeeCount: 1 } },
        { new: true }
      )
      .exec();
  }
}
