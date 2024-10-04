import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { INotificationRepository } from '../port/notificationRepository.interface';

export class CreateNotificationUsecase {
  constructor(
    private readonly intershipProcessRepository: INotificationRepository,
  ) {}

  async handle(createNotificationDTO: CreateNotificationDTO) {
    const createdNotification = await this.intershipProcessRepository.create(
      createNotificationDTO,
    );

    return createdNotification;
  }
}
