import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Trending extends Document {
  @Prop({ required: true, minlength: 2, maxlength: 100 })
  title: string;

  @Prop({ required: true })
  creatorName: string;

  @Prop()
  creatorHandle?: string;

  @Prop({
    required: true,
    enum: ["Travel", "Tech", "Music", "Gaming", "Education"],
  })
  category: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true, default: 0 })
  viewsCount: number;

  @Prop({ required: true, default: 0 })
  likesCount: number;
}

export const TrendingSchema = SchemaFactory.createForClass(Trending);
