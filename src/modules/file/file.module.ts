import { Module } from '@nestjs/common';
import { FileService } from './application/services/file.service';
import { FileRepository } from './adapter/repository/file.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { FileController } from './adapter/http/rest/file.controller';
import { FileStorageModule } from '../file-storage/file-storage.module';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository],
  imports: [PrismaModule, FileStorageModule],
  exports: [FileService],
})
export class FileModule {}
