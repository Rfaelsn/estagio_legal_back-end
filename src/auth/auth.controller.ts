import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user, @Res({ passthrough: true }) response: Response) {
    try {
      return this.authService.login(user, response);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('verify')
  async showUser(@Req() req: Request) {
    return req.user;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      return this.authService.refreshAuthCookieTokens(request, response);
    } catch (error) {
      console.error(error);
    }
  }
}
