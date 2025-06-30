'use client';

import Cookies, { type ICookiesOptions } from 'next-cookies-universal';
import { StateKey, StatePersistor } from 'swr-global-state';

const CookieStoragePersistor = (config?: ICookiesOptions): StatePersistor => {
  return {
    onSet<T>(key: StateKey, data: T) {
      Cookies('client').set(String(key), data, config);
    },
    onGet(key: StateKey) {
      return Cookies('client').get(String(key));
    }
  };
};

export default CookieStoragePersistor;
