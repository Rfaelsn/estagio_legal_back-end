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
} from '../../domain/entities/intershipProcess.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';
import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';
import { TermCommitmentDTO } from 'src/modules/termCommitment/application/dto/termCommitmentDTO';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateIntershipProcessByTermCommitmentDTO
  implements Prisma.InternshipProcessUncheckedCreateInput
{
  @IsEnum(IntershipProcessMovement)
  movement: string;

  @IsEnum(IntershipProcessStatus)
  status: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDateProcess?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDateProcess: string;

  @IsString()
  id_user: string;

  @IsOptional()
  termCommitment?: TermCommitmentDTO;

  @IsOptional()
  internshipEvaluation?: Prisma.InternshipEvaluationUncheckedCreateNestedManyWithoutInternshipProcessInput;
}
