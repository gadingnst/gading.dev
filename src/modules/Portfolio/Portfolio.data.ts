import { I18nLocales } from '@/packages/libs/I18n/interface';

/** A string per supported language */
export type Localized = Record<I18nLocales, string>;

/** Colour pair of a project, taken from the theme tokens */
export type ProjectTone = 'brand' | 'teal' | 'rose' | 'lilac';

export interface ProjectLink {
  /** text of the link, e.g. `example.com` */
  label: Localized;
  /**
   * `external` opens in a new tab as is. `internal` is a path without language
   * prefix (the current language is added), so it can differ per language.
   */
  target: { type: 'external'; href: string } | { type: 'internal'; path: Localized };
}

export interface ProjectChat {
  user: Localized;
  agentName: string;
  agent: Localized;
  time: string;
}

export interface Project {
  id: string;
  tone: ProjectTone;
  /** small mono label above the title */
  tag: string;
  title: Localized;
  /** `**word**` is rendered bold */
  summary: Localized;
  chips?: string[];
  /** left out for work that has no public page: the card says `internal` */
  link?: ProjectLink;
  /** where the work was based, shown top right of the card (professional work) */
  location?: Localized;
  /** shown in "Things I'm building" on Home, in this order, the first one as the big card */
  home?: boolean;
  /** chat mock shown on the big Home card, played in a loop one scenario at a time */
  chat?: ProjectChat[];
}

/**
 * Everything the Portfolio page and the Home "Things I'm building" section
 * show. Add an entry here to add a card; there is no other file to touch.
 * Client work goes here too once it can be named.
 */
export const PROJECTS: Project[] = [
  // TODO: add your own projects; the first `home: true` entry is the big Home card.
  {
    id: 'halosyahrul',
    tone: 'brand',
    tag: 'halosyahrul.com',
    title: {
      en: 'This website.',
      id: 'Website ini.'
    },
    summary: {
      en: 'My personal site and blog, built with **Next.js** and deployed with Docker and GitHub Actions to my own VPS.',
      id: 'Situs pribadi dan blog saya, dibangun dengan **Next.js** dan di-deploy dengan Docker dan GitHub Actions ke VPS sendiri.'
    },
    chips: ['Next.js', 'Docker', 'GitHub Actions'],
    link: {
      label: { en: 'github.com/syahrularifuddin/halosyahrul.com ↗', id: 'github.com/syahrularifuddin/halosyahrul.com ↗' },
      target: { type: 'external', href: 'https://github.com/syahrularifuddin/halosyahrul.com' }
    },
    home: true
  }
];

/**
 * Professional work: products only, no company grouping.
 * TODO: add work you can name; while empty, the section is hidden.
 */
export const WORK: Project[] = [];
