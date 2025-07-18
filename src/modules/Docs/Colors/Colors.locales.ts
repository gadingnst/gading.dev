import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';

const locales = {
  en: {
    title: 'Color System',
    description: 'Here is the color system used in this website. Based on DaisyUI color system.'
  },
  id: {
    title: 'Sistem Warna',
    description: 'Berikut adalah sistem warna yang digunakan di website ini. Berdasarkan sistem warna DaisyUI.'
  }
};

const withColorsLocales = (lang: I18nLocales) => {
  return locales[lang];
};

export default withColorsLocales;