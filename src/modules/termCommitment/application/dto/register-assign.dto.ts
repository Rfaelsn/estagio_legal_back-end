import { IsString } from 'class-validator';

export class RegisterAssignDto {
  @IsString()
  termFilePath: string;
  @IsString()
  internshipProcessId: string;
}
