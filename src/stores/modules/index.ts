import { defineStore } from 'pinia';

export const useUserStore = defineStore('cp-user', () => {}, {
  // next line is added by pinia-plugin-persistedstate to support data persistence
  persist: true,
});
