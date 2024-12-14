import { IsEnum, IsString } from 'class-validator';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../domain/entities/internshipProcess.entity';

export class UpdateIntershipProcessDTO {
  @IsString()
  id: string;

  @IsEnum(InternshipProcessStatus)
  status: string;

  @IsEnum(InternshipProcessMovement)
  movement: string;
}
