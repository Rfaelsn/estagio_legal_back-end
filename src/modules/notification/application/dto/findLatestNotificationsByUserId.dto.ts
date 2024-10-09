import { IsNumber, IsString } from 'class-validator';

export class FindLatestNotificationsByUserIdDTO {
  @IsString()
  id_user: string;

  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
