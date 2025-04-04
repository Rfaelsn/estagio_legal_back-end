import { IsOptional, IsEnum, IsDate, IsString } from 'class-validator';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../domain/entities/internshipProcess.entity';
import { TermCommitmentDTO } from 'src/modules/termCommitment/application/dto/termCommitmentDTO';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateIntershipProcessByTermCommitmentDTO
  implements Prisma.InternshipProcessUncheckedCreateInput
{
  @IsEnum(InternshipProcessMovement)
  movement: string;

  @IsEnum(InternshipProcessStatus)
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
}
