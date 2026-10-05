import { Box, Stack, Typography } from '@mui/joy';
import { ReactNode } from 'react';

type CardHeaderProps = { heading: string; children?: ReactNode; actions?: ReactNode };

export function PageHeader({ heading, children, actions }: CardHeaderProps) {
  return (
    <Box sx={{ marginY: 4 }}>
      <Stack
        direction={{ md: 'row' }}
        justifyContent={{
          md: 'space-between',
        }}
        alignItems={{
          md: 'center',
        }}
      >
        <Typography level="h1">{heading}</Typography>
        {children ||
          (actions && (
            <Stack direction="row" justifyContent="flex-end" gap={1}>
              {actions}
            </Stack>
          ))}
      </Stack>

      {children && actions && (
        <Stack sx={{ marginTop: 2 }} direction="row" justifyContent="flex-end" gap={1}>
          {actions}
        </Stack>
      )}
    </Box>
  );
}
