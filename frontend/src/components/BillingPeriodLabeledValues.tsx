import { LabeledValue } from "@/components/LabeledValue";
import { LabeledValues } from "@/components/LabeledValues";
import { BillingPeriod, CurrentBillingPeriodDto } from "@/modules/api";
import { useAccountBalanceQuery } from "@/queries/useAccountBalanceQuery";

type BillingPeriodLabeledValuesProps = {
  billingPeriod?: CurrentBillingPeriodDto | BillingPeriod;
  mode: "week" | "current" | "closed";
};

export function BillingPeriodLabeledValues({
  billingPeriod,
  mode,
}: BillingPeriodLabeledValuesProps) {
  const { data: { accountBalance } = {} } = useAccountBalanceQuery();

  return (
    <LabeledValues>
      {billingPeriod && (
        <>
          <LabeledValue
            value={billingPeriod.salads?.length.toLocaleString("de-DE")}
            label="🥗&nbsp;Salate"
          />
          <LabeledValue
            value={billingPeriod.saladPrice?.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
            label={<>🤑&nbsp;{mode !== "closed" ? "Preisprognose" : "Preis"}</>}
          />
          {mode !== "closed" && (
            <LabeledValue
              value={accountBalance?.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
              label="💰&nbsp;Kassenstand"
            />
          )}
        </>
      )}
    </LabeledValues>
  );
}
