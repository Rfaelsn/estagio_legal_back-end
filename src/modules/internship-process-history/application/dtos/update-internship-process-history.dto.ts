import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateInternshipProcessHistoryDto {
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  movement?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsString()
  idInternshipProcess: string;

  @IsString()
  @IsOptional()
  fileId?: string;
}
