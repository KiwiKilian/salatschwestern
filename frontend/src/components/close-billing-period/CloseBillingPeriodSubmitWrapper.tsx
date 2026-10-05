import { css } from '@emotion/react';
import { Box, styled } from '@mui/joy';

export const CloseBillingPeriodSubmitWrapper = styled(Box)(
  ({ theme }) => css`
    margin-top: ${theme.spacing(4)};
    margin-bottom: ${theme.spacing(4)};
    text-align: center;
  `,
);
