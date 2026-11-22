import createContentLocales from '@/packages/libs/I18n/locales';

const aboutLocales = createContentLocales({
  pageTitle: {
    en: 'About',
    id: 'Tentang'
  },
  metaDescription: {
    en: 'Learn more about Syahrul Arifuddin.',
    id: 'Kenali lebih jauh Syahrul Arifuddin.'
  },
  backToHome: {
    en: 'Back to Home',
    id: 'Kembali ke Beranda'
  },
  contactMe: {
    en: 'Contact Me',
    id: 'Hubungi Saya'
  },
  downloadCV: {
    en: 'Download CV',
    id: 'Unduh CV'
  }
});

export default aboutLocales;
