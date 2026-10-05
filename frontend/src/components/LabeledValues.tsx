import { Stack } from '@mui/joy';
import { ReactNode } from 'react';

type LabeledValuesProps = { children: ReactNode };

export function LabeledValues({ children }: LabeledValuesProps) {
  return (
    <Stack direction="row" justifyContent="flex-end" gap={2}>
      {children}
    </Stack>
  );
}
