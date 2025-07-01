import { Injectable } from '@nestjs/common';
import { FileStorageProvider } from '../../providers/file-storage.provider';
import { FileType } from '@/modules/file/domain/entities/file.entity';

@Injectable()
export class FileStorageService {
  constructor(private readonly fileStorageProvider: FileStorageProvider) {}

  async uploadPdfFile(
    pdfFileStream: Uint8Array<ArrayBufferLike>,
  ): Promise<string> {
    return this.fileStorageProvider.uploadPdfFile(pdfFileStream);
  }

  async deletePdfFile(termCommitmentFileId: string): Promise<void> {
    await this.fileStorageProvider.deletePdfFile(termCommitmentFileId);
  }

  async downloadPdfFile(downloadFileDto: {
    filePathId: string;
    fileType: FileType;
  }) {
    return this.fileStorageProvider.downloadPdfFile(downloadFileDto);
  }
}
