import { Sheet } from '@mui/joy';
import { linearGradientDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

import { LineChartPointTooltip } from '@/components/charts/LineChartPointTooltip';
import { BillingPeriod } from '@/modules/api';
import { euro } from '@/setup/euro';

type BillingPeriodsSaladPriceChartProps = { billingPeriods?: BillingPeriod[] };

export function BillingPeriodsSaladPriceChart({ billingPeriods }: BillingPeriodsSaladPriceChartProps) {
  const reversedBillingPeriods = [...(billingPeriods || [])].reverse();

  return (
    <Sheet sx={{ height: 400, padding: 4 }}>
      <ResponsiveLine
        data={[
          {
            id: 'Salatpreis',
            data: reversedBillingPeriods.map(({ billingDate, saladPrice }) => ({ x: billingDate, y: saladPrice })),
          },
        ]}
        margin={{ top: 8, right: 56, bottom: 80, left: 56 }}
        xScale={{ type: 'time', format: '%Y-%m-%d' }}
        defs={[
          linearGradientDef('gradient', [
            { offset: 15, color: '#ffba00' },
            { offset: 50, color: '#84bd00' },
            { offset: 85, color: '#28939c' },
          ]),
        ]}
        axisBottom={{
          tickValues: [...new Set(reversedBillingPeriods.map(({ billingDate }) => billingDate!))].map(
            (date) => new Date(date),
          ),
          format: (value) => dayjs(value).format('DD.MM.YYYY'),
          tickRotation: -45,
          legend: 'Abrechnungsdatum',
          legendOffset: 68,
          legendPosition: 'middle',
        }}
        axisLeft={{
          format: (value) => euro(value).format().split(' €')[0],
          legend: 'Salatpreis (€)',
          legendOffset: -48,
          legendPosition: 'middle',
        }}
        tooltip={LineChartPointTooltip}
        pointSize={12}
        theme={{
          axis: {
            ticks: {
              text: {
                fontFamily: 'Inter Variable',
              },
            },
            legend: {
              text: {
                fontFamily: 'Inter Variable',
                fontWeight: 'bold',
                fontSize: '1rem',
              },
            },
          },
        }}
        colors={['url(#gradient)']}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor="#cccccc"
        pointLabelYOffset={-4}
        useMesh
      />
    </Sheet>
  );
}
