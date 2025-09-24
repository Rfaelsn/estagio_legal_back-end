import { Socket, Server } from 'socket.io';
import { FindLatestNotificationsByUserIdDTO } from '../../application/dto/findLatestNotificationsByUserId.dto';

export interface INotificationServicePort {
  setServer(server: Server): void;

  handleRegister(client: Socket, userId: string): void;

  handleDisconnect(client: Socket): void;

  sendNotificationToStudent(
    userId: string,
    message: string,
    internshipProcessId?: string,
  ): Promise<void>;

  sendNotificationToEmployees(
    message: string,
    internshipProcessId: string,
  ): Promise<void>;

  findLatestNotificationsByUserId(
    findLatestNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
    userId: string,
  );

  setReadNotification(notificationId: string): Promise<void>;
}
