import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MfaController } from './mfa.controller';
import { MfaService } from './mfa.service';
import { Otp, OtpSchema } from '../../domain/schemas/otp.schema';
import { User, UserSchema } from '../profile/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MfaController],
  providers: [MfaService],
  exports: [MfaService],
})
export class MfaModule {}
