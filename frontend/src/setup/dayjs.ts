import dayjs from 'dayjs';
import 'dayjs/locale/de';
import minMax from 'dayjs/plugin/minMax';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';

dayjs.locale('de');
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(minMax);
