import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { INotificationRepository } from '../port/notificationRepository.interface';

export class SetReadNotificationUsecase {
  constructor(
    private readonly intershipProcessRepository: INotificationRepository,
  ) {}

  async handle(notificationId: string) {
    const createdNotification =
      await this.intershipProcessRepository.setReadNotification(notificationId);

    return createdNotification;
  }
}
