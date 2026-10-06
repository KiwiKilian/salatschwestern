import { css } from "@emotion/react";
import { Stack, styled, Typography } from "@mui/joy";
import { ReactNode } from "react";

const StyledStack = styled(Stack)(
  ({ theme }) => css`
    &:not(:last-child) {
      padding-right: ${theme.spacing(2)};
      border-right: 1px solid ${theme.palette.divider};
    }
  `,
);

type LabeledValueProps = { value?: string; label: ReactNode };

export function LabeledValue({ value, label }: LabeledValueProps) {
  return (
    <StyledStack>
      <Typography level="title-lg" fontWeight="bold">
        {value !== undefined ? value : "–"}
      </Typography>
      <Typography>{label}</Typography>
    </StyledStack>
  );
}
