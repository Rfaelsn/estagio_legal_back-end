import { Module } from '@nestjs/common';
import { NotificationGateway } from './adapter/gateways/notification.gateway';
import { NotificationService } from './application/service/notification.service';
import { NotificationsRepository } from './adapter/repository/notification.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { NotificationController } from './adapter/http/rest/notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationGateway,
    NotificationService,
    NotificationsRepository,
  ],
  imports: [PrismaModule],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
