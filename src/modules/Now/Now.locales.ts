import createContentLocales from '@/packages/libs/I18n/locales';

const nowLocales = createContentLocales({
  pageTitle: {
    en: 'Now',
    id: 'Sekarang'
  },
  metaDescription: {
    en: 'What I\'m doing right now - Current activities, projects, and interests of Gading.',
    id: 'Apa yang sedang saya lakukan sekarang - Aktivitas, proyek, dan minat Gading saat ini.'
  },
  backToHome: {
    en: 'Back to Home',
    id: 'Kembali ke Beranda'
  },
  contactMe: {
    en: 'Contact Me',
    id: 'Hubungi Saya'
  }
});

export default nowLocales;
