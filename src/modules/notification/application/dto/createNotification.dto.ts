import { IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  idUser?: string;

  userRole?: string;

  @IsString()
  message: string;
}
