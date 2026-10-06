import { Button } from "@mui/joy";

import { FinancialTransactions } from "@/components/FinancialTransactions";
import { CloseBillingPeriodHint } from "@/components/close-billing-period/CloseBillingPeriodHint";
import { CloseBillingPeriodSubmitWrapper } from "@/components/close-billing-period/CloseBillingPeriodSubmitWrapper";
import { useCurrentBillingPeriodQuery } from "@/hooks/useCurrentBillingPeriodQuery";

type CloseBillingPeriodStepGroceriesProps = { until: string; onSubmit: () => void };

export function CloseBillingPeriodStepGroceries({
  until,
  onSubmit,
}: CloseBillingPeriodStepGroceriesProps) {
  const { data: currentBillingPeriod } = useCurrentBillingPeriodQuery({ until });

  return (
    <>
      <CloseBillingPeriodHint>
        Die Einkäufe sind mit den Rechnungen in der 🌲-SPAR-App sowie die ausgedruckten Belege in
        der Geldbörse zu vergleichen. Füge fehlende Einkäufe hinzu oder korrigiere falsche
        Einkaufspreise.
      </CloseBillingPeriodHint>
      <FinancialTransactions transactions={currentBillingPeriod?.groceries} edit />

      <CloseBillingPeriodSubmitWrapper>
        <Button size="lg" onClick={onSubmit}>
          Einkäufe bestätigen
        </Button>
      </CloseBillingPeriodSubmitWrapper>
    </>
  );
}
