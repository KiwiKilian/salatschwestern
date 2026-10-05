import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.usersRepository.findOne({ where: { email: createUserDto.email } })) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: [
          {
            property: 'email',
            value: createUserDto.email,
            constraints: {
              isUnique: `email must be unique`,
            },
            target: createUserDto,
            children: [],
          },
        ],
      });
    }

    return this.usersRepository.save(this.usersRepository.create(createUserDto));
  }

  findAll({ active }: { active?: boolean }) {
    return this.usersRepository.findBy({
      ...(active !== undefined && { active }),
    });
  }

  async findOne(id: string, includeSalads?: boolean, includeUserBalances?: boolean) {
    return this.usersRepository.findOneOrFail({
      where: { id },
      relations: {
        salads: { billingPeriod: !!includeSalads },
        userBalances: !!includeUserBalances,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ id });

    return this.usersRepository.save(Object.assign(user, updateUserDto));
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneByOrFail({ id });

    return this.usersRepository.remove(user);
  }
}
