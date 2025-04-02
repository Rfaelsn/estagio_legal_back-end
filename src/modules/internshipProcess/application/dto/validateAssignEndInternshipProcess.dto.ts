import { RegisterFilePathDto } from '@/modules/file/application/dtos/registerFilePath.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ValidateAssignEndInternshipProcessDto {
  @IsBoolean()
  validate: boolean;

  @IsOptional()
  internshipCertificateFilePath?: RegisterFilePathDto;

  @IsString()
  @IsOptional()
  remark?: string;

  @IsString()
  internshipProcessId: string;
}
