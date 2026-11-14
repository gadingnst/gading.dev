import createContentLocales from '@/packages/libs/I18n/locales';

const withBlogContentLocales = createContentLocales({
  toc: {
    en: 'On this page',
    id: 'Di halaman ini'
  },
  series: {
    en: 'Series',
    id: 'Seri'
  },
  part: {
    en: 'Part',
    id: 'Bagian'
  },
  previous: {
    en: 'Previous',
    id: 'Sebelumnya'
  },
  next: {
    en: 'Next',
    id: 'Selanjutnya'
  }
});

export default withBlogContentLocales;
