import { IsOptional, IsEnum, IsDate, IsString } from 'class-validator';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../domain/entities/internshipProcess.entity';
import { TermCommitmentFilterDTO } from 'src/modules/termCommitment/application/dto/termCommitmentFilter.dto';
import { Transform } from 'class-transformer';

export class InternshipProcessFilterByStudentDTO {
  @IsEnum(InternshipProcessMovement)
  @IsOptional()
  movement: string;

  @IsEnum(InternshipProcessStatus)
  @IsOptional()
  status: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value);
  })
  startDateProcessRangeStart: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value);
  })
  startDateProcessRangeEnd: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value);
  })
  endDateProcessRangeStart: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value);
  })
  endDateProcessRangeEnd: Date;

  @IsOptional()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  page: number;

  @IsOptional()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  pageSize: number;

  @IsString()
  @IsOptional()
  idUser?: string;

  @IsOptional()
  termCommitment: TermCommitmentFilterDTO;
}
