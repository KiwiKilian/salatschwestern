import { Sheet, Typography } from "@mui/joy";
import { LineSeries, PointTooltipProps } from "@nivo/line";
import dayjs from "dayjs";

import { euro } from "@/setup/euro";

type LineChartPointTooltipProps<T extends LineSeries> = PointTooltipProps<T>;

export function LineChartPointTooltip<T extends LineSeries>({
  point,
}: LineChartPointTooltipProps<T>) {
  return (
    <Sheet sx={{ padding: 1, marginBottom: 0 }}>
      <Typography level="title-lg">
        🗓️ {dayjs(point.data.x).format("DD.MM.YYYY")}
        <br />🤑 {euro(point.data.y as number).format()}
      </Typography>
    </Sheet>
  );
}
