import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserAlunoOutputDTO {
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  cpf: string;

  @IsString()
  @Expose()
  academicRegistrationCode: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  telefone: string;

  @IsString()
  @Expose()
  courseStudy: string;
}
