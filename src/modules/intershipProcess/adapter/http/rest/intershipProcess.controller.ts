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
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/createIntershipProcess.dto';
import { InternshipProcessFilterDTO } from 'src/modules/intershipProcess/application/dto/internshipProcessFilter.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';
import { InternshipProcessFilterValidationInterceptor } from '../../interceptor/InternshipProcessFilterValidation.interceptor';
import { FindInternshipProcessByQueryDTO } from 'src/modules/intershipProcess/application/dto/findInternshipProcessByQuery.dto';
import { Role } from 'src/modules/user/domain/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('processo/estagio')
@UseGuards(RoleGuard)
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

  @Roles(Role.ADMINISTRADOR)
  @Get('filter')
  async intershipProcessFilter(
    @Query() intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ) {
    console.log('estou filtrando');
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
