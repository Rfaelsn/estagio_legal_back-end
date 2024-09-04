import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TermCommitmentService } from './application/service/termCommitment.service';
import { termCommitmentController } from './adapter/http/rest/termCommitment.controller';
import { TermCommitmentRepository } from './adapter/repository/termCommitment.repository';
import { InternshipProcessModule } from '../intershipProcess/intershipProcess.module';

@Module({
  controllers: [termCommitmentController],
  providers: [TermCommitmentService, TermCommitmentRepository],
  imports: [PrismaModule, InternshipProcessModule],
  exports: [TermCommitmentService],
})
export class TermCommitmentModule {}
