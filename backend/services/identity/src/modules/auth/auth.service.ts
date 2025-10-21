import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/schemas/user.schema';
import { Session } from '../../domain/schemas/session.schema';
import { hashPassword, verifyPassword } from '../../common/utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../common/utils/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    @InjectModel(Session.name) private sessions: Model<Session>,
  ) {}

  async register(email: string, password: string, displayName?: string) {
    const exists = await this.users.findOne({ email });
    if (exists) throw new BadRequestException('Email already registered');
    const passwordHash = await hashPassword(password);
    const user = await this.users.create({ email, passwordHash, displayName });
    const { accessToken, refreshToken } = await this.issueTokens(user.id);
    return { userId: user.id, accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.users.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await verifyPassword(password, user.passwordHash || '');
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const { accessToken, refreshToken } = await this.issueTokens(user.id);
    return { userId: user.id, accessToken, refreshToken };
  }

  private async issueTokens(userId: string) {
    const accessToken = signAccessToken({ sub: userId });
    const refreshToken = signRefreshToken({ sub: userId });
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await this.sessions.create({
      userId,
      refreshTokenHash: refreshToken, // can hash later
      expiresAt,
    });
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const session = await this.sessions.findOne({ userId: payload.sub, refreshTokenHash: refreshToken });
    if (!session) throw new UnauthorizedException('Invalid session');
    return this.issueTokens(String(payload.sub));
  }

  async logout(userId: string) {
    await this.sessions.deleteMany({ userId });
    return { success: true };
  }
}
