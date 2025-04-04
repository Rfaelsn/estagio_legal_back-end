import { IUserRepository } from '../port/user-repository.port';
import { UserEntity } from '../entities/user.entity';

export class FindUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.getById(id);
    return user;
  }
}
