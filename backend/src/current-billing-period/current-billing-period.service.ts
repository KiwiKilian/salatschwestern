import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, IsNull, LessThanOrEqual, Repository } from 'typeorm';

import { AccountBalance } from '@/account-balances/entities/account-balance.entity';
import { BalancesService } from '@/balances/balances.service';
import { BillingPeriod } from '@/billing-periods/entities/billing-period.entity';
import { CloseCurrentBillingPeriodDto } from '@/current-billing-period/dto/close-current-billing-period.dto';
import { CurrentBillingPeriodDto } from '@/current-billing-period/dto/current-billing-period.dto';
import { Grocery } from '@/groceries/entities/grocery.entity';
import { NotificationService } from '@/notification/notification.service';
import { Salad } from '@/salads/entities/salad.entity';
import { euro } from '@/setup/euro';

@Injectable()
export class CurrentBillingPeriodService {
  constructor(
    @InjectRepository(BillingPeriod) private billingPeriodRepository: Repository<BillingPeriod>,
    @InjectRepository(Salad) private saladsRepository: Repository<Salad>,
    @InjectRepository(Grocery) private groceriesRepository: Repository<Grocery>,
    @InjectRepository(AccountBalance) private accountBalancesRepository: Repository<AccountBalance>,
    private readonly balancesService: BalancesService,
    private readonly notificationService: NotificationService,
  ) {}

  async get(until?: string): Promise<CurrentBillingPeriodDto> {
    const findManyOptions: FindManyOptions<Salad | Grocery> = {
      where: {
        billingPeriod: IsNull(),
        ...(until && { date: LessThanOrEqual(until) }),
      },
    };

    const salads = await this.saladsRepository.find({
      ...findManyOptions,
      relations: { user: true },
      order: {
        date: 'ASC',
        user: {
          displayName: 'ASC',
        },
      },
    });
    const groceries = await this.groceriesRepository.find({
      ...findManyOptions,
      relations: { users: true },
      order: {
        date: 'ASC',
        users: {
          displayName: 'ASC',
        },
      },
    });

    const expenses = groceries.reduce((sum, { amount }) => sum.add(amount), euro(0));

    const saladPrice =
      groceries.length > 0 && salads.length > 0
        ? Math.ceil(Math.abs(expenses.intValue) / salads.length) / 100
        : undefined;

    return {
      saladPrice,
      salads,
      groceries,
    };
  }

  async close({ until, countedAccountBalance }: CloseCurrentBillingPeriodDto) {
    const currentBillingPeriod = await this.get(until);

    if (
      currentBillingPeriod.salads.length === 0 ||
      currentBillingPeriod.groceries.length === 0 ||
      currentBillingPeriod.saladPrice === undefined
    ) {
      throw new UnprocessableEntityException();
    }

    const billingPeriod = await this.billingPeriodRepository.save(
      this.billingPeriodRepository.create({
        billingDate: until,
        saladPrice: currentBillingPeriod.saladPrice,
        groceries: currentBillingPeriod.groceries,
        salads: currentBillingPeriod.salads,
      }),
    );

    const { accountBalance } = await this.balancesService.getAccount();
    const accountBalanceDifference = euro(countedAccountBalance).subtract(accountBalance);

    if (accountBalanceDifference.value !== 0) {
      await this.accountBalancesRepository.save(
        this.accountBalancesRepository.create({
          subject: 'Kassenkorrektur',
          date: until,
          amount: accountBalanceDifference.value,
        }),
      );
    }

    this.notificationService.currentBillingPeriodClosed({ billingPeriod, accountBalanceDifference });

    return billingPeriod;
  }
}
