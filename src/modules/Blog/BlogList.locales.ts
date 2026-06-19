import createContentLocales from '@/packages/libs/I18n/locales';

const withBlogListLocales = createContentLocales({
  desc: {
    en: 'Coding, work, life, and whatever i want.',
    id: 'Kode, pekerjaan, kehidupan, dan apapun yang ku mau.'
  },
  searchPlaceholder: {
    en: 'Search articles by title or description...',
    id: 'Cari artikel berdasarkan judul atau deskripsi...'
  },
  allTags: {
    en: 'All Tags',
    id: 'Semua Tag'
  },
  emptyState: {
    en: 'No articles found. Try another keyword or tag.',
    id: 'Artikel tidak ditemukan. Coba gunakan kata kunci atau tag lain.'
  },
  clearSearch: {
    en: 'Clear Search',
    id: 'Reset Pencarian'
  }
});

export default withBlogListLocales;
