import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'Manual' })
  signUpMethod!: string;

  @Prop({ default: 'user' })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
