import {utcYear, utcMonth, utcWeek, utcDay, utcHour, utcMinute, utcSecond, utcTicks, utcTickInterval} from '../../d3-time/src/index.js';
import {utcFormat} from '../../d3-time-format/src/index.js';
import {calendar} from './time.js';
import {initRange} from './init.js';

export default function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcWeek, utcDay, utcHour, utcMinute, utcSecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}
