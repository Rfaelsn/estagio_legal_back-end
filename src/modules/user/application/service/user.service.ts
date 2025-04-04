import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { CreateStudentDTO } from '../dto/createStudent.dto';
import { CreateUserUseCase } from '../../domain/usecase/create-user.usecase';
import { FindUserByIdUsecase } from '../../domain/usecase/find-userById.usecase';
import { FindUserByEmailUsecase } from '../../domain/usecase/find-userByEmail.usecase';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createStudentDTO: CreateStudentDTO) {
    const createUserUseCase = new CreateUserUseCase(this.userRepository);
    const aluno = await createUserUseCase.handle(createStudentDTO);
    return aluno;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const findUserUsecase = new FindUserByIdUsecase(this.userRepository);
    const user = await findUserUsecase.handle(id);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const findUserUsecase = new FindUserByEmailUsecase(this.userRepository);
    const user = await findUserUsecase.handle(email);
    return user;
  }
}
