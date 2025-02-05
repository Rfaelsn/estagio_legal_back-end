import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ValidateAssignEndInternshipProcessDto {
  @IsBoolean()
  validate: boolean;

  @IsArray()
  @IsOptional()
  internshipEvaluationFilesPaths?: string[];

  @IsString()
  @IsOptional()
  remark?: string;

  @IsString()
  internshipProcessId: string;
}
