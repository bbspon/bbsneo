// BEGIN signup.module.ts (final fixed version)
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { User, UserSchema } from '../profile/user.schema'; // corrected path

@Module({
  imports: [
    // Register the shared User schema from profile module
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SignupController],
  providers: [SignupService],
  exports: [SignupService],
})
export class SignupModule {}
// END signup.module.ts
