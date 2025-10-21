// backend/services/identity/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MfaModule } from './modules/mfa/mfa.module';
import { HealthModule } from './modules/health/health.module';
import { SignupModule } from './modules/signup/signup.module';
import { User, UserSchema } from './modules/profile/user.schema';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(__dirname, '..', '..', 'identity.env'),
      ],
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/bbsneo_identity'
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HealthModule,
    SignupModule,
    MfaModule
  ],

  // Do NOT re-list HealthController/SignupController here,
  // they are provided by their modules above.
  controllers: [],
  providers: [],
})
export class AppModule {}
