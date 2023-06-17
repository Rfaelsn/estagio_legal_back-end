import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUserRepository } from '../../domain/port/user-repository.port';
import { CreateAlunoDTO } from '../../application/dto/createAluno.dto';
import { CreateFuncionarioDTO } from '../../application/dto/createFuncionario';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(CreateAlunoDTO: CreateAlunoDTO): Promise<User> {
    const data: Prisma.UserCreateInput = { ...CreateAlunoDTO };
    const newUser = await this.prisma.user.create({ data });

    return newUser;
  }

  async createFuncionario(
    createFuncionarioDTO: CreateFuncionarioDTO,
  ): Promise<User> {
    const data: Prisma.UserCreateInput = { ...createFuncionarioDTO };
    const newUser = await this.prisma.user.create({ data });

    return newUser;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }
  updateById(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
