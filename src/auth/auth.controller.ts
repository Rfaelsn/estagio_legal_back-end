import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/modules/user/domain/entities/user.entity';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
// import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() request) {
    console.log(request);
    return { me: 'ok', data: request.tokenPayload };
  }
}
