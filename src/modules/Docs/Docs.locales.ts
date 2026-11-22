import createContentLocales from '@/packages/libs/I18n/locales';

/** labels shared by every docs page: the docs tab row and the page eyebrow */
const withDocsLocales = createContentLocales({
  eyebrow: {
    en: 'behind the Hideout',
    id: 'di balik Hideout'
  },
  navLabel: {
    en: 'Docs pages',
    id: 'Halaman docs'
  },
  overview: {
    en: 'Overview',
    id: 'Overview'
  },
  pipeline: {
    en: 'Content pipeline',
    id: 'Content pipeline'
  },
  colors: {
    en: 'Colors',
    id: 'Warna'
  },
  typography: {
    en: 'Typography',
    id: 'Typography'
  },
  components: {
    en: 'Components',
    id: 'Components'
  }
});

export default withDocsLocales;
