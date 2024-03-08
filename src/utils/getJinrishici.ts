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
        resolve(result);
      },
      (errData: PoetryOfTodayError) => {
        reject(errData);
      },
    );
  });
};
