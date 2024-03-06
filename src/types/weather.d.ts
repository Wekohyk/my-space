export interface City {
  adcode: string;
  city: string;
  info: string;
  infoCode: string;
  province: string;
  rectangle: string;
  status: string;
}

export interface Lives {
  adcode: string;
  city: string;
  humidity: string;
  humidity_float: string;
  province: string;
  reporttime: string;
  temperature: string;
  temperature_float: string;
  weather: string;
  winddirection: string;
  windpower: string;
}

export interface Weather {
  count: string;
  info: string;
  infoCode: string;
  lives: Lives[];
}
