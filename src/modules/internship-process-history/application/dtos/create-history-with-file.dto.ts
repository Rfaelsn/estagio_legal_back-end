import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateHistoryWithFileDto {
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  status: string;

  @IsString()
  movement: string;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsString()
  idInternshipProcess: string;

  @IsArray()
  @IsOptional()
  files?: [{ fileId: string; fileType: string }];
}
