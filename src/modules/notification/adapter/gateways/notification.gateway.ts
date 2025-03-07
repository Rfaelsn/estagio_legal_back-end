import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from '../../application/service/notification.service';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.notificationService.setServer(this.server);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('conexão websocket');
  }

  handleDisconnect(client: any) {
    console.log('desconexão');
    this.notificationService.handleDisconnect(client);
  }

  @SubscribeMessage('register')
  handleRegister(client: Socket, userId: string) {
    this.notificationService.handleRegister(client, userId);
  }
}
