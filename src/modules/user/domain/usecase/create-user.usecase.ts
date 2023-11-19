import { IUserRepository } from '../port/user-repository.port';
import { CreateAlunoDTO } from '../../application/dto/createAluno.dto';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(inputUserAlunoDTO: CreateAlunoDTO) {
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
          ...inputUserAlunoDTO,
          password: await bcrypt.hash(
            inputUserAlunoDTO.password,
            await bcrypt.genSalt(),
          ),
        };
        const user = new User(data);
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
