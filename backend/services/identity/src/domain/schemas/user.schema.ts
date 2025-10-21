import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../enums/role.enum';
import { KycStatus } from '../enums/kyc-status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ lowercase: true, trim: true, unique: true, index: true })
  email!: string;

  @Prop({ trim: true, unique: true, sparse: true })
  phone?: string;

  @Prop()
  passwordHash!: string;

  @Prop({ type: [String], default: [Role.USER] })
  roles!: string[];

  @Prop({ trim: true, unique: true, sparse: true })
  username?: string;

  @Prop({ trim: true })
  displayName?: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ default: 'IN' })
  countryCode!: string;

  @Prop({ default: 'en-IN' })
  locale!: string;

  @Prop({ default: false })
  mfaEnabled!: boolean;

  @Prop({ type: String, enum: Object.values(KycStatus), default: KycStatus.PENDING })
  kycStatus!: KycStatus;

  // IMPORTANT: do not use "Date | null" union here
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ username: 1 });
