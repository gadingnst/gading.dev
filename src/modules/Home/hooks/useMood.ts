import useStore from 'swr-global-state';

import { I18nLocales } from '@/packages/libs/I18n/interface';

export interface Mood {
  label: Record<I18nLocales, string>;
  emoji: string;
}

/** clicking the portrait walks through these, `cat mood.txt` prints the current one */
export const MOODS: Mood[] = [
  { label: { en: 'tinkering', id: 'ngulik' }, emoji: '☕' },
  { label: { en: 'debugging', id: 'debugging' }, emoji: '🔥' },
  { label: { en: 'sleeping', id: 'tidur' }, emoji: '💤' }
];

/**
 * Current mood of the hero, shared by the portrait badge and the terminal.
 * Lives for the page visit only.
 */
function useMood() {
  const [index, setIndex] = useStore<number>({ key: 'home-hero-mood', initial: 0 });
  const mood = MOODS[index % MOODS.length];
  const nextMood = () => setIndex((index + 1) % MOODS.length);
  return { mood, nextMood };
}

export default useMood;
