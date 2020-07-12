import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, catchError } from "rxjs/operators";
import Forecast from "../models/forecast";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherForecastService {
  static instance: WeatherForecastService;

  constructor(private http: HttpClient) {
    WeatherForecastService.instance = this;
  }

  getForecastByCityName(cityName: string): Observable<Forecast> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${environment.openWeatherApiKey}`;

    return this.http.get(url).pipe(
      map((result: any) => {
        let weather = result.weather[0];
        const main = result.main;
        const forecast: Forecast = {
          id: weather.id,
          main: weather.main,
          description: weather.description,
          icon: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
          humidity: main.humidity,
          temp: main.temp,
          tempMax: main.tempMax,
          tempMin: main.tempMin,
        };
        return forecast;
      }),
      catchError((_) => of(null))
    );
  }
}
