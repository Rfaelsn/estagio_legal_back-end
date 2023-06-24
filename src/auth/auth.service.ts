import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/modules/user/application/service/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { AuthRequest } from './models/AuthRequest';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError('Email e/ou senha incorretos');
  }

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

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = await this.jwtService.sign(payload);

    return {
      acess_token: jwtToken,
    };
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
