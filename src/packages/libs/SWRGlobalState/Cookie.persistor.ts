'use client';

import { CookiesClient, type ICookiesOptions } from 'next-cookies-universal';
import { StateKey, StatePersistor } from 'swr-global-state';

const CookieStoragePersistor = (config?: ICookiesOptions): StatePersistor => {
  return {
    onSet<T>(key: StateKey, data: T) {
      CookiesClient().set(String(key), data, config);
    },
    onGet(key: StateKey) {
      return CookiesClient().get(String(key));
    }
  };
};

export default CookieStoragePersistor;
