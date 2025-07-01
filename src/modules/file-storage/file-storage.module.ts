import { Module } from '@nestjs/common';
import { FileStorageProvider } from './providers/file-storage.provider';
import { FileStorageService } from './application/services/file-storage.service';

@Module({
  providers: [FileStorageProvider, FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}
