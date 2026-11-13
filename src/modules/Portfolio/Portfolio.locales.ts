import createContentLocales from '@/packages/libs/I18n/locales';

const withPortfolioLocales = createContentLocales({
  title: {
    en: 'Portfolio',
    id: 'Portfolio'
  },
  desc: {
    en: 'Products I build and run, and the homelab they sit on.',
    id: 'Produk yang saya bangun dan jalankan, beserta homelab tempat semuanya berjalan.'
  }
});

export default withPortfolioLocales;
