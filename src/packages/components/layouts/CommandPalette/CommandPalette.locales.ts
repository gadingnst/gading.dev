import createContentLocales from '@/packages/libs/I18n/locales';

const withCommandPaletteLocales = createContentLocales({
  title: {
    en: 'Command palette',
    id: 'Command palette'
  },
  placeholder: {
    en: 'Search posts or jump to a page...',
    id: 'Cari tulisan atau buka halaman...'
  },
  pages: {
    en: 'Pages',
    id: 'Halaman'
  },
  actions: {
    en: 'Actions',
    id: 'Aksi'
  },
  posts: {
    en: 'Posts',
    id: 'Tulisan'
  },
  toggleTheme: {
    en: 'Switch to dark theme',
    id: 'Ganti ke tema gelap'
  },
  toggleThemeLight: {
    en: 'Switch to light theme',
    id: 'Ganti ke tema terang'
  },
  switchLanguage: {
    en: 'Baca dalam Bahasa Indonesia',
    id: 'Read in English'
  },
  loading: {
    en: 'Loading posts...',
    id: 'Memuat tulisan...'
  },
  empty: {
    en: 'Nothing matches that. Try another word.',
    id: 'Tidak ada yang cocok. Coba kata lain.'
  },
  hintNavigate: {
    en: 'to move',
    id: 'pindah'
  },
  hintSelect: {
    en: 'to open',
    id: 'buka'
  },
  hintClose: {
    en: 'to close',
    id: 'tutup'
  }
});

export default withCommandPaletteLocales;
