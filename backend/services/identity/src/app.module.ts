// backend/services/identity/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Feature modules (these declare their own controllers/providers)
import { HealthModule } from './modules/health/health.module';
import { SignupModule } from './modules/signup/signup.module';

// Mongo models registered at the root so they’re available app-wide
import { User, UserSchema } from './modules/profile/user.schema';

@Module({
  imports: [
    // Load .env for the whole app
    ConfigModule.forRoot({ isGlobal: true }),

    // Connect to MongoDB (falls back to local if MONGO_URI is missing)
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/bbsneo_identity'
    ),

    // Register User collection/model
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    // Feature modules (expose their own controllers)
    HealthModule,
    SignupModule,
  ],

  // Do NOT re-list HealthController/SignupController here,
  // they are provided by their modules above.
  controllers: [],
  providers: [],
})
export class AppModule {}
