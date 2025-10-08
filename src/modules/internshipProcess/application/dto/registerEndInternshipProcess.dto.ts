import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class RegisterEndInternshipProcessDto {
  @IsString()
  internshipProcessId: string;

  @IsString()
  @IsOptional()
  remark?: string;

  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
    return false;
  })
  @IsBoolean()
  @IsOptional()
  validate?: boolean;
}
