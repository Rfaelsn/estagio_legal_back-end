import { Role } from '@/modules/user/domain/entities/user.entity';
import { IsEmail, IsStrongPassword, IsString, IsEnum } from 'class-validator';

export class AuthRegisterDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEnum(Role)
  role: string;
}
