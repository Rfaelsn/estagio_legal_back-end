import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { CreateAlunoDTO } from '../dto/createAluno.dto';
import { User } from '@prisma/client';
import { CreateUserUsecase } from '../../domain/usecase/create-user.usecase';
import { FindUserByIdUsecase } from '../../domain/usecase/find-userById.usecase';
import { FindUserByEmailUsecase } from '../../domain/usecase/find-userByEmail.usecase';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createAlunoDTO: CreateAlunoDTO) {
    const createUserUsecase = new CreateUserUsecase(this.userRepository);
    const aluno = await createUserUsecase.handle(createAlunoDTO);
    return aluno;
  }

  async getUserById(id: string): Promise<User> {
    const findUserUsecase = new FindUserByIdUsecase(this.userRepository);
    const user = await findUserUsecase.handle(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const findUserUsecase = new FindUserByEmailUsecase(this.userRepository);
    const user = await findUserUsecase.handle(email);
    return user;
  }
}
