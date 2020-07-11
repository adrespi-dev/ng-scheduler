export default interface DayData {
  dateTime: Date;
  dateTimeMoment: moment.Moment;
  dayInCurrentMonth: boolean;
  isWeekend: boolean;
  isCurrentDay: boolean;
}
