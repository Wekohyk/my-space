import { isEn } from '../lang';

const local = isEn
  ? {
      week0: 'Sunday',
      week1: 'Monday',
      week2: 'Tuesday',
      week3: 'Wednesday',
      week4: 'Thursday',
      week5: 'Friday',
      week6: 'Saturday',
    }
  : {
      week0: '星期日',
      week1: '星期一',
      week2: '星期二',
      week3: '星期三',
      week4: '星期四',
      week5: '星期五',
      week6: '星期六',
    };

/**
 * Get Show Time
 * format ---> yyyy-MM-dd hh:mm:ss 星期X
 */
const nowWeek = [
  local.week0,
  local.week1,
  local.week2,
  local.week3,
  local.week4,
  local.week5,
  local.week6,
];
export const showTime = () => {
  const nowTime = new Date();
  const year = nowTime.getFullYear();
  const month = nowTime.getMonth() + 1;
  const date = nowTime.getDate();

  const hour = nowTime.getHours().toString().padStart(2, '0');
  const minute = nowTime.getMinutes().toString().padStart(2, '0');
  const second = nowTime.getSeconds().toString().padStart(2, '0');

  const week = nowTime.getDay();
  return `${year}-${month}-${date} ${hour}:${minute}:${second} ${nowWeek[week]}`;
};
