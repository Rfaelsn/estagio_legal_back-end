import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../domain/entities/user.entity';

export class UserFilterDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsString()
  @IsOptional()
  registration: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  telefone: string;

  @IsString()
  @IsOptional()
  courseStudy: string;

  @IsEnum(Role)
  @IsOptional()
  role: string;
}
