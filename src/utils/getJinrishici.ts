import * as jinrishici from 'jinrishici';

// The Poetry Today API returns a data type definition
type PoetryOfToday = Response;
type PoetryOfTodayError = ErrData;

/**
 * @file getRandomAssets.d.ts
 * @description The Poetry Today API returns a data type definition
 * @see https://www.jinrishici.com
 */
export const getJinrishici = (): Promise<PoetryOfToday> => {
  return new Promise((resolve, reject) => {
    jinrishici.load(
      (result: PoetryOfToday) => {
        console.log('getJinrishici / 获取今日诗词', result);
        resolve(result);
      },
      (errData: PoetryOfTodayError) => {
        reject(errData);
      },
    );
  });
};
