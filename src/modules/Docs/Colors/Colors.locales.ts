import { SITE_NAME } from '@/configs/sites';
import createContentLocales from '@/packages/libs/I18n/locales';

const withColorsLocales = createContentLocales({
  title: {
    en: 'Color System',
    id: 'Sistem Warna'
  },
  description: {
    en: `The palette of ${SITE_NAME}: daisyUI tokens, the soft tokens on top of them, both themes side by side, and the contrast of the pairs the site actually uses.`,
    id: `Palette ${SITE_NAME}: token daisyUI, soft token di atasnya, dua theme berdampingan, dan contrast dari pasangan warna yang beneran dipakai di site.`
  },
  liveTitle: {
    en: 'Active theme',
    id: 'Theme yang aktif'
  },
  liveDesc: {
    en: 'These read the CSS variables of the theme you are on now. Switch the theme in the navbar and they follow. Click one to copy its value.',
    id: 'Yang ini baca CSS variable dari theme yang lagi lu pake. Ganti theme di navbar, warnanya ikut. Klik salah satu buat copy nilainya.'
  },
  compareTitle: {
    en: 'Light and dark, side by side',
    id: 'Light dan dark, berdampingan'
  },
  compareDesc: {
    en: 'Values read from src/designs/styles/globals.css at build time.',
    id: 'Nilainya dibaca dari src/designs/styles/globals.css waktu build.'
  },
  softTitle: {
    en: 'Soft tokens',
    id: 'Soft token'
  },
  softDesc: {
    en: 'The --gd-* variables. @theme inline maps them to Tailwind colours (bg-card, text-muted, bg-teal-soft...), so one class works in both themes with no dark: variant.',
    id: 'Variable --gd-*. @theme inline map mereka jadi warna Tailwind (bg-card, text-muted, bg-teal-soft...), jadi satu class jalan di dua theme tanpa variant dark:.'
  },
  contrastTitle: {
    en: 'Contrast',
    id: 'Contrast'
  },
  contrastDesc: {
    en: 'WCAG 2 contrast ratio, computed from the hex values above. AA needs 4.5:1 for body text and 3:1 for large text (24px, or 18.66px bold). A pair marked AA large is fine for headings and tags, not for paragraphs.',
    id: 'Contrast ratio WCAG 2, dihitung dari nilai hex di atas. AA butuh 4.5:1 buat body text dan 3:1 buat large text (24px, atau 18.66px bold). Pasangan yang ditandai AA large aman buat heading dan tag, bukan buat paragraf.'
  }
});

export default withColorsLocales;
