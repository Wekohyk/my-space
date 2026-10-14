<template>
  <div class="flex justify-center items-center text-#fff bg-#000/40 w-300 h-150 rounded-15">
    <div class="flex items-center justify-center gap-12 flex-col">
      <div class="flex justify-center gap-10">
        <div>{{ nowTimeYear }}</div>
        <div>{{ nowTimeWeek }}</div>
      </div>
      <div class="text-2.5rem font-500 tracking-5 font-Krungthep">
        {{ nowTimeHour }}
      </div>
      <div class="flex justify-center gap-10">
        <div v-if="weatherData">{{ locationText }}</div>
        <div v-if="weatherData">{{ weatherData.condition.text }}</div>
        <div v-if="weatherData">{{ weatherData.temperature.value }}{{ weatherData.temperature.unit }}</div>
        <div v-if="weatherData">{{ windDirection }}{{ $t('wind') }}</div>
        <div v-if="weatherData">{{ weatherData.wind.scale }} {{ $t('level') }}</div>
        <div v-else-if="weatherError" class="text-sm">{{ weatherError }}</div>
      </div>
      <a
        class="text-xs text-white/80 underline"
        href="https://www.qweather.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ isEn ? 'Weather service by QWeather' : '天气服务由和风天气提供' }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, onUnmounted } from 'vue';
import { getWeather, type CurrentWeather } from '../api/weather';
import { $t, isEn } from '../lang/index';

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
  const week = [$t('week0'), $t('week1'), $t('week2'), $t('week3'), $t('week4'), $t('week5'), $t('week6')][
    date.getDay()
  ];
  nowTimeYear.value = `${year} ${$t('year')} ${month} ${$t('month')} ${day} ${$t('day')}`;
  nowTimeHour.value = `${hour}:${minute}:${second}`;
  nowTimeWeek.value = `${week}`;
};

const upTime = setInterval(() => {
  getTime();
}, 1000);

const weatherData = ref<CurrentWeather | null>(null);
const weatherError = ref('');
const locationText = computed(() => {
  if (!weatherData.value) return '';
  const { name, administrativeArea } = weatherData.value.location;
  if (administrativeArea && administrativeArea !== name) return `${administrativeArea} ${name}`;
  return name;
});
const windDirection = computed(() => {
  const compass = weatherData.value?.wind.direction.compass;
  if (!compass) return '';
  const directions: Record<string, string> = isEn
    ? {
        n: 'N', nne: 'NNE', ne: 'NE', ene: 'ENE', e: 'E', ese: 'ESE', se: 'SE', sse: 'SSE', s: 'S',
        ssw: 'SSW', sw: 'SW', wsw: 'WSW', w: 'W', wnw: 'WNW', nw: 'NW', nnw: 'NNW', none: 'Calm', vrb: 'Variable',
      }
    : {
        n: '北', nne: '北东北', ne: '东北', ene: '东东北', e: '东', ese: '东东南', se: '东南', sse: '南东南',
        s: '南', ssw: '南西南', sw: '西南', wsw: '西西南', w: '西', wnw: '西西北', nw: '西北', nnw: '北西北',
        none: '静风', vrb: '不定风向',
      };
  return directions[compass.toLowerCase()] || compass;
});

// get weather data
const getWeatherData = async () => {
  if (!navigator.geolocation) {
    await getBeijingWeather();
    return;
  }

  weatherError.value = '';
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        weatherData.value = await getWeather(coords.latitude, coords.longitude);
      } catch (error) {
        console.error('天气信息获取失败:', error);
        weatherError.value = '天气信息获取失败';
      }
    },
    async (error) => {
      console.error('定位获取失败:', error.message);
      await getBeijingWeather();
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
  );
};

const getBeijingWeather = async () => {
  weatherError.value = '';
  try {
    weatherData.value = await getWeather(39.92, 116.41);
  } catch (error) {
    console.error('北京天气信息获取失败:', error);
    weatherError.value = '天气信息获取失败';
  }
};

onMounted(() => {
  getWeatherData();
  getTime();
});

onUnmounted(() => {
  clearInterval(upTime);
});
</script>

<style lang="scss" scoped></style>
