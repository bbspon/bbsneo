// backend/services/identity/src/modules/signup/signup.service.ts
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './signup.dto';
import { User, UserDocument } from '../profile/user.schema';

@Injectable()
export class SignupService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Normalize helpers
  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private normalizePhone(phone?: string) {
    if (!phone) return undefined;
    // strip spaces and non-digits except leading +
    const clean = phone.trim().replace(/(?!^\+)[^\d]/g, '');
    return clean;
  }

  async signup(dto: SignupDto) {
    try {
      // Basic sanity checks (defense-in-depth; DTO already validates)
      if (dto.password !== dto.confirmPassword) {
        throw new BadRequestException('confirmPassword must match password');
      }

      const email = this.normalizeEmail(dto.email);
      const phone = this.normalizePhone(dto.phone);

      // Check duplicates on email or phone (phone only if provided)
      const dupFilter: any = { $or: [{ email }] };
      if (phone) dupFilter.$or.push({ phone });

      const existingUser = await this.userModel.findOne(dupFilter).lean();
      if (existingUser) {
        throw new ConflictException('Email or phone already registered');
      }

      // Hash password
      const saltRounds =
        Number(process.env.BCRYPT_SALT_ROUNDS || 12); // stronger default
      const passwordHash = await bcrypt.hash(dto.password, saltRounds);

      // Create new user document
      const now = new Date();
      const newUser = new this.userModel({
        fullName: dto.fullName.trim(),
        email,
        phone,
        passwordHash,
        roles: ['User'],
        createdAt: now,
        updatedAt: now,
      });

      await newUser.save(); // persist to MongoDB

      // Minimal safe response (don’t expose hashes)
      return {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      };
    } catch (error: any) {
      // Handle unique index violation from Mongo/Mongoose
      if (error?.code === 11000) {
        // example: error.keyPattern = { email: 1 } or { phone: 1 }
        throw new ConflictException('Duplicate email or phone detected');
      }

      // Bubble up clean errors we threw on purpose
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Log and mask unexpected errors
      // eslint-disable-next-line no-console
      console.error('SignupService error:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
