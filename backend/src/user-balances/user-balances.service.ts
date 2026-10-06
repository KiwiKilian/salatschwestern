import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserBalanceDto } from "@/user-balances/dto/create-user-balance.dto";
import { UpdateUserBalanceDto } from "@/user-balances/dto/update-user-balance.dto";
import { UserBalance } from "@/user-balances/entities/user-balance.entity";

@Injectable()
export class UserBalancesService {
  constructor(
    @InjectRepository(UserBalance) private userBalancesRepository: Repository<UserBalance>,
  ) {}

  create({ userId, ...createUserBalanceDto }: CreateUserBalanceDto): Promise<UserBalance> {
    return this.userBalancesRepository.save(
      this.userBalancesRepository.create({
        ...createUserBalanceDto,
        user: { id: userId },
      }),
    );
  }

  findAll(): Promise<UserBalance[]> {
    return this.userBalancesRepository.find();
  }

  findOne(id: string): Promise<UserBalance> {
    return this.userBalancesRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateUserBalanceDto: UpdateUserBalanceDto): Promise<UserBalance> {
    const userBalance = await this.userBalancesRepository.findOneByOrFail({ id });

    return this.userBalancesRepository.save(Object.assign(userBalance, updateUserBalanceDto));
  }

  async remove(id: string): Promise<UserBalance> {
    const userBalance = await this.userBalancesRepository.findOneByOrFail({ id });

    return this.userBalancesRepository.remove(userBalance);
  }
}
