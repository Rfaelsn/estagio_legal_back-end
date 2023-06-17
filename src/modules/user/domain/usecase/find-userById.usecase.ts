import { IUserRepository } from '../port/user-repository.port';
import { User } from '../entities/user.entity';

export class FindUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(id: string): Promise<User> {
    const user: User = await this.userRepository.getById(id);
    return user;
  }
}
