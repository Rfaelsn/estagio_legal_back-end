import {
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
} from 'class-validator';
export class AuthRegisterDTO {
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

  @IsOptional()
  id_instituicao: bigint;
}
