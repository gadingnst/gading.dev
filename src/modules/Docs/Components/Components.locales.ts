import createContentLocales from '@/packages/libs/I18n/locales';

const withComponentsLocales = createContentLocales({
  title: {
    en: 'Components',
    id: 'Components'
  },
  description: {
    en: 'The real components, imported and rendered here, not screenshots and not copied markup. If one of them changes, this page changes with it.',
    id: 'Component asli, di-import dan di-render di sini, bukan screenshot dan bukan markup hasil copy. Kalau salah satunya berubah, page ini ikut berubah.'
  },
  sourceLabel: {
    en: 'source',
    id: 'source'
  },
  cardTitle: {
    en: 'Card',
    id: 'Card'
  },
  cardDesc: {
    en: 'PostCard is the post card on Home: soft shadow, 20px radius, a lilac tag pill and the lift hover. Card is the base wrapper (theme-card) other pages build on. Below is the newest post.',
    id: 'PostCard itu card post di Home: soft shadow, radius 20px, pill tag lilac dan hover lift. Card itu wrapper dasar (theme-card) yang dipakai page lain. Di bawah ini post terbaru.'
  },
  baseCardBody: {
    en: 'A plain Card with hoverEffect: the theme-card surface and the lift utility, nothing else.',
    id: 'Card polos dengan hoverEffect: surface theme-card dan utility lift, udah itu aja.'
  },
  buttonsTitle: {
    en: 'Pill buttons',
    id: 'Pill button'
  },
  buttonsDesc: {
    en: 'Button for actions, ButtonLink for navigation (it renders a link, so it works without JavaScript). Both are daisyUI btn underneath; rounded-full makes them the pills the hero uses.',
    id: 'Button buat action, ButtonLink buat navigasi (dia render link, jadi tetap jalan tanpa JavaScript). Dua-duanya daisyUI btn di bawahnya; rounded-full bikin jadi pill kayak di hero.'
  },
  buttonPrimary: {
    en: 'Read the blog',
    id: 'Baca blog'
  },
  buttonGhost: {
    en: 'Ghost',
    id: 'Ghost'
  },
  buttonLoading: {
    en: 'Saving',
    id: 'Menyimpan'
  },
  bannerTitle: {
    en: 'Full-bleed banner',
    id: 'Banner full-bleed'
  },
  bannerDesc: {
    en: 'Banner sits under the sticky, transparent header: it pulls itself up by --header-h with a negative margin, then pads its content back down by the same amount. A default banner gets the grid overlay and no parallax; a real image gets parallax and a dark scrim. The frame below gives it a fake header height so the trick is visible.',
    id: 'Banner ada di bawah header yang sticky dan transparan: dia narik dirinya ke atas sebesar --header-h pakai negative margin, terus kasih padding ke konten dengan ukuran yang sama. Banner default dapat overlay grid dan tanpa parallax; gambar asli dapat parallax dan scrim gelap. Frame di bawah kasih tinggi header palsu biar trik-nya kelihatan.'
  },
  bannerHeader: {
    en: 'transparent header area (--header-h)',
    id: 'area header transparan (--header-h)'
  },
  bannerContent: {
    en: 'Content starts below the header',
    id: 'Konten mulai di bawah header'
  },
  imageTitle: {
    en: 'Zoomable content image',
    id: 'Gambar konten yang bisa di-zoom'
  },
  imageDesc: {
    en: 'ContentImage is what an image in a post becomes. Hover it for zoom, download and fullscreen; zoomed in, it pans by dragging.',
    id: 'ContentImage itu jadinya gambar di dalam post. Hover buat zoom, download dan fullscreen; kalau udah di-zoom, bisa digeser dengan drag.'
  },
  imageAlt: {
    en: 'Banner of the post about Adobe Acrobat and the Unix philosophy',
    id: 'Banner post tentang Adobe Acrobat dan filosofi Unix'
  },
  codeTitle: {
    en: 'Code block',
    id: 'Code block'
  },
  codeDesc: {
    en: 'ContentCodeBlock wraps every pre in a post and adds the copy button (hover to see it). In posts the code is highlighted by Prism at build time; here the same Prism tokens are rendered on the server, so the colours match.',
    id: 'ContentCodeBlock membungkus setiap pre di post dan nambahin tombol copy (hover buat lihat). Di post, code di-highlight Prism waktu build; di sini token Prism yang sama di-render di server, jadi warnanya sama.'
  },
  terminalTitle: {
    en: 'Hero terminal',
    id: 'Terminal di hero'
  },
  terminalDesc: {
    en: 'The $ whoami card from the Home hero, as a tiny shell. Try help, ls posts, open 1, or clear. It keeps its own scroll, so typing never moves the page.',
    id: 'Card $ whoami dari hero Home, sebagai shell kecil. Coba help, ls posts, open 1, atau clear. Scroll-nya sendiri, jadi ngetik gak bikin page geser.'
  },
  terminalNow: {
    en: 'Writing the docs for this site.',
    id: 'Lagi nulis docs buat site ini.'
  }
});

export default withComponentsLocales;
