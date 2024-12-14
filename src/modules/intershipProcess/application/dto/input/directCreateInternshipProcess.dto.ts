import { IsOptional, IsEnum, IsString } from 'class-validator';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../../domain/entities/internshipProcess.entity';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';

export class DirectCreateIntershipProcessDTO {
  @IsEnum(InternshipProcessMovement)
  movement: string;

  @IsEnum(InternshipProcessStatus)
  status: string;

  @IsString()
  id_user: string;

  @IsOptional()
  termCommitment?: CreateTermCommitmentDTO;

  @IsOptional()
  id_termCommitment?: string;
}
