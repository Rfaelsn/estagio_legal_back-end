import { Module } from '@nestjs/common';
import { NotificationGateway } from './adapter/gateways/notification.gateway';
import { NotificationService } from './application/service/notification.service';
import { NotificationsRepository } from './adapter/repository/notification.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  providers: [
    NotificationGateway,
    NotificationService,
    NotificationsRepository,
  ],
  imports: [PrismaModule],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
