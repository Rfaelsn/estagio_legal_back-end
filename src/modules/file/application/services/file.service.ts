import { Injectable } from '@nestjs/common';
import { FileRepository } from '../../adapter/repository/file.repository';
import { RegisterFilePathDto } from '../dtos/registerFilePath.dto';
import { FileEntity, FileType } from '../../domain/entities/file.entity';
import { Prisma } from '@prisma/client';
import { FileStorageService } from '@/modules/file-storage/application/services/file-storage.service';

@Injectable()
export class FileService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly fileRepository: FileRepository,
  ) {}

  async downloadFile(downloadFileDto: { fileId: string; fileType: FileType }) {
    const file = await this.fileRepository.getFile(downloadFileDto);
    return this.fileStorageService.downloadPdfFile({
      filePathId: file.filePath,
      fileType: downloadFileDto.fileType,
    });
  }

  async uploadFile(file: Express.Multer.File, fileType: FileType) {
    const pdfFileStream = new Uint8Array(file.buffer);
    return this.fileStorageService.uploadPdfFile(pdfFileStream, fileType);
  }

  async registerFilePathProcess(
    registerFilePathDto: RegisterFilePathDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<FileEntity> {
    return await this.fileRepository.registerFilePath(
      registerFilePathDto,
      prismaClientTransaction,
    );
  }

  async registerFilePathsProcess(
    registerFilePathsDto: RegisterFilePathDto[],
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<FileEntity[]> {
    return await this.fileRepository.registerFilePaths(
      registerFilePathsDto,
      prismaClientTransaction,
    );
  }
}
