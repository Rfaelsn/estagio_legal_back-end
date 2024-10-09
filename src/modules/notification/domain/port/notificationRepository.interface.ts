import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { FindLatestNotificationsByUserIdDTO } from '../../application/dto/findLatestNotificationsByUserId.dto';

export interface INotificationRepository {
  create(intershipProcess: CreateNotificationDTO): Promise<any>;

  findNotificationsByUserId(
    findNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
  ): Promise<any[]>;
}
