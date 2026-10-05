import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountBalance } from '@/account-balances/entities/account-balance.entity';
import { AccountBalanceDto } from '@/balances/dto/account-balance.dto';
import { UserAccountBalanceDto } from '@/balances/dto/user-account-balance.dto';
import { Grocery } from '@/groceries/entities/grocery.entity';
import { Salad } from '@/salads/entities/salad.entity';
import { euro } from '@/setup/euro';
import { UserBalance } from '@/user-balances/entities/user-balance.entity';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(AccountBalance) private accountBalancesRepository: Repository<AccountBalance>,
    @InjectRepository(UserBalance) private userBalancesRepository: Repository<UserBalance>,
    @InjectRepository(Grocery) private groceriesRepository: Repository<Grocery>,
    @InjectRepository(Salad) private saladsRepository: Repository<Salad>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAccount(): Promise<AccountBalanceDto> {
    const groceries = (await this.groceriesRepository.sum('amount')) ?? 0;
    const accountBalances = (await this.accountBalancesRepository.sum('amount')) ?? 0;
    const userBalances = (await this.userBalancesRepository.sum('amount')) ?? 0;

    return { accountBalance: euro(groceries).add(accountBalances).add(userBalances).value };
  }

  async getUsers(parameters?: { active?: boolean }): Promise<UserAccountBalanceDto[]> {
    const { active } = parameters || {};
    const totalExpensesQuery = this.saladsRepository
      .createQueryBuilder('salad')
      .select('salad.userId')
      .leftJoin('salad.billingPeriod', 'billingPeriod')
      .groupBy('salad.userId')
      .addSelect('SUM(billingPeriod.saladPrice)', 'totalExpense');

    const totalExpenses: { userId: string; totalExpense: string }[] = await totalExpensesQuery.getRawMany();

    const totalBalancesQuery = this.userBalancesRepository
      .createQueryBuilder('balance')
      .select('balance.userId')
      .groupBy('balance.userId')
      .addSelect('SUM(balance.amount)', 'totalBalance');

    const totalBalances: { userId: string; totalBalance: string }[] = await totalBalancesQuery.getRawMany();

    const users = await this.usersRepository.find({
      where: {
        ...(active !== undefined && { active }),
      },
      order: { displayName: 'ASC' },
    });

    return users.map((user) => ({
      user,
      balance: euro(parseFloat(totalBalances.find(({ userId }) => userId === user.id)?.totalBalance || '0')).subtract(
        parseFloat(totalExpenses.find(({ userId }) => userId === user.id)?.totalExpense || '0'),
      ).value,
    }));
  }

  async getUser(userId: string): Promise<UserAccountBalanceDto> {
    const balance = (await this.getUsers()).find(({ user: { id } }) => id === userId);

    if (!balance) {
      throw new NotFoundException();
    }

    return balance;
  }
}
