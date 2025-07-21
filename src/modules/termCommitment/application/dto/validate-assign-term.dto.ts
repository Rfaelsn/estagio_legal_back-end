import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ValidateAssignTermDto {
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
    return false;
  })
  @IsBoolean()
  @IsOptional()
  validate?: boolean;

  @IsString()
  @IsOptional()
  remark?: string;

  @IsString()
  internshipProcessId: string;
}
