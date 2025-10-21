// backend/services/identity/src/modules/signup/signup.service.ts
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './signup.dto';
import { User, UserDocument } from '../profile/user.schema';

@Injectable()
export class SignupService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(dto: SignupDto) {
    try {
      // Check for duplicates by email or phone
      const existingUser = await this.userModel.findOne({
        $or: [{ email: dto.email.toLowerCase() }, { phone: dto.phone }],
      });

      if (existingUser) {
        throw new ConflictException('Email or phone already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create new user record
      const newUser = new this.userModel({
        fullName: dto.fullName,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        passwordHash: hashedPassword,
        roles: ['User'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newUser.save(); // ensures DB persistence

      return {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      };
    } catch (error) {
      // Mongoose duplicate key error (index: email/phone)
      if (error.code === 11000) {
        throw new ConflictException('Duplicate email or phone detected');
      }

      console.error('SignupService error:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
