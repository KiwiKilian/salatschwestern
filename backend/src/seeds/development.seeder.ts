import { Seeder } from '@jorgebodega/typeorm-seeding';
import dayjs from 'dayjs';
import { DataSource, DeepPartial } from 'typeorm';

import '@/setup/dayjs';
import { AccountBalance } from '@/account-balances/entities/account-balance.entity';
import { Grocery } from '@/groceries/entities/grocery.entity';
import { Salad } from '@/salads/entities/salad.entity';
import { User } from '@/users/entities/user.entity';

// eslint-disable-next-line import/no-default-export
export default class DevelopmentSeeder extends Seeder {
  async run(dataSource: DataSource) {
    await DevelopmentSeeder.exampleSetup(dataSource);
  }

  private static async exampleSetup(dataSource: DataSource) {
    const accountBalancesRepository = dataSource.getRepository(AccountBalance);
    const usersRepository = dataSource.getRepository(User);
    const saladsRepository = dataSource.getRepository(Salad);
    const groceriesRepository = dataSource.getRepository(Grocery);

    await accountBalancesRepository.save(
      accountBalancesRepository.create({
        amount: 100,
        subject: 'Initialer Kassenstand',
        date: dayjs().startOf('week').format('YYYY-MM-DD'),
      }),
    );

    const userData: DeepPartial<User>[] = [
      { email: 'kilian@example.com', displayName: 'Kilian' },
      { email: 'conni@example.com', displayName: 'Conni' },
    ];

    const users = await usersRepository.save(
      userData.map((data) =>
        usersRepository.create({
          ...data,
        }),
      ),
    );

    await saladsRepository.save(
      [
        dayjs().startOf('week').subtract(1, 'week').format('YYYY-MM-DD'),
        dayjs().startOf('week').subtract(1, 'week').add(1, 'day').format('YYYY-MM-DD'),
        dayjs().startOf('week').subtract(1, 'week').add(2, 'day').format('YYYY-MM-DD'),
        dayjs().startOf('week').format('YYYY-MM-DD'),
        dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
        dayjs().startOf('week').add(2, 'day').format('YYYY-MM-DD'),
      ]
        .map((date) =>
          users.map((user) =>
            saladsRepository.create({
              date,
              user,
            }),
          ),
        )
        .flat(),
    );

    await groceriesRepository.save([
      groceriesRepository.create({
        date: dayjs().startOf('week').subtract(1, 'week').format('YYYY-MM-DD'),
        amount: -22.27,
        users: [users[0], users[1]],
      }),
      groceriesRepository.create({
        date: dayjs().startOf('week').format('YYYY-MM-DD'),
        amount: -28.41,
        users: [users[0], users[2]],
      }),
    ]);
  }
}
