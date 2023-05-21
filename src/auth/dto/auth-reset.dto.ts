import { IsString, IsStrongPassword, IsJWT } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsJWT()
  token: string;
}
