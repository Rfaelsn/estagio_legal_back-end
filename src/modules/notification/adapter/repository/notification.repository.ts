import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { FindNotificationsByUserIdDTO } from '../../application/dto/findNotificationsByUserId.dto';
import { INotificationRepository } from '../../domain/port/notificationRepository.interface';

@Injectable()
export class NotificationsRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDTO: CreateNotificationDTO) {
    await this.prisma.notification.create({
      data: {
        id_user: createNotificationDTO.idUser,
        message: createNotificationDTO.message,
      },
    });
  }

  async findNotificationsByUserId(
    findNotificationsByUserIdDTO: FindNotificationsByUserIdDTO,
  ): Promise<any[]> {
    const { page, pageSize, idUser } = findNotificationsByUserIdDTO;

    const take: number = pageSize || 10;
    const skip: number = page ? (page - 1) * take : 0;

    const notifications = await this.prisma.notification.findMany({
      where: {
        id_user: idUser,
      },
      take,
      skip,
    });

    return notifications;
  }
}
