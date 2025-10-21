import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { KycStatus } from '../enums/kyc-status.enum';

export type KycDocument = HydratedDocument<KycRecord>;

@Schema({ timestamps: true })
export class KycRecord {
  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId: any;

  @Prop()
  documentType!: string; // aadhaar, pan, passport

  @Prop()
  frontUrl!: string;

  @Prop()
  backUrl?: string;

  @Prop({ type: String, enum: Object.values(KycStatus), default: KycStatus.PENDING })
  status!: KycStatus;

  @Prop()
  notes?: string;

  @Prop()
  reviewedBy?: string;

  @Prop()
  reviewedAt?: Date;
}

export const KycSchema = SchemaFactory.createForClass(KycRecord);
