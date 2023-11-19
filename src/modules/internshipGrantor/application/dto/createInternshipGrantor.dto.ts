import { IsString, IsEmail } from 'class-validator';

export class CreateInternshipGrantorDTO {
  @IsString()
  name: string;

  @IsString()
  endereco: string;

  @IsString()
  cnpj: string;

  @IsString()
  cep: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;
}
