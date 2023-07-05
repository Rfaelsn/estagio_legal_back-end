import { IUserRepository } from '../port/user-repository.port';
import { CreateAlunoDTO } from '../../application/dto/createAluno.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(inputUserAlunoDTO: CreateAlunoDTO) {
    try {
      const response = await axios.get(
        'http://localhost:3000/aluno/findByMatricula',
        {
          params: {
            matricula: inputUserAlunoDTO.matricula,
          },
        },
      );

      console.log(response.data);
      if (
        inputUserAlunoDTO.name === response.data.nome &&
        inputUserAlunoDTO.matricula === response.data.matricula
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
