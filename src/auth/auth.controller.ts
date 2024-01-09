import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('refresh/token')
  async refreshToken(@Body() body) {
    return this.authService.verifyRefreshToken(body);
  }
}
