import { Socket, Server } from 'socket.io';
import { FindLatestNotificationsByUserIdDTO } from '../../application/dto/findLatestNotificationsByUserId.dto';

export interface INotificationServicePort {
  setServer(server: Server): void;

  handleRegister(client: Socket, userId: string): void;

  handleDisconnect(client: Socket): void;

  sendNotification(userId: string, message: string): Promise<void>;

  findLatestNotificationsByUserId(
    findLatestNotificationsByUserIdDTO: FindLatestNotificationsByUserIdDTO,
    userId: string,
  );

  setReadNotification(notificationId: string): Promise<void>;
}
