import {
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '../../domain/entities/user.entity';

export class CreateFuncionarioDTO {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEnum(Role)
  role: string;

  @IsOptional()
  id_instituicao: string;
}
