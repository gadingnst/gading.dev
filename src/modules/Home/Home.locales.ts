import createContentLocales from '@/packages/libs/I18n/locales';

const withHomeLocales = createContentLocales({
  greeting: {
    en: 'hey, I\'m Gading 👋',
    id: 'halo, saya Gading 👋'
  },
  headlineStart: {
    en: 'I build systems, then write about ',
    id: 'Saya membangun sistem, lalu menulis soal '
  },
  headlineAccent: {
    en: 'what broke.',
    id: 'apa yang rusak.'
  },
  lead: {
    en: 'Software engineer from Palembang. I make **Nouride**, run **Nouverse**, and keep a homelab around mostly so I have something to break.',
    id: 'Software engineer dari Palembang. Saya membuat **Nouride**, menjalankan **Nouverse**, dan memelihara homelab, sebagian besar supaya ada yang bisa saya rusak.'
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
    id: 'Mengeraskan Nouride v0.8'
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
