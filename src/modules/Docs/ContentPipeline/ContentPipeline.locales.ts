import createContentLocales from '@/packages/libs/I18n/locales';

const withContentPipelineLocales = createContentLocales({
  title: {
    en: 'Content pipeline',
    id: 'Content pipeline'
  },
  description: {
    en: 'How a post goes from an MDX file to static pages and images. Every snippet here is copied from the repo; open the file named above it to check.',
    id: 'Gimana sebuah post jalan dari file MDX jadi static page dan gambar. Tiap snippet di sini di-copy dari repo; buka file yang namanya ada di atasnya buat ngecek.'
  },
  slugsTitle: {
    en: 'One post, two languages',
    id: 'Satu post, dua bahasa'
  },
  slugsDesc: {
    en: 'A post has one file per language, in src/contents/posts/en and src/contents/posts/id. Both files carry the same slug map, so each knows the address of the other. slugOriginal is the slug of the language being read, and the language switcher uses the map to jump to the other version.',
    id: 'Satu post punya satu file per bahasa, di src/contents/posts/en dan src/contents/posts/id. Dua file itu bawa slug map yang sama, jadi masing-masing tau alamat pasangannya. slugOriginal itu slug bahasa yang lagi dibaca, dan language switcher pake map itu buat lompat ke versi satunya.'
  },
  paginationTitle: {
    en: 'Static pagination',
    id: 'Static pagination'
  },
  paginationDesc: {
    en: 'The blog list is cut into pages of BLOG_PAGINATION_LIMIT (10) posts. pageCount is Math.ceil(posts / 10), and generateStaticParams lists every page number from 1 to pageCount, per language. dynamicParams = false, so a page number outside that list is a 404, not a render on demand.',
    id: 'List blog dipotong jadi page isi BLOG_PAGINATION_LIMIT (10) post. pageCount itu Math.ceil(post / 10), dan generateStaticParams ngelist semua nomor page dari 1 sampai pageCount, per bahasa. dynamicParams = false, jadi nomor page di luar list itu 404, bukan di-render on demand.'
  },
  ogTitle: {
    en: 'OG image per post',
    id: 'OG image per post'
  },
  ogDesc: {
    en: 'og.png is a route handler next to the post page. It takes the same static params as the post, so the build writes one 1200x630 PNG per post per language. The card is drawn with ImageResponse from next/og (satori under the hood) with fonts read from src/assets/og.',
    id: 'og.png itu route handler di sebelah post page. Static params-nya sama persis kayak post, jadi build nulis satu PNG 1200x630 per post per bahasa. Card-nya digambar pake ImageResponse dari next/og (satori di belakangnya) dengan font yang dibaca dari src/assets/og.'
  },
  ogLive: {
    en: 'The real og.png of a post on this site, loaded from its route:',
    id: 'og.png asli dari salah satu post di site ini, di-load dari route-nya:'
  },
  shareTitle: {
    en: 'Share images',
    id: 'Share image'
  },
  shareDesc: {
    en: 'Same idea, three sizes for stories and feeds: 9x16 (1080x1920), 4x5 (1080x1350) and 1x1 (1080x1080). satori draws a PNG, then sharp turns it into a JPEG at quality 85 with mozjpeg.',
    id: 'Idenya sama, tiga ukuran buat story dan feed: 9x16 (1080x1920), 4x5 (1080x1350) dan 1x1 (1080x1080). satori gambar PNG, terus sharp ubah jadi JPEG quality 85 pake mozjpeg.'
  },
  seriesTitle: {
    en: 'Series',
    id: 'Series'
  },
  seriesDesc: {
    en: 'A post joins a series with one frontmatter line. getSeriesParts collects every post of the same language with the same series id, sorted by part, and SeriesNav lists them with previous and next links. It renders nothing when a series has fewer than two parts.',
    id: 'Post masuk series cukup pake satu baris frontmatter. getSeriesParts ngumpulin semua post di bahasa yang sama dengan series id yang sama, diurutin by part, terus SeriesNav nampilin list-nya plus link previous dan next. Kalau part-nya kurang dari dua, nggak ada yang di-render.'
  },
  tocTitle: {
    en: 'Table of contents and reading progress',
    id: 'Table of contents dan reading progress'
  },
  tocDesc: {
    en: 'The TOC is read from the MDX source, not the DOM: h2 and h3 lines outside code fences, slugged with github-slugger in document order, the same way rehype-slug makes the heading ids. It shows from the xl breakpoint up. ReadingProgress is a thin bar that follows how far #post-body has scrolled.',
    id: 'TOC dibaca dari source MDX, bukan dari DOM: baris h2 dan h3 di luar code fence, di-slug pake github-slugger sesuai urutan dokumen, sama kayak rehype-slug bikin id heading. Muncul mulai breakpoint xl. ReadingProgress itu bar tipis yang ngikutin seberapa jauh #post-body udah di-scroll.'
  },
  sitemapTitle: {
    en: 'Sitemap',
    id: 'Sitemap'
  },
  sitemapDesc: {
    en: 'src/app/sitemap.ts is static and reuses the same path generators the pages use: home, about, now, portfolio, the blog pages and every post, with and without the language prefix. The docs pages are not in it on purpose.',
    id: 'src/app/sitemap.ts itu static dan pake ulang path generator yang sama dengan page-nya: home, about, now, portfolio, page blog dan semua post, dengan dan tanpa prefix bahasa. Page docs sengaja nggak dimasukin.'
  },
  workflowsTitle: {
    en: 'GitHub workflows',
    id: 'Workflow GitHub'
  },
  workflowsDesc: {
    en: 'Four files in .github/workflows. Only one runs on its own.',
    id: 'Empat file di .github/workflows. Cuma satu yang jalan sendiri.'
  },
  wfIntegration: {
    en: 'Runs on every pull request: npm install, then npm run lint.',
    id: 'Jalan di tiap pull request: npm install, terus npm run lint.'
  },
  wfCloudinary: {
    en: 'Run by hand. Deletes everything under gading.dev/media/ on Cloudinary, then uploads every image in public/media, 7 at a time. Banners are served from there in production; in dev they load from public/media directly.',
    id: 'Dijalanin manual. Hapus semua di bawah gading.dev/media/ di Cloudinary, terus upload semua gambar di public/media, 7 sekaligus. Banner di production di-serve dari situ; di dev langsung dari public/media.'
  },
  wfLighthouse: {
    en: 'Run by hand. Fetches PageSpeed reports for gading.dev as SVG, desktop and mobile, into public/media/web-reports/pagespeed and commits them.',
    id: 'Dijalanin manual. Ambil report PageSpeed buat gading.dev dalam bentuk SVG, desktop dan mobile, ke public/media/web-reports/pagespeed terus di-commit.'
  },
  wfRevalidation: {
    en: 'Run by hand. Runs src/scripts/app:revalidate.ts, which reads every path from sitemap.xml and calls /api/revalidate with them. That route does not exist in src/app today, so this one is a leftover until it comes back.',
    id: 'Dijalanin manual. Ngejalanin src/scripts/app:revalidate.ts, yang baca semua path dari sitemap.xml terus manggil /api/revalidate. Route itu sekarang nggak ada di src/app, jadi workflow ini sisa lama sampai route-nya balik.'
  },
  onPr: {
    en: 'on pull_request',
    id: 'on pull_request'
  },
  onDispatch: {
    en: 'workflow_dispatch',
    id: 'workflow_dispatch'
  }
});

export default withContentPipelineLocales;
