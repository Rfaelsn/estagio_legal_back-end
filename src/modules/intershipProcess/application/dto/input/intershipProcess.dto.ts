import {
  IsOptional,
  IsEnum,
  IsDate,
  IsString,
  isString,
} from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../../domain/entities/intershipProcess.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';
import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';
import { Transform } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class CreateIntershipProcessDTO {
  @IsEnum(IntershipProcessMovement)
  movement: string;

  @IsEnum(IntershipProcessStatus)
  status: string;

  @IsString()
  id_user: string;

  @IsOptional()
  termCommitment?: CreateTermCommitmentDTO;

  @IsOptional()
  id_termCommitment?: string;
}
