import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  UnauthorizedException, // <-- ADD THIS
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";

import { User } from "./schemas/user.schema";
import { SignupDto } from "./dto/signup.dto";
import { signJwt } from "../auth/jwt.util";
import { UpdateProfileDto } from "./dto/profile.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async signup(dto: SignupDto) {
    try {
      const email = dto.email.trim().toLowerCase();
      const phone = dto.phoneNumber.trim();

      // Uniqueness checks
      const dup = await this.userModel.exists({
        $or: [{ email }, { phoneNumber: phone }],
      });
      if (dup) throw new ConflictException("Email or phone already exists");

      // Hash
      const passwordHash = await bcrypt.hash(dto.password, 12);

      // Create
      const doc = await this.userModel.create({
        fullName: dto.fullName.trim(),
        email,
        phoneNumber: phone,
        passwordHash,
        signUpMethod: dto.signUpMethod || "Manual",
        isVerified: false,
        role: "User",
      });

      this.logger.log(`User created: ${doc._id} (${email})`);

      // Return safe payload
      return {
        id: doc._id?.toString(),
        fullName: doc.fullName,
        email: doc.email,
        phoneNumber: doc.phoneNumber,
        isVerified: doc.isVerified,
      };
    } catch (err: any) {
      this.logger.error(`Signup failed: ${err?.message}`, err?.stack);
      if (err?.code === 11000)
        throw new ConflictException("Email or phone already exists");
      throw new InternalServerErrorException("Signup failed");
    }
  }

  async login(dto: LoginDto) {
    try {
      const email = dto.email.trim().toLowerCase();

      // select only what we need; ensure passwordHash is present
      const user = await this.userModel
        .findOne({ email })
        .select("fullName email phoneNumber role isVerified passwordHash")
        .lean();

      // guard both "not found" and "no passwordHash"
      if (!user || !user.passwordHash) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const ok = await bcrypt.compare(dto.password, user.passwordHash);
      if (!ok) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const secret = process.env.JWT_SECRET || "dev_local_jwt_secret";
      if (!secret) {
        // extremely defensive; should never happen because we defaulted above
        this.logger.error("JWT_SECRET missing");
        throw new InternalServerErrorException("Auth config error");
      }

      const token = signJwt(
        {
          sub: String(user._id || ""),
          email: user.email,
          role: user.role || "User",
        },
        secret
      );

      return {
        token,
        user: {
          id: String(user._id || ""),
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isVerified: !!user.isVerified,
          role: user.role || "User",
        },
      };
    } catch (err: any) {
      // log full detail server-side; client sees clean errors
      this.logger.error(`Login failed: ${err?.message}`, err?.stack);
      if (err?.status === 401) throw err; // UnauthorizedException
      // fallback: never leak details, but avoid 500 loops
      throw err?.status
        ? err
        : new InternalServerErrorException("Login failed");
    }
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new NotFoundException("User not found");
    // pick only safe fields
    const {
      fullName,
      email,
      subscriptionPlan,
      nextRenewalDate,
      profiles = [],
    } = user;
    return { fullName, email, subscriptionPlan, nextRenewalDate, profiles };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // whitelist
    const update: any = {};
    if (dto.fullName !== undefined) update.fullName = dto.fullName;
    if (dto.subscriptionPlan !== undefined)
      update.subscriptionPlan = dto.subscriptionPlan;
    if (Array.isArray(dto.profiles)) update.profiles = dto.profiles;

    const updated = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: update },
        { new: true, runValidators: true }
      )
      .lean();

    if (!updated) throw new NotFoundException("User not found");
    const {
      fullName,
      email,
      subscriptionPlan,
      nextRenewalDate,
      profiles = [],
    } = updated;
    return { fullName, email, subscriptionPlan, nextRenewalDate, profiles };
  }
}
