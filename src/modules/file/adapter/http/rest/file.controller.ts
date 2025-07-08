import { IsPublic } from '@/auth/decorators/is-public.decorator';
import {
  FileType,
  FileTypeToFileName,
} from '@/modules/file/domain/entities/file.entity';
import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { RegisterFilePathDto } from 'src/modules/file/application/dtos/registerFilePath.dto';
import { FileService } from 'src/modules/file/application/services/file.service';
import {
  configFileInterceptor,
  filePipe,
} from '../../interceptors/config-file-interceptor';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @IsPublic()
  @Post('download')
  async downloadFile(
    @Body() downloadFileDto: { fileId: string; fileType: FileType },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const fileStream = await this.fileService.downloadFile(downloadFileDto);

      const localTypeFile = FileTypeToFileName[downloadFileDto.fileType];

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${localTypeFile}.pdf"`,
      );

      fileStream.pipe(res);
    } catch (error) {
      throw new Error('deu ruim ao baixar pdf');
    }
  }

  @IsPublic()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', configFileInterceptor))
  async uploadFile(
    @UploadedFile(filePipe)
    file: Express.Multer.File,
    @Body() uploadFileDto: { fileType: FileType },
  ): Promise<void> {
    try {
      await this.fileService.uploadFile(file, uploadFileDto.fileType);
    } catch (error) {
      throw new Error('deu ruim ao uploudar pdf');
    }
  }

  @IsPublic()
  @Post('register-path')
  async registerFilePathProcess(
    @Body() registerFilePathDto: RegisterFilePathDto,
  ): Promise<void> {
    try {
      await this.fileService.registerFilePathProcess(registerFilePathDto);
    } catch (error) {
      console.error(error);
    }
  }

  @IsPublic()
  @Post('register-file/aluno')
  async registerFileAluno(
    @Body() registerFilePathDto: RegisterFilePathDto,
  ): Promise<void> {
    try {
      await this.fileService.registerFilePathProcess(registerFilePathDto);
    } catch (error) {
      console.error(error);
    }
  }
}
