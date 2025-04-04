import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Patch,
  Request,
  ParseIntPipe,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { RoleGuard } from '@/auth/guards/role.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/modules/user/domain/entities/user.entity';
import { User } from '@/auth/decorators/user.decorator';
import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { InternshipProcessService } from '@/modules/internshipProcess/application/service/internshipProcess.service';
import { UpdateInternshipProcessDTO } from '@/modules/internshipProcess/application/dto/updateInternshipProcess.dto';
import { ValidateAssignEndInternshipProcessDto } from '@/modules/internshipProcess/application/dto/validateAssignEndInternshipProcess.dto';
import { RegisterEndInternshipProcessDto } from '@/modules/internshipProcess/application/dto/registerEndInternshipProcess.dto';
import { InternshipProcessFilterByStudentDTO } from '@/modules/internshipProcess/application/dto/internshipProcessFilterByStudent.dto';
import { InternshipProcessFilterByEmployeeDTO } from '@/modules/internshipProcess/application/dto/internshipProcessFilterByEmployee.dto';
import { FindInternshipProcessByQueryDTO } from '@/modules/internshipProcess/application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessControllerPort } from '@/modules/internshipProcess/domain/port/internshipProcessController.port';

@Controller('processo/estagio')
@UseGuards(RoleGuard)
export class InternshipProcessController
  implements InternshipProcessControllerPort
{
  constructor(
    private readonly internshipProcessService: InternshipProcessService,
  ) {}
  @IsPublic()
  @Patch('update/status')
  async updateInternshipProcess(
    @Body() updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  ) {
    return await this.internshipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @Patch('register/response/submit/docs')
  async registerRenovationByStudent(
    @Body() updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  ) {
    return await this.internshipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @Roles(Role.STUDENT)
  @Post('register/assign-end-internship')
  async registerEndInternshipByStudent(
    @Body() registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
  ) {
    await this.internshipProcessService.registerEndInternshipProcess(
      registerEndInternshipProcessDto,
    );
  }

  @Roles(Role.ADMINISTRATOR, Role.EMPLOYEE)
  @Post('validate/assign-end-internship')
  async validateAssignEndInternshipProcess(
    @Body()
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
    @User() user: UserFromJwt,
  ) {
    if (
      user.role === Role.ADMINISTRATOR &&
      !validateAssignEndInternshipProcessDto.remark &&
      !validateAssignEndInternshipProcessDto.validate
    ) {
      throw new HttpException('remark is required', HttpStatus.BAD_REQUEST);
    }
    await this.internshipProcessService.validateAssignEndInternshipProcess(
      validateAssignEndInternshipProcessDto,
    );
  }

  @Roles(Role.ADMINISTRATOR)
  @Get('filter')
  async internshipProcessFilter(
    @Query() internshipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ) {
    console.log('oi');
    return this.internshipProcessService.filterByEmployee(
      internshipProcessFilterDTO,
    );
  }

  @Roles(Role.STUDENT)
  @Get('filter/my-process')
  async internshipProcessFilterByStudent(
    @Query()
    internshipProcessFilterByStudentDto: InternshipProcessFilterByStudentDTO,
    @Request() req,
  ) {
    internshipProcessFilterByStudentDto.idUser = req.user.id;
    return await this.internshipProcessService.filterByStudent(
      internshipProcessFilterByStudentDto,
    );
  }

  @Roles(Role.STUDENT)
  @Get('elegible-for-completation')
  async findEligibleProcessesForCompletion(
    @Request() req,
    @Query('page', new ParseIntPipe()) page: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
  ) {
    const userId = req.user.id;
    return await this.internshipProcessService.findEligibleProcessesForCompletion(
      userId,
      page,
      pageSize,
    );
  }

  @IsPublic()
  @Get('findBy')
  async findByQuery(
    @Query() findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ) {
    return this.internshipProcessService.findByQuery(
      findInternshipProcessByQueryDTO,
    );
  }

  @IsPublic()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.internshipProcessService.findById(id);
  }
}
