import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ collection: 'otps', timestamps: true })
export class Otp {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  code: string; // 6-digit string

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  used: boolean;

  @Prop({ default: 'email' })
  channel: 'email' | 'sms';
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ email: 1, code: 1, used: 1 }); // fast verify
