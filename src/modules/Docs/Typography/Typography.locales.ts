import { SITE_NAME } from '@/configs/sites';
import createContentLocales from '@/packages/libs/I18n/locales';

const withTypographyLocales = createContentLocales({
  title: {
    en: 'Typography',
    id: 'Tipografi'
  },
  description: {
    en: `Four families, each with one job. Everything below is set in the real fonts ${SITE_NAME} loads, at the sizes it uses.`,
    id: `Empat font, masing-masing satu tugas. Semua di bawah pakai font asli yang di-load ${SITE_NAME}, di ukuran yang beneran dipakai.`
  },
  familiesTitle: {
    en: 'Families',
    id: 'Font'
  },
  familiesDesc: {
    en: 'Loaded with next/font/google in src/modules/Root.layout.tsx, so they are self-hosted at build time and there is no request to Google from the browser. Only the weights listed are shipped.',
    id: 'Di-load pakai next/font/google di src/modules/Root.layout.tsx, jadi di-self-host waktu build dan browser gak request ke Google. Cuma weight yang ada di list yang ikut dikirim.'
  },
  sansJob: {
    en: 'Body text, UI, buttons. The default on <body>.',
    id: 'Body text, UI, button. Default di <body>.'
  },
  displayJob: {
    en: 'Headings, card titles, table headers in posts.',
    id: 'Heading, judul card, header tabel di post.'
  },
  monoJob: {
    en: 'Labels, dates, chips, paths, code and the terminal.',
    id: 'Label, tanggal, chip, path, code dan terminal.'
  },
  handJob: {
    en: 'Hand-written accents only: eyebrows, stickers, a sign-off. Never a paragraph.',
    id: 'Cuma buat aksen tulisan tangan: eyebrow, sticker, sign-off. Jangan buat paragraf.'
  },
  weightsLabel: {
    en: 'weights',
    id: 'weight'
  },
  scaleTitle: {
    en: 'Scale',
    id: 'Skala'
  },
  scaleDesc: {
    en: 'Not a token file: these are the class strings in the components. Resize the window, the md: steps kick in at 768px.',
    id: 'Bukan file token: ini string class yang ada di component. Coba resize window, step md: mulai jalan di 768px.'
  },
  scaleSample: {
    en: 'Notes from the hideout',
    id: 'Catatan dari markas'
  },
  proseTitle: {
    en: 'Post body',
    id: 'Isi post'
  },
  proseDesc: {
    en: 'Posts render inside prose prose-sm sm:prose-base parser (ContentParser). The parser class in content-parser.css binds the typography plugin colours to the theme and sets headings in Space Grotesk.',
    id: 'Post di-render di dalam prose prose-sm sm:prose-base parser (ContentParser). Class parser di content-parser.css nyambungin warna typography plugin ke theme dan bikin heading pakai Space Grotesk.'
  },
  proseHeading: {
    en: 'Why the build is static',
    id: 'Kenapa build-nya static'
  },
  proseBody1: {
    en: 'Every post is compiled once with mdx-bundler, at build time. There is no server rendering a page per request, so a page is just a file.',
    id: 'Tiap post di-compile sekali pakai mdx-bundler, waktu build. Gak ada server yang render page per request, jadi page itu cuma file.'
  },
  proseQuote: {
    en: 'The cheapest request is the one that hits a CDN.',
    id: 'Request paling murah itu yang kena CDN.'
  },
  proseItem1: {
    en: 'one HTML file per post and language',
    id: 'satu file HTML per post dan bahasa'
  },
  proseItem2: {
    en: 'one OG image per post, also static',
    id: 'satu OG image per post, juga static'
  },
  proseSubheading: {
    en: 'What it costs',
    id: 'Harganya apa'
  },
  proseBody2: {
    en: 'A typo fix needs a rebuild. That is the trade.',
    id: 'Benerin typo butuh rebuild. Itu trade-off-nya.'
  }
});

export default withTypographyLocales;
