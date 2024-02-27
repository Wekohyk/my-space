import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import pinia from './stores';
import persist from 'pinia-plugin-persistedstate';
import i18n from './lang';

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(createPinia().use(persist));
app.use(router);
app.mount('#app');
