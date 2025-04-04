import { IUserRepository } from '../port/user-repository.port';
import { CreateStudentDTO } from '../../application/dto/createStudent.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(inputUserStudentDTO: CreateStudentDTO) {
    try {
      // const response = await axios.get(
      //   'http://localhost:3000/aluno/findByMatricula',
      //   {
      //     params: {
      //       registration: inputUserAlunoDTO.registration,
      //     },
      //   },
      // );

      // console.log(response.data);
      const teste = 'verdadeiro';
      if (
        teste === 'verdadeiro'
        // inputUserAlunoDTO.name === response.data.name &&
        // inputUserAlunoDTO.registration === response.data.registration
      ) {
        const data = {
          ...inputUserStudentDTO,
          password: await bcrypt.hash(
            inputUserStudentDTO.password,
            await bcrypt.genSalt(),
          ),
        };
        const user = new UserEntity(data);
        await this.userRepository.create(user);
        return user;
      } else {
        return new HttpException(
          {
            errorMessage: 'Aluno nao cadastrado no Sigaa',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}
