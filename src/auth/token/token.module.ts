import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TokenService } from './token.service';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from '../auth.module';
import { TokenController } from './token.controller';

@Module({
  controllers: [TokenController],
  imports: [PrismaModule, UserModule, forwardRef(() => AuthModule)],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
