import { Stack } from '@mui/joy';
import { createLazyFileRoute } from '@tanstack/react-router';

import AngleIcon from '@/assets/angle.svg?react';
import CheckIcon from '@/assets/check.svg?react';
import CrossIcon from '@/assets/cross.svg?react';
import { BillingPeriodLabeledValues } from '@/components/BillingPeriodLabeledValues';
import { ButtonLink } from '@/components/ButtonLink';
import { FinancialTransactions } from '@/components/FinancialTransactions';
import { PageHeader } from '@/components/PageHeader';
import { SaladsCalendar } from '@/components/SaladsCalendar';
import { useCurrentBillingPeriodQuery } from '@/hooks/useCurrentBillingPeriodQuery';

function CurrentBillingPeriodRoute() {
  const { data } = useCurrentBillingPeriodQuery();

  return (
    <>
      <PageHeader heading="Abrechnungsperiode">
        <BillingPeriodLabeledValues billingPeriod={data} mode="current" />
      </PageHeader>
      <SaladsCalendar billingPeriod={data} />

      <PageHeader
        heading="Einkäufe"
        actions={
          <ButtonLink
            to="/einkaeufe/hinzufuegen"
            endDecorator={<CrossIcon width={16} height={16} />}
            sx={{ flexGrow: 0 }}
          >
            Einkauf hinzufügen
          </ButtonLink>
        }
      />

      <FinancialTransactions transactions={data?.groceries} edit />

      <Stack sx={{ marginTop: 2, marginBottom: 2 }} direction="row" justifyContent="space-between" gap={1}>
        <ButtonLink
          to="/abrechnungsperioden"
          startDecorator={<AngleIcon width={16} style={{ transform: 'rotate(-90deg)' }} />}
        >
          Vorherige Abrechnungsperioden
        </ButtonLink>
        <ButtonLink to="/abrechnungsperiode/abschliessen" endDecorator={<CheckIcon width={16} height={16} />}>
          Abschließen
        </ButtonLink>
      </Stack>
    </>
  );
}

export const Route = createLazyFileRoute('/abrechnungsperiode/')({
  component: CurrentBillingPeriodRoute,
});
