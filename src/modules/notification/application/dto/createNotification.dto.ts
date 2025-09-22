import { IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  idUser?: string;

  userRole?: string;

  @IsString()
  internshipProcessId?: string;

  @IsString()
  message: string;
}
