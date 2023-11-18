import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/createIntershipProcess.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';

@Controller('processo/estagio')
export class InternshipProcessController {
  constructor(
    private readonly intershipProcessService: InternshipProcessService,
  ) {}

  @IsPublic()
  @Post('create')
  async createIntershipProcess(
    @Body() createIntershipProcessDTO: CreateIntershipProcessDTO,
  ) {
    return this.intershipProcessService.create(createIntershipProcessDTO);
  }
}
