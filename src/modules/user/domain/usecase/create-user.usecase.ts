import { IUserRepository } from '../port/user-repository.port';
import { CreateAlunoDTO } from '../../application/dto/createAluno.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(inputUserAlunoDTO: CreateAlunoDTO): Promise<User> {
    const data = {
      ...inputUserAlunoDTO,
      password: await bcrypt.hash(
        inputUserAlunoDTO.password,
        await bcrypt.genSalt(),
      ),
    };
    const user = new User(data);
    await this.userRepository.create(user);
    return user;
  }
}
