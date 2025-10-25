import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ _id: false, timestamps: true })
class Reply {
  @Prop({ required: true }) user: string;
  @Prop({ required: true, maxlength: 280 }) text: string;
  @Prop({ default: 0 }) likes: number;
}
const ReplySchema = SchemaFactory.createForClass(Reply);

@Schema({ _id: false, timestamps: true })
class Comment {
  @Prop({ required: true }) user: string;
  @Prop({ required: true, maxlength: 280 }) text: string;
  @Prop({ default: 0 }) likes: number;
  @Prop({ type: [ReplySchema], default: [] }) replies: Reply[];
}
const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Reel extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) src: string; // mp4/webm url
  @Prop({ required: true }) creator: string; // creator name/handle
  @Prop({ default: 0 }) likes: number;
  @Prop({ default: 0 }) shares: number;
  @Prop({ type: [CommentSchema], default: [] }) comments: Comment[];
}

export const ReelSchema = SchemaFactory.createForClass(Reel);
export { Comment, Reply, CommentSchema, ReplySchema };
