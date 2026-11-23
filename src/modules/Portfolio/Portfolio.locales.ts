import createContentLocales from '@/packages/libs/I18n/locales';

const withPortfolioLocales = createContentLocales({
  title: {
    en: 'Portfolio',
    id: 'Portfolio'
  },
  desc: {
    en: 'Products I build and run, and the homelab they sit on.',
    id: 'Produk yang saya bangun dan jalanin, plus homelab tempat semuanya jalan.'
  },
  buildingTitle: {
    en: 'Things I\'m building',
    id: 'Yang sedang saya bangun'
  },
  buildingDesc: {
    en: 'Products and side quests, in roughly that order.',
    id: 'Produk dan side quest, kurang lebih begitu.'
  },
  workTitle: {
    en: 'Work',
    id: 'Kerjaan'
  },
  workDesc: {
    en: 'Stuff I built for the companies I\'ve worked with.',
    id: 'Pekerjaan yang saya kerjain buat perusahaan tempat saya kerja.'
  },
  talksTitle: {
    en: 'Talks',
    id: 'Talks'
  },
  talksDesc: {
    en: 'Things I\'ve talked about at communities and classes.',
    id: 'Topik yang pernah saya bawain di komunitas dan kelas.'
  }
});

export default withPortfolioLocales;
