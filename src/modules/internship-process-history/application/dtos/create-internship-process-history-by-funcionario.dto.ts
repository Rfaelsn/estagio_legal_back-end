import { IsDate, IsString } from 'class-validator';

export class CreateInternshipProcessHistoryByFuncionarioDto {
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
}
