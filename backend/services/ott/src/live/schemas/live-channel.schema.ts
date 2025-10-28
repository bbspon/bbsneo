import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class LiveChannel extends Document {
  @Prop({ required: true, unique: true })
  channelName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({
    required: true,
    enum: ["News", "Sports", "Kids", "Music", "Movies", "Regional"],
  })
  category: string;

  @Prop() language?: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ default: true })
  isLive: boolean;

  @Prop() programTitle?: string;
  @Prop() programDescription?: string;

  @Prop() startTime?: Date;
  @Prop() endTime?: Date;

  @Prop() nextProgram?: string;

  @Prop({ default: 0 })
  viewerCount: number;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  streamUrl: string;

  @Prop({ enum: ["Free", "Premium", "PayPerView"], default: "Free" })
  subscriptionType: string;
}

export const LiveChannelSchema = SchemaFactory.createForClass(LiveChannel);
LiveChannelSchema.index({ category: 1, language: 1 });
LiveChannelSchema.index({ slug: 1 }, { unique: true });
LiveChannelSchema.index({ channelName: "text", tags: "text" });
