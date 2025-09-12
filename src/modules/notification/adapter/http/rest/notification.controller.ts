import { User } from '@/auth/decorators/user.decorator';
import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { FindLatestNotificationsByUserIdDTO } from 'src/modules/notification/application/dto/findLatestNotificationsByUserId.dto';
import { NotificationService } from 'src/modules/notification/application/service/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @HttpCode(200)
  @Post('find/latest')
  async findLatestNotificationsByUserId(
    @Body()
    findLatestNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
    @User() user: UserFromJwt,
  ) {
    try {
      return this.notificationService.findLatestNotificationsByUserId(
        findLatestNotificationsByUserIdDTO,
        user.id,
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
