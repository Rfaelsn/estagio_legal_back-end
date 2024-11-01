import { Injectable } from '@nestjs/common';
import { FileRepository } from '../../adapter/repository/file.repository';
import { RegisterFilePathDto } from '../dtos/registerFilePath.dto';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async registerFilePathProcess(
    registerFilePathDto: RegisterFilePathDto,
  ): Promise<void> {
    await this.fileRepository.registerFilePath(registerFilePathDto);
  }
}
