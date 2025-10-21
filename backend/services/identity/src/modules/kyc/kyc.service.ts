import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KycRecord } from '../../domain/schemas/kyc.schema';
import { Model } from 'mongoose';
import { KycStatus } from '../../domain/enums/kyc-status.enum';
import { User } from '../../domain/schemas/user.schema';

@Injectable()
export class KycService {
  constructor(
    @InjectModel(KycRecord.name) private kycs: Model<KycRecord>,
    @InjectModel(User.name) private users: Model<User>,
  ) {}

  async submit(userId: string, documentType: string, frontUrl: string, backUrl?: string) {
    await this.kycs.updateOne(
      { userId },
      { $set: { documentType, frontUrl, backUrl, status: KycStatus.PENDING } },
      { upsert: true },
    );
    await this.users.updateOne({ _id: userId }, { $set: { kycStatus: KycStatus.PENDING } });
    return { success: true };
  }

  async me(userId: string) {
    const doc = await this.kycs.findOne({ userId }).lean();
    if (!doc) return { status: KycStatus.PENDING };
    return doc;
  }
}
