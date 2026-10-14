/**
 * Weather API backed by the separately deployed QWeather proxy service.
 */
export interface CurrentWeather {
  location: {
    latitude: number;
    longitude: number;
  };
  condition: {
    text: string;
  };
  temperature: {
    value: number;
    unit: string;
  };
  wind: {
    direction: {
      compass: string;
    };
    speed: {
      value: number;
      unit: string;
    };
    scale: number;
  };
}

export const getWeather = async (latitude: number, longitude: number): Promise<CurrentWeather> => {
  const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude) });
  const endpoint = import.meta.env.DEV
    ? '/api/weather'
    : 'https://weather-origin.wekohyk.cn/api/weather';
  const response = await fetch(`${endpoint}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`天气请求失败（${response.status}）`);
  }

  return (await response.json()) as CurrentWeather;
};
