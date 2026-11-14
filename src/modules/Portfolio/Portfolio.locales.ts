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
    en: 'Professional work',
    id: 'Proyek profesional'
  },
  workDesc: {
    en: 'Products I built for the companies I\'ve worked with.',
    id: 'Produk yang saya bangun untuk perusahaan tempat saya bekerja.'
  }
});

export default withPortfolioLocales;
