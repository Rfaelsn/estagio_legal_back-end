import { Controller, Post } from '@nestjs/common';
import { CreateNotificationDTO } from 'src/modules/notification/application/dto/createNotification.dto';
import { NotificationService } from 'src/modules/notification/application/service/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(createNotificationDTO: CreateNotificationDTO) {
    // await this.notificationService.
  }
}
