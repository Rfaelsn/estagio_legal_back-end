import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateNotificationDTO } from 'src/modules/notification/application/dto/createNotification.dto';
import { FindLatestNotificationsByUserIdDTO } from 'src/modules/notification/application/dto/findLatestNotificationsByUserId.dto';
import { NotificationService } from 'src/modules/notification/application/service/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @IsPublic()
  @HttpCode(200)
  @Post('find/latest')
  async findLatestNotificationsByUserId(
    @Body()
    findLatestNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
  ) {
    try {
      return this.notificationService.findLatestNotificationsByUserId(
        findLatestNotificationsByUserIdDTO,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @IsPublic()
  @Patch('set/read/:notificationID')
  async setReadNotification(@Param('notificationID') notificationId: string) {
    try {
      await this.notificationService.setReadNotification(notificationId);
    } catch (error) {
      console.log(error);
    }
  }
}
