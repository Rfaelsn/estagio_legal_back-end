import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User>;
  getById(id: string): Promise<User>;
  updateById(user: User): Promise<void>;
}
