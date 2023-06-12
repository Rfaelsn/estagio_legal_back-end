import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { UserController } from './adapter/http/rest/user.controller';
import { UserService } from './application/service/user.service';
import { UserRepository } from './adapter/repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
