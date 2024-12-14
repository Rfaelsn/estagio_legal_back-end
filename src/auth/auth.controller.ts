import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user) {
    try {
      return this.authService.login(user);
    } catch (error) {
      console.error(error);
    }
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() body) {
    try {
      return this.authService.verifyRefreshToken(body);
    } catch (error) {
      console.error(error);
    }
  }
}
