import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFilePathDto } from 'src/modules/file/application/dtos/registerFilePath.dto';
import { FileService } from 'src/modules/file/application/services/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

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
}
