import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAlunoDTO } from './dto/createAluno.dto';

@Controller('aluno')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('cadastrar')
  getHello(@Body() data: CreateAlunoDTO) {
    this.prisma.aluno.create({
      data,
    });

    return { resp: 'criado com sucesso' };
  }
}
