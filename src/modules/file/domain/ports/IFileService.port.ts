import { Prisma } from '@prisma/client';
import { RegisterFilePathDto } from '../../application/dtos/registerFilePath.dto';
import { FileEntity } from '../entities/file.entity';

export interface IFileServicePort {
  registerFilePathProcess(
    registerFilePathDto: RegisterFilePathDto,
  ): Promise<FileEntity>;

  registerFilePathsProcess(
    registerFilePathsDto: RegisterFilePathDto[],
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<FileEntity[]>;
}
