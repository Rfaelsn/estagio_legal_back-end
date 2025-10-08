import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateInternshipProcessHistoryDto {
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  status: string;

  @IsString()
  movement: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsString()
  idInternshipProcess: string;

  @IsArray()
  @IsOptional()
  fileIds?: string[];
}
