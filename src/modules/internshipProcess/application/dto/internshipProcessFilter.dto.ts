import { IsNumber, IsOptional, IsString } from 'class-validator';

import { TermCommitmentFilterDTO } from 'src/modules/termCommitment/application/dto/termCommitmentFilter.dto';
import { UserFilterDTO } from '@/modules/user/application/dto/userFilter.dto';
import { InternshipGrantorFiltersDto } from './internship-grantor-filters.dto';
import { Type } from 'class-transformer';

export class InternshipProcessFilterDto {
  @IsOptional()
  @IsString()
  startDateProcessRangeStart: string | null;

  @IsOptional()
  @IsString()
  startDateProcessRangeEnd: string | null;

  @IsOptional()
  @IsString()
  endDateProcessRangeStart: string | null;

  @IsOptional()
  @IsString()
  endDateProcessRangeEnd: string | null;

  @IsOptional()
  @IsString()
  movement: string | null;

  @IsOptional()
  @IsString()
  status: string | null;

  @IsOptional()
  internshipGrantor: InternshipGrantorFiltersDto;

  @IsOptional()
  user: UserFilterDTO;

  @IsOptional()
  termCommitment: TermCommitmentFilterDTO;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  perPage: number;
}
