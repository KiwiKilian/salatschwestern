import { css } from '@emotion/react';
import { Box, Sheet, styled, Table } from '@mui/joy';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { BillingPeriod, CurrentBillingPeriodDto, Salad, User } from '@/modules/api';
import { euro } from '@/setup/euro';

const StyledTable = styled(Table)(
  ({ theme }) => css`
    --TableCell-paddingX: 0px;
    --TableCell-paddingY: ${theme.spacing(0.25)};
    --TableRow-hoverBackground: ${theme.vars.palette.background.level1};

    tr > *:first-child {
      padding-left: ${theme.spacing(3)};
    }
  `,
);

const NameCell = styled('th')(
  ({ theme }) => css`
    position: sticky;
    left: 0;
    background-color: white !important;
    z-index: 1;
    padding-right: ${theme.spacing(1)};
    white-space: nowrap;
  `,
);

const DateVertical = styled('span')(
  () => css`
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    font-variant-numeric: tabular-nums;
  `,
);

type SaladsCalendarProps = { billingPeriod?: CurrentBillingPeriodDto | BillingPeriod };

export function SaladsCalendar({ billingPeriod }: SaladsCalendarProps) {
  const saladDays = useMemo(() => {
    const dates = (billingPeriod?.salads || []).map(({ date }) => dayjs(date));

    if (dates.length === 0) {
      return undefined;
    }

    const dayStart = (dayjs.min(dates) || dayjs()).startOf('day').weekday(0);
    const dayEnd = (dayjs.max(dates) || dayjs()).startOf('day').weekday(4);

    const days = [];

    const difference = dayEnd.diff(dayStart, 'days');

    for (let i = 0; i <= difference; i += 1) {
      const day = dayStart.clone().add(i, 'day');

      if (day.weekday() <= 4) {
        days.push(day);
      }
    }

    return days;
  }, [billingPeriod?.salads]);

  const saladsPerUser = useMemo(
    () =>
      (billingPeriod?.salads || []).reduce(
        (all, salad) => {
          if (all[salad.user.id]) {
            all[salad.user.id].salads.push(salad);
          } else {
            all[salad.user.id] = {
              user: salad.user,
              salads: [salad],
            };
          }

          return all;
        },
        {} as Record<string, { user: User; salads: Salad[] }>,
      ),
    [billingPeriod?.salads],
  );

  return saladDays ? (
    <Sheet sx={{ overflow: 'hidden' }}>
      <Box sx={{ overflow: 'scroll' }}>
        <StyledTable hoverRow>
          <thead>
            <tr>
              <NameCell>Name</NameCell>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
              {saladDays?.map((day, index) => (
                <th
                  key={day.format('YYYY-MM-DD')}
                  style={{
                    textAlign: 'center',
                    minWidth: 48,
                    ...(index + 1 < saladDays.length && day.weekday() === 4 && { borderRightStyle: 'solid' }),
                  }}
                >
                  <DateVertical>{day.format('DD.MM.')}</DateVertical>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billingPeriod &&
              Object.values(saladsPerUser)
                .sort((a, b) => a.user.displayName.localeCompare(b.user.displayName))
                .map(({ user, salads }) => (
                  <tr key={user.id}>
                    <NameCell scope="row">{user.displayName}</NameCell>
                    <td style={{ paddingRight: 16, whiteSpace: 'nowrap', textAlign: 'right' }}>{salads.length}×🥗</td>
                    <td style={{ paddingRight: 16, whiteSpace: 'nowrap', textAlign: 'right' }}>
                      {euro(billingPeriod.saladPrice!).multiply(salads.length).format()}
                    </td>
                    {saladDays?.map((day, index) => {
                      const dayDate = day.format('YYYY-MM-DD');

                      return (
                        <td
                          key={dayDate}
                          style={{
                            textAlign: 'center',
                            minWidth: 48,
                            height: 48,
                            padding: 0,
                            fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-lg, 1.125rem))',
                            ...(index % 2 === 0 && { backgroundColor: 'white' }),
                            ...(index + 1 < saladDays.length && day.weekday() === 4 && { borderRightStyle: 'solid' }),
                          }}
                        >
                          {salads.find(({ date }) => date === dayDate) ? '🥗' : ''}
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </StyledTable>
      </Box>
    </Sheet>
  ) : null;
}
