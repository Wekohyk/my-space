<template>
  <div
    class="flex justify-center items-center text-#fff bg-#000/40 w-300 h-150 rounded-15"
  >
    <div class="flex items-center justify-center gap-20 flex-col">
      <div class="flex justify-center gap-10">
        <div>{{ nowTimeYear }}</div>
        <div>{{ nowTimeWeek }}</div>
      </div>
      <div class="text-2rem font-500 tracking-5 font-Krungthep">
        {{ nowTimeHour }}
      </div>
      <div class="flex justify-center gap-10">
        <div>
          {{ weatherData.lives[0].province + weatherData.lives[0].city }}
        </div>
        <div>{{ weatherData.lives[0].weather }}</div>
        <div>{{ weatherData.lives[0].temperature + '℃' }}</div>
        <div>{{ weatherData.lives[0].winddirection + $t('wind') }}</div>
        <div>{{ weatherData.lives[0].windpower + ' ' + $t('level') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAdcode, getWeather } from '../api/weather';
import { City, Weather } from '../types/weather';
import { $t } from '../lang/index';

// 高德地图 Key
const mainKey = import.meta.env.VITE_WEATHER_KEY;

// get now time
const nowTimeYear = ref<string>('');
const nowTimeHour = ref<string>('');
const nowTimeWeek = ref<string>('');
const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const week = [
    $t('week0'),
    $t('week1'),
    $t('week2'),
    $t('week3'),
    $t('week4'),
    $t('week5'),
    $t('week6'),
  ][date.getDay()];
  nowTimeYear.value = `${year} ${$t('year')} ${month} ${$t('month')} ${day} ${$t('day')}`;
  nowTimeHour.value = `${hour}:${minute}:${second}`;
  nowTimeWeek.value = `${week}`;
};

// city data
const cityData = ref<City>({
  adcode: '',
  city: '',
  info: '',
  infoCode: '',
  province: '',
  rectangle: '',
  status: '',
});
// weather data
const weatherData = ref<Weather>({
  count: '',
  info: '',
  infoCode: '',
  lives: [
    {
      adcode: '',
      city: '',
      humidity: '',
      humidity_float: '',
      province: '',
      reporttime: '',
      temperature: '',
      temperature_float: '',
      weather: '',
      winddirection: '',
      windpower: '',
    },
  ],
});

// get weather data
const getWeatherData = async () => {
  try {
    // get Adcode
    const adCode = await getAdcode(mainKey);
    if (adCode.infocode !== '10000') {
      throw '地区查询失败';
    }
    cityData.value.adcode = adCode.adcode;
    // get weather data
    const result = await getWeather(mainKey, cityData.value.adcode);
    weatherData.value = result;
    console.log('weatherData.value', weatherData.value);
  } catch (error) {
    console.error('天气信息获取失败:' + error);
  }
};

onMounted(() => {
  getWeatherData();
  getTime();
});
</script>

<style lang="scss" scoped></style>
