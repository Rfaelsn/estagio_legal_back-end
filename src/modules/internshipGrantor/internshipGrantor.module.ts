import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { InternshipGrantorController } from './adapter/http/rest/internshipGrantor.controller';
import { InternshipGrantorService } from './application/service/internshipGrantor.service';
import { InternshipGrantorRepository } from './adapter/repository/internshipGrantor.repository';

@Module({
  controllers: [InternshipGrantorController],
  providers: [InternshipGrantorService, InternshipGrantorRepository],
  imports: [PrismaModule],
  exports: [InternshipGrantorService],
})
export class InternshipGrantorModule {}
