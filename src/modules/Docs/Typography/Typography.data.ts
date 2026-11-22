/** the four families loaded in src/modules/Root.layout.tsx with next/font/google */
export const FAMILIES = [
  {
    key: 'sans',
    name: 'Plus Jakarta Sans',
    utility: 'font-sans',
    variable: '--font-plus-jakarta-sans',
    weights: [400, 500, 600, 700],
    className: 'font-sans'
  },
  {
    key: 'display',
    name: 'Space Grotesk',
    utility: 'font-display / font-serif',
    variable: '--font-space-grotesk',
    weights: [500, 600, 700],
    className: 'font-display'
  },
  {
    key: 'mono',
    name: 'JetBrains Mono',
    utility: 'font-mono',
    variable: '--font-jetbrains-mono',
    weights: [400, 500],
    className: 'font-mono'
  },
  {
    key: 'hand',
    name: 'Caveat',
    utility: 'font-hand',
    variable: '--font-caveat',
    weights: [600],
    className: 'font-hand'
  }
] as const;

export type FamilyKey = typeof FAMILIES[number]['key'];

/** sizes the site really uses, with the classes they come from */
export const SCALE = [
  { role: 'page title', classes: 'font-display text-4xl font-bold tracking-tight md:text-[52px] md:leading-[1.08]', where: 'DocsShell, About, Blog list' },
  { role: 'section title', classes: 'font-display text-2xl font-bold tracking-tight md:text-[32px]', where: 'DocsSection' },
  { role: 'card title', classes: 'font-display text-xl font-bold', where: 'cards, post list' },
  { role: 'lead', classes: 'text-base text-muted md:text-lg', where: 'page descriptions' },
  { role: 'body', classes: 'text-base', where: 'everything else' },
  { role: 'small', classes: 'text-sm text-muted', where: 'card text, meta' },
  { role: 'label', classes: 'font-mono text-xs text-muted', where: 'dates, paths, chips' },
  { role: 'eyebrow', classes: 'font-hand text-[24px] leading-none text-brand', where: 'above a page title' }
] as const;
