import { createLazyFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';

import { BillingPeriodLabeledValues } from '@/components/BillingPeriodLabeledValues';
import { DayCard } from '@/components/DayCard';
import { PageHeader } from '@/components/PageHeader';
import { WeekNavigation } from '@/components/WeekNavigation';
import { useCurrentBillingPeriodQuery } from '@/hooks/useCurrentBillingPeriodQuery';
import { CurrentBillingPeriodDto } from '@/modules/api';

function IndexRoute() {
  const { data: currentBillingPeriod } = useCurrentBillingPeriodQuery();
  const [weekOffset, setWeekOffset] = useState(0);

  const monday = dayjs().startOf('week').add(weekOffset, 'weeks');
  const weekOfYear = monday.week();

  const weekSalads = currentBillingPeriod?.salads.filter(({ date }) => dayjs(date).week() === weekOfYear);

  return (
    <>
      <PageHeader heading="Salate">
        <BillingPeriodLabeledValues
          billingPeriod={{ ...currentBillingPeriod, salads: weekSalads } as CurrentBillingPeriodDto}
          mode="week"
        />
      </PageHeader>

      <WeekNavigation
        monday={monday}
        onPrevious={() => setWeekOffset((prevState) => prevState - 1)}
        onNext={() => setWeekOffset((prevState) => prevState + 1)}
      />

      {Array.from(Array(5).keys()).map((index) => {
        const day = monday.add(index, 'days');

        return (
          <DayCard
            key={index}
            date={day}
            salads={weekSalads?.filter(({ date }) => date === day.format('YYYY-MM-DD'))}
          />
        );
      })}
    </>
  );
}

export const Route = createLazyFileRoute('/')({
  component: IndexRoute,
});
