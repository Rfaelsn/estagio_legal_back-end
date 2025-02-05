import { Body, Controller, Post } from '@nestjs/common';
import { InternshipProcessHistoryService } from '../../application/services/internship-process-history.service';
import { CreateHistoryWithFileDto } from '../../application/dtos/create-history-with-file.dto';
import { IsPublic } from '@/auth/decorators/is-public.decorator';

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
}
