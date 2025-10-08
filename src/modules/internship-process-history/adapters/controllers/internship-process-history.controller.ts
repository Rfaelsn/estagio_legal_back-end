import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InternshipProcessHistoryService } from '../../application/services/internship-process-history.service';
import { CreateHistoryWithFileDto } from '../../application/dtos/create-history-with-file.dto';
import { IsPublic } from '@/auth/decorators/is-public.decorator';
import { RegisterFileInHistoryDto } from '../../application/dtos/register-file-history.dto';

@Controller('internship-history')
export class InternshipProcessHistoryController {
  constructor(
    private readonly internshipProcessHistoryService: InternshipProcessHistoryService,
  ) {}
  @IsPublic()
  @Post('register')
  async registerHistory(
    @Body()
    createHistoryWithFileDto: CreateHistoryWithFileDto,
  ): Promise<void> {
    try {
      return this.internshipProcessHistoryService.registerHistoryWithFile(
        createHistoryWithFileDto,
      );
    } catch (error) {
      console.error(error);
    }
  }

  @Post('register-file')
  async registerFileInHistory(
    @Body()
    registerFileInHistoryDto: RegisterFileInHistoryDto,
  ): Promise<void> {
    try {
      return this.internshipProcessHistoryService.registerFileInHistory(
        registerFileInHistoryDto,
      );
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/by-internship-process/:internshipProcessId')
  async getHistoriesByInternshipProcessId(
    @Param('internshipProcessId') internshipProcessId: string,
  ) {
    return this.internshipProcessHistoryService.getHistoriesByInternshipProcessId(
      internshipProcessId,
    );
  }
}
