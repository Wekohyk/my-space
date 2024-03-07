import { defineStore } from 'pinia';
import { ref } from 'vue';

interface State {
  coverType: string; // Wallpaper type
  innerWidth: number; // Window width
  mobileOpenState: boolean; // The mobile terminal is enabled
  mobileFuncState: boolean; // The mobile function zone is enabled
  imgLoadStatus: boolean; //  BackgroundImg loading status
  backgroundShow: boolean; // BackgroundImg show status
}

export const homeStore = defineStore(
  'mySpace',
  () => {
    const coverType = '0';
    const innerWidth = ref(0);
    const mobileOpenState = ref(false);
    const mobileFuncState = ref(false);
    const imgLoadStatus = ref(false);
    const backgroundShow = ref(false);

    const getInnerWidth = (state: State) => state.innerWidth;

    const setInnerWidth = (value: number) => {
      innerWidth.value = value;
      if (value >= 720) {
        mobileOpenState.value = false;
        mobileFuncState.value = false;
      }
    };

    const setImgLoadStatus = (value: boolean) => {
      imgLoadStatus.value = value;
    };

    return {
      coverType,
      innerWidth,
      imgLoadStatus,
      mobileOpenState,
      mobileFuncState,
      backgroundShow,
      getInnerWidth,
      setInnerWidth,
      setImgLoadStatus,
    };
  },
  {
    persist: {
      key: 'data',
      storage: window.localStorage,
      paths: ['coverType'],
    },
  },
);
