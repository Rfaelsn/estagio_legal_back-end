import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUserRepository } from '../../domain/port/user-repository.port';
import { CreateStudentDTO } from '../../application/dto/createStudent.dto';
import { CreateEmployeeDTO } from '../../application/dto/createEmployee';
import { Role, UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(CreateStudentDTO: CreateStudentDTO): Promise<UserEntity> {
    const institution = await this.prisma.institution.findFirst({
      where: { cnpj: { contains: '10.763.998/0003-00' } },
    });
    const data: Prisma.UserCreateInput = {
      ...CreateStudentDTO,
      role: Role.STUDENT,
      institution: {
        connect: { id: institution.id },
      },
    };
    const newUser = await this.prisma.user.create({
      data,
    });

    return newUser;
  }

  async createEmployee(
    createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<UserEntity> {
    const data: Prisma.UserCreateInput = {
      ...createEmployeeDTO,
      TermsCommitment: {},
      institution: {},
      internshipProcess: {},
    };
    const newUser = await this.prisma.user.create({ data });

    return newUser;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
  async getAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async getById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { institution: true },
    });
    return user;
  }
  updateById(user: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByRole(role: string): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { role },
    });
    return users;
  }
}
