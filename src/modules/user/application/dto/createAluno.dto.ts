import {
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '../../domain/entities/user.entity';

export class CreateAlunoDTO {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  matricula: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  curso: string;

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

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
