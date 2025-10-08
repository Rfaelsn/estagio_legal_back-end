import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TermCommitmentService } from './application/service/termCommitment.service';
import { termCommitmentController } from './adapter/http/rest/termCommitment.controller';
import { TermCommitmentRepository } from './adapter/repository/termCommitment.repository';
import { InternshipProcessHistoryModule } from '../internship-process-history/internship-process-history.module';
import { FileModule } from '../file/file.module';
import { InternshipProcessModule } from '../internshipProcess/intershipProcess.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { GeneratePdfModule } from '../generate-pdf/generate-pdf.module';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [termCommitmentController],
  providers: [TermCommitmentService, TermCommitmentRepository],
  imports: [
    PrismaModule,
    forwardRef(() => InternshipProcessModule),
    InternshipProcessHistoryModule,
    FileModule,
    FileStorageModule,
    GeneratePdfModule,
    UserModule,
    NotificationModule,
  ],
  exports: [TermCommitmentService],
})
export class TermCommitmentModule {}
