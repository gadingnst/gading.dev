export enum I18n {
  en = 'en',
  id = 'id',
}

export type I18nLocales = keyof typeof I18n;

export interface Portfolio {
  name: string;
  category: string;
  description: string;
  github: string;
  website: string;
  image: string;
  stacks: string[];
}
