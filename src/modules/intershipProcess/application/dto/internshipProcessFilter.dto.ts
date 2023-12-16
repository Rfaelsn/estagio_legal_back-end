import {
  IsOptional,
  IsEnum,
  IsDate,
  ValidateNested,
  IsObject,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../domain/entities/intershipProcess.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';
import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';
import { UserFilterDTO } from 'src/modules/user/application/dto/userFilter.dto';
import { TermCommitmentFilterDTO } from 'src/modules/termCommitment/application/dto/termCommitmentFilter.dto';
import { Transform } from 'class-transformer';

export class InternshipProcessFilterDTO {
  @IsEnum(IntershipProcessMovement)
  @IsOptional()
  movement;

  @IsEnum(IntershipProcessStatus)
  @IsOptional()
  status;

  @IsString()
  @IsOptional()
  startDateProcess;

  @IsString()
  @IsOptional()
  endDateProcess;

  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  page?: number;

  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  pageSize?: number;

  @IsOptional()
  @IsObject()
  user: UserFilterDTO;

  @IsOptional()
  termCommitment: TermCommitmentFilterDTO;
}
