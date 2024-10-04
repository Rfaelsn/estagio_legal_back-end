import { FindNotificationsByUserIdDTO } from '../../application/dto/findNotificationsByUserId.dto';
import { INotificationRepository } from '../port/notificationRepository.interface';

export class CreateNotificationUsecase {
  constructor(
    private readonly intershipProcessRepository: INotificationRepository,
  ) {}

  async handle(findNotificationsByUserIdDTO: FindNotificationsByUserIdDTO) {
    const notifications =
      await this.intershipProcessRepository.findNotificationsByUserId(
        findNotificationsByUserIdDTO,
      );

    return notifications;
  }
}
