export default interface Forecast {
  id: number;
  main: string;
  description: string;
  icon: string;
  humidity: number;
  temp: number;
  tempMax: number;
  tempMin: number;
}
