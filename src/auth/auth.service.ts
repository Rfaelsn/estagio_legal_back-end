import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  // async validateUser(email: string, password: string) {
  //   const user = await this.userService.getUserByEmail(email);

  //   if (user) {
  //     const isPasswordValid = await bcrypt.compare(password, user.password);

  //     if (isPasswordValid) {
  //       return {
  //         ...user,
  //         password: undefined,
  //       };
  //     }
  //   }

  //   throw new UnauthorizedError('Email e/ou senha incorretos');
  // }

  async login(user: User): Promise<void> {
    const { data } = await firstValueFrom(
      this.http.post(
        process.env.KEYCLOACK_URL +
          '/realms/ifpa/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: process.env.KEYCLOACK_CLIENT_ID,
          client_secret: process.env.KEYCLOACK_CLIENT_SECRET,
          grant_type: 'password',
          username: user.email,
          password: user.password,
        }),
      ),
    );
    return data;
  }
}
