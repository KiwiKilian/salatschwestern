import { css } from '@emotion/react';
import { styled, Typography } from '@mui/joy';

export const CloseBillingPeriodHint = styled(Typography)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(2)};
    text-align: center;
  `,
);
