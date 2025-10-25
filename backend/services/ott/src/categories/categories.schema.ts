import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class CategorySection extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string; // e.g., "Trending Now"

  @Prop({ type: [String], default: [] })
  posters: string[]; // array of poster URLs
}

export const CategorySectionSchema =
  SchemaFactory.createForClass(CategorySection);
