import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateNotificationDTO } from '../../application/dto/createNotification.dto';
import { FindLatestNotificationsByUserIdDTO } from '../../application/dto/findLatestNotificationsByUserId.dto';
import { INotificationRepository } from '../../domain/port/notificationRepository.port';

@Injectable()
export class NotificationsRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDTO: CreateNotificationDTO) {
    const notification = await this.prisma.notification.create({
      data: {
        id_user: createNotificationDTO.idUser,
        message: createNotificationDTO.message,
      },
    });

    return notification;
  }

  async findNotificationsByUserId(
    findNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
    userId: string,
  ): Promise<{ data: any[]; totalPages: number }> {
    const { page, pageSize } = findNotificationsByUserIdDTO;

    const take: number = pageSize || 10;
    const skip: number = page ? (page - 1) * take : 0;

    // Busca as notificações paginadas
    const notifications = await this.prisma.notification.findMany({
      where: {
        id_user: userId,
      },
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Conta o total de notificações para o usuário
    const totalCount = await this.prisma.notification.count({
      where: {
        id_user: userId,
      },
    });

    // Calcula o total de páginas
    const totalPages = Math.ceil(totalCount / take);

    return {
      data: notifications,
      totalPages,
    };
  }

  async setReadNotification(notificationId: string): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  }
}
