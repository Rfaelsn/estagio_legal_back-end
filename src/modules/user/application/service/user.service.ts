import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { CreateAlunoDTO } from '../dto/createAluno.dto';
import { User } from '@prisma/client';
import { CreateUserUsecase } from '../../domain/usecase/create-user.usecase';
import { FindUserUsecase } from '../../domain/usecase/find-user.usecase';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createAlunoDTO: CreateAlunoDTO): Promise<User> {
    const createUserUsecase = new CreateUserUsecase(this.userRepository);
    const aluno = await createUserUsecase.handle(createAlunoDTO);
    return aluno;
  }

  async getUserById(id: string): Promise<User> {
    const findUserUsecase = new FindUserUsecase(this.userRepository);
    const user = await findUserUsecase.handle(id);
    return user;
  }
}
