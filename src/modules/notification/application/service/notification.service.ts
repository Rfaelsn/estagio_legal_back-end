import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateNotificationUsecase } from '../../domain/usecase/createNotification.usecase';
import { NotificationsRepository } from '../../adapter/repository/notification.repository';
import { FindLatestNotificationsByUserIdDTO } from '../dto/findLatestNotificationsByUserId.dto';
import { FindLatestNotificationsByUserIdUsecase } from '../../domain/usecase/findLatestNotificationsByUserId.usecase';
import { SetReadNotificationUsecase } from '../../domain/usecase/setReadNotification.usecase';
import { INotificationServicePort } from '../../domain/port/INotificationService.port';

@Injectable()
export class NotificationService implements INotificationServicePort {
  constructor(
    private readonly notificationRepository: NotificationsRepository,
  ) {}

  @WebSocketServer()
  server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  private userSocketMap: Map<string, string> = new Map();

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);

    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
        break;
      }
    }
  }

  handleRegister(client: Socket, userId: string) {
    this.userSocketMap.set(userId, client.id);
    console.log(`Usuário ${userId} registrado com socket ${client.id}`);
  }

  async sendNotification(userId: string, message: string) {
    const socketId = this.userSocketMap.get(userId);

    const notification = await this.saveNotificationToDatabase(userId, message);

    if (socketId) {
      this.server.to(socketId).emit('notification', notification);
      console.log(`Notificação enviada para o usuário ${userId} via WebSocket`);
    }
  }

  private async saveNotificationToDatabase(userId: string, message: string) {
    const createNotificationUsecase = new CreateNotificationUsecase(
      this.notificationRepository,
    );

    const notification = await createNotificationUsecase.handle({
      idUser: userId,
      message: message,
    });

    return notification;
  }

  async findLatestNotificationsByUserId(
    findLatestNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
  ) {
    const findLatestNotificationsByUserIdUsecase =
      new FindLatestNotificationsByUserIdUsecase(this.notificationRepository);

    const notifications = findLatestNotificationsByUserIdUsecase.handle(
      findLatestNotificationsByUserIdDTO,
    );

    return notifications;
  }

  async setReadNotification(notificationId: string): Promise<void> {
    const setReadNotificationUsecase = new SetReadNotificationUsecase(
      this.notificationRepository,
    );

    setReadNotificationUsecase.handle(notificationId);
  }
}
