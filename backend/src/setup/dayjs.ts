import dayjs from 'dayjs';
import 'dayjs/locale/de';
import localizedFormat from 'dayjs/plugin/localizedFormat';
// import weekday from 'dayjs/plugin/weekday';
// import weekOfYear from 'dayjs/plugin/weekOfYear';
// import minMax from 'dayjs/plugin/minMax';

dayjs.locale('de');
dayjs.extend(localizedFormat);

// dayjs.extend(weekday);
// dayjs.extend(weekOfYear);
// dayjs.extend(minMax);
