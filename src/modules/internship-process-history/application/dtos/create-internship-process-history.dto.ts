import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateInternshipProcessHistoryDto {
  @IsDate()
  endDate?: Date;

  @IsString()
  status: string;

  @IsString()
  movement: string;

  @IsString()
  observacoes?: string;

  @IsString()
  idInternshipProcess: string;

  @IsString()
  @IsOptional()
  fileId?: string;
}
