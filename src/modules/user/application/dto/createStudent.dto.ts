import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../domain/entities/user.entity';
import { IsCPF } from 'src/shared/decorators/isCpf.decorator';
import { IsTime } from '@/shared/decorators/isTime.decorator';

export class CreateStudentDTO {
  @IsString()
  name: string;

  @IsCPF()
  cpf: string;

  @IsString()
  rg: string;

  @IsNotEmpty()
  @IsTime('toDate')
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

  @IsEnum(Role)
  role: string;

  @IsString()
  UF: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  address: string;

  @IsString()
  postalCode: string;
}
