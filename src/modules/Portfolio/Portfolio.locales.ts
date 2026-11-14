import createContentLocales from '@/packages/libs/I18n/locales';

const withPortfolioLocales = createContentLocales({
  title: {
    en: 'Portfolio',
    id: 'Portfolio'
  },
  desc: {
    en: 'Products I build and run, and the homelab they sit on.',
    id: 'Produk yang saya bangun dan jalankan, beserta homelab tempat semuanya berjalan.'
  },
  buildingTitle: {
    en: 'Things I\'m building',
    id: 'Yang sedang saya bangun'
  },
  buildingDesc: {
    en: 'Products and side quests, in roughly that order.',
    id: 'Produk dan proyek sampingan, kurang lebih berurutan begitu.'
  },
  workTitle: {
    en: 'Built with teams',
    id: 'Dibangun bersama tim'
  },
  workDesc: {
    en: 'Products I worked on at other companies.',
    id: 'Produk yang saya kerjakan di perusahaan lain.'
  }
});

export default withPortfolioLocales;
