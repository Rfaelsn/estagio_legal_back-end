import { Module } from '@nestjs/common';

import { InternshipProcessService } from './application/service/internshipProcess.service';
import { InternshipProcessController } from './adapter/http/rest/intershipProcess.controller';
import { NotificationModule } from '../notification/notification.module';
import { FileModule } from '../file/file.module';
import { InternshipProcessHistoryModule } from '../internship-process-history/internship-process-history.module';
import { InternshipProcessRepository } from './adapter/repository/intershipProcess.repository';
import { PrismaService } from '@/config/prisma/prisma.service';
import { FileService } from '../file/application/services/file.service';
import { NotificationService } from '../notification/application/service/notification.service';
import { InternshipProcessHistoryService } from '../internship-process-history/application/services/internship-process-history.service';

@Module({
  controllers: [InternshipProcessController],
  providers: [
    InternshipProcessService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'FileService',
      useExisting: FileService,
    },
    {
      provide: 'NotificationService',
      useExisting: NotificationService,
    },
    {
      provide: 'InternshipProcessHistoryService',
      useExisting: InternshipProcessHistoryService,
    },
    {
      provide: 'InternshipProcessRepository',
      useFactory: (prismaService: PrismaService) => {
        return new InternshipProcessRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
  ],
  imports: [FileModule, NotificationModule, InternshipProcessHistoryModule],
  exports: [InternshipProcessService],
})
export class InternshipProcessModule {}
