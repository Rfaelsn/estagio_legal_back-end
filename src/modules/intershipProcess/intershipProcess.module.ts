import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';

import { InternshipProcessService } from './application/service/intershipProcess.service';
import { InternshipProcessController } from './adapter/http/rest/intershipProcess.controller';
import { InternshipProcessRepository } from './adapter/repository/intershipProcess.repository';
import { TermCommitmentModule } from '../termCommitment/termCommitment.module';
import { NotificationModule } from '../notification/notification.module';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [InternshipProcessController],
  providers: [InternshipProcessService, InternshipProcessRepository],
  imports: [
    PrismaModule,
    FileModule,
    forwardRef(() => TermCommitmentModule),
    NotificationModule,
  ],
  exports: [InternshipProcessService],
})
export class InternshipProcessModule {}
