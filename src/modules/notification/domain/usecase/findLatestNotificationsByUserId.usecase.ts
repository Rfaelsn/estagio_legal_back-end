import { FindLatestNotificationsByUserIdDTO } from '../../application/dto/findLatestNotificationsByUserId.dto';
import { INotificationRepository } from '../port/notificationRepository.port';

export class FindLatestNotificationsByUserIdUsecase {
  constructor(
    private readonly internshipProcessRepository: INotificationRepository,
  ) {}

  async handle(
    findNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
    userId: string,
  ) {
    const notifications =
      await this.internshipProcessRepository.findNotificationsByUserId(
        findNotificationsByUserIdDTO,
        userId,
      );

    return notifications;
  }
}
