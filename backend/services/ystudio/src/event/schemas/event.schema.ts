import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true, collection: "events" })
export class Event extends Document {
  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    enum: [
      "Tech",
      "Music",
      "Health",
      "Sports",
      "Business",
      "Community",
      "Education",
    ],
  })
  category: string;

  @Prop({ required: true })
  organizerName: string;

  @Prop({ required: true, enum: ["Online", "Offline", "Hybrid"] })
  locationType: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  startDateTime: Date;

  @Prop()
  endDateTime: Date;

  @Prop()
  coverImageUrl: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  isLive: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  attendeeLimit: number;

  @Prop({ default: 0 })
  attendeeCount: number;

  @Prop({ type: [Types.ObjectId], ref: "User", default: [] })
  rsvpList: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId;

  @Prop({
    default: "Upcoming",
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
  })
  status: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
