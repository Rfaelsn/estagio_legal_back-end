import { FindLatestNotificationsByUserIdDTO } from '../../application/dto/findLatestNotificationsByUserId.dto';
import { INotificationRepository } from '../port/notificationRepository.interface';

export class FindLatestNotificationsByUserIdUsecase {
  constructor(
    private readonly intershipProcessRepository: INotificationRepository,
  ) {}

  async handle(
    findNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
  ) {
    const notifications =
      await this.intershipProcessRepository.findNotificationsByUserId(
        findNotificationsByUserIdDTO,
      );

    return notifications;
  }
}
