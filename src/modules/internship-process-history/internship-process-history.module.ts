import { Module } from '@nestjs/common';
import { InternshipProcessHistoryService } from './application/services/internship-process-history.service';

import { PrismaModule } from 'src/config/prisma/prisma.module';
import { InternshipProcessHistoryRepository } from './adapters/repositories/internship-process-history.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    InternshipProcessHistoryService,
    InternshipProcessHistoryRepository,
  ],
  exports: [InternshipProcessHistoryService],
})
export class InternshipProcessHistoryModule {}
