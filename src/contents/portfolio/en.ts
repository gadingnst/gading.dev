import { AUTHOR_GITHUB } from '@/utils/config';

const portfolio = [
  {
    name: 'Hadith API',
    category: 'Open Source Project',
    description: 'Simple Islamic Hadith REST API with Indonesia Translation.',
    github: `https://github.com/${AUTHOR_GITHUB}/hadith-api`,
    website: 'https://api.hadith.sutanlab.id',
    image: `https://raw.githubusercontent.com/${AUTHOR_GITHUB}/hadith-api/master/screenshots/example-result.png`,
    stacks: ['typescript', 'express', 'api']
  },
  {
    name: 'Qur\'an Machine (Instagram & Telegram Bot)',
    category: 'Open Source Project',
    description: 'Automatic shares qur\'an verses and translations on Instagram/Telegram.',
    github: `https://github.com/${AUTHOR_GITHUB}/quran.machine`,
    website: 'https://quran-machine.sutanlab.id',
    image: '/media/portfolio/quran-machine.jpeg',
    stacks: ['typescript', 'express', 'bot', 'puppeteer']
  },
  {
    name: 'Qur\'an API',
    category: 'Open Source Project',
    description: 'Simple Quran REST API with Indonesia Tafsir and media audio (murrotal) Syekh. Mishary Rashid Alafasy',
    github: `https://github.com/${AUTHOR_GITHUB}/quran-api`,
    website: 'https://api.quran.sutanlab.id',
    image: '/media/portfolio/quran-api.png',
    stacks: ['javascript', 'scraping', 'rest', 'express', 'api']
  },
  {
    name: 'COVID-19 Visualized',
    category: 'Open Source Project',
    description: 'Web that contains information about corona virus (COVID-19) victim updates with data visualization.',
    github: `https://github.com/${AUTHOR_GITHUB}/covid19-visualized`,
    website: 'https://covid19.sutanlab.id',
    image: '/media/portfolio/covid19-visualized.png',
    stacks: ['typescript', 'javascript', 'nextjs', 'reactjs', 'd3', 'topojson']
  },
  {
    name: 'Kampus API & Scraper',
    category: 'Open Source Project',
    description: 'GraphQL API for data of "Perguruan Tinggi" in Indonesia created using web scraping techniques with puppeteer from "Kementerian RISTEKDIKTI" website.',
    github: `https://github.com/${AUTHOR_GITHUB}/kampus-scraper`,
    website: null,
    image: '/media/portfolio/kampus-api.png',
    stacks: ['javascript', 'puppeteer', 'express', 'graphql', 'apollo']
  },
  {
    name: 'MeChat',
    category: 'Open Source Project',
    description: 'MeChat is Meet & Chat Mobile Application built with React Native integrated with Firebase, Google Map API and Netlify functions.',
    github: `https://github.com/${AUTHOR_GITHUB}/mechat`,
    website: 'https://sutanlab.js.org/redirect/mechat-apk',
    image: '/media/portfolio/mechat.jpg',
    stacks: ['javascript', 'react native', 'firebase', 'one signal']
  },
  {
    name: 'Point of Sales',
    category: 'Open Source Project',
    description: 'Point of sales is a cashier application that simplifies the checkout process. Also has a order history feature and income statistics.',
    github: `https://github.com/${AUTHOR_GITHUB}/point-of-sales-frontend`,
    website: 'https://sutanlab.js.org/redirect/pos-web',
    image: '/media/portfolio/pos-web.png',
    stacks: ['javascript', 'node', 'express', 'react', 'mysql']
  },
  {
    name: 'Expus',
    category: 'Final Term Project',
    description: 'Library Application for my final terms project based on barcode and qr code with PWA and push notification technology.',
    github: null,
    website: 'https://expus.herokuapp.com',
    image: '/media/portfolio/expus.png',
    stacks: ['javascript', 'node', 'express', 'mongo', 'vue', 'nuxt']
  },
  {
    name: 'Simple Web Storage',
    category: 'Open Source Project',
    description: 'Lightweight utilities that can make easier to access application storage in client browser.',
    github: `https://github.com/${AUTHOR_GITHUB}/simple-webstorage`,
    website: 'https://sutanlab.js.org/simple-webstorage',
    image: '/media/portfolio/simple-webstorage.png',
    stacks: ['javascript', 'webpack']
  },
  {
    name: 'Simple Print',
    category: 'Open Source Project',
    description: 'Simple Javascript utility to print HTML element easier..',
    github: `https://github.com/${AUTHOR_GITHUB}/simple-print`,
    website: 'https://sutanlab.js.org/simple-print',
    image: '/media/portfolio/simple-print.png',
    stacks: ['javascript', 'webpack']
  },
  {
    name: 'Griya Kain Online Shop',
    category: 'Business Partner Project',
    description: 'Online Shop Griya Kain Mr. Kentang',
    github: null,
    website: null,
    image: '/media/portfolio/griya-kain.png',
    stacks: ['php', 'laravel', 'mysql']
  },
  {
    name: 'PPPK',
    category: 'Intern Project',
    description: 'Computer Repair Request Application for PT. PUSRI (Persero)',
    github: null,
    website: null,
    image: '/media/portfolio/pppk.png',
    stacks: ['php', 'pdo', 'mysql']
  },
  {
    name: 'Vuetask',
    category: 'Open Source Project',
    description: 'A Progressive Task Management Application with Offline First Technology.',
    github: `https://github.com/${AUTHOR_GITHUB}/vuetask`,
    website: 'https://vuetask.sutanlab.id',
    image: '/media/portfolio/vuetask.png',
    stacks: ['javascript', 'vue', 'pwa']
  },
  {
    name: 'IP Stalker',
    category: 'Open Source Project',
    description: 'Simple & Fast IP Address Stalker Application by using IP scraper in backend API with serverless service',
    github: `https://github.com/${AUTHOR_GITHUB}/ip-stalker`,
    website: 'https://ipstalker.sutanlab.id',
    image: '/media/portfolio/ip-stalker.png',
    stacks: ['javascript', 'node', 'express', 'vue', 'pwa']
  },
  {
    name: 'Chat Socket',
    category: 'Open Source Project',
    description: 'Real-time chat app with Gravatar API.',
    github: `https://github.com/${AUTHOR_GITHUB}/chat-socket`,
    website: 'https://sutanlab-chat-socket.herokuapp.com',
    image: '/media/portfolio/chat-socket.png',
    stacks: ['javascript', 'node', 'express', 'socketio', 'gravatar api']
  },
  {
    name: 'Jekyll Starter Blog',
    category: 'Open Source Project',
    description: 'Static generated site designed for developers that want to write blog posts that hosted in static hosting.',
    github: `https://github.com/${AUTHOR_GITHUB}/jekyll-starter-blog`,
    website: 'https://sutanlab.js.org/jekyll-starter-blog',
    image: '/media/portfolio/jekyll-starter-blog.png',
    stacks: ['jekyll', 'javascript']
  },
  {
    name: 'It Health',
    category: 'Competition Project',
    description: 'Web Design Competition 2018 (Team coffeeManiac).',
    github: 'https://github.com/ituslab/it-health',
    website: 'https://ituslab.github.io/it-health',
    image: '/media/portfolio/it-health.png',
    stacks: ['javascript', 'jquery', 'google map api']
  },
  {
    name: 'It Muslim',
    category: 'Team Project',
    description: 'Simple Al-Qur\'an Web App.',
    github: null,
    website: null,
    image: '/media/portfolio/it-muslim.png',
    stacks: ['javascript', 'node', 'redis', 'vue', 'pwa']
  },
  {
    name: 'MATUKU',
    category: 'Final Term Project',
    description: 'Task Management Application for Computer Engineering Department POLSRI.',
    github: null,
    website: null,
    image: '/media/portfolio/matuku.png',
    stacks: ['php', 'laravel', 'mysql', 'whatsapp api', 'twillio']
  },
  {
    name: 'Moba La-Tansa',
    category: 'Business Partner Project',
    description: 'Website for Moba La-Tansa foundation.',
    github: null,
    website: 'https://mobalatansa.or.id',
    image: '/media/portfolio/mobalatansa.png',
    stacks: ['php', 'codeigniter', 'mysql']
  },
  {
    name: 'E-Log Tracking System',
    category: 'Intern Project',
    description: 'E-Log Tracking System Project for PT. Tanjungenim Lestari.',
    github: null,
    website: null,
    image: '/media/portfolio/elog.png',
    stacks: ['php', 'mysql', 'sqlserver']
  },
  {
    name: 'HAR UPT',
    category: 'Intern Project',
    description: 'HAR UPT Project for PT. PLN (Persero).',
    github: null,
    website: null,
    image: '/media/portfolio/harupt.png',
    stacks: ['php', 'mysql']
  },
  {
    name: 'IFTANA',
    category: 'Intern Project',
    description: 'IFTANA Website.',
    github: null,
    website: null,
    image: '/media/portfolio/iftana.png',
    stacks: ['php', 'mysql']
  }
];

export default portfolio;
