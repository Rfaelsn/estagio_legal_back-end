import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InternshipProcessModule } from './modules/intershipProcess/intershipProcess.module';
// import { InternshipGrantorModule } from './modules/internshipGrantor/internshipGrantor.module';
import { TermCommitmentModule } from './modules/termCommitment/termCommitment.module';
import { WebSocketModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InternshipProcessModule,
    // InternshipGrantorModule,
    TermCommitmentModule,
    PrismaModule,
    AuthModule,
    UserModule,
    WebSocketModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
