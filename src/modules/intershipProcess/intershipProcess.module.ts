import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { IntershipProcessController } from './adapter/http/rest/intershipProcess.controller';
import { IntershipProcessService } from './application/service/intershipProcess.service';
import { IntershipProcessRepository } from './adapter/repository/intershipProcess.repository';

@Module({
  controllers: [IntershipProcessController],
  providers: [IntershipProcessService, IntershipProcessRepository],
  imports: [PrismaModule],
  exports: [IntershipProcessService],
})
export class IntershipProcessModule {}
