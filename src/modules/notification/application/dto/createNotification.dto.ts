import { IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  idUser: string;

  @IsString()
  message: string;
}
