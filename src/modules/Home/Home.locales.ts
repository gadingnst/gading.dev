import createContentLocales from '@/packages/libs/I18n/locales';

const withHomeLocales = createContentLocales({
  greeting: {
    en: 'hey, I\'m Gading 👋',
    id: 'hey, I\'m Gading 👋'
  },
  headlineStart: {
    en: 'I build systems, then write about ',
    id: 'I build systems, then write about '
  },
  headlineAccent: {
    en: 'what broke.',
    id: 'what broke.'
  },
  lead: {
    en: 'Software engineer from Palembang. I built [Nouride](https://nouride.com), founded [Nouverse](https://nouverse.com), and work at an AI company. I tinker with my homelab, and it breaks more often than not because I can\'t leave it alone.',
    id: 'Software engineer dari Palembang. Bikin [Nouride](https://nouride.com), bangun [Nouverse](https://nouverse.com), dan kerja di AI company. Suka ngoprek homelab, tapi lebih sering rusak gara-gara ngulik sendiri.'
  },
  seeWork: {
    en: 'See my work',
    id: 'Lihat karya saya'
  },
  readBlog: {
    en: 'Read the blog',
    id: 'Baca blog'
  },
  portraitAlt: {
    en: 'Illustrated portrait of Gading with a cat in a cap next to him',
    id: 'Ilustrasi Gading dengan seekor kucing bertopi di sampingnya'
  },
  statusNow: {
    en: 'Hardening Nouride v0.8',
    id: 'Hardening Nouride v0.8'
  },
  statusNowLabel: {
    en: 'now',
    id: 'sekarang'
  },
  statusPlace: {
    en: 'Palembang, WIB',
    id: 'Palembang, WIB'
  },
  doodle: {
    en: 'it\'s me, hi!',
    id: 'it\'s me, hi!'
  },
  buildingTitle: {
    en: 'Things I\'m building',
    id: 'Yang sedang saya bangun'
  },
  buildingDesc: {
    en: 'Products and side quests, in roughly that order.',
    id: 'Produk dan proyek sampingan, kurang lebih berurutan begitu.'
  },
  fullPortfolio: {
    en: 'Full portfolio →',
    id: 'Portfolio lengkap →'
  },
  writingTitle: {
    en: 'Latest writing',
    id: 'Tulisan terbaru'
  },
  writingHand: {
    en: 'fresh scars',
    id: 'fresh scars'
  },
  writingDesc: {
    en: 'Notes from things that worked, and more from things that didn\'t.',
    id: 'Catatan dari hal yang berhasil, dan lebih banyak dari yang tidak.'
  },
  allPosts: {
    en: 'All posts →',
    id: 'Semua tulisan →'
  }
});

export default withHomeLocales;
