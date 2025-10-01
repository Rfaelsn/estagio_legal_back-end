import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { IsCPF } from 'src/shared/decorators/isCpf.decorator';

export class CreateStudentDTO {
  @IsString()
  name: string;

  @IsCPF()
  cpf: string;

  @IsString()
  rg: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  academicRegistrationCode?: string;

  @IsEmail()
  email: string;

  @IsString()
  telephone: string;

  @IsString()
  courseStudy?: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  UF: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  postalCode: string;
}
