import {
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role, User } from '../../domain/entities/user.entity';

export class CreateAlunoDTO extends User {}
