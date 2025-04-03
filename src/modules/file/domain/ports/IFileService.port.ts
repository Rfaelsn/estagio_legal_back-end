import { RegisterFilePathDto } from '../../application/dtos/registerFilePath.dto';
import { FileEntity } from '../entities/file.entity';

export interface IFileServicePort {
  registerFilePathProcess(
    registerFilePathDto: RegisterFilePathDto,
  ): Promise<FileEntity>;

  registerFilePathsProcess(
    registerFilePathsDto: RegisterFilePathDto[],
  ): Promise<FileEntity[]>;
}
