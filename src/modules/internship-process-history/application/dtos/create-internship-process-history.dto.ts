import { IsDate, IsString } from 'class-validator';

export class CreateInternshipProcessHistoryDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate?: Date;

  @IsString()
  status: string;

  @IsString()
  observacoes: string;

  @IsString()
  idInternshipProcess: string;
}
