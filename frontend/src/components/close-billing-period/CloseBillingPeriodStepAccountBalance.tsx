import { css } from "@emotion/react";
import { Button, FormControl, FormLabel, Grid, Input, Sheet, styled, Typography } from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { CloseBillingPeriodHint } from "@/components/close-billing-period/CloseBillingPeriodHint";
import { CloseBillingPeriodSubmitWrapper } from "@/components/close-billing-period/CloseBillingPeriodSubmitWrapper";
import { QueryKeys } from "@/modules/QueryKeys";
import { CurrentBillingPeriodService } from "@/modules/api";
import { useAccountBalanceQuery } from "@/queries/useAccountBalanceQuery";
import { euro } from "@/setup/euro";
import { queryClient } from "@/setup/queryClient";
import { CloseBillingPeriodParameters } from "@/types/CloseBillingPeriodParameters";

const InputCount = styled(Input)(
  () => css`
    .MuiInput-input {
      text-align: right;
    }
  `,
);

const InputReadonly = styled(InputCount)(
  () => css`
    background-color: transparent;
  `,
);

type CloseBillingPeriodStepConfirmAccountBalance = { until: string };

export function CloseBillingPeriodStepAccountBalance({
  until,
}: CloseBillingPeriodStepConfirmAccountBalance) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ countedAccountBalance: number; confirm: string }>();

  const { data: { accountBalance } = {} } = useAccountBalanceQuery();

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: CloseBillingPeriodParameters) =>
      CurrentBillingPeriodService.close({ requestBody }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index });
    },
  });

  const navigate = useNavigate();

  const countedAccountBalance = watch("countedAccountBalance");

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const billingPeriod = await mutateAsync({
          until,
          countedAccountBalance: data.countedAccountBalance,
        });
        await navigate({
          to: `/abrechnungsperioden/$billingPeriodId`,
          params: { billingPeriodId: billingPeriod.id },
        });
      })}
    >
      <CloseBillingPeriodHint>
        Zähle den aktuellen Kassenstand in der Geldbörse. Die Kassendifferenz kann nur unabhängig
        vom Abrechnungsdatum bestimmt werden.
      </CloseBillingPeriodHint>

      <Sheet sx={{ padding: 4 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid xs>
            <FormControl error={!!errors.countedAccountBalance}>
              <FormLabel>Gezählter Kassenstand</FormLabel>
              <InputCount
                type="number"
                endDecorator="€"
                required
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
                {...register("countedAccountBalance", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
              />
            </FormControl>
          </Grid>
          <Grid xs="auto">
            <Typography level="body-lg" mb={0.5}>
              -
            </Typography>
          </Grid>
          <Grid xs>
            <FormControl>
              <FormLabel>Berechneter Kassenstand</FormLabel>
              <InputReadonly
                type="number"
                endDecorator="€"
                readOnly
                variant="plain"
                sx={{ textAlign: "right", backgroundColor: "transparent" }}
                value={accountBalance}
              />
            </FormControl>
          </Grid>
          <Grid xs="auto">
            <Typography level="body-lg" mb={0.5}>
              =
            </Typography>
          </Grid>
          <Grid xs>
            <FormControl>
              <FormLabel>Kassenkorrektur</FormLabel>
              <InputReadonly
                type="number"
                endDecorator="€"
                readOnly
                variant="plain"
                value={
                  typeof countedAccountBalance === "number" && !Number.isNaN(countedAccountBalance)
                    ? euro(countedAccountBalance).subtract(accountBalance ?? 0).value
                    : ""
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Sheet>

      <CloseBillingPeriodSubmitWrapper>
        <Button size="lg" type="submit">
          Abschließen
        </Button>
      </CloseBillingPeriodSubmitWrapper>
    </form>
  );
}
