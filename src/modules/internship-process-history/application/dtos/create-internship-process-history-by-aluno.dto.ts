import { IsDate, IsString } from 'class-validator';

export class CreateInternshipProcessHistoryByAlunoDto {
  @IsDate()
  endDate?: Date;

  @IsString()
  movement: string;

  @IsString()
  status: string;

  @IsString()
  idInternshipProcess: string;
}
