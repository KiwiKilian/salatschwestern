import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountBalance } from '@/account-balances/entities/account-balance.entity';
import { Grocery } from '@/groceries/entities/grocery.entity';
import { UserBalance } from '@/user-balances/entities/user-balance.entity';

@Injectable()
export class FinancialTransactionsService {
  constructor(
    @InjectRepository(AccountBalance) private accountBalancesRepository: Repository<AccountBalance>,
    @InjectRepository(Grocery) private groceriesRepository: Repository<Grocery>,
    @InjectRepository(UserBalance) private userBalancesRepository: Repository<UserBalance>,
  ) {}

  async get(): Promise<(AccountBalance | Grocery | UserBalance)[]> {
    const accountBalances = await this.accountBalancesRepository.find();
    const groceries = await this.groceriesRepository.find({
      relations: { users: true },
      order: { users: { displayName: 'ASC' } },
    });
    const userBalances = await this.userBalancesRepository.find({ relations: { user: true } });

    return [...accountBalances, ...groceries, ...userBalances].sort((a, b) =>
      `${b.date}-${b.createdAt}`.localeCompare(`${a.date}-${a.createdAt}`),
    );
  }
}
