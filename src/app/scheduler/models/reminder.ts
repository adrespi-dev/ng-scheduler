import { ReminderDTO } from "../services/reminders.service";
import { WeatherForecastService } from "../services/weather-forecast.service";
import Forecast from "./forecast";

export default class Reminder {
  id: number;
  date: Date;

  isLoadingForecast: boolean;
  forecast: Forecast;

  constructor(
    public title: string,
    public dateTime: moment.Moment,
    public city: string,
    public color: string
  ) {
    const hash = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
    this.id = new Date().getTime() + hash;
    this.date = dateTime.toDate();
    this.loadWeatherData();
  }

  updateData(
    title: string,
    dateTime: moment.Moment,
    city: string,
    color: string
  ) {
    this.title = title;
    this.dateTime = dateTime;
    this.date = dateTime.toDate();
    this.city = city;
    this.color = color;
    this.loadWeatherData();
  }

  loadWeatherData() {
    this.isLoadingForecast = true;
    WeatherForecastService.instance
      .getForecastByCityName(this.city)
      .subscribe((result) => {
        this.isLoadingForecast = false;
        this.forecast = result;
      });
  }
}
