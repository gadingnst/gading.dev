import createContentLocales from '@/packages/libs/I18n/locales';

const withHomeLocales = createContentLocales({
  title: {
    en: 'Home',
    id: 'Beranda'
  },
  description: {
    en: 'Gading is a software engineer specialized in frontend development with passion for modern web technologies.',
    id: 'Gading adalah software engineer yang berspesialisasi dalam pengembangan frontend dengan passion untuk teknologi web modern.'
  },
  myBlog: {
    en: 'Read my blog',
    id: 'Baca blog saya'
  },
  myPortfolio: {
    en: 'See my portfolio',
    id: 'Lihat portfolio saya'
  },
  aboutMe: {
    en: 'Learn more about me',
    id: 'Cari tahu tentang saya'
  },
  thansksVisit: {
    en: 'Thanks for visiting me',
    id: 'Terima kasih sudah berkunjung'
  },
  recentPosts: {
    en: 'Recent posts',
    id: 'Tulisan terbaru'
  },
  seeMore: {
    en: 'See more posts',
    id: 'Lihat tulisan lainnya'
  }
});

export default withHomeLocales;
