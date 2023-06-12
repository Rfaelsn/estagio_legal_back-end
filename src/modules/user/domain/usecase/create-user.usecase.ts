import { IUserRepository } from '../port/user-repository.port';
import { CreateAlunoDTO } from '../../application/dto/createAluno.dto';
import { User } from '../entities/user.entity';

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(inputUserAlunoDTO: CreateAlunoDTO): Promise<User> {
    const user = new User(inputUserAlunoDTO);
    await this.userRepository.create(user);
    return user;
  }
}
