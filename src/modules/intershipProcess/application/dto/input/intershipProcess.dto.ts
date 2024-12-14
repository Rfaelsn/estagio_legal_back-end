import { IsOptional, IsEnum, IsString } from 'class-validator';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../../domain/entities/internshipProcess.entity';

export class CreateInternshipProcessDTO {
  @IsEnum(InternshipProcessMovement)
  movement: string;

  @IsEnum(InternshipProcessStatus)
  status: string;

  @IsString()
  id_user: string;

  @IsOptional()
  id_termCommitment?: string;
}
