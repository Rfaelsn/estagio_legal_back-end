import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/modules/user/application/service/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const validatedUser = await this.validateUser(user.email, user.password);

    const accessToken = this.generateAccessToken(validatedUser);
    const refreshToken = this.generateRefreshToken(validatedUser);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

  private generateAccessToken(user: User): string {
    const payload: UserPayload = {
      role: user.role,
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(user: User): string {
    const payload: UserPayload = {
      role: user.role,
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload, {
      secret: 'aizedamanga',
      expiresIn: '30d',
    });
  }

  async verifyRefreshToken(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      const decodedToken = this.jwtService.verify(refreshToken, {
        secret: 'aizedamanga',
      });

      // Se você chegou até aqui, o token é válido
      const email = decodedToken['email'];
      const usuario = await this.userService.findByEmail(email);

      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const accessToken = this.generateAccessToken(usuario);
      const newRefreshToken = this.generateRefreshToken(usuario);

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
      };
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
