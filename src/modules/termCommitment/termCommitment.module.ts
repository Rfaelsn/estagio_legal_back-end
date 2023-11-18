import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TermCommitmentService } from './application/service/termCommitment.service';
import { termCommitmentController } from './adapter/http/rest/termCommitment.controller';
import { TermCommitmentRepository } from './adapter/repository/termCommitment.repository';

@Module({
  controllers: [termCommitmentController],
  providers: [TermCommitmentService, TermCommitmentRepository],
  imports: [PrismaModule],
  exports: [TermCommitmentService],
})
export class TermCommitmentModule {}
