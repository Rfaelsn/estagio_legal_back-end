import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ValidateAssignTermDto {
  @IsBoolean()
  validate: boolean;

  @IsString()
  @IsOptional()
  termFilePath?: string;

  @IsString()
  internshipProcessId: string;
}
