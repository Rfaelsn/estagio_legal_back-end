import { Injectable } from '@nestjs/common';
import { FileRepository } from '../../adapter/repository/file.repository';
import { RegisterFilePathDto } from '../dtos/registerFilePath.dto';
import { FileEntity } from '../../domain/entities/file.entity';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async registerFilePathProcess(
    registerFilePathDto: RegisterFilePathDto,
  ): Promise<FileEntity> {
    return await this.fileRepository.registerFilePath(registerFilePathDto);
  }
}
