import { Module } from '@nestjs/common';
import { NotificationGateway } from './adapter/gateways/notification.gateway';
import { NotificationService } from './application/service/notification.service';

@Module({
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
