import createContentLocales from '@/packages/libs/I18n/locales';

// TODO: placeholder copy; rewrite greeting, headline, lead and statusPlace in your own words.
const withHomeLocales = createContentLocales({
  greeting: {
    en: 'halo, I\'m Syahrul 👋',
    id: 'halo, saya Syahrul 👋'
  },
  headlineStart: {
    en: 'Building things, and writing down ',
    id: 'Membangun sesuatu, lalu mencatat '
  },
  headlineAccent: {
    en: 'what I learn.',
    id: 'yang saya pelajari.'
  },
  lead: {
    en: 'Welcome to my corner of the internet: the projects I work on, notes, and things I\'m learning along the way.',
    id: 'Selamat datang di sudut kecil saya di internet: proyek yang saya kerjakan, catatan, dan hal yang sedang saya pelajari.'
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
    en: 'Avatar with the initials SA',
    id: 'Avatar dengan inisial SA'
  },
  currentlyLabel: {
    en: 'Currently:',
    id: 'Sekarang:'
  },
  moodLabel: {
    en: 'mood · click me',
    id: 'mood · klik aku'
  },
  moodHint: {
    en: 'Change mood',
    id: 'Ganti mood'
  },
  statusPlace: {
    en: 'Indonesia, WIB',
    id: 'Indonesia, WIB'
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
  },
  workedWith: {
    en: 'Worked with',
    id: 'Pernah bekerja dengan'
  }
});

export default withHomeLocales;
