import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import pinia from './stores';
import persist from 'pinia-plugin-persistedstate';
import i18n from './lang';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/iconfont/iconfont.css';
/**
 * Import the Unocss core styles
 * Best placed after reset style, before uno.css
 */
import './assets/styles/index.scss';
// Import the Unocss utilities styles
import 'uno.css';

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(createPinia().use(persist));
app.use(router);
app.use(ElementPlus);
app.mount('#app');
