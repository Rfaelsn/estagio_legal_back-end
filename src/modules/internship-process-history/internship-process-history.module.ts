import { Module } from '@nestjs/common';
import { InternshipProcessHistoryService } from './application/services/internship-process-history.service';
import { InternshipProcessHistoryRepository } from './adapters/repositories/internship-process-history.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    InternshipProcessHistoryService,
    InternshipProcessHistoryRepository,
  ],
  exports: [InternshipProcessHistoryService],
})
export class InternshipProcessHistoryModule {}
