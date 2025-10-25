import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop({ required: true, minlength: 2, maxlength: 150 })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ default: "Movie", enum: ["Movie", "Series"] })
  type: string;

  @Prop()
  synopsis: string;

  @Prop({ default: "en" })
  language: string;

  @Prop({ min: 1900, max: 2100 })
  releaseYear: number;

  @Prop({ default: 0 })
  popularityScore: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
