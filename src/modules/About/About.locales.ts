import createContentLocales from '@/packages/libs/I18n/locales';

const aboutLocales = createContentLocales({
  pageTitle: {
    en: 'About',
    id: 'Tentang'
  },
  metaDescription: {
    en: 'Learn more about Gading - Software Engineer specialized in Frontend development with passion for modern web technologies.',
    id: 'Pelajari lebih lanjut tentang Gading - Software Engineer yang berspesialisasi dalam pengembangan Frontend dengan passion untuk teknologi web modern.'
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