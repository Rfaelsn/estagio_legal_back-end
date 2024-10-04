import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { FindNotificationsByUserIdDTO } from '../../application/dto/findNotificationsByUserId.dto';

export interface INotificationRepository {
  create(intershipProcess: CreateNotificationDTO): Promise<any>;

  findNotificationsByUserId(
    findNotificationsByUserIdDTO: FindNotificationsByUserIdDTO,
  ): Promise<any[]>;
}
