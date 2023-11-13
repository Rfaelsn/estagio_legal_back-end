import { Roles } from 'src/auth/decorators/roles.decorator';
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
import { IntershipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';

@Controller('processo/estagio')
export class IntershipProcessController {
  constructor(
    private readonly intershipProcessService: IntershipProcessService,
  ) {}

  @IsPublic()
  @Post('create')
  async createIntershipProcess(
    @Body() createIntershipProcessDTO: CreateIntershipProcessDTO,
  ) {
    return this.intershipProcessService.create(createIntershipProcessDTO);
  }
}
