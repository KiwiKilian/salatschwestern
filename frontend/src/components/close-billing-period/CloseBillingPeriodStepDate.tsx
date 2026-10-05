import { Button, FormControl, FormLabel, Input, Sheet } from '@mui/joy';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { BillingPeriodLabeledValues } from '@/components/BillingPeriodLabeledValues';
import { PageHeader } from '@/components/PageHeader';
import { SaladsCalendar } from '@/components/SaladsCalendar';
import { CloseBillingPeriodHint } from '@/components/close-billing-period/CloseBillingPeriodHint';
import { CloseBillingPeriodSubmitWrapper } from '@/components/close-billing-period/CloseBillingPeriodSubmitWrapper';
import { useCurrentBillingPeriodQuery } from '@/hooks/useCurrentBillingPeriodQuery';

type CloseBillingPeriodStepDateProps = { until?: string; onSubmit: (date: string) => void };

export function CloseBillingPeriodStepDate({ until: untilDefaultValue, onSubmit }: CloseBillingPeriodStepDateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ until: string }>({
    defaultValues: { until: untilDefaultValue || dayjs().format('YYYY-MM-DD') },
  });

  const until = watch('until');
  const { data: currentBillingPeriod } = useCurrentBillingPeriodQuery({ until: until || undefined });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data.until);
      })}
    >
      <CloseBillingPeriodHint>
        Wähle zuerst das Abrechnungsdatum aus. Noch nicht abgerechnete Salate und Einkäufe bis einschließlich diesem
        Datum werden einbezogen.
      </CloseBillingPeriodHint>

      <Sheet sx={{ padding: 4 }}>
        <FormControl error={!!errors.until}>
          <FormLabel>Abrechnungsdatum</FormLabel>
          <Input
            required
            type="date"
            slotProps={{
              input: {
                max: dayjs().format('YYYY-MM-DD'),
              },
            }}
            {...register('until', { required: true })}
          />
        </FormControl>
      </Sheet>

      <PageHeader heading="Salate">
        <BillingPeriodLabeledValues billingPeriod={currentBillingPeriod} mode="closed" />
      </PageHeader>
      <SaladsCalendar billingPeriod={currentBillingPeriod} />

      <CloseBillingPeriodSubmitWrapper>
        <Button
          size="lg"
          type="submit"
          disabled={
            currentBillingPeriod?.salads.length === 0 ||
            currentBillingPeriod?.groceries.length === 0 ||
            currentBillingPeriod?.saladPrice === undefined
          }
        >
          Abrechnungsdatum bestätigen
        </Button>
      </CloseBillingPeriodSubmitWrapper>
    </form>
  );
}
