import createContentLocales from '@/packages/libs/I18n/locales';

const withHomeLocales = createContentLocales({
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
