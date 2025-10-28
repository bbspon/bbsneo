import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type YStudioVideoDocument = HydratedDocument<YStudioVideo>;

@Schema({
  collection: "ystudio_videos", // <-- add this line
  timestamps: true,
})
export class YStudioVideo {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    enum: ["public", "private", "unlisted"],
    default: "public",
    index: true,
  })
  visibility: "public" | "private" | "unlisted";

  @Prop({ type: Number, default: 0, index: true })
  views: number;

  @Prop({ type: Number, default: 0, index: true })
  likes: number;

  @Prop({ type: String })
  ownerId?: string; // set from auth if available
}

export const YStudioVideoSchema = SchemaFactory.createForClass(YStudioVideo);
