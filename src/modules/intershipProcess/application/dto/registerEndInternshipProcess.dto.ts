import { IsArray, IsString } from 'class-validator';

export class RegisterEndInternshipProcessDto {
  @IsString()
  internshipProcessId: string;

  @IsArray()
  internshipEvaluationFilesPaths: string[];
}
