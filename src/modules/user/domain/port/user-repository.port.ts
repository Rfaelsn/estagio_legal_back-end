import { CreateStudentDTO } from '../../application/dto/createStudent.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: CreateStudentDTO): Promise<CreateStudentDTO>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<UserEntity[]>;
  getByEmail(email: string): Promise<UserEntity>;
  getById(id: string): Promise<UserEntity>;
  updateById(user: UserEntity): Promise<void>;
}
