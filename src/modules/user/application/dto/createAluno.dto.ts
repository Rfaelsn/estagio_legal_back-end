import {
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Role, User } from '../../domain/entities/user.entity';

export class CreateAlunoDTO {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  registration?: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  courseStudy?: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: string;
}
