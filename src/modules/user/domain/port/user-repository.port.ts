import { User } from '@prisma/client';

export interface IUserRepository {
  create(user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  updateById(user: User): Promise<void>;
}
