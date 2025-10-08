import { IsNumber } from 'class-validator';

export class FindLatestNotificationsByUserIdDTO {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
