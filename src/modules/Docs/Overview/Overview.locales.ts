import createContentLocales from '@/packages/libs/I18n/locales';

const withOverviewLocales = createContentLocales({
  title: {
    en: 'Docs',
    id: 'Docs'
  },
  description: {
    en: 'How this site is put together: the stack, the path a post takes from an MDX file to a page, and the design pieces it is drawn with.',
    id: 'Gimana site ini dirakit: stack-nya, jalan sebuah post dari file MDX sampai jadi page, dan potongan design yang dipakai buat ngegambarnya.'
  },
  stackTitle: {
    en: 'What it runs on',
    id: 'Jalan di atas apa'
  },
  stackDesc: {
    en: 'Read from package.json at build time, so these versions are the ones this build used.',
    id: 'Dibaca dari package.json waktu build, jadi versi di sini ya versi yang dipakai build ini.'
  },
  flowTitle: {
    en: 'From MDX file to page',
    id: 'Dari file MDX sampai jadi page'
  },
  flowDesc: {
    en: 'Every post is a file in src/contents/posts/{en,id}. At build time each file becomes a static page, an OG image and three share images, and lands in the pagination and the sitemap. Media in public/media is pushed to Cloudinary by a workflow run by hand.',
    id: 'Tiap post itu satu file di src/contents/posts/{en,id}. Waktu build, tiap file jadi static page, satu OG image dan tiga share image, terus masuk ke pagination dan sitemap. Media di public/media di-push ke Cloudinary lewat workflow yang dijalanin manual.'
  },
  diagramAlt: {
    en: 'Diagram: MDX posts go through getAllBlogPaths, generateStaticParams and next build, and come out as the post page, og.png, share images, pagination pages and the sitemap. public/media goes to Cloudinary through the cloudinary workflow.',
    id: 'Diagram: post MDX lewat getAllBlogPaths, generateStaticParams dan next build, keluar jadi post page, og.png, share image, page pagination dan sitemap. public/media masuk ke Cloudinary lewat workflow cloudinary.'
  },
  revalidateNote: {
    en: 'About revalidation: the On Demand Revalidation workflow runs src/scripts/app:revalidate.ts, which reads sitemap.xml and calls /api/revalidate. This repo has no such route in src/app right now, so that workflow has nothing to call. Pages change when the site is built again.',
    id: 'Soal revalidation: workflow On Demand Revalidation ngejalanin src/scripts/app:revalidate.ts, yang baca sitemap.xml terus manggil /api/revalidate. Sekarang repo ini nggak punya route itu di src/app, jadi workflow-nya nggak punya apa-apa buat dipanggil. Page berubah waktu site di-build ulang.'
  },
  pagesTitle: {
    en: 'The pages',
    id: 'Halaman-halamannya'
  },
  pipelineCard: {
    en: 'Static pagination, OG and share images, ID/EN slugs, series, sitemap and the GitHub workflows, from the code.',
    id: 'Static pagination, OG dan share image, slug ID/EN, series, sitemap dan workflow GitHub, langsung dari code-nya.'
  },
  colorsCard: {
    en: 'daisyUI tokens and the soft tokens, light and dark side by side, with measured contrast ratios.',
    id: 'Token daisyUI dan soft token, light dan dark berdampingan, lengkap dengan contrast ratio yang dihitung.'
  },
  typographyCard: {
    en: 'The four fonts and what each is for, the heading scale, and article prose with the real styles.',
    id: 'Empat font dan tugasnya masing-masing, heading scale, dan prose artikel pake style aslinya.'
  },
  componentsCard: {
    en: 'Live components: card, pill buttons, banner, zoomable image, code block, hero terminal.',
    id: 'Component yang hidup: card, pill button, banner, gambar yang bisa di-zoom, code block, hero terminal.'
  }
});

export default withOverviewLocales;
