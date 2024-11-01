import { Module } from '@nestjs/common';
import { FileService } from './application/services/file.service';
import { FileRepository } from './adapter/repository/file.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { FileController } from './adapter/http/rest/file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository],
  imports: [PrismaModule],
  exports: [FileService],
})
export class FileModule {}
