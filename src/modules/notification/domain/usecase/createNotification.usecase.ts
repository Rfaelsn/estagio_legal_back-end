import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { INotificationRepository } from '../port/notificationRepository.port';

export class CreateNotificationUsecase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async handle(createNotificationDTO: CreateNotificationDTO) {
    const createdNotification = await this.notificationRepository.create(
      createNotificationDTO,
    );

    return createdNotification;
  }
}
