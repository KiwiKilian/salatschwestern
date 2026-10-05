import { css } from '@emotion/react';
import { Button, Stack, styled, Typography } from '@mui/joy';
import { Dayjs } from 'dayjs';

import AngleIcon from '@/assets/angle.svg?react';

const StyledTypography = styled(Typography)(
  ({ theme }) => css`
    margin-inline: ${theme.spacing(1)};
    font-variant-numeric: tabular-nums;
  `,
);

type WeekNavigationProps = { monday: Dayjs; onPrevious: () => void; onNext: () => void };

export function WeekNavigation({ monday, onPrevious, onNext }: WeekNavigationProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
      <Button
        onClick={onPrevious}
        startDecorator={<AngleIcon width={16} height={16} style={{ transform: 'rotate(-90deg)' }} />}
      >
        Vorherige Woche
      </Button>
      <StyledTypography level="title-lg">
        {monday.format('DD.MM.')} – {monday.weekday(4).format('DD.MM.')}
      </StyledTypography>
      <Button
        onClick={onNext}
        endDecorator={<AngleIcon width={16} height={16} style={{ transform: 'rotate(90deg)' }} />}
      >
        Nächste Woche
      </Button>
    </Stack>
  );
}
