import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

import { BillingPeriodLabeledValues } from "@/components/BillingPeriodLabeledValues";
import { FinancialTransactions } from "@/components/FinancialTransactions";
import { PageHeader } from "@/components/PageHeader";
import { SaladsCalendar } from "@/components/SaladsCalendar";
import { QueryKeys } from "@/modules/QueryKeys";
import { BillingPeriodsService } from "@/modules/api";

function BillingPeriodPage() {
  const { billingPeriodId } = useParams({ from: "/abrechnungsperioden/$billingPeriodId" });

  const parameters = { id: billingPeriodId as string };
  const { data: billingPeriod } = useQuery({
    queryKey: QueryKeys.BillingPeriods.findOne(parameters),
    queryFn: () => BillingPeriodsService.findOne(parameters),
  });

  if (!billingPeriodId || !billingPeriod) {
    return null;
  }

  return (
    <>
      <PageHeader heading="Salate">
        <BillingPeriodLabeledValues billingPeriod={billingPeriod} mode="closed" />
      </PageHeader>

      <SaladsCalendar billingPeriod={billingPeriod} />

      <PageHeader heading="Einkäufe" />
      <FinancialTransactions transactions={billingPeriod?.groceries} />
    </>
  );
}

export const Route = createLazyFileRoute("/abrechnungsperioden/$billingPeriodId")({
  component: BillingPeriodPage,
});
