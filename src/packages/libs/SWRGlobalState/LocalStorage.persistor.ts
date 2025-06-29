import type { StatePersistor, StateKey } from 'swr-global-state';

const LocalStoragePersistor: StatePersistor = {
  onSet<T>(key: StateKey, data: T) {
    const stringifyData = JSON.stringify(data);
    window.localStorage.setItem(String(key), stringifyData);
  },
  onGet(key: StateKey) {
    const cachedData = window.localStorage.getItem(String(key)) ?? 'null';
    try {
      return JSON.parse(cachedData);
    } catch {
      return cachedData;
    }
  }
};

export default LocalStoragePersistor;
