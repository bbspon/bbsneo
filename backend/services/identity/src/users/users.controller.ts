import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { UpdateProfileDto } from "./dto/profile.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async signup(@Body() dto: SignupDto) {
    return this.usersService.signup(dto);
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put("profile")
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.sub, dto);
  }
}
