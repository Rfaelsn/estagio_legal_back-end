import { RegisterFilePathDto } from '@/modules/file/application/dtos/registerFilePath.dto';
import { IsArray, IsString } from 'class-validator';

export class RegisterEndInternshipProcessDto {
  @IsString()
  internshipProcessId: string;

  @IsArray()
  internshipEvaluationFilesPaths: RegisterFilePathDto[];
}
