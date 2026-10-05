import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useParams } from '@tanstack/react-router';

import { ButtonLink } from '@/components/ButtonLink';
import { FinancialTransactions } from '@/components/FinancialTransactions';
import { LabeledValue } from '@/components/LabeledValue';
import { PageHeader } from '@/components/PageHeader';
import { QueryKeys } from '@/modules/QueryKeys';
import { BalancesService, UsersService } from '@/modules/api';

function UserPage() {
  const { userId } = useParams({ from: '/schwestern/$userId/' });

  const parametersUser = { id: userId as string, includeSalads: true, includesUserBalances: true };
  const { data: user } = useQuery({
    queryKey: QueryKeys.Users.findOne(parametersUser),
    queryFn: () => UsersService.findOne(parametersUser),
    enabled: !!userId,
  });

  const parametersUserAccountBalance = { userId: userId as string };
  const { data: userAccountBalance } = useQuery({
    queryKey: QueryKeys.Balances.getUser(parametersUserAccountBalance),
    queryFn: () => BalancesService.getUser(parametersUserAccountBalance),
    enabled: !!userId,
  });

  const transactions = [...(user?.userBalances || []), ...(user?.salads || []).filter((salad) => salad.billingPeriod)]
    .map((transaction) => {
      transaction.user = user;

      return transaction;
    })
    .sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));

  if (!userId || !user) {
    return null;
  }

  return (
    <>
      <PageHeader
        heading={user?.displayName || ''}
        actions={
          <ButtonLink to="/schwestern/$userId/buchen" params={{ userId }}>
            Buchen 💸
          </ButtonLink>
        }
      >
        <LabeledValue
          value={userAccountBalance?.balance?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          label="💰 Kontostand"
        />
      </PageHeader>

      <FinancialTransactions transactions={transactions} />
    </>
  );
}

export const Route = createLazyFileRoute('/schwestern/$userId/')({
  component: UserPage,
});
