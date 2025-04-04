import { IUserRepository } from '../port/user-repository.port';
import { UserEntity } from '../entities/user.entity';

export class FindUserByEmailUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.getByEmail(email);
    return user;
  }
}
