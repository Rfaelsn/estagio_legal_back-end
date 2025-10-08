import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateNotificationUsecase } from '../../domain/usecase/createNotification.usecase';
import { NotificationsRepository } from '../../adapter/repository/notification.repository';
import { FindLatestNotificationsByUserIdDTO } from '../dto/findLatestNotificationsByUserId.dto';
import { FindLatestNotificationsByUserIdUsecase } from '../../domain/usecase/findLatestNotificationsByUserId.usecase';
import { SetReadNotificationUsecase } from '../../domain/usecase/setReadNotification.usecase';
import { INotificationServicePort } from '../../domain/port/INotificationService.port';
import { Role } from '@/modules/user/domain/entities/user.entity';
import { UserService } from '@/modules/user/application/service/user.service';

@Injectable()
export class NotificationService implements INotificationServicePort {
  constructor(
    private readonly notificationRepository: NotificationsRepository,
    private readonly userService: UserService,
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

  async sendNotificationToStudent(
    userId: string,
    message: string,
    internshipProcessId?: string,
  ) {
    const socketId = this.userSocketMap.get(userId);

    const notification = await this.saveNotificationToDatabase(
      userId,
      message,
      internshipProcessId,
    );

    if (socketId) {
      this.server.to(socketId).emit('notification', notification);
      console.log(`Notificação enviada para o usuário ${userId} via WebSocket`);
    }
  }

  async sendNotificationToEmployees(
    message: string,
    internshipProcessId?: string,
  ) {
    const notification = await this.saveNotificationToEmployeeDatabase(
      message,
      internshipProcessId,
    );

    const employees = await this.userService.getUsersByRole(Role.ADMINISTRATOR);

    for (const employee of employees) {
      const socketId = this.userSocketMap.get(employee.id);
      if (socketId) {
        this.server.to(socketId).emit('notification', notification);
        console.log(
          `Notificação enviada para o funcionário ${employee.id} via WebSocket`,
        );
      }
    }
  }

  private async saveNotificationToDatabase(
    userId: string,
    message: string,
    internshipProcessId?: string,
  ) {
    const createNotificationUsecase = new CreateNotificationUsecase(
      this.notificationRepository,
    );

    const notification = await createNotificationUsecase.handle({
      idUser: userId,
      message: message,
      userRole: Role.STUDENT,
      internshipProcessId: internshipProcessId,
    });

    return notification;
  }

  private async saveNotificationToEmployeeDatabase(
    message: string,
    internshipProcessId?: string,
  ): Promise<any> {
    return this.notificationRepository.create({
      userRole: Role.EMPLOYEE,
      message: message,
      internshipProcessId: internshipProcessId,
    });
  }

  async getNotificationToEmployees(page: number, pageSize: number) {
    return this.notificationRepository.findNotificationsByRole(
      Role.EMPLOYEE,
      page,
      pageSize,
    );
  }

  async findLatestNotificationsByUserId(
    findLatestNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
    userId: string,
  ) {
    const findLatestNotificationsByUserIdUsecase =
      new FindLatestNotificationsByUserIdUsecase(this.notificationRepository);

    const notifications = findLatestNotificationsByUserIdUsecase.handle(
      findLatestNotificationsByUserIdDTO,
      userId,
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
