import { RegisterFilePathDto } from '@/modules/file/application/dtos/registerFilePath.dto';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class RegisterEndInternshipProcessDto {
  @IsString()
  internshipProcessId: string;

  @IsArray()
  internshipEvaluationFilesPaths: RegisterFilePathDto[];

  @IsString()
  @IsOptional()
  remark?: string;

  @IsBoolean()
  @IsOptional()
  validate: boolean;
}
