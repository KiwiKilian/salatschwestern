import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateAccountBalanceDto } from "@/account-balances/dto/create-account-balance.dto";
import { UpdateAccountBalanceDto } from "@/account-balances/dto/update-account-balance.dto";
import { AccountBalance } from "@/account-balances/entities/account-balance.entity";

@Injectable()
export class AccountBalancesService {
  constructor(
    @InjectRepository(AccountBalance) private accountBalancesRepository: Repository<AccountBalance>,
  ) {}

  create(createAccountBalanceDto: CreateAccountBalanceDto): Promise<AccountBalance> {
    return this.accountBalancesRepository.save(
      this.accountBalancesRepository.create(createAccountBalanceDto),
    );
  }

  findAll(): Promise<AccountBalance[]> {
    return this.accountBalancesRepository.find();
  }

  findOne(id: string): Promise<AccountBalance> {
    return this.accountBalancesRepository.findOneByOrFail({ id });
  }

  async update(
    id: string,
    updateAccountBalanceDto: UpdateAccountBalanceDto,
  ): Promise<AccountBalance> {
    const accountBalance = await this.accountBalancesRepository.findOneByOrFail({ id });

    return this.accountBalancesRepository.save(
      Object.assign(accountBalance, updateAccountBalanceDto),
    );
  }

  async remove(id: string): Promise<AccountBalance> {
    const accountBalance = await this.accountBalancesRepository.findOneByOrFail({ id });

    return this.accountBalancesRepository.remove(accountBalance);
  }
}
