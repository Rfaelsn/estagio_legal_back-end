import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<UserEntity[]>;
  getByEmail(email: string): Promise<UserEntity>;
  getById(id: string): Promise<UserEntity>;
  updateById(user: UserEntity): Promise<void>;
}
