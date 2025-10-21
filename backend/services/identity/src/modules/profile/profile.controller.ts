import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(JwtGuard)
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.service.me(req.user.id);
  }

  @Patch()
  update(@Req() req: any, @Body() body: any) {
    const dto: any = {};
    if (body.displayName) dto.displayName = String(body.displayName);
    if (body.username) dto.username = String(body.username);
    if (body.avatarUrl) dto.avatarUrl = String(body.avatarUrl);
    if (body.locale) dto.locale = String(body.locale);
    return this.service.update(req.user.id, dto);
  }
}
