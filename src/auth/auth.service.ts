import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserPayload } from './models/UserPayload';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/application/service/user.service';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { Request, Response } from 'express';
import { extractTokensFromCookies } from './utils/extract-tokens.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity, response: Response): Promise<any> {
    const validatedUser = await this.validateUser(user.email, user.password);

    const accessToken = this.generateAccessToken(validatedUser);
    const refreshToken = this.generateRefreshToken(validatedUser);

    this.setAuthCookies(response, accessToken, refreshToken);

    return validatedUser;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
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

  private generateAccessToken(user: UserEntity): string {
    const payload: UserPayload = {
      role: user.role,
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload);
  }

  async validateAccessToken(request: Request): Promise<boolean> {
    const { accessToken } = extractTokensFromCookies(request);

    if (!accessToken) {
      throw new UnauthorizedError('Token not found in cookies');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedError('Token invalid or expired');
    }
  }

  private generateRefreshToken(user: UserEntity): string {
    const payload: UserPayload = {
      role: user.role,
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
  }

  async refreshAuthCookieTokens(request: Request, response: Response) {
    const { refreshToken } = extractTokensFromCookies(request);

    if (!refreshToken) {
      throw new NotFoundException('User not found');
    }

    try {
      const decodedToken = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const email = decodedToken['email'];
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const accessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      this.setAuthCookies(response, accessToken, newRefreshToken);
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid Assign');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expired');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProduction = process.env.NODE_ENV === 'production';

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
