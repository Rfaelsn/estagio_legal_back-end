import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ValidateAssignTermDto {
  @IsBoolean()
  @IsOptional()
  validate: boolean;

  @IsString()
  @IsOptional()
  termFilePath?: string;

  @IsString()
  @IsOptional()
  remark?: string;

  @IsString()
  internshipProcessId: string;
}
