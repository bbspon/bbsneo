import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';
import { KycRecord, KycSchema } from '../../domain/schemas/kyc.schema';
import { User, UserSchema } from '../../domain/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KycRecord.name, schema: KycSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [KycController],
  providers: [KycService],
})
export class KycModule {}
