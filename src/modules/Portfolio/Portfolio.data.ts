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
  /** left out for work that has no public page: the card says `internal` */
  link?: ProjectLink;
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
      user: { en: 'check the homelab disk, please', id: 'cek disk homelab dong' },
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

/** Professional work: products only, no company grouping */
export const WORK: Project[] = [
  {
    id: 'agp',
    tone: 'teal',
    tag: 'agp',
    title: { en: 'AGP Group', id: 'AGP Group' },
    summary: {
      en: 'Internal tools and products for AGP Group, including a KYC compliance portal. I also work as their **AI consultant**, scoping and building AI into the tools their teams use.',
      id: 'Internal tools dan produk untuk AGP Group, termasuk portal KYC compliance. Saya juga jadi **AI consultant**, merancang dan membangun AI ke dalam tools yang dipakai tim mereka.'
    },
    chips: ['Next.js', 'Azure', 'AI'],
    link: {
      label: { en: 'agpgroup.com ↗', id: 'agpgroup.com ↗' },
      target: { type: 'external', href: 'https://agpgroup.com' }
    }
  },
  {
    id: 'codi',
    tone: 'rose',
    tag: 'codi',
    title: { en: 'Codi', id: 'Codi' },
    summary: {
      en: 'An AI assistant used by school students in the US. I built backend APIs, its memory and knowledge base, and guardrails that filter what goes in and out with **Model Armor**.',
      id: 'Asisten AI yang dipakai siswa sekolah di Amerika. Saya membangun backend API, memory dan knowledge base-nya, serta guardrails yang memfilter input dan output dengan **Model Armor**.'
    },
    chips: ['RAG', 'Model Armor', 'GCP'],
    link: {
      label: { en: 'coaifounder.com ↗', id: 'coaifounder.com ↗' },
      target: { type: 'external', href: 'https://coaifounder.com' }
    }
  },
  {
    id: 'simplexity',
    tone: 'lilac',
    tag: 'simplexity',
    title: { en: 'Simplexity Legal', id: 'Simplexity Legal' },
    summary: {
      en: 'AI document analysis for medical-legal cases. I added end-to-end tracing with **OpenTelemetry**, cut report generation from 35 to 9 minutes, and handled the SRE work.',
      id: 'Analisis dokumen medical-legal berbasis AI. Saya memasang tracing end-to-end dengan **OpenTelemetry**, memangkas waktu generate report dari 35 ke 9 menit, dan mengurus kerjaan SRE.'
    },
    chips: ['OpenTelemetry', 'GCP', 'SRE'],
    link: {
      label: { en: 'simplexitylegal.com ↗', id: 'simplexitylegal.com ↗' },
      target: { type: 'external', href: 'https://simplexitylegal.com' }
    }
  },
  {
    id: 'laindiemovie',
    tone: 'brand',
    tag: 'lazone',
    title: { en: 'La Indie Movie', id: 'La Indie Movie' },
    summary: {
      en: 'Ticketing for a film-making competition, built end to end: database, API, frontend, and **Midtrans** payments with idempotent webhooks, so a retried payment never books twice.',
      id: 'Ticketing untuk kompetisi film, dibangun end-to-end: database, API, frontend, dan pembayaran **Midtrans** dengan webhook idempotent, jadi pembayaran yang di-retry tidak tercatat dua kali.'
    },
    chips: ['Midtrans', 'PostgreSQL', 'API'],
    link: {
      label: { en: 'laindiemovie.lazone.id ↗', id: 'laindiemovie.lazone.id ↗' },
      target: { type: 'external', href: 'https://laindiemovie.lazone.id' }
    }
  },
  {
    id: 'heypico',
    tone: 'teal',
    tag: 'heypico',
    title: { en: 'HeyPico', id: 'HeyPico' },
    summary: {
      en: 'A personal AI assistant on web, Android and iOS. I built its **GraphRAG** memory on Neo4j, the MCP integrations and the Stripe and Midtrans payments, then shipped it through App Store review.',
      id: 'Asisten AI personal di web, Android, dan iOS. Saya membangun memory **GraphRAG** di Neo4j, integrasi MCP, dan pembayaran Stripe serta Midtrans, lalu merilisnya sampai lolos review App Store.'
    },
    chips: ['Neo4j', 'MCP', 'Stripe'],
    link: {
      label: { en: 'heypico.ai ↗', id: 'heypico.ai ↗' },
      target: { type: 'external', href: 'https://heypico.ai' }
    }
  },
  {
    id: 'avatara',
    tone: 'rose',
    tag: 'avatara',
    title: { en: 'Avatara Labs', id: 'Avatara Labs' },
    summary: {
      en: 'Generative AI products and Web3 wallets. I led frontend across four AI products, built a **RAG**-based researcher dashboard, and shipped custodial wallets with a Web3 provider SDK.',
      id: 'Produk generative AI dan wallet Web3. Saya memimpin frontend di empat produk AI, membangun dashboard researcher berbasis **RAG**, dan merilis wallet custodial beserta Web3 provider SDK.'
    },
    chips: ['React', 'Next.js', 'Web3'],
    link: {
      label: { en: 'avataralabs.ai ↗', id: 'avataralabs.ai ↗' },
      target: { type: 'external', href: 'https://avataralabs.ai' }
    }
  },
  {
    id: 'orami',
    tone: 'lilac',
    tag: 'orami',
    title: { en: 'Orami', id: 'Orami' },
    summary: {
      en: 'E-commerce for Indonesian families, part of SIRCLO. I built a shared component library in **Storybook**, drove the TypeScript migration, and shipped group buying and the seller dashboard.',
      id: 'E-commerce untuk keluarga Indonesia, bagian dari SIRCLO. Saya membangun component library bersama di **Storybook**, memimpin migrasi ke TypeScript, dan merilis group buying serta seller dashboard.'
    },
    chips: ['React', 'TypeScript', 'Storybook'],
    link: {
      label: { en: 'orami.co.id ↗', id: 'orami.co.id ↗' },
      target: { type: 'external', href: 'https://orami.co.id' }
    }
  }
];
