import { IsOptional, IsEnum, IsDate } from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../domain/entities/intershipProcess.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';
import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';

export class CreateIntershipProcessDTO {
  @IsEnum(IntershipProcessMovement)
  movement: string;

  @IsEnum(IntershipProcessStatus)
  status: string;

  @IsDate()
  startDateProcess?: string | Date;

  @IsDate()
  endDateProcess: string | Date;

  idUser: string;

  idInternshipGrantor: string;

  @IsOptional()
  termCommitment?: CreateTermCommitmentDTO;

  @IsOptional()
  internshipEvaluation?: InternshipEvaluation;
}
