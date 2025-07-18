import { SITE_NAME } from '@/configs/sites';
import createContentLocales from '@/packages/libs/I18n/locales';

const withColorsLocales = createContentLocales({
  title: {
    en: 'Color System',
    id: 'Sistem Warna'
  },
  description: {
    en: `A visual demonstration of color palette used in ${SITE_NAME}`,
    id: `Demonstrasi visual dari palet warna yang digunakan di ${SITE_NAME}`
  }
});

export default withColorsLocales;
