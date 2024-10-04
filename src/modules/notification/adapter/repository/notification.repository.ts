import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNotificationDTO: CreateNotificationDTO) {
    await this.prismaService.notification.create({
      data: {
        id_user: createNotificationDTO.idUser,
        message: createNotificationDTO.message,
      },
    });
  }
}
