import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';

import { InternshipProcessService } from './application/service/intershipProcess.service';
import { InternshipProcessController } from './adapter/http/rest/intershipProcess.controller';
import { InternshipProcessRepository } from './adapter/repository/intershipProcess.repository';

@Module({
  controllers: [InternshipProcessController],
  providers: [InternshipProcessService, InternshipProcessRepository],
  imports: [PrismaModule],
  exports: [InternshipProcessService],
})
export class InternshipProcessModule {}
