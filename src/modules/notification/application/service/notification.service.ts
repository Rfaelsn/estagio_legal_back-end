import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateNotificationUsecase } from '../../domain/usecase/createNotification.usecase';
import { INotificationRepository } from '../../domain/port/notificationRepository.interface';
import { NotificationsRepository } from '../../adapter/repository/notification.repository';
import { CreateNotificationDTO } from '../dto/createNotification.dto';
import { use } from 'passport';

@Injectable()
export class NotificationService {
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

    await this.saveNotificationToDatabase(userId, message);

    if (socketId) {
      this.server.to(socketId).emit('notification', { message });
      console.log(`Notificação enviada para o usuário ${userId} via WebSocket`);
    }
  }

  private async saveNotificationToDatabase(userId: string, message: string) {
    const createNotificationUsecase = new CreateNotificationUsecase(
      this.notificationRepository,
    );

    await createNotificationUsecase.handle({
      idUser: userId,
      message: message,
    });
  }
}
