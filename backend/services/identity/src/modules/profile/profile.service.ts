import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private users: Model<User>) {}

  async me(userId: string) {
    const user = await this.users.findById(userId).lean();
    if (!user) throw new NotFoundException();
    return {
      email: user.email,
      displayName: user.displayName,
      username: user.username,
      avatarUrl: user.avatarUrl,
      locale: user.locale,
      roles: user.roles,
      kycStatus: user.kycStatus,
    };
  }

  async update(userId: string, dto: any) {
    await this.users.updateOne({ _id: userId }, { $set: dto });
    return this.me(userId);
  }
}
