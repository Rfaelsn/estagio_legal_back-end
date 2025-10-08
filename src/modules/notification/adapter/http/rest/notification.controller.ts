import { User } from '@/auth/decorators/user.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { NotificationService } from 'src/modules/notification/application/service/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @HttpCode(200)
  @Get('find/latest')
  async findLatestNotificationsByUserId(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @User() user: any,
  ) {
    try {
      return this.notificationService.findLatestNotificationsByUserId(
        { page, pageSize },
        user.sub,
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

  @IsPublic()
  @Post('send/to/employees')
  async sendNotificationToEmployees(@Body('message') message: string) {
    try {
      await this.notificationService.sendNotificationToEmployees(message);
    } catch (error) {
      console.log(error);
    }
  }

  @IsPublic()
  @Get('employees')
  async getNotificationToEmployees(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    try {
      return this.notificationService.getNotificationToEmployees(
        page,
        pageSize,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
