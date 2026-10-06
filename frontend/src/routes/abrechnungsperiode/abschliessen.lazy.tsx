import { Step, StepButton, StepIndicator, Stepper } from "@mui/joy";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import CheckIcon from "@/assets/check.svg?react";
import { PageHeader } from "@/components/PageHeader";
import { CloseBillingPeriodStepAccountBalance } from "@/components/close-billing-period/CloseBillingPeriodStepAccountBalance";
import { CloseBillingPeriodStepDate } from "@/components/close-billing-period/CloseBillingPeriodStepDate";
import { CloseBillingPeriodStepGroceries } from "@/components/close-billing-period/CloseBillingPeriodStepGroceries";
import { CloseBillingPeriodParameters } from "@/types/CloseBillingPeriodParameters";

enum CloseBillingPeriodStep {
  DATE,
  GROCERIES,
  COUNT_ACCOUNT_BALANCE,
}

function CloseCurrentBillingPeriodRoute() {
  const [step, setStep] = useState(CloseBillingPeriodStep.DATE);
  const [parameters, setParameters] = useState<Partial<CloseBillingPeriodParameters>>({});

  let stepChildren;

  if (step === CloseBillingPeriodStep.DATE) {
    stepChildren = (
      <CloseBillingPeriodStepDate
        until={parameters.until}
        onSubmit={(until) => {
          setParameters((prevState) => ({ ...prevState, until }));
          setStep((prevState) => prevState + 1);
        }}
      />
    );
  }

  if (step === CloseBillingPeriodStep.GROCERIES && parameters.until) {
    stepChildren = (
      <CloseBillingPeriodStepGroceries
        until={parameters.until}
        onSubmit={() => {
          setStep((prevState) => prevState + 1);
        }}
      />
    );
  }

  if (step === CloseBillingPeriodStep.COUNT_ACCOUNT_BALANCE && parameters.until) {
    stepChildren = <CloseBillingPeriodStepAccountBalance until={parameters.until} />;
  }

  return (
    <>
      <PageHeader heading="🛒 Abrechnungsperiode abschließen" />

      <Stepper sx={{ mb: 4 }} size="lg">
        {[
          CloseBillingPeriodStep.DATE,
          CloseBillingPeriodStep.GROCERIES,
          CloseBillingPeriodStep.COUNT_ACCOUNT_BALANCE,
        ].map((stepperStep, index) => (
          <Step
            key={stepperStep}
            indicator={
              <StepIndicator
                variant={step <= index ? "soft" : "solid"}
                color={step < index ? "neutral" : "primary"}
                sx={(theme) => ({
                  background:
                    step > index
                      ? theme.vars.palette.gradient.full
                      : theme.vars.palette.gradient.faded,
                })}
              >
                {step <= index ? index + 1 : <CheckIcon width={16} height={16} />}
              </StepIndicator>
            }
            sx={(theme) => ({
              "&::after": {
                background:
                  step > index
                    ? theme.vars.palette.gradient.full
                    : theme.vars.palette.gradient.faded,
              },
            })}
          >
            <StepButton onClick={() => setStep(stepperStep)} disabled={stepperStep > step}>
              {
                {
                  [CloseBillingPeriodStep.DATE]: "Abrechnungsdatum festlegen",
                  [CloseBillingPeriodStep.GROCERIES]: "Einkäufe prüfen",
                  [CloseBillingPeriodStep.COUNT_ACCOUNT_BALANCE]: "Kassenstand zählen",
                }[stepperStep]
              }
            </StepButton>
          </Step>
        ))}
      </Stepper>

      {stepChildren}
    </>
  );
}

export const Route = createLazyFileRoute("/abrechnungsperiode/abschliessen")({
  component: CloseCurrentBillingPeriodRoute,
});
