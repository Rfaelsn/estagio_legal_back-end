import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Query,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/createIntershipProcess.dto';
import { InternshipProcessFilterDTO } from 'src/modules/intershipProcess/application/dto/internshipProcessFilter.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';
import { InternshipProcessFilterValidationInterceptor } from '../../interceptor/InternshipProcessFilterValidation.interceptor';
import { FindInternshipProcessByQueryDTO } from 'src/modules/intershipProcess/application/dto/findInternshipProcessByQuery.dto';

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

  @IsPublic()
  @Get('filter')
  async intershipProcessFilter(
    @Query() intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ) {
    return this.intershipProcessService.filter(intershipProcessFilterDTO);
  }

  @IsPublic()
  @Get('findBy')
  async findByQuery(
    @Query() findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ) {
    return this.intershipProcessService.findByQuery(
      findInternshipProcessByQueryDTO,
    );
  }

  @IsPublic()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.intershipProcessService.findById(id);
  }
}
