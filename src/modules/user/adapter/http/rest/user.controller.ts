import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from '../../../application/service/user.service';
import { Role } from '../../../domain/entities/user.entity';
import { CreateAlunoDTO } from '../../../application/dto/createAluno.dto';
import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { CreateFuncionarioDTO } from 'src/modules/user/application/dto/createFuncionario';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { validateSync } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('createAluno')
  async createAluno(@Body() createAlunoDTO: CreateAlunoDTO) {
    return this.userService.create(createAlunoDTO);
  }

  @Get('findByEmail')
  async findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('me')
  async showUser(@Request() req) {
    console.log('to sendo usado demaise');
    return req.user;
  }

  @Get(':id')
  async findAluno() {}

  @Roles(Role.ALUNO)
  @Put('updateAluno:id')
  async updateAluno(user: CreateAlunoDTO) {}

  @Delete('deleteAluno:id')
  async deleteAluno(user: CreateAlunoDTO) {}

  @Post('createFuncionario')
  @Roles(Role.ADMINISTRADOR)
  async createFuncionario(user: CreateFuncionarioDTO) {}

  @Post('uploadPDF')
  @Roles(Role.ALUNO)
  async uploadPDF(user: CreateFuncionarioDTO) {}
}
