import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/modules/internshipProcess/domain/entities/internshipProcess.entity';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateHistoryWithFileDto {
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsEnum(InternshipProcessStatus)
  status: string;

  @IsEnum(InternshipProcessMovement)
  movement: string;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsString()
  idInternshipProcess: string;

  @IsArray()
  @IsOptional()
  files?: [{ fileId: string }];
}
