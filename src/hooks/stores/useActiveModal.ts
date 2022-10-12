import { createStore } from 'swr-global-state';

/**
 * hooks for active modal list in global app
 * @returns Active Modal state and setter
 */
const useActiveModals = createStore<string[]>({
  key: '@gading.dev/isActiveModal',
  initial: []
});

export default useActiveModals;
