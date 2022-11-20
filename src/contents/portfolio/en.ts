import type { Portfolio } from '@/types/contents';
import { AUTHOR_GITHUB } from '@/configs/env';

const portfolio: Portfolio[] = [
  {
    name: 'SWR Global State',
    category: 'Utility Project',
    description: 'Zero-setup & simple global state management for React Components based on SWR helpers.',
    github: `https://github.com/${AUTHOR_GITHUB}/swr-global-state`,
    link: 'https://www.npmjs.com/package/swr-global-state',
    image: '/media/portfolio/swr-global-state.png',
    stacks: ['typescript', 'react', 'npm'],
    isActive: true,
    year: 2022
  },
  {
    name: 'Concurrent Manager',
    category: 'Utility Project',
    description: 'A simple and fast way to manage concurrent promise tasks with Queue Data Structure.',
    github: `https://github.com/${AUTHOR_GITHUB}/concurrent-manager`,
    link: 'https://www.npmjs.com/package/concurrent-manager',
    image: '/media/portfolio/concurrent-manager.png',
    stacks: ['typescript', 'npm'],
    isActive: true,
    year: 2021
  },
  {
    name: 'Hadith API',
    category: 'Open Source Project',
    description: 'Simple Islamic Hadith REST API with Indonesia Translation.',
    github: `https://github.com/${AUTHOR_GITHUB}/hadith-api`,
    link: 'https://api.hadith.gading.dev',
    image: `https://raw.githubusercontent.com/${AUTHOR_GITHUB}/hadith-api/master/screenshots/example-result.png`,
    stacks: ['typescript', 'express', 'api'],
    isActive: true,
    year: 2020
  },
  {
    name: 'Qur\'an Machine',
    category: 'Open Source Project',
    description: 'Bot that can automate shares qur\'an verses and translations on Instagram/Telegram.',
    github: `https://github.com/${AUTHOR_GITHUB}/quran.machine`,
    link: 'https://instagram.com/quran.machine',
    image: '/media/portfolio/quran-machine.jpeg',
    stacks: ['typescript', 'express', 'puppeteer', 'web scraping'],
    isActive: false,
    year: 2020
  },
  {
    name: 'Qur\'an API',
    category: 'Open Source Project',
    description: 'Simple Quran REST API with Indonesia Tafsir and media audio (murrotal) Syekh. Mishary Rashid Alafasy',
    github: `https://github.com/${AUTHOR_GITHUB}/quran-api`,
    link: 'https://api.quran.gading.dev',
    image: '/media/portfolio/quran-api.png',
    stacks: ['javascript', 'express', 'api', 'web scraping'],
    isActive: true,
    year: 2020
  },
  {
    name: 'COVID-19 Visualized',
    category: 'Open Source Project',
    description: 'Web that contains information about corona virus (COVID-19) victim updates with data visualization.',
    github: `https://github.com/${AUTHOR_GITHUB}/covid19-visualized`,
    image: '/media/portfolio/covid19-visualized.png',
    stacks: ['typescript', 'react', 'd3', 'topojson'],
    isActive: false,
    year: 2020
  },
  {
    name: 'Kampus API & Scraper',
    category: 'Open Source Project',
    description: 'GraphQL API for data of "Perguruan Tinggi" in Indonesia created using web scraping techniques with puppeteer from "Kementerian RISTEKDIKTI" website.',
    github: `https://github.com/${AUTHOR_GITHUB}/kampus-scraper`,
    image: '/media/portfolio/kampus-api.png',
    stacks: ['javascript', 'express', 'graphql', 'puppeteer'],
    isActive: false,
    year: 2020
  },
  {
    name: 'MeChat',
    category: 'Open Source Project',
    description: 'MeChat is Meet & Chat Mobile Application built with React Native integrated with Firebase, Google Map API and Netlify functions.',
    github: `https://github.com/${AUTHOR_GITHUB}/mechat`,
    link: 'https://sutanlab.js.org/redirect/mechat-apk',
    image: '/media/portfolio/mechat.jpg',
    stacks: ['javascript', 'react native', 'firebase', 'one signal'],
    isActive: false,
    year: 2019
  },
  {
    name: 'Point of Sales',
    category: 'Open Source Project',
    description: 'Point of sales is a cashier application that simplifies the checkout process. Also has a order history feature and income statistics.',
    github: `https://github.com/${AUTHOR_GITHUB}/point-of-sales-frontend`,
    image: '/media/portfolio/pos-web.png',
    stacks: ['javascript', 'express', 'react', 'mysql'],
    isActive: false,
    year: 2019
  },
  {
    name: 'Expus',
    category: 'Final Term Project',
    description: 'Library Application for my final terms project based on barcode and qr code with PWA and push notification technology.',
    image: '/media/portfolio/expus.png',
    stacks: ['javascript', 'express', 'mongo', 'vue'],
    isActive: false,
    year: 2019
  },
  {
    name: 'Simple Web Storage',
    category: 'Utility Project',
    description: 'Lightweight utilities that can make easier to access application storage in client browser.',
    github: `https://github.com/${AUTHOR_GITHUB}/simple-webstorage`,
    link: 'https://sutanlab.js.org/simple-webstorage',
    image: '/media/portfolio/simple-webstorage.png',
    stacks: ['javascript', 'webpack'],
    isActive: true,
    year: 2019
  },
  {
    name: 'Simple Print',
    category: 'Utility Project',
    description: 'Simple Javascript utility to print HTML element easier..',
    github: `https://github.com/${AUTHOR_GITHUB}/simple-print`,
    link: 'https://sutanlab.js.org/simple-print',
    image: '/media/portfolio/simple-print.png',
    stacks: ['javascript', 'webpack'],
    isActive: true,
    year: 2019
  },
  {
    name: 'Griya Kain Online Shop',
    category: 'Freelance Project',
    description: 'Online Shop Griya Kain Mr. Kentang',
    image: '/media/portfolio/griya-kain.png',
    stacks: ['php', 'laravel', 'mysql'],
    isActive: false,
    year: 2019
  },
  {
    name: 'PPPK',
    category: 'Freelance Project',
    description: 'Computer Repair Request Application for PT. PUSRI (Persero)',
    image: '/media/portfolio/pppk.png',
    stacks: ['php', 'mysql'],
    isActive: false,
    year: 2018
  },
  {
    name: 'Vuetask',
    category: 'Open Source Project',
    description: 'A Progressive Task Management Application with Offline First Technology.',
    github: `https://github.com/${AUTHOR_GITHUB}/vuetask`,
    link: 'https://vuetask.gading.dev',
    image: '/media/portfolio/vuetask.png',
    stacks: ['javascript', 'vue', 'pwa'],
    isActive: true,
    year: 2018
  },
  {
    name: 'IP Stalker',
    category: 'Open Source Project',
    description: 'Simple & Fast IP Address Stalker Application by using IP scraper in backend API with serverless service',
    github: `https://github.com/${AUTHOR_GITHUB}/ip-stalker`,
    link: 'https://ipstalker.gading.dev',
    image: '/media/portfolio/ip-stalker.png',
    stacks: ['javascript', 'express', 'vue', 'pwa'],
    isActive: true,
    year: 2018
  },
  {
    name: 'Chat Socket',
    category: 'Open Source Project',
    description: 'Real-time chat app with Gravatar API.',
    github: `https://github.com/${AUTHOR_GITHUB}/chat-socket`,
    image: '/media/portfolio/chat-socket.png',
    stacks: ['javascript', 'express', 'web socket'],
    isActive: false,
    year: 2018
  },
  {
    name: 'Jekyll Starter Blog',
    category: 'Open Source Project',
    description: 'Static generated site designed for developers that want to write blog posts that hosted in static hosting.',
    github: `https://github.com/${AUTHOR_GITHUB}/jekyll-starter-blog`,
    link: 'https://sutanlab.js.org/jekyll-starter-blog',
    image: '/media/portfolio/jekyll-starter-blog.png',
    stacks: ['javascript', 'ruby', 'jekyll'],
    isActive: true,
    year: 2018
  },
  {
    name: 'It Health',
    category: 'Competition Project',
    description: 'Web Design Competition 2018 (Team coffeeManiac).',
    github: 'https://github.com/ituslab/it-health',
    link: 'https://ituslab.github.io/it-health',
    image: '/media/portfolio/it-health.png',
    stacks: ['javascript', 'jquery', 'google map api'],
    isActive: false,
    year: 2018
  },
  {
    name: 'It Muslim',
    category: 'Team Project',
    description: 'Simple Al-Qur\'an Web App.',
    image: '/media/portfolio/it-muslim.png',
    stacks: ['javascript', 'redis', 'vue'],
    isActive: false,
    year: 2018
  },
  {
    name: 'MATUKU',
    category: 'Final Term Project',
    description: 'Task Management Application for Computer Engineering Department POLSRI.',
    image: '/media/portfolio/matuku.png',
    stacks: ['php', 'laravel', 'mysql', 'twillio'],
    isActive: false,
    year: 2019
  },
  {
    name: 'Moba La-Tansa',
    category: 'Freelance Project',
    description: 'Website for Moba La-Tansa foundation.',
    image: '/media/portfolio/mobalatansa.png',
    stacks: ['php', 'codeigniter', 'mysql'],
    isActive: false,
    year: 2018
  },
  {
    name: 'E-Log Tracking System',
    category: 'Intern Project',
    description: 'E-Log Tracking System Project for PT. Tanjungenim Lestari.',
    image: '/media/portfolio/elog.png',
    stacks: ['php', 'mysql', 'sqlserver'],
    isActive: false,
    year: 2018
  },
  {
    name: 'HAR UPT',
    category: 'Freelance Project',
    description: 'HAR UPT Project for PT. PLN (Persero).',
    image: '/media/portfolio/harupt.png',
    stacks: ['php', 'mysql'],
    isActive: false,
    year: 2018
  },
  {
    name: 'IFTANA',
    category: 'Freelance Project',
    description: 'IFTANA Website.',
    image: '/media/portfolio/iftana.png',
    stacks: ['php', 'mysql'],
    isActive: false,
    year: 2018
  }
];

export default portfolio.sort((a, b) => {
  if (a.isActive && b.isActive) return (a.year > b.year) ? -1 : 1;
  return (a.isActive && a.year >= b.year) ? -1 : 1;
});
