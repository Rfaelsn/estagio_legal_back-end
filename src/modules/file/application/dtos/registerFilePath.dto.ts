import { IsString } from 'class-validator';

export class RegisterFilePathDto {
  @IsString()
  filePath: string;

  @IsString()
  internshipProcessId: string;
}
