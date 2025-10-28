import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { HomeService } from "./home.service";
// If you already have JWT guard, you can protect continue-watching later
// import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller("home")
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get("hero")
  hero() {
    return this.service.hero();
  }

  @Get("rows")
  rows() {
    return this.service.rows();
  }

  @Get("continue")
  // @UseGuards(JwtAuthGuard)
  continueWatching(@Req() req: any) {
    const userId = req.user?.id;
    return this.service.continueWatching(userId);
  }
}
