import { I18nLocales } from '@/packages/libs/I18n/interface';

/** A string per supported language */
export type Localized = Record<I18nLocales, string>;

/** Colour pair of a project, taken from the theme tokens */
export type ProjectTone = 'brand' | 'teal' | 'rose' | 'lilac';

export interface ProjectLink {
  /** text of the link, e.g. `nouride.com` */
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
  link: ProjectLink;
  /** shown in "Things I'm building" on Home, in this order, the first one as the big card */
  home?: boolean;
  /** chat mock shown on the big Home card */
  chat?: ProjectChat;
}

/**
 * Everything the Portfolio page and the Home "Things I'm building" section
 * show. Add an entry here to add a card; there is no other file to touch.
 * Client work goes here too once it can be named.
 */
export const PROJECTS: Project[] = [
  {
    id: 'nouride',
    tone: 'brand',
    tag: 'nouride',
    title: {
      en: 'AI agents that live on your box.',
      id: 'Agen AI yang tinggal di server sendiri.'
    },
    summary: {
      en: 'A multi-agent daemon I build and run every day. Agents with their own memory, skills and tools, reachable over **Telegram, WhatsApp and Discord**. They ask before changing anything.',
      id: 'Daemon multi-agent yang saya bangun dan pakai setiap hari. Agen dengan memori, skill, dan tool sendiri, bisa dihubungi lewat **Telegram, WhatsApp, dan Discord**. Mereka bertanya dulu sebelum mengubah apa pun.'
    },
    chips: ['self-hosted', 'multi-agent', 'Telegram · WhatsApp · Discord'],
    link: {
      label: { en: 'nouride.com ↗', id: 'nouride.com ↗' },
      target: { type: 'external', href: 'https://nouride.com' }
    },
    home: true,
    chat: {
      user: { en: 'cek disk homelab dong', id: 'cek disk homelab dong' },
      agentName: 'nouva',
      agent: {
        en: 'LXC 105 at 81%, mostly old PDF jobs. Clean them up?',
        id: 'LXC 105 di 81%, kebanyakan sisa job PDF lama. Dibersihkan?'
      },
      time: '00:12'
    }
  },
  {
    id: 'nouclip',
    tone: 'rose',
    tag: 'nouclip',
    title: {
      en: 'Video to shorts, from the terminal.',
      id: 'Video jadi shorts, dari terminal.'
    },
    summary: {
      en: 'A CLI that cuts videos into vertical clips: reframing, word-by-word subtitles, silence trimming and music ducking. **FFmpeg** does the cutting and **Whisper** the transcripts; nouclip wires them together so an agent can drive it.',
      id: 'CLI untuk memotong video jadi klip vertikal: reframe, subtitle per kata, potong jeda diam, dan ducking musik. **FFmpeg** yang memotong dan **Whisper** yang mentranskripsi; nouclip merangkai keduanya supaya bisa dijalankan oleh agen.'
    },
    chips: ['CLI', 'FFmpeg', 'Whisper', 'Bun'],
    link: {
      label: { en: 'github.com/nouverse/nouclip ↗', id: 'github.com/nouverse/nouclip ↗' },
      target: { type: 'external', href: 'https://github.com/nouverse/nouclip' }
    },
    home: true
  },
  {
    id: 'swr-global-state',
    tone: 'teal',
    tag: 'swr-global-state',
    title: {
      en: 'Global state that feels like useState.',
      id: 'Global state yang terasa seperti useState.'
    },
    summary: {
      en: 'A small React library for sharing state between components with a hook that reads like useState, built on **SWR**. Open source and on npm.',
      id: 'Library React kecil untuk berbagi state antar komponen lewat hook yang dipakai seperti useState, dibangun di atas **SWR**. Open source dan ada di npm.'
    },
    chips: ['React', 'SWR', 'npm'],
    link: {
      label: { en: 'github.com/gadingnst/swr-global-state ↗', id: 'github.com/gadingnst/swr-global-state ↗' },
      target: { type: 'external', href: 'https://github.com/gadingnst/swr-global-state' }
    },
    home: true
  },
  {
    id: 'nouverse',
    tone: 'teal',
    tag: 'nouverse',
    title: {
      en: 'Nouverse Technologies',
      id: 'Nouverse Technologies'
    },
    summary: {
      en: 'My engineering company in Palembang. Hosted Nouride agents and automation workflows, plus consulting and custom software.',
      id: 'Perusahaan engineering saya di Palembang. Agen Nouride hosted dan workflow otomasi, plus konsultasi dan software custom.'
    },
    link: {
      label: { en: 'nouverse.com ↗', id: 'nouverse.com ↗' },
      target: { type: 'external', href: 'https://nouverse.com' }
    }
  },
  {
    id: 'homelab',
    tone: 'lilac',
    tag: 'homelab',
    title: {
      en: 'Homelab',
      id: 'Homelab'
    },
    summary: {
      en: 'Proxmox with K3s for the stateless things and LXC for the stateful ones. Mostly here so I have something to break, and write about afterwards.',
      id: 'Proxmox dengan K3s untuk yang stateless dan LXC untuk yang stateful. Sebagian besar ada supaya saya punya sesuatu untuk dirusak, lalu ditulis setelahnya.'
    },
    chips: ['Proxmox', 'K3s', 'LXC'],
    link: {
      label: { en: 'How I built it →', id: 'Cara saya membangunnya →' },
      target: {
        type: 'internal',
        path: {
          en: '/blog/homelab-architecture-k8s-lxc-proxmox',
          id: '/blog/arsitektur-homelab-k8s-lxc-proxmox'
        }
      }
    }
  }
];
