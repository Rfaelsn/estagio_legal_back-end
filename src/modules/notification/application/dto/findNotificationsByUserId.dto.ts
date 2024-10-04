import { IsNumber, IsString } from 'class-validator';

export class FindNotificationsByUserIdDTO {
  @IsString()
  idUser: string;

  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
