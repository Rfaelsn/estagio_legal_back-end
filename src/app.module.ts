import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InternshipProcessModule } from './modules/intershipProcess/intershipProcess.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InternshipProcessModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
