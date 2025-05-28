import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from '../../../application/service/user.service';
import { Role } from '../../../domain/entities/user.entity';
import { CreateStudentDTO } from '../../../application/dto/createStudent.dto';
import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Query,
  Request,
} from '@nestjs/common';
import { CreateEmployeeDTO } from '@/modules/user/application/dto/createEmployee';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { User } from '@/auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('student')
  async createStudent(@Body() createStudentDTO: CreateStudentDTO) {
    return this.userService.create(createStudentDTO);
  }

  @Get('findByEmail')
  async findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('me')
  async showUser(@Request() req) {
    return req.user;
  }

  @Get('profile')
  async getUser(@User() user: any) {
    return this.findByEmail(user.email);
  }

  @Get(':id')
  async findUser() {}

  @Roles(Role.STUDENT)
  @Put('student:id')
  async updateStudent(user: CreateStudentDTO) {}

  @Delete('student:id')
  async deleteAluno(user: CreateStudentDTO) {}

  @Post('employee')
  @Roles(Role.ADMINISTRATOR)
  async createEmployee(user: CreateEmployeeDTO) {}
}
