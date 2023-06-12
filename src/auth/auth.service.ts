import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  createToken(user: User) {
    return {
      acessToken: this.jwtService.sign(
        // infos requeridas no payload
        {
          id: String(user.id),
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '5 minutes', // tempo de expiração
          subject: String(user.id), //assunto do token
          issuer: this.issuer, //modulo emissor
          audience: this.audience, //destinaratio do token
          // notBefore: Math.ceil((Date.now() + 1000 * 60 * 60) / 1000), //data de inicialização da validade
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience, // se algum destes atrib for diferente do tk recebido não será validado
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }
    return this.createToken(user);
  }
  async forget(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto');
    }

    //enviar email

    return true;
  }
}
