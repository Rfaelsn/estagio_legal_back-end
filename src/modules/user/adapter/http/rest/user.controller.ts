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
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDTO } from '@/modules/user/application/dto/createEmployee';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('student')
  async createStudent(@Body() createStudentDTO: CreateStudentDTO) {
    try {
      return await this.userService.create(createStudentDTO);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = error.meta?.target as string[] | undefined;
        if (target?.includes('email')) {
          throw new ConflictException('E-mail já cadastrado.');
        }
        if (target?.includes('cpf')) {
          throw new ConflictException('CPF já cadastrado.');
        }
        throw new ConflictException('Já existe um registro com esses dados.');
      }
      throw new InternalServerErrorException('Erro ao criar estudante.');
    }
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
