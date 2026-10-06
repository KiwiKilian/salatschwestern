import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { FinancialTransactions } from "@/components/FinancialTransactions";
import { LabeledValue } from "@/components/LabeledValue";
import { PageHeader } from "@/components/PageHeader";
import { QueryKeys } from "@/modules/QueryKeys";
import { FinancialTransactionsService } from "@/modules/api";
import { useAccountBalanceQuery } from "@/queries/useAccountBalanceQuery";

function FinancialTransactionsRoute() {
  const { data: { accountBalance } = {} } = useAccountBalanceQuery();

  const { data } = useQuery({
    queryKey: QueryKeys.FinancialTransactions.get,
    queryFn: FinancialTransactionsService.get,
  });

  return (
    <>
      <PageHeader heading="Kassenstand">
        <LabeledValue
          value={accountBalance?.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
          label="💰&nbsp;Kassenstand"
        />
      </PageHeader>

      <FinancialTransactions transactions={data} />
    </>
  );
}

export const Route = createLazyFileRoute("/kassenstand")({
  component: FinancialTransactionsRoute,
});
