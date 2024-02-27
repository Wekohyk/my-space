// localStorage.getItem('lang');
import { createI18n } from 'vue-i18n';
import zh from './zh';
import en from './en';

// judge if it is English
export const isEn = navigator.language.includes('en') === true;

// restraint all lang object to typeof zh
const i18n = createI18n<[typeof zh], 'zh' | 'en'>({
  locale: isEn ? 'en' : 'zh',
  messages: {
    zh,
    en,
  },
});

export default i18n;
