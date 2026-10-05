import { Typography } from '@mui/joy';

import { euro } from '@/setup/euro';

type AmountProps = { value: number; colored?: boolean };

export function Amount({ value, colored = true }: AmountProps) {
  return (
    <Typography fontWeight="bold" textAlign="right" color={colored && value >= 0 ? 'success' : 'danger'}>
      {euro(value).format()}
    </Typography>
  );
}
