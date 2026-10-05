import { Sheet, Table } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { Amount } from '@/components/Amount';
import { ButtonLink } from '@/components/ButtonLink';
import { PageHeader } from '@/components/PageHeader';
import { BillingPeriodsSaladPriceChart } from '@/components/charts/BillingPeriodsSaladPriceChart';
import { QueryKeys } from '@/modules/QueryKeys';
import { BillingPeriodsService } from '@/modules/api';

function BillingPeriodsPage() {
  const { data: billingPeriods } = useQuery({
    queryKey: QueryKeys.BillingPeriods.findAll,
    queryFn: BillingPeriodsService.findAll,
  });

  return (
    <>
      <PageHeader heading="Abrechnungsperioden" />

      <BillingPeriodsSaladPriceChart billingPeriods={billingPeriods} />

      <Sheet>
        <Table>
          <thead>
            <tr>
              <th>Abrechnungsdatum</th>
              <th>Salatpreis</th>
              <th>Salate</th>
              <th>Einkäufe</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th style={{ width: '1%' }} />
            </tr>
          </thead>
          <tbody>
            {billingPeriods?.map(({ id, billingDate, saladPrice, salads, groceries }) => (
              <tr key={id}>
                <td>{dayjs(billingDate).format('DD.MM.YYYY')}</td>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td style={{ textAlign: 'right' }}>
                  <Amount value={saladPrice} colored={false} />
                </td>
                <td style={{ textAlign: 'right' }}>{salads?.length}</td>
                <td style={{ textAlign: 'right' }}>{groceries?.length}</td>
                <td style={{ width: '1%', whiteSpace: 'nowrap', paddingLeft: '1rem' }}>
                  <ButtonLink
                    variant="plain"
                    to="/abrechnungsperioden/$billingPeriodId"
                    params={{ billingPeriodId: id }}
                  >
                    Details 🤑
                  </ButtonLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}

export const Route = createLazyFileRoute('/abrechnungsperioden/')({
  component: BillingPeriodsPage,
});
