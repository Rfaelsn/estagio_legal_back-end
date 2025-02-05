import { IsPublic } from '@/auth/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFilePathDto } from 'src/modules/file/application/dtos/registerFilePath.dto';
import { FileService } from 'src/modules/file/application/services/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

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

  //colocar as rotas para cadastrar os files recedendo o id do processo e o filepath da api de arquivos
}
