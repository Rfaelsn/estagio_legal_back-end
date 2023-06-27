import { Body, Controller, Put } from '@nestjs/common';
import { TokenService } from './token.service';
import { RefreshTokenDTO } from './dto/RefreshTokenDTO';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @IsPublic()
  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDTO) {
    return await this.tokenService.refreshToken(data.oldToken);
  }
}
