import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';
import {
  InternshipProcess,
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../domain/entities/intershipProcess.entity';
import { Prisma } from '@prisma/client';

export class CreateIntershipProcessDTO {
  @IsEnum(IntershipProcessMovement)
  movement: string;

  @IsEnum(IntershipProcessStatus)
  status: string;

  @IsDate()
  startDateProcess?: string | Date;

  @IsDate()
  endDateProcess: string | Date;

  @IsOptional()
  user: Prisma.UserCreateNestedOneWithoutInternshipProcessInput;

  @IsOptional()
  termCommitment?: Prisma.TermCommitmentCreateNestedOneWithoutInternshipProcessInput;

  @IsOptional()
  internshipEvaluation?: Prisma.InternshipEvaluationUncheckedCreateNestedManyWithoutInternshipProcessInput;
}
