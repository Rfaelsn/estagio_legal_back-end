import { IUserRepository } from '../port/user-repository.port';
import { User } from '../entities/user.entity';

export class FindUserByEmailUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(email: string): Promise<User> {
    const user: User = await this.userRepository.getByEmail(email);
    return user;
  }
}
