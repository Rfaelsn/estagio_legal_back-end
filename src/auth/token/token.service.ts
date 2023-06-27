import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserService } from 'src/modules/user/application/service/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async save(hash: string, user_email: string) {
    const objToken = await this.prismaService.token.findFirst({
      where: {
        user_email: user_email,
      },
    });

    if (objToken) {
      await this.prismaService.token.update({
        where: {
          id: objToken.id,
        },
        data: {
          hash: hash,
        },
      });
    } else {
      const objToken: Prisma.TokenCreateInput = {
        hash,
        user_email,
      };
      await this.prismaService.token.create({ data: objToken });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.prismaService.token.findFirst({
      where: {
        hash: oldToken,
      },
    });

    if (objToken) {
      const usuario = await this.userService.getUserByEmail(
        objToken.user_email,
      );
      return this.authService.login(usuario);
    } else {
      return new HttpException(
        {
          errorMessage: 'token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
