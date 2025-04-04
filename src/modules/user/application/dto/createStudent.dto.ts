import { IsEmail, IsString, IsEnum } from 'class-validator';
import { Role } from '../../domain/entities/user.entity';
import { IsCPF } from 'src/shared/decorators/isCpf.decorator';

export class CreateStudentDTO {
  @IsString()
  name: string;

  @IsCPF()
  cpf: string;

  @IsString()
  registration?: string;

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
}
